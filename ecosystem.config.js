module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'mcbook-frontend',
            script: 'server/index.js',
            env_production: {
                NODE_ENV: 'production',
                PORT: 8000
            },
            env_development: {
                NODE_ENV: 'development',
                PORT: 8080
            },
            log_file: 'logs/combined.out_err.log',
            error_file: 'logs/pm2-err.log',
            out_file: 'logs/pm2-out.log',
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm Z'
        }
    ]
};
