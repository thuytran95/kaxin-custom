import style from '../style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, FormGroup, Label, Button } from 'reactstrap';
class ViewBank extends PureComponent {
    constructor(props) {
        super(props);
        const { authInfo: { userInfo = {} } } = props;
        this.state = {
            data: {
                ..._.pick(userInfo, 'accountName', 'bank', 'bankBranch', 'accountNumber')
            }
        };
    }
    updateData = data => {
        this.setState({
            data: {
                ...this.state.data,
                ..._.pick(data, _.keys(this.state.data))
            }
        });
    };
    render() {
        const { startEdit } = this.props;
        const { data } = this.state;
        return (
            <Fragment>
                <div className={style.boxInfo}>
                    <div className={style.headerSection}>
                        <h2>Thông tin thanh toán</h2>
                        <div className={style.btnActions}>
                            <Button className={style.edit} onClick={startEdit}>
                                Sửa
                            </Button>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className="row">
                            <div className="col-xs-12 col-md-1" />
                            <div className="col-xs-12 col-md-11">
                                <Form>
                                    <FormGroup>
                                        <Label>Chủ tài khoản</Label>
                                        {data.accountName && !_.isEmpty(data.accountName)
                                            ? data.accountName
                                            : 'Đang cập nhật'}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ngân hàng</Label>
                                        {data.bank && !_.isEmpty(data.bank) ? data.bank : 'Đang cập nhật'}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Chi nhánh ngân hàng</Label>
                                        {data.bankBranch && !_.isEmpty(data.bankBranch)
                                            ? data.bankBranch
                                            : 'Đang cập nhật'}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Số tài khoản</Label>
                                        {data.accountNumber && !_.isEmpty(data.accountNumber)
                                            ? data.accountNumber
                                            : 'Đang cập nhật'}
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
ViewBank.defaultProps = {
    authInfo: {}
};

ViewBank.propTypes = {
    authInfo: PropTypes.object,
    startEdit: PropTypes.func,
    cities: PropTypes.array
};

export default ViewBank;
