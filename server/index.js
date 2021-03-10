/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cookiesMiddleware = require('universal-cookie-express');
const favicon = require('serve-favicon');
const path = require('path');
const next = require('next');
const compression = require('compression');
var morgan = require('morgan');

const nextConfig = require('./next.config.prod');
const routes = require('./routes');
const sitemap = require('./sitemap');

const dev = process.env.NODE_ENV !== 'production';
const LRUCache = require('lru-cache');
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});

const app = next({ dev: false, quiet: true, dir: '.', conf: nextConfig });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
    app.render(req, res, route.page, query);
});

const { PORT = 3002 } = process.env;
const sessionMaxAge = 60000 * 60 * 24 * 7;
const sessionStore = new session.MemoryStore();
const sessionMiddleware = session({
    secret: 'qsoftvietnam',
    store: sessionStore,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: 'auto',
        maxAge: sessionMaxAge
    }
});

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(favicon(path.join(process.cwd(), 'public/favicons/favicon.ico')));
        server.use(sessionMiddleware);
        server.use(express.static('public'));
        server.use(cookieParser());
        server.use(cookiesMiddleware());
        server.use(compression());
        server.use(morgan('combined'))

        //server.use(handler);
        sitemap({ server });

        server.get('/_next/*', (req, res) => {
            /* serving _next static content using next.js handler */
            handler(req, res);
        });

        server.get('/', (req, res) => {
            return renderAndCache(req, res)
        });

        server.get('*', (req, res) => {
            /* serving page */
            return handler(req, res)
        });

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${PORT} with Prod`);
        });
    })
    .catch(ex => {
        // console.error(ex.stack);
        process.exit(1);
    });

function getCacheKey(req) {
    //TODO clean-up, standardize an url to maximize cache hits
    return req.url;
}

async function renderAndCache(req, res) {
    //TODO add a way to purge cache for a specific url
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    // if (ssrCache.has(key)) {
    //     res.setHeader('x-cache', 'HIT');
    //     res.send(ssrCache.get(key));
    //     return;
    // }

    // No cache present for specific key? let's try to render and cache
    try {
        const html = await app.renderToHTML(req, res, '/', {});
        // If something is wrong with the request, let's not cache
        // Send the generated content as is for further inspection

        if (dev || res.statusCode !== 200) {
            res.setHeader('x-cache', 'SKIP');
            res.send(html);
            return;
        }

        // Everything seems OK... let's cache
        ssrCache.set(key, html);
        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, '/', {});
    }
}
