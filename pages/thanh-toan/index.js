import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Helmet from 'react-helmet';
import md5 from 'md5';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
//import Link from 'next/link';
//BASE_LINK_NL,
import { MERCHANT_SITE_CODE, BASE_EMAIL_NL, SECURE_PASS_NL, BASE_URL_NL } from 'src/constants/config';
import { actions } from 'src/redux-utils';
import { Steps, Button, notification } from 'antd';
//import { Form, FormGroup, Label, Input } from 'reactstrap'
import Info from './components/Info';
import Method from './components/Method';
import Confirm from './components/Confirm';
import CourseInfos from './components/CourseInfos';
import { redirect } from 'src/helpers/Common';
import Swal from 'sweetalert2';
// import _ from "lodash";
//import { redirect } from 'src/helpers/Common';
const Step = Steps.Step;

class CheckOutPage extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);
        try {
            if (query.type === 'combo') {
                const { data } = await courseActions.getCombos(query.id);
                return {
                    comboDetail: data.data,
                    query,
                };
            } else if (query && query.id) {
                const { data } = await courseActions.getCourse(query.id);
                return {
                    courseDetail: data,
                    query,
                };
            } else {
                return {
                    courseDetail: {},
                    query,
                };
            }
        } catch (err) {
            return {
                courseDetail: {},
                comboDetail: {},
                statusCode: 404,
                query,
            };
        }
    }

    constructor(props) {
        super(props);
        const { userInfo = {} } = props.auth;
        const { firstName = '', email = '', phone = '', address = '', city = -1, district = -1 } = userInfo;
        this.state = {
            isActive: false,
            current: 0,
            user: {
                fullname: firstName,
                email,
                phone,
                address,
                city,
                district,
                note: '',
            },
            userValidation: {},
            method: 'cod',
            courses: [],
            coupons: [],
            outs: [],
            cities: [],
        };
    }
    componentWillMount() {
        const { authActions, courseDetail, comboDetail } = this.props;
        authActions.getListCity().then((res) => {
            this.setState({ cities: _.get(res, 'data.data', []) });
        });
        //console.log(courseDetail, comboDetail);
        if (courseDetail && courseDetail.id) {
            const { orderActions } = this.props;
            const data = {
                items: [courseDetail.id],
            };
            orderActions
                .sendCoupon(data)
                .then((res) => {
                    this.setState({ courses: res.items });
                })
                .catch((err) => {
                    this.setState({ courses: [] });
                });
        }
        if (comboDetail && comboDetail.id) {
            this.setState({ courses: comboDetail.listCourses ? comboDetail.listCourses : [] });
        }
    }
    componentDidMount() {
        //console.log(window.location.origin);
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        if (nextProps.courseDetail && !nextProps.courseDetail.id) {
            if (this.props.cart.courses !== nextProps.cart.courses) {
                this.setState({ courses: nextProps.cart.courses });
            }
        }
    }

    //updateDetailCourse = courseDetail => {};
    gotoPage = (current, isActive, callback = () => {}) => {
        this.setState({ current, isActive }, () => {
            window.scroll(0, 0);
            callback();
        });
    };

    next = () => {
        const {
            order,
            orderActions,
            courseDetail,
            comboDetail,
            query: { refs = '' },
        } = this.props;
        const { user, courses, coupons } = this.state;

        const current = this.state.current + 1;

        //const { orderDetails = {} } = order;
        //console.log(orderDetails.amount);
        if (current === 1) {
            const validation = this.validate();
            if (validation !== true) {
                document.querySelector(`[name=${_.findKey(validation, (value) => value)}]`).focus(); // Focus to a validate-failed input
                this.setState({ userValidation: validation });
                return;
            }
            if (user.city === -1 || user.city === '-1' || user.city === '' || _.isEmpty(user.city)) {
                notification['error']({
                    message: 'Bạn chưa chọn Tỉnh/Thành phố',
                });
                return;
            } else {
                if (
                    user.district === -1 ||
                    user.district === '-1' ||
                    user.district === '' ||
                    _.isEmpty(user.district)
                ) {
                    notification['error']({
                        message: 'Bạn chưa chọn Quận huyện',
                    });
                    return;
                }
            }
            const partnerOneKey = {};

            if (refs && courseDetail && courseDetail.id) {
                partnerOneKey[courseDetail.id] = refs;
            }
            //const courseIds = courseDetail && courseDetail.id ? [courseDetail.id] : courses.map(item => item.id);
            const courseIds = courseDetail && courseDetail.id ? [courseDetail.id] : courses.map((item) => item.id);
            const partnerkey = refs
                ? partnerOneKey
                : localStorage.getItem('partnerkey')
                ? JSON.parse(localStorage.getItem('partnerkey'))
                : {};
            const { orderDetails = {} } = order;
            const params = {
                ...user,
            };
            if (comboDetail && comboDetail.id) {
                Object.assign(params, {
                    comboId: comboDetail.id,
                });
            } else {
                Object.assign(params, {
                    items: courseIds,
                });
            }
            if (!_.isEmpty(coupons)) {
                Object.assign(params, {
                    coupons,
                });
            }
            if (partnerkey && !_.isEmpty(partnerkey)) {
                Object.assign(params, {
                    partnerkey,
                });
            }

            const promise = orderDetails.id
                ? orderActions.updateOrder(orderDetails.id, params)
                : orderActions.createOrder(params);
            promise
                .then((res) => {
                    // console.log(res);
                    console.log(current);
                    this.gotoPage(current, false);
                })
                .catch((err) => {
                    notification['error']({
                        message: 'Lưu thông tin lỗi!',
                        description: 'Xảy ra lỗi ở máy chủ. Xin vui lòng thử lại.',
                    });
                });
        } else {
            console.log(current);
            this.gotoPage(current, false);
        }
    };
    prev = () => {
        const current = this.state.current - 1;

        this.gotoPage(current, false);
    };

    done = () => {
        const { method, cities } = this.state;
        const { order, orderActions } = this.props;
        const { orderDetails = {} } = order;

        const city = !_.isEmpty(_.get(orderDetails, 'city', '')) ? cities[_.get(orderDetails, 'city', '')].name : '';
        const dist = _.values(_.get(cities, `[${_.get(orderDetails, 'city', '')}].districts`, {}));
        const district = !_.isEmpty(_.get(orderDetails, 'district', ''))
            ? dist[_.get(orderDetails, 'district', '')]
            : '';
        const address = _.get(orderDetails, 'address', '') + ', ' + district + ', ' + city;

        const sandbox = {
            merchant_site_code: MERCHANT_SITE_CODE,
            return_url: `${window.location.origin}/thanh-toan/nganluong?success=true`,
            receiver: BASE_EMAIL_NL,
            transaction_info: '',
            order_code: _.get(orderDetails, 'code', 'MCBook'),
            price: _.get(orderDetails, 'amount', '0'),
            currency: 'vnd',
            quantity: 1,
            tax: 0,
            discount: 0,
            fee_cal: 0,
            fee_shipping: 0,
            order_description: _.get(orderDetails, 'note', ''),
            buyer_info:
                _.get(orderDetails, 'fullname', '') +
                '*|*' +
                _.get(orderDetails, 'email', '') +
                '*|*' +
                _.get(orderDetails, 'phone', '') +
                '*|*' +
                address,
            affiliate_code: '',
            secure_pass: SECURE_PASS_NL,
            cancel_url: `${window.location.origin}/thanh-toan/nganluong?success=false`,
        };
        const secure_code = md5(
            sandbox.merchant_site_code +
                ' ' +
                sandbox.return_url +
                ' ' +
                sandbox.receiver +
                ' ' +
                sandbox.transaction_info +
                ' ' +
                sandbox.order_code +
                ' ' +
                sandbox.price +
                ' ' +
                sandbox.currency +
                ' ' +
                sandbox.quantity +
                ' ' +
                sandbox.tax +
                ' ' +
                sandbox.discount +
                ' ' +
                sandbox.fee_cal +
                ' ' +
                sandbox.fee_shipping +
                ' ' +
                sandbox.order_description +
                ' ' +
                sandbox.buyer_info +
                ' ' +
                sandbox.affiliate_code +
                ' ' +
                sandbox.secure_pass
        );
        orderActions
            .updateOrder(orderDetails.id, { method })
            .then(() => {
                if (method === 'nl') {
                    window.location.href = `${BASE_URL_NL}?merchant_site_code=${sandbox.merchant_site_code}&return_url=${sandbox.return_url}&receiver=${sandbox.receiver}&transaction_info=${sandbox.transaction_info}&order_code=${sandbox.order_code}&price=${sandbox.price}&currency=${sandbox.currency}&quantity=${sandbox.quantity}&tax=${sandbox.tax}&discount=${sandbox.discount}&fee_cal=${sandbox.fee_cal}&fee_shipping=${sandbox.fee_shipping}&order_description=${sandbox.order_description}&buyer_info=${sandbox.buyer_info}&affiliate_code=${sandbox.affiliate_code}&secure_code=${secure_code}&cancel_url=${sandbox.cancel_url}`;
                } else {
                    this.props.cartActions.clearCart();
                    this.props.orderActions.clearOrder();
                    Swal({
                        title: 'Mua thành công',
                        text: 'Chúc mừng bạn vừa mua khóa học thành công! Bạn sẽ nhận được mã kich hoạt khi thanh toán',
                        type: 'success',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục',
                    }).then((result) => {
                        if (result.value) {
                            redirect('/');
                        }
                    });
                }
            })
            .catch((err) =>
                Swal({
                    title: 'Thanh toán lỗi',
                    text: 'Vui lòng thử lại sau vài phút.',
                    type: 'error',
                    imageWidth: 50,
                    imageHeight: 50,
                    confirmButtonText: 'Hủy',
                })
            );
    };

    validateField = (field, value) => {
        switch (field) {
            case 'fullname':
                return value ? null : 'Họ và tên trống';
            case 'email':
                return value && value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g) ? null : 'Email sai định dạng';
            case 'phone':
                return value ? (value.match(/^\+?[0-9]{10,12}$/g) ? null : 'SĐT sai định dạng') : 'SĐT trống';
            case 'city':
                return value >= 0 || value !== '-1' || value !== '' || !_.isEmpty(value)
                    ? null
                    : 'Chưa chọn Tỉnh/Thành phố';
            case 'district':
                return value >= 0 || value !== '-1' || value !== '' || !_.isEmpty(value)
                    ? null
                    : 'Chưa chọn Quận/Huyện';
            case 'address':
                return value ? null : 'Địa chỉ trống';
            default:
                return null;
        }
    };

    validate = () => {
        const { user = {} } = this.state;

        let res = true;

        const validateObject = ['fullname', 'email', 'phone', 'city', 'district', 'address'].reduce((result, key) => {
            result[key] = this.validateField(key, user[key]);
            if (result[key] !== null) res = false;
            return result;
        }, {});

        return res || validateObject;
    };
    onSendCoupon = (courseIDs, couponCode) => {
        const { orderActions } = this.props;

        const data = {
            items: courseIDs,
        };
        if (!_.isEmpty(couponCode)) {
            Object.assign(data, {
                coupons: couponCode,
            });
        }
        orderActions
            .sendCoupon(data)
            .then((res) => {
                this.setState({ courses: res.items, coupons: couponCode, outs: res.outs });
            })
            .catch((err) => {
                this.setState({ courses: [] });
            });
    };
    updateCourses = (courseIDs) => {
        const { orderActions } = this.props;

        const data = {
            items: courseIDs,
        };
        orderActions
            .sendCoupon(data)
            .then((res) => {
                this.setState({ courses: res.items });
            })
            .catch((err) => {
                this.setState({ courses: [] });
            });
    };

    render() {
        const { current, user, method, userValidation, courses, outs, cities } = this.state;
        const { auth, order, courseDetail, comboDetail, orderActions, cartActions } = this.props;
        const steps = [
            {
                title: 'Thông tin thanh toán',
                content: (
                    <Info
                        user={user}
                        auth={auth}
                        cities={cities}
                        onChange={(field, value) =>
                            this.setState((prevState) => ({
                                user: { ...prevState.user, [field]: value },
                                userValidation: {
                                    ...prevState.userValidation,
                                    [field]: this.validateField(field, value),
                                },
                            }))
                        }
                        validationForm={userValidation}
                    />
                ),
            },
            {
                title: 'Phương thức thanh toán',
                content: <Method method={method} onChange={(value) => this.setState({ method: value })} />,
            },
            {
                title: 'Xác nhận thanh toán',
                content: <Confirm user={user} method={method} cities={cities} />,
            },
        ];
        return (
            <Fragment>
                <Helmet title={`Thanh toán`} meta={[{ property: 'og:title', content: 'Thanh toán' }]} />
                <div className={style.checkoutWrapper}>
                    <div className="container">
                        <Steps current={current}>
                            {steps.map((item) => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">
                            <h2>Đăng ký khóa học</h2>

                            <div className={`${style.stepWrapper}`}>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <CourseInfos
                                            showEdit={current === 0}
                                            courseDetail={courseDetail}
                                            comboDetail={comboDetail}
                                            cartActions={cartActions}
                                            order={order}
                                            courses={courses}
                                            outs={outs}
                                            onChange={this.updateCourses}
                                            orderActions={orderActions}
                                            onSendCoupon={this.onSendCoupon}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        {steps[this.state.current].content}
                                        <div className="steps-action">
                                            {this.state.current < steps.length - 1 && (
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        this.setState({ isActive: true });
                                                        this.next();                                                       
                                                    }}
                                                    // disabled={courses.length === 0}
                                                    disabled={this.state.isActive}
                                                >
                                                    Xác nhận
                                                </Button>
                                            )}
                                            {this.state.current === steps.length - 1 && (
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        this.setState({ isActive: true });
                                                        this.done();
                                                    }}
                                                    disabled={this.state.isActive}
                                                >
                                                    Đặt hàng
                                                </Button>
                                            )}
                                            {this.state.current > 0 && (
                                                <Button
                                                    style={{ marginRight: 8, float: 'left' }}
                                                    onClick={() => this.prev()}
                                                >
                                                    Quay lại
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

CheckOutPage.propTypes = {
    history: PropTypes.object,
    cart: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    orderActions: PropTypes.object.isRequired,
    courseDetail: PropTypes.object,
    comboDetail: PropTypes.object,
    auth: PropTypes.object,
    url: PropTypes.object,
    query: PropTypes.object,
    //cities: PropTypes.array
};

const mapStateToProps = (state) => {
    const { auth, cart, order, course, history } = state;
    return {
        auth,
        cart,
        order,
        course,
        history,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        orderActions: bindActionCreators(actions.orderActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
