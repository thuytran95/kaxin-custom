import { ASSET_URL, DEFAULT_AVATAR, BASE_LINK_NL } from 'src/constants/config';
import url from 'url';
import Router from 'next/router';
import queryString from 'query-string';
import _ from 'lodash';
import moment from 'moment';
import slug from 'limax';
import numeral from 'numeral';

export const generateImageUrl = (link = '') => {
    if (_.isString(link) && !!_.toString(link) === true) {
        if (_.startsWith(link, 'http')) return link;
        return url.resolve(ASSET_URL, link);
    }
    return '';
};

export const generateAvatarUrl = (link = '') => {
    const image = generateImageUrl(link);
    return image || DEFAULT_AVATAR;
};

export const getIdYoutube = (url = '') => {
    const query = getYoutubeParams(url);

    return query.v;
};

export const getYoutubeParams = (url = '') => {
    if (!url) return {};
    try {
        const urlObject = new URL(url);
        const query = queryString.parse(urlObject.search) || {};
        return query;
    } catch (err) {
        return {};
    }
};

export const getYoutubeImage = (url = '') => {
    return `https://img.youtube.com/vi/${getIdYoutube(url)}/0.jpg`;
};

export const clearYoutubeLink = (url = '') => {
    return `https://www.youtube.com/watch?v=${getIdYoutube(url)}`;
};

export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return 'N/A';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 0);
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export const parseLocation = (location = {}) => {
    const { search } = location;
    const query = queryString.parse(search);
    return {
        ...location,
        query
    };
};

export const redirect = (target, ctx = {}) => {
    if (ctx.res) {
        ctx.res.writeHead(303, {
            Location: target
        });
        ctx.res.end();
        ctx.res.finished = true;
    } else {
        // In the browser, we just pretend like this never even happened ;)
        Router.replace(target);
    }
    return {};
};

export const formatDate = (value, format = 'MMM DD, YYYY hh:mm a') => {
    const date = moment(value);

    return date.isValid() ? date.format(format) : 'N/A';
};

export const timeAgo = (value, isSuffix = false) => {
    const date = moment(value);

    return date.isValid() ? date.fromNow(isSuffix) : 'N/A';
};

export const makeSlug = (text = '') => {
    try {
        return slug(text);
    } catch (err) {
        return '';
    }
};

export const getPercent = (value, percent = 100) => {
    return percent * value / 100;
};

export const getSalePercent = (value, percent = 0) => {
    return getPercent(value, 100 - percent);
};

export const moneyFormat = (value, format = '0,0') => {
    return numeral(value).format(format);
};

export const numberFromMoneyFormat = string => {
    return numeral(string).value();
};

export const generateLinkCourse = (link = '') => {
    if (_.isString(link) && !!_.toString(link) === true) {
        if (_.startsWith(link, 'http')) return link;
        return url.resolve(BASE_LINK_NL, link);
    }
    return '';
};

export const getValueByKey = (allSetting, optionKey) => {
    //const { allSetting } = this.state;
    if (!_.isEmpty(allSetting)) {
        let rs = '';
        allSetting.forEach(rows => {
            if (optionKey === rows.optionKey) {
                rs = rows.optionValue;
            } else {
                return '';
            }
        });
        return rs;
    } else {
        return '';
    }
};

export const getNameByKey = (allSetting, optionKey) => {
    //const { allSetting } = this.state;
    if (!_.isEmpty(allSetting)) {
        // let a = allSetting.filter(rows => rows.optionKey === params);
        let rs = '';
        allSetting.forEach(rows => {
            if (optionKey === rows.optionKey) {
                rs = rows.optionName;
            } else {
                return '';
            }
        });
        return rs;
    } else {
        return '';
    }
};



