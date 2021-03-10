import React, { PureComponent } from 'react';

import LayoutElement from './layout';
import settings from './settings';
// import PageBuilder from 'modules/page-builder/PageBuilder';
// import Element from 'modules/page-builder/page-element';
import Element from 'src/page-builder/page-element';

class Layout extends PureComponent {
    static displayName = 'PromotionLayout';
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
