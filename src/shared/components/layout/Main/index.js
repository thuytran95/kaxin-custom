import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from 'src/shared/components/Header';
import FooterComponent from 'src/shared/components/Footer';

// import { FB_APP_ID } from 'src/constants/config'; // by Tuanta for Speed

class LayoutComponent extends Component {
    static propTypes = {
        children: PropTypes.any
    };

    componentDidMount() {
        // window.fbAsyncInit = function() {
        //     window.FB.init({
        //         appId: FB_APP_ID,
        //         autoLogAppEvents: true,
        //         xfbml: true,
        //         version: 'v3.0'
        //     });
        // };
        // (function(d, s, id) {
        //     const fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     const js = d.createElement(s);
        //     js.id = id;
        //     js.src =
        //         'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=1709228422490559&autoLogAppEvents=1';
        //     fjs.parentNode.insertBefore(js, fjs);
        // })(document, 'script', 'facebook-jssdk');
        // window._sbzq ||
        //     (function(e) {
        //         e._sbzq = [];
        //         const t = e._sbzq;
        //         t.push(['_setAccount', 60187]);
        //         const n = e.location.protocol === 'https:' ? 'https:' : 'http:';
        //         const r = document.createElement('script');
        //         r.type = 'text/javascript';
        //         r.async = true;
        //         r.src = n + '//static.subiz.com/public/js/loader.js';
        //         const i = document.getElementsByTagName('script')[0];
        //         i.parentNode.insertBefore(r, i);
        //     })(window);
    }

    render() {
        const { children } = this.props;
        return (
            <Fragment>
                <HeaderComponent />
                <div className="main-container">
                    <div className="onesignal-customlink-container">{children}</div>
                </div>
                <FooterComponent />
            </Fragment>
        );
    }
}

export default LayoutComponent;
