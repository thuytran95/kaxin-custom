import style from './../style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import Link from 'next/link';
//import Error from 'next/error';

class ActiveFalse extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { orderActions } = mapDispatchToProps(store.dispatch);
        try {
            await orderActions.activeCourse({ userId: '2' });
        } catch (err) {
            //
        }

        return {
            title: 'Kích hoạt không thành công'
        };
    }
    render() {
        // const { statusCode, hasError } = this.props;
        // if (hasError) {
        //     return <Error statusCode={statusCode} />;
        // }
        const { title } = this.props;
        return (
            <Fragment>
                <Helmet title={`${title}`} meta={[{ property: 'og:title', content: `${title}` }]} />
                <div className={style.pageWrapper}>
                    <div className="container">
                        <h1>Kích hoạt không thành công!</h1>
                        <p>
                            Tài khoản của bạn kích hoạt không thành công. Vui lòng truy cập lại đường dẫn trong email để
                            kích hoạt lại.
                        </p>

                        <div className={style.btnActions}>
                            <Link href="/">
                                <a className={`btn btn-primary ${style.return}`}>Trang chủ</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

ActiveFalse.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const { auth } = state;
    return { authInfo: auth };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFalse);
