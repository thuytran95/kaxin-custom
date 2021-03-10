import style from './style.scss';

import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import { Cube as Overlay } from 'src/shared/components/loading';
import AccountPageLayout from '../layout';
import _ from 'lodash';
// import { Form, FormGroup, Label, Button } from 'reactstrap';
import { Form, Input, Button, Row, Col, notification } from 'antd';
// import ErrMessage from 'src/components/errors/ErrMessage';
// import classnames from 'classnames';
//import ViewContainer from 'src/shared/components/Account/Profile/ViewContainer';

const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
};
class UserComponent extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'auth',
            requireAuth: true,
            title: 'Đổi mật khẩu'
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            data: {
                newPassword: '',
                confirmNewPassword: ''
            },
            isChange: false,
            loading: false
        };
    }
    componentDidMount() {
        const { authActions } = this.props;
        authActions.getListCity().then(res => {
            this.setState({ cities: _.get(res, 'data.data', []) });
        });
    }
    showPassword() {
        this.setState({
            typeInput: 'text'
        });
    }
    toggleChange() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { authActions } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    password: values.newPassword
                };
                this.setState({ loading: true });
                authActions
                    .changePassword(params)
                    .then(res => {
                        this.setState({ isChange: true, loading: false });
                    })
                    .catch(err => {
                        this.setState({ isChange: false, loading: false }, () => {
                            notification.error({
                                message: 'Thông báo.',
                                description: 'Thay đổi mật khẩu không thành công!.Vui lòng kiểm tra lại.'
                            });
                        });
                    });
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Mật khẩu không trùng khớp!');
        } else {
            callback();
        }
    };

    compareConfrimPass = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Mật khẩu không trùng khớp!');
        } else {
            callback();
        }
    };

    hasErrors = fieldsError => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };
    render() {
        const { data, isChange, loading } = this.state;
        const { authInfo: { userInfo }, title, ...remains } = this.props;
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return (
            <AccountPageLayout title={title} {...remains}>
                <Fragment>
                    <Overlay loading={loading} />
                    <div className={style.contentWrapper}>
                        <div className={style.headerSection}>
                            <h2>Đổi mật khẩu</h2>
                        </div>
                        <div className={style.content}>
                            {!isChange ? (
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <Row gutter={24} className={style.rowStyle}>
                                        <Col span={24}>
                                            <Form.Item {...formItemLayout} label="Mật khẩu mới:">
                                                {getFieldDecorator('newPassword', {
                                                    initialValue: data && data.newPassword ? data.newPassword : '',
                                                    rules: [
                                                        { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                                        {
                                                            whitespace: true,
                                                            message: 'Không được để trống.'
                                                        },
                                                        {
                                                            min: 6,
                                                            message: 'Ít nhất 6 ký tự.'
                                                        }
                                                        // {
                                                        //     validator: this.compareConfrimPass
                                                        // }
                                                    ]
                                                })(<Input.Password visibilityToggle={true} type="password" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={24} className={style.rowStyle}>
                                        <Col span={24}>
                                            <Form.Item {...formItemLayout} label="Xác nhận mật khẩu:">
                                                {getFieldDecorator('confirmNewPassword', {
                                                    initialValue:
                                                        data && data.confirmNewPassword ? data.confirmNewPassword : '',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập lại mật khẩu mới!'
                                                        },
                                                        {
                                                            whitespace: true,
                                                            message: 'Không được để trống.'
                                                        },
                                                        {
                                                            validator: this.compareToFirstPassword
                                                        }
                                                    ]
                                                })(<Input.Password visibilityToggle={true} type="password" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={24} className={style.rowStyle}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    disabled={this.hasErrors(getFieldsError())}
                                                >
                                                    Xác nhận
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            ) : (
                                <Fragment>
                                    <p>
                                        Tác vụ đổi mật khẩu tài khoản "<b>
                                            {_.get(userInfo, 'email', '...@gmail.com')}
                                        </b>" trên trang <b>Kaixin.vn</b> được thực hiện thành công.
                                    </p>
                                    <p>
                                        Vui lòng đăng xuất trên các thiết bị bạn đã đăng nhập trước đó để đảm bảo bảo
                                        mật cho tài khoản.
                                    </p>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </Fragment>
            </AccountPageLayout>
        );
    }
}

UserComponent.defaultProps = {
    authInfo: {}
};

UserComponent.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    statusCode: PropTypes.number,
    hasError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    history: PropTypes.object,
    cities: PropTypes.array
};

const mapStateToProps = state => {
    const { auth, user } = state;
    return { authInfo: auth, user };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

const userData = Form.create()(UserComponent);

export default connect(mapStateToProps, mapDispatchToProps)(userData);
