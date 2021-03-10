const { NEXT_APP_SSO_REALM = 'MCB686', NEXT_APP_SSO_URL = 'https://sso.mentor.vn/auth' } = process.env;

//const keycloak = require('./keycloak.json');
//const config = require(`./keycloak.${NEXT_APP_ENV}.json`) || {};

const config = {
    realm: NEXT_APP_SSO_REALM,
    url: NEXT_APP_SSO_URL,
    'ssl-required': 'none',
    resource: 'website',
    'public-client': true,
    'confidential-port': 0,
    clientId: 'website'
};

module.exports = { ...config };
