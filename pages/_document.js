import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

export default class PageDocument extends Document {
    static async getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        // const page = context.renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        // const { html, head, errorHtml, chunks } = renderPage();
        const documentProps = await super.getInitialProps(context);
        // see https://github.com/nfl/react-helmet#server-usage for more information
        // 'head' was occupied by 'renderPage().head', we cannot use it
        return { ...documentProps, helmet: Helmet.renderStatic(), styleTags };
    }

    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent();
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent();
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map(el => this.props.helmet[el].toComponent());
    }

    get helmetJsx() {
        return (
            <Helmet
                encodeSpecialCharacters={false}
                defaultTitle="Công ty sách MCBooks – Knowlege sharing"
                htmlAttributes={{ lang: 'en' }}
                title="Công ty sách MCBooks – Knowlege sharing"
                meta={[
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { property: 'og:title', content: 'Công ty sách MCBooks – Knowlege sharing' },
                    { property: 'fb:app_id', content: '296879230789501' }
                ]}
            />
        );
    }

    render() {
        // const isProd = process.env.NODE_ENV === 'production';
        return (
            <html {...this.helmetHtmlAttrComponents}>
                <Head>
                    <header name="Access-Control-Allow-Origin" value="*" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"
                    />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta charSet="utf-8" />
                    <meta property="fb:app_id" content="296879230789501" />
                    <meta httpEquiv="x-dns-prefetch-control" content="on" />
                    <link href="/manifest.json" rel="manifest" />
                    {this.helmetJsx}
                    {this.helmetHeadComponents}
                    {this.props.styleTags}
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Material-Design-Iconic-Font.woff2?v=2.2.0"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/fontawesome-webfont.woff2?v=4.7.0"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Regular.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Italic.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Bold.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Italic.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-Black.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-MediumItalic.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />
                    <link
                        rel="preload"
                        href="/static/assets/fonts/Montserrat/Montserrat-BoldItalic.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="crossorigin"
                    />

                    <link rel="dns-prefetch" href="https://connect.facebook.net" />
                    <link rel="dns-prefetch" href="https://www.facebook.com" />
                    <link rel="dns-prefetch" href="https://widget-css.subiz.com" />
                    <link rel="dns-prefetch" href="https://sockets.mcbooks.vn" />
                    <link rel="dns-prefetch" href="https://kong.kaixin.vn" />
                    <link rel="dns-prefetch" href="https://staticxx.facebook.com" />

                    <link rel="preload" href="/static/assets/css/main.min.css" as="style" />
                    <link rel="stylesheet" href="/static/assets/css/main.min.css" />
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />

                    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
                </body>
            </html>
        );
    }
}
