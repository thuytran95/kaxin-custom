const path = require('path');
module.exports = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static'
    },
    useFileSystemPublicRoutes: false
};
