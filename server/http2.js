/* eslint no-console: 0 */
require('dotenv').config();
const spdy = require('spdy');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookiesMiddleware = require('universal-cookie-express');
const next = require('next');
const compression = require('compression');

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

const options = {
    key: fs.readFileSync(process.cwd() + '/certificate/server.key'),
    cert: fs.readFileSync(process.cwd() + '/certificate/server.crt')
};

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(compression());
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
        spdy.createServer(options, server).listen(PORT, err => {
            if (err) {
                throw new Error(err);
            }

            //console.log(`Ready on https://localhost:${PORT} with Prod`);
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
