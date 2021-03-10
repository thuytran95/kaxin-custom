import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import NavHeader from './components/NavHeader';
import NavComponent from './components/NavAccount';

class AccountPageLayout extends Component {
    render() {
        const { title, authInfo, url, children } = this.props;
        return (
            <Fragment>
                <Helmet title={`${title}`} meta={[{ property: 'og:title', content: `${title}` }]} />
                <div className={style.pageWrapper}>
                    <NavHeader authInfo={authInfo} />
                    <div className="site-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <NavComponent authInfo={authInfo} href={url.asPath} />
                                </div>
                                <div className="col-12 col-lg-9">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

AccountPageLayout.defaultProps = {
    title: '',
    authInfo: {},
    authActions: {},
    url: { asPath: '/' }
};

AccountPageLayout.propTypes = {
    authInfo: PropTypes.object,
    statusCode: PropTypes.number,
    hasError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.element.isRequired,
    url: PropTypes.object
};

const mapStateToProps = state => {
    const { auth } = state;
    return { authInfo: auth };
};

export default connect(mapStateToProps)(AccountPageLayout);
