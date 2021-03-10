import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { notification, DatePicker } from 'antd';
import { Cube as Overlay } from 'src/shared/components/loading';
import ErrMessage from 'src/components/errors/ErrMessage';
import classnames from 'classnames';
import ImageUpload from '../components/ImageUpload';
import FileUpload from '../components/FileUpload';
import Validation from 'src/helpers/Validation';
import { redirect } from 'src/helpers/Common';

class UserProfileContainer extends PureComponent {
    constructor(props) {
        super(props);
        const { authInfo: { userInfo = {} } } = props;
        this.state = {
            isFetching: false,
            date: moment(),
            data: {
                fullname: '',
                firstName: '',
                birthday: '',
                email: '',
                phone: '',
                address: '',
                job: '',
                description: '',
                expertise: ''
            },
            dataPreview: {
                ..._.pick(userInfo, 'avatar', 'cv', 'createdTimestamp', 'regTeacher')
            },
            validationForm: {}
        };
    }

    componentDidMount() {
        this.updateData();
    }
    updateData = () => {
        const { authInfo: { userInfo = {} } } = this.props;
        this.setState({
            data: {
                ..._.pick(
                    userInfo,
                    'fullname',
                    'firstName',
                    'birthday',
                    'email',
                    'phone',
                    'address',
                    'job',
                    'description',
                    'expertise'
                )
            }
        });
    };
    _handleChangeInput = e => {
        const { data, validationForm } = this.state;
        const { name, value } = e.target;
        if (name === 'phone') {
            const validationConfirm = Validation.checkPhone({ phone: data.phone });
            this.setState(prevState => ({
                validationForm: Validation.updateValidationForm(validationConfirm, prevState.validationForm)
            }));
        } else {
            const validationInput = Validation.validationOnChange(e.target);
            this.setState({
                validationForm: Validation.updateValidationForm(validationInput, validationForm)
            });
        }
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };
    _onChangeDescription = value => {
        this.setState({
            data: { ...this.state.data, description: value },
            validationForm: {}
        });
    };
    _onChangeExpertise = value => {
        this.setState({
            data: { ...this.state.data, expertise: value },
            validationForm: {}
        });
    };
    disabledDate = current => {
        return (
            current &&
            current >=
                moment()
                    .subtract(1, 'day')
                    .endOf('day')
        );
    };
    _handleChangeBirthday = (date, dateString) => {
        if (date) {
            this.setState({
                data: {
                    ...this.state.data,
                    birthday: moment(date).format('DD/MM/YYYY')
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: {
                    ...this.state.data,
                    birthday: null
                },
                validationForm: {}
            });
        }
    };

    _handleChangeImage = avatar => {
        if (avatar) {
            this.setState({
                data: {
                    ...this.state.data,
                    avatar: avatar.path
                },
                dataPreview: {
                    ...this.state.dataPreview,
                    avatar: avatar.uri
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: { ...this.state.data, avatar: '' },
                dataPreview: {
                    ...this.state.dataPreview,
                    avatar: ''
                },
                validationForm: {}
            });
        }
    };
    _handleChangeCV = cv => {
        if (cv) {
            this.setState({
                data: {
                    ...this.state.data,
                    cv: cv.path
                },
                dataPreview: {
                    ...this.state.dataPreview,
                    cv: cv.uri
                },
                validationForm: {}
            });
        } else {
            this.setState({
                data: { ...this.state.data, cv: '' },
                dataPreview: {
                    ...this.state.dataPreview,
                    cv: ''
                },
                validationForm: {}
            });
        }
    };

    updateUser = () => {
        const { authInfo, authActions } = this.props;
        const { data, dataPreview } = this.state;
        const params = {
            ...data,
            fullname: data.firstName
        };
        const inputs = document.getElementById('userForm').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, this.state.validationForm);
        if (_.isNull(dataPreview.cv) || _.isEmpty(dataPreview.cv) || dataPreview.cv === '') {
            validationForm.cv = 'Vui lòng tải lên CV của bạn';
        }
        if (data.phone.length < 10 || data.phone.length > 15) {
            validationForm.phone = 'Số điện thoại không đúng định dạng';
        }
        this.setState({ isFetching: true, validationForm: validationForm });
        if (_.isEmpty(validationForm)) {
            this.setState({ isFetching: false });
            authActions
                .updateUser(_.get(authInfo, 'userInfo.id'), { ...params })
                .then(res => {
                    this.setState({ isFetching: false });
                    notification['success']({
                        message: 'Cập nhật thông tin thành công'
                    });
                    redirect('/thong-tin-ca-nhan');
                })
                .catch(err => {
                    this.setState({ isFetching: false });
                    notification['error']({
                        message: 'Cập nhật lỗi.'
                    });
                });
        } else {
            this.setState({ isFetching: false });
        }
    };

    render() {
        //const { cities } = this.props;
        const { data, dataPreview } = this.state;
        const dateFormat = 'DD/MM/YYYY';
        return (
            <Fragment>
                <Overlay loading={this.state.isFetching} />
                <div className={style.headerSection}>
                    <h2>Thông tin giảng viên</h2>
                    <div className={style.btnActions}>
                        <Button
                            className={style.edit}
                            onClick={e => {
                                e.preventDefault();
                                this.updateUser();
                            }}
                            disabled={!_.isEmpty(this.state.validationForm)}
                        >
                            Lưu lại
                        </Button>
                    </div>
                </div>
                <div className={style.content}>
                    <Form
                        id="userForm"
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <div className="row">
                            <div className="col-xs-12 col-lg-4">
                                <ImageUpload onChange={this._handleChangeImage} value={dataPreview.avatar} />
                            </div>

                            <div className="col-xs-12 col-lg-8">
                                <div className={style.twice}>
                                    <FormGroup>
                                        <Label>
                                            Họ và tên <span className="color-red"> *</span>
                                        </Label>
                                        <Input
                                            required
                                            name="firstName"
                                            value={data.firstName}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['firstName']
                                            })}
                                            disabled={dataPreview.regTeacher ? true : false}
                                        />
                                        <ErrMessage name="firstName" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ngày sinh</Label>
                                        <DatePicker
                                            disabledDate={this.disabledDate}
                                            defaultValue={
                                                !_.isEmpty(data.birthday) ? moment(data.birthday, dateFormat) : ''
                                            }
                                            format={dateFormat}
                                            name="birthday"
                                            onChange={this._handleChangeBirthday}
                                            value={!_.isEmpty(data.birthday) ? moment(data.birthday, dateFormat) : ''}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input disabled name="email" value={data.email} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Điện thoại</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="phone"
                                            value={data.phone}
                                            onChange={this._handleChangeInput}
                                            className={classnames({
                                                'error-input': this.state.validationForm['phone']
                                            })}
                                        />

