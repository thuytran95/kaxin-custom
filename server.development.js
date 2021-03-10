/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookiesMiddleware = require('universal-cookie-express');
const favicon = require('serve-favicon');
const path = require('path');
const next = require('next');
const compression = require('compression');

const nextConfig = require('./next.config');
const routes = require('./server/routes');
const sitemap = require('./server/sitemap');

const dev = process.env.NODE_ENV !== 'production';
const LRUCache = require('lru-cache');
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
});

const app = next({ dev: true, dir: '.', conf: nextConfig });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
    app.render(req, res, route.page, query);
});

const { PORT = 3002 } = process.env;
const sessionStore = new session.MemoryStore();
const sessionMaxAge = 60000 * 60 * 24 * 7;
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
        server.use(sessionMiddleware);
        server.use(favicon(path.join(process.cwd(), 'public/favicons/favicon.ico')));
        server.use(express.static('public'));
        server.use(cookieParser());
        server.use(cookiesMiddleware());
        server.use(compression());
        //server.use(handler);
        sitemap({ server });
        server.get('/', (req, res) => {
            renderAndCache(req, res, '/', {});
        });
        server.get('*', (req, res) => handler(req, res));
        server.listen(PORT, err => {
            if (err) throw err;
            /// console.log(`Ready on http://localhost:${PORT} with Dev`);
        });
    })
    .catch(ex => {
        console.log(ex);
        process.exit(1);
    });

process.on('unhandledRejection', (reason, p) => {
    // I just caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below), let throw and let him handle that
    throw reason;
});
process.on('uncaughtException', error => {
    console.log('Err', error);
    // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
});

function getCacheKey(req) {
    //TODO clean-up, standardize an url to maximize cache hits
    return req.url;
}

async function renderAndCache(req, res, pagePath, queryParams) {
    //TODO add a way to purge cache for a specific url
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    // No cache present for specific key? let's try to render and cache
    try {
        const html = await app.renderToHTML(req, res, pagePath, queryParams);
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
        app.renderError(err, req, res, pagePath, queryParams);
    }
}
