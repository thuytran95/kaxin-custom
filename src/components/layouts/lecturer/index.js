import React, { PureComponent } from 'react';

import LayoutElement from './layout';
import settings from './settings';
// import PageBuilder from 'modules/page-builder/PageBuilder';
import Element from 'src/page-builder/page-element';

class Layout extends PureComponent {
    static displayName = 'AdsLecturerLayout';
    static settings = settings;

    render() {
        return (
            // <PageBuilder>
            <LayoutElement Element={Element} />
            // </PageBuilder>
        );
    }
}

export default Layout;
