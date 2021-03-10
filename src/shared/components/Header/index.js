/* eslint react/no-did-mount-set-state: 0*/
import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { redirect, getValueByKey } from 'src/helpers/Common';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Request from 'src/helpers/Request';
import { actions } from 'src/redux-utils';
import classnames from 'classnames';
// import MenuComponent from './components/Menu';
import SearchComponent from '../Search/index';
import MiniCartComponent from '../MiniCart/index';
import ImageLoad from 'src/components/image-load';
import HeaderMobile from './components/HeaderMobile';
import DropdownMessages from './DropdownMessages';
import onHasNotify from 'src/helpers/sockets/listener/onHasNotify';
import { myCourseDetailLink, noticeLink, courseDetailLink, approvedGV, noticeDetailLink } from 'src/helpers/RouteURL';
import { appIdOS } from 'src/constants/config';

Router.onRouteChangeStart = url => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const commonLinks = [
    { as: '/thong-tin-ca-nhan', name: 'Thông tin cá nhân', href: '/tai-khoan/thong-tin' },
    { as: '/khoa-hoc-cua-toi', name: 'Khóa học của tôi', href: '/tai-khoan/khoa-hoc' },
    {
        href: '/tai-khoan/lich-su',
        as: '/tai-khoan/lich-su-dang-ky-khoa-hoc',
        matchFunc: function(href) {
            return href.match(/^\/tai-khoan\/lich-su-dang-ky-khoa-hoc\/chi-tiet-don-hang-\d{1,}$/) !== null;
        },
        name: 'Lịch sử đăng ký khóa học'
    },
    { href: '/tai-khoan/qua-tang', as: '/tai-khoan/qua-tang', name: 'Quà tặng'},
    { href: '/tai-khoan/dang-ky-gv', as: '/dang-ky-lam-giang-vien', name: 'Đăng ký làm giảng viên', for: ['customer'] },
    { href: '/dang-ky/ctv', as: '/dang-ky/cong-tac-vien', name: 'Đăng ký làm công tác viên', for: ['customer'] }
];

const teacherLinks = [
    { href: '/tai-khoan/giang-vien', name: 'Thông tin giảng viên' },
    { href: '/khoa-hoc-toi-giang-day', name: 'Khóa học của tôi giảng dạy' },
    { href: '/tai-khoan/quan-ly-hoa-hong', name: 'Quản lý hoa hồng' }
];

