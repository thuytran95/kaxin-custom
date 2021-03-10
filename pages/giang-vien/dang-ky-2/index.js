import style from './styles.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, notification } from 'antd';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import Link from 'next/link';
//import Router from 'next/router';
import { actions } from 'src/redux-utils';
import ErrMessage from 'src/components/errors/ErrMessage';
import { redirect } from 'src/helpers/Common';
//import { Cube as Overlay } from 'src/shared/components/loading';
import classnames from 'classnames';
import _ from 'lodash';

class TeacherSignUpPage extends Component {
    static async getInitialProps() {
        return { layout: 'empty' };
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            auth: {},
            validationForm: {},
            errorMessage: ''
        };
    }

    handleChangeInput = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            auth: { ...this.state.auth, [name]: value },
            validationForm: { ...this.state.validationForm, [name]: this.validateField(name, value) },
            errorMessage: ''
        });
    };

    validateField = (field, value) => {
        switch (field) {
            case 'fullname':
                return value ? null : 'Họ và tên trống';
            case 'email':
                return value && value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g) ? null : 'Email sai định dạng';
            case 'phone':
                return value ? (value.match(/^\+?[0-9]{10,12}$/g) ? null : 'SĐT sai định dạng') : null;
            case 'category':
                return value ? null : 'Bạn chưa chọn chủ đề';
            case 'city':
                return value ? null : 'Bạn chưa chọn khu vực';
            case 'experience':
                return value ? null : 'Bạn chưa điền kinh nghiệm bản thân';
            case 'agree':
                return value ? null : 'Chưa đồng ý giới thiệu';
            default:
                return null;
        }
    };

    validate = () => {
        const { auth = {} } = this.state;

        let res = true;

        const validateObject = ['fullname', 'email', 'phone', 'category', 'city', 'experience', 'agree'].reduce(
            (result, key) => {
                result[key] = this.validateField(key, auth[key]);
                if (result[key] !== null) res = false;
                return result;
            },
            {}
        );

        return res || validateObject;
    };

    handleSubmit = e => {
        e.preventDefault();
        const { registerActions } = this.props;
        const { auth } = this.state;
        const validation = this.validate();
        if (validation !== true) {
            this.setState({ validationForm: validation, errorMessage: 'Thông tin chưa hợp lệ.' });
            return;
        }

        this.setState({ isFetching: true });
        registerActions
            .register({ ...auth })
            .then(res => {
                Modal.success({
                    title: 'Đăng ký thành công',
                    content:
                        'Chúc mừng bạn đã đăng ký thành công! Vui lòng check mail để nhận link kích hoạt tài khoản.'
                });
                redirect('/');
            })
            .catch(err => {
                if (_.result(err, 'data.message.default') === 'User exists with same username') {
                    this.setState({
                        isFetching: false,
                        errorMessage: 'Email đã được đăng ký.',
                        validationForm: { email: 'Email đã được đăng ký' }
                    });
                    return;
                }
                this.setState(
                    {
                        isFetching: false
                    },
                    () => {
                        notification['error']({
                            message: 'Đăng ký lỗi!',
                            description: `Xảy ra lỗi ở máy chủ. Xin vui lòng thử lại}`
                        });
                    }
                );
            });
    };

    render() {
        const { isFetching, errorMessage } = this.state;

        return (
            <Fragment>
                <Helmet
                    title={`Đăng ký làm giảng viên`}
                    meta={[{ property: 'og:title', content: 'Đăng ký làm giảng viên' }]}
                />
                <div className="empty-page-style">
                    <div className={style.logo}>
                        <Link href="/">
                            <a>
                                <img
                                    src="/static/assets/images/logo/logo.png"
                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={style.boxLayout}>
                        <div className={style.sectionOne}>
                            <h2>Đăng ký làm giảng viên</h2>
                            <p className="text-danger">{errorMessage}</p>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Họ và tên</Label>
                                    <Input
                                        name="fullname"
                                        onChange={this.handleChangeInput}
                                        className={classnames({
                                            'is-invalid text-danger': this.state.validationForm['fullname']
                                        })}
                                    />
                                    <ErrMessage name="fullname" obj={this.state.validationForm} />
                                </FormGroup>
                                <section className={style.hasBorder}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            onChange={this.handleChangeInput}
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['email']
                                            })}
                                        />
                                        <ErrMessage name="email" obj={this.state.validationForm} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Số điện thoại</Label>
                                        <Input
                                            name="phone"
                                            onChange={this.handleChangeInput}
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['phone']
                                            })}
                                        />
                                        <ErrMessage name="phone" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <div className="clearfix" />
                                    <FormGroup>
                                        <Label>Địa chỉ</Label>
                                        <Input
                                            name="address"
                                            onChange={this.handleChangeInput}
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['address']
                                            })}
                                        />
                                        <ErrMessage name="address" obj={this.state.validationForm} />
                                    </FormGroup>
                                </section>

                                <section>
                                    <FormGroup>
                                        <Label>Chủ đề giảng dạy</Label>
                                        <Input
                                            type="select"
                                            name="category"
                                            onChange={this.handleChangeInput}
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['category']
                                            })}
                                        >
                                            <option value="">Chọn chủ đề</option>
                                            <option value="1">Phát triển bản thân</option>
                                            <option value="2">Ngoại ngữ</option>
                                        </Input>
                                        <ErrMessage name="category" obj={this.state.validationForm} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Khu vực</Label>
                                        <Input
                                            type="select"
                                            name="city"
                                            onChange={this.handleChangeInput}
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['city']
                                            })}
                                        >
                                            <option value="">Chọn tỉnh thành</option>
                                            <option value="1">Hà Nội</option>
                                            <option value="2">TP. Hồ Chí Minh</option>
                                        </Input>
                                        <ErrMessage name="city" obj={this.state.validationForm} />
                                    </FormGroup>
                                </section>
                                <FormGroup>
                                    <Label>Kinh nghiệm giảng dạy</Label>
                                    <Input
                                        type="textarea"
                                        name="experience"
                                        onChange={this.handleChangeInput}
                                        className={classnames({
                                            'is-invalid text-danger': this.state.validationForm['experience']
                                        })}
                                    />
                                    <ErrMessage name="experience" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup check className={style.agree}>
                                    <Label
                                        check
                                        className={classnames({
                                            'text-danger': this.state.validationForm['agree']
                                        })}
                                    >
                                        <Input type="checkbox" name="agree" onChange={this.handleChangeInput} />Tôi muốn
                                        nhờ <strong>Kaixin.vn</strong> giới thiệu đơn vị sản xuất video
                                        <ErrMessage name="agree" obj={this.state.validationForm} />
                                    </Label>
                                </FormGroup>
                                <Button type="submit" onClick={this.handleSubmit} disabled={isFetching}>
                                    Đăng ký
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

TeacherSignUpPage.propTypes = {
    registerActions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        registerActions: bindActionCreators(actions.registerActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(TeacherSignUpPage);
