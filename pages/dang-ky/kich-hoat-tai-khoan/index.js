import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import Link from 'next/link';
//import Error from 'next/error';

class ActiveSuccess extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { orderActions } = mapDispatchToProps(store.dispatch);
        try {
            await orderActions.activeCourse({ userId: '2' });
        } catch (err) {
            //
        }

        return {
            title: 'Kích hoạt thành công'
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
                        <h1>Kích hoạt thành công!</h1>
                        <h3>Xin chúc mừng!</h3>
                        <p>
                            Bạn vừa kích hoạt thành công tài khoản của bạn. Bạn có thẻ cập nhật thông tin tài khoản của
                            mình hoặc bắt đầu mua khoá học.
                        </p>

                        <div className={style.btnActions}>
                            <Link href="/">
                                <a className={`btn btn-primary ${style.return}`}>Trang chủ</a>
                            </Link>
                            <Link href="/tai-khoan-ca-nhan">
                                <a className={`btn btn-primary ${style.myAccount}`}>Tài khoản của tôi</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

ActiveSuccess.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSuccess);
