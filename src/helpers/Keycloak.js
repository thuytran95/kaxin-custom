const Keycloak = require('keycloak-js');
const keycloakData = require('src/keycloak');
const kc = Keycloak(keycloakData);

kc.initAsync = function (option) {
    return new Promise(function (resolve, reject) {
        return kc.init(option)
            .success(function (authenticated) {
                return resolve(authenticated);
            })
            .error(function (err) {
                return reject(err);
            });
    });
};
kc.logoutAsync = function (option) {
    return new Promise(function (resolve, reject) {
        return kc.logout(option)
            .success(function (authenticated) {
                return resolve(authenticated);
            })
            .error(function (err) {
                return reject(err);
            });
    });
};

module.exports = kc;
module.exports.kc = kc;
