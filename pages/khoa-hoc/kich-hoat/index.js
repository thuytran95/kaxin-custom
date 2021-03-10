import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import Error from 'next/error';
import { Form, FormGroup, Input, Button } from 'reactstrap';
//import { Modal } from 'antd';
import { redirect } from 'src/helpers/Common';
//import _ from 'lodash';
import classnames from 'classnames';
import ErrMessage from 'src/components/errors/ErrMessage';
import Swal from 'sweetalert2';
import { myCourseDetailLink } from 'src/helpers/RouteURL';
class ActiveCourse extends Component {
    static async getInitialProps() {
        return {
            layout: 'auth',
            requireAuth: true
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            data: {
                activeCode: ''
            },
            auth: {},
            validationForm: {}
        };
    }
    componentWillMount() {
        const { url: { query } } = this.props;
        this.setState({ data: { activeCode: query.activeCode } });
    }
    onChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            data: { ...this.state.data, [name]: value },
            validationForm: { ...this.state.validationForm, [name]: this.validateField(name, value) }
        });
    };
    validateField = (field, value) => {
        switch (field) {
            case 'activeCode':
                return value ? null : 'Vui lòng nhập mã kích hoạt';
            default:
                return null;
        }
    };

    validate = () => {
        const { data = {} } = this.state;

        let res = true;

        const validateObject = ['activeCode'].reduce((result, key) => {
            result[key] = this.validateField(key, data[key]);
            if (result[key] !== null) res = false;
            return result;
        }, {});

        return res || validateObject;
    };
    activeCode = data => {
        const { courseActions, orderActions } = this.props;
        const params = {
            code: this.state.data.activeCode
        };
        orderActions
            .activeCourse(params)
            .then(res => {
                courseActions.getCourse(parseInt(res.data.data.courseId, 0)).then(course => {
                    Swal({
                        title: 'Kích hoạt thành công',
                        text: 'Chúc mừng bạn đã kích hoạt khóa học thành công! Bạn có thể bắt đầu học ngay bây giờ.',
                        type: 'success',
                        imageWidth: 50,
                        imageHeight: 50,
                        showCancelButton: true,
                        confirmButtonText: 'Học ngay',
                        cancelButtonText: 'Ok'
                    }).then(result => {
                        if (result.value) {
                            const params = {
                                id: course.data.id,
                                name: course.data.name
                            };
                            redirect(myCourseDetailLink({ ...params }));
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            redirect('/khoa-hoc-cua-toi');
                        }
                    });
                });
            })
            .catch(err => {
                if (err.data.message === '{{error.courseHasBeenActived}}') {
                    Swal({
                        title: 'Kích hoạt lỗi',
                        text:
                            'Khóa học đã được kích hoạt. Vui lòng sử dụng mã này cho tài khoản khác hoặc mua khóa học khác.',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                } else if (err.data.message === '{{error.codeHasBeenUsed}}') {
                    Swal({
                        title: 'Kích hoạt lỗi',
                        text: 'Mã kích hoạt đã được sử dụng. Vui lòng sử dụng mã kích hoạt khác.',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                } else {
                    Swal({
                        title: 'Kích hoạt lỗi',
                        text: 'Mã kích sai hoặc đã được kích hoạt. Vui lòng nhập lại!',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                }

                this.setState({ data: { activeCode: '' } });
            });
    };
    onHandleSubmit = publish => {
        const { data } = this.state;
        const validation = this.validate();
        if (validation !== true) {
            this.setState({ validationForm: validation });
            return;
        }
        this.activeCode({ ...data, publish });
    };
    render() {
        const { statusCode, hasError } = this.props;
        if (hasError) {
            return <Error statusCode={statusCode} />;
        }
        return (
            <Fragment>
                <Helmet
                    title="Kích hoạt khóa học"
                    meta={[
                        {
                            property: 'og:title',
                            content: 'Kích hoạt khóa học'
                        }
                    ]}
                />
                <div className={`${style.pageActive}`}>
                    <div className={`container`}>
                        <h1>KÍCH HOẠT KHOÁ HỌC</h1>
                        <h3>Nhập mã kích hoạt</h3>
                        <p>Vui lòng nhập mã kích hoạt khoá học mà bạn nhận được vào ô bên dưới:</p>
                        <Form
                            id="activeForm"
                            onSubmit={e => {
                                e.preventDefault();
                                this.onHandleSubmit();
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <FormGroup>
                                <Input
                                    required
                                    name="activeCode"
                                    value={this.state.data.activeCode}
                                    onChange={this.onChange}
                                    placeholder="VD: MCB09876541"
                                    className={classnames({
                                        'is-invalid text-danger': this.state.validationForm['activeCode']
                                    })}
                                />
                                <Button type="submit">Kích hoạt</Button>
                            </FormGroup>
                            <ErrMessage name="activeCode" obj={this.state.validationForm} />
                        </Form>

                        <div className={style.note}>
                            <h5>Lưu ý:</h5>
                            <ul>
                                <li>
                                    Mỗi khoá học chỉ cần kích hoạt 1 lần duy nhất. Không lặp lại bước này ở lần vào học
                                    sau
                                </li>
                                <li>
                                    Nếu gặp khó khăn trong việc kích hoạt khóa học, bạn vui lòng liên hệ với chúng tôi
                                    theo số <strong>Hotline: 1800 6816</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

ActiveCourse.defaultProps = {
    authInfo: {},
    orderActions: {}
};

ActiveCourse.propTypes = {
    authInfo: PropTypes.object,
    orderActions: PropTypes.object,
    courseActions: PropTypes.object,
    title: PropTypes.string,
    hasError: PropTypes.bool,
    statusCode: PropTypes.number,
    url: PropTypes.object
};

// const mapStateToProps = state => {
//     const { auth } = state;
//     return { authInfo: auth };
// };

const mapDispatchToProps = dispatch => {
    return {
        orderActions: bindActionCreators(actions.orderActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch)
    };
};
export default connect(null, mapDispatchToProps)(ActiveCourse);