                                        <ErrMessage name="phone" obj={this.state.validationForm} />
                                    </FormGroup>
                                    {/* <FormGroup>
                                        <Label>Tỉnh/Thành phố</Label>

                                        <Input
                                            type="select"
                                            name="city"
                                            value={data.city}
                                            onChange={this._handleChangeInput}
                                        >
                                            <option value={-1}>-- Chọn Tỉnh/Thành phố --</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={index}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Quận huyện</Label>

                                        <Input
                                            type="select"
                                            name="district"
                                            value={data.district}
                                            onChange={this._handleChangeInput}
                                        >
                                            <option value={-1}>-- Chọn Quận/Huyện --</option>
                                            {_.map(
                                                _.values(_.get(cities, `[${data.city}].districts`, {})),
                                                (district, index) => (
                                                    <option key={index} value={index}>
                                                        {district}
                                                    </option>
                                                )
                                            )}
                                        </Input>
                                    </FormGroup> */}
                                </div>

                                <FormGroup>
                                    <Label>Địa chỉ</Label>
                                    <Input name="address" value={data.address} onChange={this._handleChangeInput} />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Nghề nghiệp</Label>
                                    <Input
                                        name="job"
                                        value={data.job}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['job']
                                        })}
                                        disabled={dataPreview.regTeacher ? true : false}
                                    />

                                    <ErrMessage name="job" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Giới thiệu <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="description"
                                        value={data.description}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['description']
                                        })}
                                    />
                                    <ErrMessage name="description" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Kink nghiệm <span className="color-red"> *</span>
                                    </Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="expertise"
                                        value={data.expertise}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['expertise']
                                        })}
                                    />
                                    <ErrMessage name="expertise" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        CV của bạn <span className="color-red"> *</span>
                                    </Label>
                                    <FileUpload onChange={this._handleChangeCV} value={dataPreview.cv} />
                                    <ErrMessage name="cv" obj={this.state.validationForm} />
                                </FormGroup>
                            </div>
                        </div>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

UserProfileContainer.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cities: PropTypes.array
};

export default UserProfileContainer;
