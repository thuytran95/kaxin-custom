import style from './styles.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import Request from 'src/helpers/Request';
import Keycloak from 'keycloak-js';

import Link from 'next/link';
import { actions } from 'src/redux-utils';

//import { getCookie, removeCookie } from 'src/helpers/Cookie';
import { redirect } from 'src/helpers/Common';
import { Cube as Overlay } from 'src/shared/components/loading';
import keycloakData from './keycloak.json';

class LoginComponent extends Component {
    static async getInitialProps(context) {
        const kc = Keycloak(keycloakData);
        kc
            .init({
                onLoad: 'login-required'
            })
            .success(authenticated => {
                if (authenticated) {
                    Request.setToken(kc.token);
                    Request.setRefreshToken(kc.refreshToken);
                    const { store } = context;
                    const { dispatch } = store;
                    const { authActions } = mapDispatchToProps(dispatch);
                    const { url } = this.props;
                    Promise.all([authActions.me()]).then(() => {
                        redirect(url.query.redirect || '/');
                    });
                } else {
                    // if (Request.token) {
                    //     promsList.push(authActions.me());
                    // }
                }
            })
            .error(() => {
                //
            });
        return await {
            layout: 'empty'
        };
    }

    componentWillMount() {}

    state = {
        error: null,
        auth: {},
        loading: false
    };

    handleChangeInput = e => {
        const { name, value } = e.target;
        this.setState({
            auth: {
                ...this.state.auth,
                [name]: value
            }
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { authActions, url } = this.props;
        const { auth } = this.state;
        authActions
            .login({
                ...auth,
                client_id: 1
            })
            .then(() => {
                redirect(url.query.redirect || '/');
            });
    };
    render() {
        const { loading } = this.state;
        return (
            <Fragment>
                <Helmet
                    title={`Đăng nhập`}
                    meta={[
                        {
                            property: 'og:title',
                            content: 'Đăng nhập'
                        }
                    ]}
                />{' '}
                <div className="empty-page-style">
                    <Overlay loading={loading} />
                    <div className={style.logo}>
                        <Link href="/">
                            <a>
                                <img
                                    src="/static/assets/images/logo/logo.png"
                                    alt="Công ty sách MCBooks – Knowlege sharing"
                                />
                            </a>{' '}
                        </Link>{' '}
                    </div>{' '}
                    <div className={style.boxLayout}>
                        <div className={style.sectionOne}>
                            <h2> Đăng nhập </h2> <h3> Đăng nhập bằng email </h3>{' '}
                            <Form onSubmit={this.handleSubmit}>
                                <section>
                                    <FormGroup>
                                        <Label> Email </Label>{' '}
                                        <Input type="email" name="username" onChange={this.handleChangeInput} />{' '}
                                    </FormGroup>{' '}
                                    <FormGroup>
                                        <Label> Mật khẩu </Label>{' '}
                                        <Input type="password" name="password" onChange={this.handleChangeInput} />{' '}
                                    </FormGroup>{' '}
                                </section>{' '}
                                <FormGroup check className={style.remember}>
                                    <Label check>
                                        <Input type="checkbox" name="remember" onChange={this.handleChangeInput} /> Ghi
                                        nhớ đăng nhập{' '}
                                    </Label>{' '}
                                </FormGroup>
                                <FormGroup className={style.textRight}>
                                    <Link href="/reset-password">
                                        <a> Quên mật khẩu ? </a>{' '}
                                    </Link>{' '}
                                </FormGroup>{' '}
                                <Button type="submit" onClick={this.handleSubmit}>
                                    Đăng nhập{' '}
                                </Button>{' '}
                            </Form>{' '}
                        </div>
                        <div className={style.sectionTwo}>
                            <h3> hoặc </h3>{' '}
                            <Link href="/">
                                <a className={style.facebook}>
                                    <i className="zmdi zmdi-facebook" /> Đăng nhập bằng Facebook{' '}
                                </a>{' '}
                            </Link>
                            <Link href="/">
                                <a className={style.facebook}>
                                    <i className="zmdi zmdi-google-plus" /> Đăng nhập bằng Google +
                                </a>{' '}
                            </Link>{' '}
                        </div>{' '}
                        <div className={style.sectionThree}>
                            Bạn chưa có tài khoản ?{' '}
                            <Link href="/dang-ky">
                                <a> Đăng ký ngay </a>{' '}
                            </Link>{' '}
                        </div>{' '}
                    </div>{' '}
                </div>{' '}
            </Fragment>
        );
    }
}

LoginComponent.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
