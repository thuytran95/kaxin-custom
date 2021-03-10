import Cookies from 'universal-cookie';

const getCookieInstance = (req = {}) => {
    const { headers = {} } = req;
    if (!headers.cookie) {
        return new Cookies();
    } else {
        return new Cookies(headers.cookie);
    }
};

export const setCookie = (key, value, res) => {
    return process.browser && setCookieFromBrowser(key, value);
};

export const removeCookie = (key, req = {}) => {
    const cookie = getCookieInstance(req);
    return cookie.remove(key);
};

export const getCookie = (key = '', req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const setCookieFromBrowser = (key, value) => {
    const cookie = getCookieInstance();
    return cookie.set(key, value, {
        path: '/'
    });
};

export const getCookieFromBrowser = key => {
    const cookie = getCookieInstance();
    return cookie.get(key);
};

export const getCookieFromServer = (key = '', req = {}) => {
    const { headers = {} } = req;
    if (!headers.cookie) {
        return undefined;
    } else {
        const cookie = getCookieInstance(req);

        return cookie.get(key);
    }
};

export const getToken = req => {
    return getCookie('accessToken', req);
};

export const saveToken = value => {
    return setCookie('accessToken', value);
};

export const getRefreshToken = req => {
    return getCookie('refreshToken', req);
};

export const saveRefreshToken = value => {
    return setCookie('refreshToken', value);
};
