import React, { PureComponent } from 'react';

import LayoutElement from './layout';
import settings from './settings';
// import PageBuilder from 'src/modules/page-builder/PageBuilder';
import Element from 'src/page-builder/page-element';

class Layout extends PureComponent {
    static displayName = 'AffiliateLayout';
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
