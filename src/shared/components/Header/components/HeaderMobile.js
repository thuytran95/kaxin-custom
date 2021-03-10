/* eslint react/no-did-mount-set-state: 0*/
import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classnames from 'classnames';
import _ from 'lodash';
//import Route from 'src/helpers/Route';
import { CategoryLink } from 'src/shared/components/Link';

import { getValueByKey } from 'src/helpers/Common';
import SearchComponent from '../../Search/index';
import MiniCartComponent from '../../MiniCart/index';
import DropdownMessages from '../DropdownMessages';
import ImageLoad from 'src/components/image-load';

class HeaderMobile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: '',
            kc: {},
            isRegPartner: false
        };
    }
    async componentDidMount() {
        const kc = require('src/helpers/Keycloak');
        await kc.initAsync();
        this.setState({ kc });
    }
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };
    closeToggle = () => {
        this.setState({ isShowInfo: '' });
    };

    renderTree = data => {
        const { children = [] } = data;
        return (
            <li key={data.id} className={children.length > 0 ? [style.hasMenuChildren] : ''}>
                <CategoryLink {...data} />
                {children.length > 0 ? <ul>{children.map(item => this.renderTree(item))}</ul> : ''}
            </li>
        );
    };
    onRegisterClick = e => {
        this.state.kc.register();
    };
    regPartner = () => {
        this.setState({
            isRegPartner: !this.state.isRegPartner
        });
    };
    onCloseRegPartner = () => {
        this.setState({
            isRegPartner: false
        });
    };
    render() {
        const { isShowInfo } = this.state;
        const { authInfo, categories, cart, cartActions, myNotice, setting: { listSetting = {} } } = this.props;
        const { isAuthenticated = false } = authInfo;
        const { userInfo: data = {} } = authInfo;

        return (
            <Fragment>
                <div className="visible-small">
                    <header className={style.siteHeader}>
                        <div
                            className={`closeModal ${classnames({
                                active: isShowInfo !== ''
                            })}`}
                            onClick={() => {
                                this.closeToggle();
                            }}
                        />
                        <div className="container">
                            <div className={style.header}>
                                <div className={style.menuWrapper}>
                                    <span
                                        className={style.iconMenu}
                                        onClick={() => {
                                            this.handleToggle('menu');
                                        }}
                                    >
                                        <i className="zmdi zmdi-menu" />
                                    </span>
                                </div>
                                <div className={style.siteLogo}>
                                    <Link href="/">
                                        <a>
                                            {getValueByKey(listSetting, 'logo') !== '' ? (
                                                <ImageLoad
                                                    // src={getValueByKey(listSetting, 'logo')}
                                                    src="/static/assets/images/logo/logo-kaizin-ngang.jpg"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </a>
                                    </Link>
                                </div>
                                {isAuthenticated ? (
                                    <div className={style.notifyWrapper}>
                                        {this.state.showNotice ? (
                                            <div className="nofiIcon active" onClick={this.props.closeNotice}>
                                                <i className="zmdi zmdi-notifications" />
                                                {myNotice.totalBaggy && myNotice.totalBaggy > 0 ? (
                                                    <span className="badge">{myNotice.totalBaggy}</span>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="nofiIcon" onClick={this.props.showNotices}>
                                                <i className="zmdi zmdi-notifications" />
                                                {myNotice.totalBaggy && myNotice.totalBaggy > 0 ? (
                                                    <span className="badge">{myNotice.totalBaggy}</span>
                                                ) : null}
                                            </div>
                                        )}

                                        <div
                                            className={classnames(
                                                ['dropdown-messages'],
                                                {
                                                    active: this.props.showNotice
                                                },
                                                {
                                                    paddingBottom: myNotice.count > 7
                                                }
                                            )}
                                        >
                                            {this.props.isLoader ? (
                                                <div className="rectangle-bounce">
                                                    <div className="rect1" />
                                                    <div className="rect2" />
                                                    <div className="rect3" />
                                                    <div className="rect4" />
                                                    <div className="rect5" />
                                                </div>
                                            ) : (
                                                <DropdownMessages
                                                    data={myNotice.rows}
                                                    showNotice={this.props.showNotice}
                                                    onChangeShow={this.props.onChangeShow}
                                                    readMe={this.props.readMe}
                                                    readAllNotice={this.props.readAllNotice}
                                                    onReset={this.props.onReset}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                                <div
                                    className={classnames([style.miniCart], {
                                        [style.active]: isAuthenticated
                                    })}
                                >
                                    <MiniCartComponent
                                        cart={cart}
                                        cartActions={cartActions}
                                        toCheckout={this.props.toCheckout}
                                    />
                                </div>
                            </div>

                            <SearchComponent categories={categories} />
                        </div>
                    </header>

                    <div
                        className={`${style.menuContent} ${classnames({
                            [style.menuContentActive]: isShowInfo === 'menu'
                        })}`}
                    >
                        {!isAuthenticated ? (
                            <div className={style.accountLink}>
                                <ul>
                                    <li className={style.signup}>
                                        <Link href="/dang-ky">
                                            <a>Đăng ký</a>
                                        </Link>
                                    </li>
                                    <li className={style.signin}>
                                        <Link href="/dang-nhap">
                                            <a>Đăng nhập</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className={style.headerAccount}>
                                <div className={style.authInfo}>
                                    <Link href="/tai-khoan/thong-tin" as="/thong-tin-ca-nhan">
                                        <a>
                                            <span
                                                className={style.theAvt}
                                                style={{
                                                    backgroundImage: _.result(authInfo, 'userInfo.avatar')
                                                        ? authInfo.userInfo.avatar !== ''
                                                            ? `url(${authInfo.userInfo.avatar})`
                                                            : `url(/static/assets/images/avatar.jpeg)`
                                                        : `url(/static/assets/images/avatar.jpeg)`
                                                }}
                                            />
                                        </a>
                                    </Link>

                                    <span className={style.name}>
                                        {_.result(authInfo, 'authInfo.userInfo.user.fullname')
                                            ? authInfo.userInfo.user.fullname
                                            : ''}{' '}
                                        <span onClick={this.props.onLogout}>Thoát</span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {!isAuthenticated ? null : (
                            <Link href="/kich-hoat-khoa-hoc">
                                <a className={style.btnActive}>Kích hoạt khóa học</a>
                            </Link>
                        )}

                        <div className={style.menuCategory}>
                            <ul className={style.menu}>
                                <li>
                                    <Link href="/khoa-hoc" as="/danh-muc">
                                        <a>Tất cả danh mục</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/khoa-hoc/combo" as="/combo-khoa-hoc">
                                        <a>Danh sách combo</a>
                                    </Link>
                                </li>
                                {categories.filter(item => item.parentId === null).map(item => this.renderTree(item))}
                            </ul>
                        </div>
                        <div className={style.userLink}>
                            <ul>
                                {!isAuthenticated ? (
                                    <Fragment>
                                        <li onClick={this.regPartner}>
                                            <span>Đăng kí làm giảng viên</span>
                                        </li>
                                        <li onClick={this.regPartner}>
                                            <span>Đăng kí làm công tác viên</span>
                                        </li>
                                        <li>
                                            <Link href="/affiliate">
                                                <a>Giới thiệu giảng viên</a>
                                            </Link>
                                        </li>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {data.rolePermissions.name === 'customer' ? (
                                            <Fragment>
                                                <li>
                                                    <Link href="/dang-ky-lam-giang-vien">
                                                        <a>Đăng kí làm giảng viên</a>
                                                    </Link>
                                                </li>
                                            </Fragment>
                                        ) : null}

                                        {data.rolePermissions.name === 'partner' ? (
                                            <li>
                                                <Link href="/lay-link-affiliate">
                                                    <a>Trang cộng tác viên</a>
                                                </Link>
                                            </li>
                                        ) : data.rolePermissions.name === 'customer' ? (
                                            <li>
                                                <Link href="/dang-ky/cong-tac-vien">
                                                    <a>Đăng kí làm công tác viên</a>
                                                </Link>
                                            </li>
                                        ) : null}

                                        {data.rolePermissions.name === 'customer' ? (
                                            <Fragment>
                                                <li>
                                                    <Link href="/affiliate">
                                                        <a>Giới thiệu giảng viên</a>
                                                    </Link>
                                                </li>
                                            </Fragment>
                                        ) : null}
                                    </Fragment>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className={classnames([style.popupWrapper], {
                        [style.active]: this.state.isRegPartner
                    })}
                >
                    <div className={style.overlay} onClick={this.onCloseRegPartner} />
                    <div className={style.popupContent}>
                        <section>
                            <h3>Vui lòng đăng nhập</h3>
                            <h5>Chương trình chỉ áp dụng cho các thành viên Kaixin.vn</h5>
                            <p>Nếu bạn chưa có tài khoản</p>
                            <div className={style.btnActions}>
                                <span onClick={this.onRegisterClick} className="btn">
                                    Đăng kí
                                </span>
                            </div>
                        </section>
                        <section className={style.last}>
                            Bạn đã có tài khoản?{' '}
                            <Link href="/dang-nhap">
                                <a>Đăng nhập</a>
                            </Link>
                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }
}

HeaderMobile.defaultProps = {
    setting: {}
};
HeaderMobile.propTypes = {
    authInfo: PropTypes.object,
    categories: PropTypes.array,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    onLogout: PropTypes.func,
    toCheckout: PropTypes.func,
    myNotice: PropTypes.object,
    userInfo: PropTypes.object,
    showNotice: PropTypes.bool,
    onChangeShow: PropTypes.func,
    readMe: PropTypes.func,
    readAllNotice: PropTypes.func,
    showNotices: PropTypes.func,
    onReset: PropTypes.func,
    closeNotice: PropTypes.func,
    isLoader: PropTypes.bool,
    setting: PropTypes.object
};
export default HeaderMobile;
