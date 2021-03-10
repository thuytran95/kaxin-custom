const sm = require('sitemap');
//const path = require('path');
const routes = require('./routes');

const { NEXT_APP_BASE_LINK_NL } = process.env;

const sitemap = sm.createSitemap({
    hostname: NEXT_APP_BASE_LINK_NL,
    cacheTime: 600000 // 600 sec - cache purge period
});

const setup = ({ server }) => {
    //console.log('server1212121', server, routes.routes);
    for (let i = 0; i < routes.routes.length; i += 1) {
        const post = routes.routes[i];
        sitemap.add({
            url: post.pattern,
            changefreq: 'daily',
            priority: 0.9
        });
    }

    server.get('/sitemap.xml', (req, res) => {
        sitemap.toXML((err, xml) => {
            if (err) {
                res.status(500).end();
                return;
            }

            res.header('Content-Type', 'application/xml');
            res.send(xml);
        });
    });
};

module.exports = setup;
