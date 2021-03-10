import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import WidgetFooter from './WidgetFooter';
import InfoFooter from './InfoFooter';

import LazyLoad from 'react-lazyload';

class FooterComponent extends PureComponent {
    render() {
        return (
            <Fragment>
                {/* <TopFooter /> */}
                <footer>
                    <div className="container">
                        <LazyLoad>
                            <WidgetFooter />
                        </LazyLoad>
                        <LazyLoad>
                            <InfoFooter />
                        </LazyLoad>
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className={style.footerBottom}>
                                    <p>© 2008 - 2019 - Bản quyền của Kaixin JSC.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </Fragment>
        );
    }
}

// const mapStateToProps = state => {
//     const { auth } = state;
//     return { auth };
// };

export default FooterComponent;
