import axios, { CancelToken } from 'axios';
import _ from 'lodash';
import { CLIENT_TIMEOUT, API_URL } from 'src/constants/config';
import { actions } from 'src/redux-utils';
import * as Cookie from './Cookie';

let source = null;
class Request {
    constructor(config = {}) {
        this.token = Cookie.getCookie('accessToken');
        this.refreshToken = Cookie.getCookie('refreshToken');
        this.onRefreshToken = null;
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.token) {
            Object.assign(headers, {
                Authorization: `Bearer ${this.token}`
            });
        }

        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 15000,
            headers,
            responseType: 'json',
            validateStatus: status => {
                return status >= 200 && status < 300;
            },
            ...config
        });
    }

    setupToken(req) {
        this.token = Cookie.getToken(req);
        this.refreshToken = Cookie.getRefreshToken(req);
        if (this.token) {
            this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
            this.axios.defaults.headers.Authorization = `Bearer ${this.token}`;
        } else {
            this.clearToken(req);
        }
    }

    setupInterceptors(store) {
        this.store = store;

        const { authActions } = actions;

        this.axios.interceptors.response.use(
            response => {
                // Do something with response data
                return response;
            },
            error => {
                if (error.response) {
                    const originalRequest = error.config;
                    const errorType = _.get(error.response, 'data.error', '');
                    if (errorType === 'invalid_token') {
                        if (!this.onRefreshToken) {
                            this.onRefreshToken = this.store.dispatch(authActions.refreshToken(this.refreshToken));
                            return this.onRefreshToken.then(res => {
                                this.onRefreshToken = null;
                                originalRequest.headers.Authorization = `Bearer ${this.token}`;
                                return this.axios.request(originalRequest);
                            });
                        } else {
                            return this.onRefreshToken.then(() => {
                                originalRequest.headers.Authorization = `Bearer ${this.token}`;
                                return this.axios.request(originalRequest);
                            });
                        }
                    } else if (['refresh_token_not_found', 'invalid_grant'].includes(errorType)) {
                        this.clearToken();
                        this.clearRefreshToken();
                        //window.localStorage.removeItem('cart');
                        return this.store.dispatch(authActions.logout());
                    } else {
                        // this.clearToken();
                        // this.clearRefreshToken();
                        return Promise.reject(error.response);
                    }
                } else if (error.request) {
                    return Promise.reject(error.request);
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }

    setToken(token = '') {
        Cookie.saveToken(token);
        this.token = token;
        this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.axios.defaults.headers.Authorization = `Bearer ${this.token}`;
    }

    clearToken(req) {
        Cookie.removeCookie('accessToken', req);
        this.token = '';
        delete this.axios.defaults.headers.common.Authorization;
        delete this.axios.defaults.headers.Authorization;
    }

    setRefreshToken(refreshToken = '', res) {
        Cookie.saveRefreshToken(refreshToken);
        this.refreshToken = refreshToken;
    }

    clearRefreshToken(req) {
        Cookie.removeCookie('refreshToken', req);
        this.refreshToken = '';
    }

    _onError = error => {
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw error.request;
        } else {
            throw error;
        }
    };

    _onSuccess = res => {
        return res;
    };

    _mapConfig = config => {
        if (config.ignoreAuth) {
            config.validateStatus = status => {
                return status >= 200 && status < 300; // default
            };
        }
        return config;
    };

    cancelToken() {
        return CancelToken.source();
    }
    cancelRequest = () => {
        source.cancel();
    };
    makeRequest(config = {}) {
        config = this._mapConfig(config);
        return this.axios
            .request(config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makePost(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios
            .post(url, data, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makePut(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios
            .put(url, data, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makePatch(url, data = {}, config = {}) {
        config = this._mapConfig(config);
        return this.axios
            .patch(url, data, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makeGet(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });

        return this.axios
            .get(url, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makeDelete(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, {
            params
        });
        return this.axios
            .delete(url, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makeUpload(url, file, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        data.append('file', file);
        source = CancelToken.source();
        return this.axios
            .post(
                url,
                data,
                Object.assign(params, {
                    cancelToken: source.token
                })
            )
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makeUploadPut(url, file, params = {}) {
        params = this._mapConfig(params);
        params = Object.assign({ timeout: 300000 }, params);
        params = _.omit(params, ['Content-Type']);
        const data = new FormData();
        data.append('file', file);
        return this.axios
            .put(url, data, params)
            .then(this._onSuccess)
            .catch(this._onError);
    }

    makeDownload(url, params = {}, config = {}) {
        config = this._mapConfig(config);
        Object.assign(config, { params }, { responseType: 'blob' });
        return this.axios
            .get(url, config)
            .then(this._onSuccess)
            .catch(this._onError);
    }
}
export default new Request({ timeout: CLIENT_TIMEOUT });
