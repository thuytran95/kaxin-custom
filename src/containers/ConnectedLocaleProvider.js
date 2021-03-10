import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import moment from 'moment';

import viVN from 'antd/lib/locale-provider/vi_VN';
import enUS from 'antd/lib/locale-provider/en_US';
const setLocale = locale => {
    if (locale && locale !== moment.locale()) {
        moment.locale(locale);
    }
};
const mapStateToProps = ({ common }) => {
    const { locale } = common;

    switch (locale) {
        case 'en':
        case 'en_US':
            setLocale('en');
            return { locale: enUS };
        case 'vi':
        case 'vi_VN':
            setLocale('vi');
            return { locale: viVN };
        default:
            setLocale('en');
            return { locale: enUS };
    }
};

export default connect(mapStateToProps)(LocaleProvider);
