import style from '../style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Cube as Overlay } from 'src/shared/components/loading';
import ErrMessage from 'src/components/errors/ErrMessage';
import classnames from 'classnames';
import Validation from 'src/helpers/Validation';
import Swal from 'sweetalert2';

class EditBank extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            date: moment(),
            data: {
                accountName: '',
                bank: '',
                bankBranch: '',
                accountNumber: ''
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
                ...this.state.data,
                ..._.pick(userInfo, 'accountName', 'bank', 'bankBranch', 'accountNumber')
            }
        });
    };
    _handleChangeInput = e => {
        const { validationForm } = this.state;
        const { name, value } = e.target;
        const validationInput = Validation.validationOnChange(e.target);
        this.setState({
            validationForm: Validation.updateValidationForm(validationInput, validationForm)
        });
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };

    updateUser = () => {
        const { authInfo, authActions, stopEdit } = this.props;
        const { data } = this.state;
        const inputs = document.getElementById('userForm').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, this.state.validationForm);
        this.setState({ isFetching: true, validationForm: validationForm });
        if (_.isEmpty(validationForm)) {
            authActions
                .updateUser(_.get(authInfo, 'userInfo.id'), { ...data })
                .then(res => {
                    this.setState({ isFetching: false });
                    stopEdit();
                    Swal({
                        title: 'Cập nhật thành công',
                        text: 'Chúc mừng bạn đã cập nhật thông tin tài khoản thành công.',
                        type: 'success',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                })
                .catch(err => {
                    this.setState({ isFetching: false });
                    stopEdit();
                    Swal({
                        title: 'Cập nhật lỗi',
                        text: 'Xin lỗi bạn đã cập nhật thông tin tài khoản không thành công.',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    });
                });
        } else {
            this.setState({ isFetching: false });
        }
    };

    render() {
        const { stopEdit } = this.props;
        const { data } = this.state;
        return (
            <Fragment>
                <Overlay loading={this.state.isFetching} />
                <div className={style.headerSection}>
                    <h2>Thông tin thanh toán</h2>
                    <div className={style.btnActions}>
                        <Button onClick={stopEdit}>Hủy</Button>
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
                    <div className="row">
                        <div className="col-xs-12 col-md-1" />
                        <div className="col-xs-12 col-md-11">
                            <Form
                                id="userForm"
                                onSubmit={e => {
                                    e.preventDefault();
                                }}
                            >
                                <FormGroup>
                                    <Label>Chủ tài khoản</Label>
                                    <Input
                                        name="accountName"
                                        value={data.accountName}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['accountName']
                                        })}
                                    />
                                    <ErrMessage name="accountName" obj={this.state.validationForm} />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Ngân hàng</Label>
                                    <Input
                                        name="bank"
                                        value={data.bank}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['bank']
                                        })}
                                    />

                                    <ErrMessage name="bank" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Chi nhánh</Label>
                                    <Input
                                        name="bankBranch"
                                        value={data.bankBranch}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['bankBranch']
                                        })}
                                    />

                                    <ErrMessage name="bankBranch" obj={this.state.validationForm} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Số tài khoản</Label>
                                    <Input
                                        name="accountNumber"
                                        value={data.accountNumber}
                                        onChange={this._handleChangeInput}
                                        className={classnames({
                                            'error-input': this.state.validationForm['accountNumber']
                                        })}
                                    />

                                    <ErrMessage name="accountNumber" obj={this.state.validationForm} />
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
EditBank.defaultProps = {
    authInfo: {},
    userActions: {},
    cities: []
};

EditBank.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    stopEdit: PropTypes.func,
    cities: PropTypes.array
};

export default EditBank;
