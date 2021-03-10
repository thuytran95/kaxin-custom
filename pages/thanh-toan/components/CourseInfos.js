import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Input, Button, Table } from 'reactstrap';
import { message, Popconfirm } from 'antd';
import PriceComponent from 'src/shared/components/common/Price';
//import { getSalePercent } from 'src/helpers/Common';
import classnames from 'classnames';

class CourseInfos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: '',
            isDisplayCoupon: true,
            isEditing: false,
            data: [],
            couponCode: []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps.courses);
        if (nextProps.courseDetail) {
            if (nextProps.courseDetail.id !== this.props.courseDetail.id) {
                this.updateDetail(nextProps.courseDetail);
            }
        }
    }
    updateDetail = courseDetail => {
        const { orderActions } = this.props;
        if (courseDetail && courseDetail.id) {
            const data = {
                items: [courseDetail.id]
            };
            orderActions
                .sendCoupon(data)
                .then(res => {
                    this.setState({
                        data: res.items
                    });
                })
                .catch(err => {
                    this.setState({
                        data: []
                    });
                });
        }
    };
    updateData = courses => {
        this.setState({
            isEditing: true,
            data: courses
        });
    };
    onChange = e => {
        const target = e.target;
        const name = target.name;
        const value =
            target.type === 'checkbox'
                ? target.checked
                : target.name === 'sltCourse' ? parseInt(target.value, 10) : target.value;
        this.setState({
            [name]: value
        });
    };

    onCancel = () => {
        this.setState({
            isEditing: false
        });
    };
    removeCourse = id => {
        const { cartActions } = this.props;
        this.setState(
            prevState => {
                if (prevState.data.length === 1) {
                    message.error('Không thể xóa');
                    return {};
                }
                if (prevState.data.length > 1) {
                    cartActions.removeFromCart(id);
                }
                return {
                    data: prevState.data.filter(item => item.id !== id)
                };
            },
            () => {
                const { data, couponCode } = this.state;

                const courseIDs = data.map(function(obj) {
                    return obj.courseId ? obj.courseId : obj.id;
                });
                this.props.onSendCoupon(courseIDs, couponCode);
            }
        );
    };
    onSendCoupon = courseIDs => {
        const { couponCode } = this.state;
        couponCode.push(_.trim(this.state.coupon));
        this.setState({
            couponCode
        });
        this.props.onSendCoupon(courseIDs, couponCode);
        this.setState({
            coupon: ''
        });
    };
    render() {
        const { order, showEdit, courses, outs, comboDetail } = this.props;
        const SquareLogo = '/static/assets/images/avatar.jpeg';
        const isEditing = showEdit && this.state.isEditing;
        const courseIDs = courses.map(function(obj) {
            return obj.courseId ? obj.courseId : obj.id;
        });
        const noneCoupon = _.uniq(outs);
        //console.log(courses);
        const elmItems = courses.map((item, index) => {
            let result = null;
            if (courses.length > 0) {
                result = (
                    <tr key={index}>
                        <Fragment>
                            <td className={style.thumbnail}>
                                <span
                                    style={{
                                        backgroundImage: `url(${
                                            !_.isEmpty(item.courseAvatar) ? item.courseAvatar : SquareLogo
                                        })`
                                    }}
                                />
                            </td>
                            <td className={style.name}>
                                <h4> {item.courseName ? item.courseName : item.name} </h4>
                                <p> {item.lecturerId ? _.get(item, 'lecturerId.fullname') : item.lecturer} </p>
                                <span>
                                    {item.promotionName && !_.isNull(item.promotionName) ? 'CTKM: ' : ''}
                                    <b> {item.promotionName} </b>
                                </span>
                            </td>
                            <td className={style.price}>
                                <div className="price">
                                    {comboDetail && !_.isEmpty(comboDetail) ? (
                                        comboDetail.discount > 0 ? (
                                            <Fragment>
                                                <span className="salePrice" style={{ whiteSpace: 'nowrap' }}>
                                                    <PriceComponent
                                                        value={parseInt(item.price, 0)}
                                                        salePercent={comboDetail.discount}
                                                    />{' '}
                                                    đ
                                                </span>
                                                <span className="regularPrice" style={{ whiteSpace: 'nowrap' }}>
                                                    <PriceComponent value={parseInt(item.price, 0)} /> đ
                                                </span>
                                            </Fragment>
                                        ) : (
                                            <span
                                                className="amount"
                                                style={{
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <PriceComponent
                                                    value={
                                                        item.price ? parseInt(item.price, 0) : parseInt(item.amount, 0)
                                                    }
                                                />{' '}
                                                đ
                                            </span>
                                        )
                                    ) : item.percent > 0 ? (
                                        <Fragment>
                                            <span className="salePrice" style={{ whiteSpace: 'nowrap' }}>
                                                <PriceComponent value={parseInt(item.amount, 0)} /> đ
                                            </span>
                                            <span className="regularPrice" style={{ whiteSpace: 'nowrap' }}>
                                                <PriceComponent value={parseInt(item.amountRoot, 0)} /> đ
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <span
                                            className="amount"
                                            style={{
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            <PriceComponent value={parseInt(item.amount, 0)} /> đ
                                        </span>
                                    )}
                                </div>
                                {comboDetail && !_.isEmpty(comboDetail)
                                    ? null
                                    : showEdit &&
                                      courses.length > 1 && (
                                          <Popconfirm
                                              title="Bạn muốn xóa khóa học này?"
                                              onConfirm={() => this.removeCourse(item.id)}
                                              okText="Đồng ý"
                                              cancelText="Hủy"
                                          >
                                              <span className={style.btnDel}>Xóa</span>
                                          </Popconfirm>
                                      )}
                            </td>
                        </Fragment>
                    </tr>
                );
            }
            return result;
        });
        //console.log(order.orderDetails);
        return (
            <Fragment>
                <div className={style.innerBox}>
                    <div
                        className={`${style.cartInfo} ${classnames({
                            activeCartInfo: isEditing
                        })}`}
                    >
                        <h3>
                            Khóa học
                            {/* {`Khóa học ${order.orderDetails.code || ''}`} */}
                            {/*{!showEdit ? null : !isEditing ? (
                                <Button
                                    className={`btn btn-primary ${style.btnEdit}`}
                                    onClick={() => this.onStartEditing()}
                                >
                                    Chỉnh sửa
                                </Button>
                            ) : (
                                <Fragment>
                                    <Button
                                        className={`btn btn-primary ${style.btnEdit}`}
                                        onClick={() => this.onStopEditing(true)}
                                    >
                                        Lưu lại
                                    </Button>
                                    <Button className={`btn ${style.btnClose}`} onClick={() => this.onCancel()}>
                                        Hủy
                                    </Button>
                                </Fragment>
                            )}*/}
                        </h3>
                        {comboDetail && comboDetail.name ? (
                            <h4>
                                Gói combo: <b>{comboDetail.name}</b>
                            </h4>
                        ) : null}
                        <Table>
                            <tbody>
                                {elmItems}
                                <tr className={style.totalCart}>
                                    <td className={style.label}> Tổng học phí </td>
                                    <td className={style.price} colSpan={2}>
                                        {comboDetail && comboDetail.price ? (
                                            <PriceComponent value={parseInt(comboDetail.price, 0)} />
                                        ) : (
                                            <PriceComponent
                                                value={courses.reduce((sum, item) => sum + item.amount, 0)}
                                            />
                                        )}
                                        đ
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                {comboDetail && !_.isEmpty(comboDetail)
                    ? null
                    : showEdit && (
                          <Fragment>
                              <div className={style.innerBox}>
                                  <h3> Mã ưu đãi </h3>
                                  <div className={style.formCoupon}>
                                      <Form>
                                          <Input name="coupon" onChange={this.onChange} value={this.state.coupon} />
                                          <Button
                                              type="submit"
                                              onClick={e => {
                                                  e.preventDefault();
                                                  this.onSendCoupon(courseIDs);
                                              }}
                                          >
                                              Áp dụng
                                          </Button>
                                      </Form>
                                  </div>
                              </div>
                              {noneCoupon.length > 0 ? (
                                  <div className={`${style.innerBox} ${style.outBox}`}>
                                      <h3> MÃ ƯU ĐÃI KHÔNG ĐƯỢC Áp DỤNG </h3>
                                      <div className={style.formCoupon}>
                                          <ul>
                                              {noneCoupon.map(item => {
                                                  if (_.isEmpty(item) || _.isNull(item)) return null;
                                                  return <li key={item}> {item} </li>;
                                              })}
                                          </ul>
                                      </div>
                                  </div>
                              ) : (
                                  ''
                              )}
                          </Fragment>
                      )}
            </Fragment>
        );
    }
}

CourseInfos.propTypes = {
    showEdit: PropTypes.bool,
    authInfo: PropTypes.object,
    history: PropTypes.object,
    authActions: PropTypes.object,
    cartActions: PropTypes.object,
    courseDetail: PropTypes.object,
    comboDetail: PropTypes.object,
    courses: PropTypes.array,
    onChange: PropTypes.func,
    order: PropTypes.object,
    orderActions: PropTypes.object,
    onSendCoupon: PropTypes.func,
    outs: PropTypes.array
};

CourseInfos.defaultProps = {
    showEdit: false
};

export default CourseInfos;