// const partnerLinks = [
//     { href: '/lay-link-affiliate', name: 'Lấy link affiliate' },
//     { href: '/bao-cao-thu-nhap', name: 'Báo cáo thu nhập' }
// ];
class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: '',
            kc: {},
            isLoader: true,
            showNotice: false,
            sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }]),
            pagination: {
                current: 1,
                perPage: 20
            },
            allSetting: '',
            isRegPartner: false
        };
        onHasNotify(res => {
            //console.log(res.dataPush);
            const OneSignal = window.OneSignal || [];

            props.commonActions.incrementBaggy();
            if (res.dataPush.type === 'manual') {
                props.commonActions.countManual();
            }
            if (res.dataPush.type === 'updateCourse') {
                const params = {
                    id: res.dataPush.objectId,
                    name: res.dataPush.objectName
                };
                const url = myCourseDetailLink({ ...params });
                OneSignal.push(function() {
                    OneSignal.setDefaultNotificationUrl(url);
                });
            } else if (res.dataPush.type === 'approvedCourse' || res.dataPush.type === 'paidCourseToGV') {
                const params = {
                    id: res.dataPush.objectId,
                    name: res.dataPush.objectName
                };
                const url = courseDetailLink({ ...params });
                OneSignal.push(function() {
                    OneSignal.setDefaultNotificationUrl(url);
                });
            } else if (res.dataPush.type === 'approvedGV') {
                OneSignal.push(function() {
                    OneSignal.setDefaultNotificationUrl(approvedGV());
                });
            } else {
                OneSignal.push(function() {
                    OneSignal.setDefaultNotificationUrl(noticeLink());
                });
            }
        });
    }

    async componentDidMount() {
        const OneSignal = window.OneSignal || [];
        const kc = require('src/helpers/Keycloak');
        await kc.initAsync();
        this.setState({ kc });
        document.addEventListener('click', this.closeNotice, true);
        const { categoryActions, authInfo: { isAuthenticated = false }, commonActions, settingActions } = this.props;
        //Allow OSignal
        OneSignal.push(function() {
            OneSignal.init({
                appId: appIdOS
            });
            OneSignal.getUserId().then(function(userId) {
                if (userId && !_.isNull(userId)) {
                    const params = {
                        deviceId: userId
                    };
                    commonActions.deviceToken({
                        ...params
                    });
                }
            });
        });
        //Get Category
        const params = {
            filter: JSON.stringify([
                { operator: 'eq', value: 'website', property: 'type' },
                { operator: 'eq', value: '1', property: 'active' }
            ])
        };
        categoryActions.listCategoryMenu(params);

        //Get My Notice
        if (isAuthenticated) {
            this.getNotice();
        }
        //Get My Setting
        const filter = JSON.stringify([
            { operator: 'eq', value: 'website', property: 'platform' },
            { operator: 'eq', value: 1, property: 'active' }
        ]);
        settingActions.getSettings({ filter, limit: 25 }).then(allSet => {
            this.setState({
                allSetting: allSet.data.data.rows,
                isFetching: false
            });
        });
        try {
            await Promise.all([this.genDataCart()]);
        } catch (err) {
            //
        }
    }

    onThisLogin = e => {
        redirect(`/dang-nhap?redirect=${window.location.href}`);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.closeNotice, true);
    }
    generateQuery = () => {
        const filter = JSON.stringify([{ operator: 'eq', value: 'website', property: 'platform' }]);
        const { pagination: { current, perPage }, sort } = this.state;
        return {
            start: current > 1 ? (current - 1) * perPage : 0,
            limit: perPage,
            sort,
            filter
        };
    };

    getNotice = (params = {}) => {
        const query = this.generateQuery();
        const { commonActions } = this.props;
        this.setState({ isLoader: true });
        commonActions.getMyNotice({ ...query, ...params }).finally(() => {
            this.setState({
                isLoader: false
            });
        });
    };
    showNotice = () => {
        const { commonActions } = this.props;
        commonActions.resetBaggy().finally(() => {
            this.setState(
                {
                    showNotice: true
                },
                () => {
                    this.getNotice();
                }
            );
        });
    };
    closeNotice = () => {
        this.setState({
            showNotice: false
        });
    };
    onChangeShow = showNotice => {
        this.setState({
            showNotice
        });
    };
    readMe = data => {
        const { commonActions } = this.props;
        const params = {
            isRead: true
        };
        commonActions
            .isRead(data.id, {
                ...params
            })
            .finally(() => {
                this.setState({ isFetching: false });
                if (data.type === 'updateCourse' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(myCourseDetailLink({ ...params }));
                } else if (data.type === 'paidCourseToGV' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(courseDetailLink({ ...params }));
                } else if (data.type === 'approvedCourse' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(courseDetailLink({ ...params }));
                } else {
                    const params = {
                        id: data.dataId
                    };
                    redirect(noticeDetailLink({ ...params }));
                }
            });
    };
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };

    onRegisterClick = e => {
        const options = {};
        this.state.kc.register(options);
    };

    onLogout = async (e) => {
        e.preventDefault();
        const kc = require('src/helpers/Keycloak');
        Request.clearToken();
        Request.clearRefreshToken();
        window.localStorage.removeItem('cart');
        await kc.logoutAsync({
            redirectUri: window.location.origin
        });
    };
    onMiniCart = () => {};
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
    readAllNotice = () => {
        const { commonActions } = this.props;
        commonActions.resetRead().finally(() => {
            this.setState(
                {
                    showNotice: true
                },
                () => {
                    this.getNotice();
                }
            );
        });
    };

    genDataCart = () => {
        const { cartActions } = this.props;
        const ids = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (_.isEmpty(ids) || _.isNull(ids)) {
            return;
        } else {
            cartActions.fetchCourses().finally(() => this.setState({ isFetching: false }));
        }
    };
    toCheckout = () => {
        const { cartActions } = this.props;
        const ids = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (!_.isEmpty(ids)) {
            cartActions.fetchCourses().finally(() => this.setState({ isFetching: false }));
        }
        redirect('/thanh-toan');
    };
    onReset = () => {
        this.props.commonActions.resetManual();
        redirect('/tin-he-thong');
    };
    render() {
        const {
            authInfo,
            categoryMenuData,
            cart,
            cartActions,
            common: { myNotice = {}, totalManual },
            setting: { listSetting = {} }
        } = this.props;
        const { isAuthenticated = false } = authInfo;
        const { userInfo: data = {} } = authInfo;
        const { rows: categories = [] } = categoryMenuData;
        return (
            <Fragment>
                <div className="visible-large">
                    <header id={style.siteHeader}>
                        <div className={style.topbar}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 col-lg-8 ${style.colTopbar}`}>
                                        <div className={style.headerLink}>
                                            <ul>
                                                {!isAuthenticated ? (
                                                    <Fragment>
                                                        <li onClick={this.regPartner}>Đăng kí làm giảng viên</li>
                                                        <li onClick={this.regPartner}>Đăng kí làm công tác viên</li>
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
                                    <div className={`col-12 col-lg-4 ${style.colTopbar}`}>
                                        {!isAuthenticated ? (
                                            <div className={style.headerLink}>
                                                <ul>
                                                    {/* <li className={style.signup}>
                                                        <a onClick={this.onRegisterClick}>Đăng kí</a>
                                                    </li> */}
                                                    <li className={style.signin}>
                                                        <Link href={`/dang-ky`}>
                                                            <a>Đăng kí</a>
                                                        </Link>
                                                    </li>
                                                    <li className={style.signin}>
                                                        <Link href={`/dang-nhap`}>
                                                            <a>Đăng nhập</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className={style.headerAccount}>
                                                <div className={style.authInfo}>
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
                                                    <span className={style.name}>
                                                        {_.result(authInfo, 'userInfo.fullname') &&
                                                        _.get(authInfo, 'userInfo.fullname')
                                                            ? authInfo.userInfo.fullname
                                                            : _.result(authInfo, 'userInfo.firstName')
                                                                ? authInfo.userInfo.firstName
                                                                : '...'}
                                                    </span>
                                                    <i
                                                        className={`${
                                                            this.state.isShowInfo === '1'
                                                                ? 'zmdi zmdi-caret-up'
                                                                : 'zmdi zmdi-caret-down'
                                                        }`}
                                                    />
                                                </div>
                                                <ul>
                                                    {commonLinks.map(
                                                        link =>
                                                            link.for &&
                                                            !link.for.includes(data.rolePermissions.name) ? null : (
                                                                <li key={link.href}>
                                                                    <Link href={link.href} as={link.as}>
                                                                        <a>{link.name}</a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                    )}
                                                    {data.rolePermissions.name === 'teacher'
                                                        ? teacherLinks.map(link => (
                                                              <li key={link.href}>
                                                                  <Link href={link.href} as={link.as}>
                                                                      <a>{link.name}</a>
                                                                  </Link>
                                                              </li>
                                                          ))
                                                        : null}
                                                    {/* {data.rolePermissions.name === 'partner'
                                                        ? partnerLinks.map(link => (
                                                              <li key={link.href}>
                                                                  <Link href={link.href}>
                                                                      <a>{link.name}</a>
                                                                  </Link>
                                                              </li>
                                                          ))
                                                        : null} */}
                                                    <li onClick={this.onLogout}>
                                                        <span>Thoát</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                        {isAuthenticated ? (
                                            <div className={style.notifyWrapper}>
                                                {this.state.showNotice ? (
                                                    <div className="nofiIcon active" onClick={this.closeNotice}>
                                                        <i className="zmdi zmdi-notifications" />
                                                        {myNotice.totalBaggy && myNotice.totalBaggy > 0 ? (
                                                            <span className="badge">{myNotice.totalBaggy}</span>
                                                        ) : null}
                                                    </div>
                                                ) : (
                                                    <div className="nofiIcon" onClick={this.showNotice}>
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
                                                            active: this.state.showNotice
                                                        },
                                                        {
                                                            paddingBottom: myNotice.count > 7
                                                        }
                                                    )}
                                                >
                                                    {this.state.isLoader ? (
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
                                                            showNotice={this.state.showNotice}
                                                            onChangeShow={this.onChangeShow}
                                                            readMe={this.readMe}
                                                            readAllNotice={this.readAllNotice}
                                                            totalManual={totalManual}
                                                            onReset={this.onReset}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.header}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 col-lg-2 ${style.logoWrapper}`}>
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
                                    </div>
                                    <div className={`col-12 col-lg-9 ${style.searchWrapper}`}>
                                        <div className={style.searchKey}>
                                            <SearchComponent categories={categories} />
                                        </div>
                                        {!isAuthenticated ? (
                                            <Link href="/dang-nhap">
                                                <a className={`btn btn-primary ${style.btnActive}`}>
                                                    <i className="zmdi zmdi-lock-open" />
                                                    Kích hoạt khóa học
                                                </a>
                                            </Link>
                                        ) : (
                                            <Link href="/kich-hoat-khoa-hoc">
                                                <a className={`btn btn-primary ${style.btnActive}`}>
                                                    <i className="zmdi zmdi-lock-open" />
                                                    Kích hoạt khóa học
                                                </a>
                                            </Link>
                                        )}
                                    </div>

                                    <div className={`col-12 col-lg-1 ${style.cartWrapper}`}>
                                        <div onClick={this.onMiniCart} className={style.miniCart}>
                                            <MiniCartComponent
                                                cart={cart}
                                                cartActions={cartActions}
                                                toCheckout={this.toCheckout}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <HeaderMobile
                    categories={categories}
                    authInfo={authInfo}
                    cart={cart}
                    cartActions={cartActions}
                    onLogout={this.onLogout}
                    toCheckout={this.toCheckout}
                    onReset={this.onReset}
                    myNotice={myNotice}
                    showNotice={this.state.showNotice}
                    onChangeShow={this.onChangeShow}
                    readMe={this.readMe}
                    readAllNotice={this.readAllNotice}
                    closeNotice={this.closeNotice}
                    showNotices={this.showNotice}
                    setting={this.props.setting}
                />

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
                                <Link href={`/dang-ky`}>
                                    <a className="btn">Đăng kí</a>
                                </Link>
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

HeaderComponent.defaultProps = {
    authInfo: {},
    authActions: {},
    cartActions: {},
    commonActions: {},
    settingActions: {}
};

HeaderComponent.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cart: PropTypes.object.isRequired,
    categoryMenuData: PropTypes.object.isRequired,
    categoryActions: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
    settingActions: PropTypes.object.isRequired,
    setting: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, cart, category: { categoryMenuData }, common, setting } = state;
    return { authInfo: auth, cart, categoryMenuData, common, setting };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch),
        settingActions: bindActionCreators(actions.settingActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
