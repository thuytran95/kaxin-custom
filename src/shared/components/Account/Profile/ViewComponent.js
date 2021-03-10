import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, FormGroup, Label, Button } from 'reactstrap';

class ViewUserComponent extends PureComponent {
    constructor(props) {
        super(props);
        const { authInfo: { userInfo = {} } } = props;
        this.state = {
            //date: moment(),
            data: {
                ..._.pick(
                    userInfo,
                    'firstName',
                    'birthday',
                    'email',
                    'phone',
                    'address',
                    'job',
                    'city',
                    'district',
                    'firstName'
                )
            },
            dataPreview: {
                ..._.pick(userInfo, 'avatar')
            }
        };
    }
    updateData = data => {
        this.setState({
            data: {
                ...this.state.data,
                ..._.pick(data, _.keys(this.state.data))
            },
            dataPreview: _.pick(data, _.keys(this.state.dataPreview))
        });
    };
    render() {
        const { startEdit, cities } = this.props;
        const { data, dataPreview } = this.state;
        const SquareLogo = '/static/assets/images/avatar.jpeg';
        const city =
            !_.isEmpty(cities) && !_.isEmpty(cities[data.city]) && cities[data.city].name
                ? !_.isEmpty(data.city) && data.city >= 0 && cities[data.city].name
                : data.city;
        const dist = _.values(_.get(cities, `[${data.city}].districts`, {}));
        const district = !_.isEmpty(data.district) && data.district >= 0 && dist[data.district];
        return (
            <Fragment>
                <div className={style.boxInfo}>
                    <div className={style.headerSection}>
                        <h2>Thông tin cá nhân</h2>
                        <div className={style.btnActions}>
                            <Button className={style.edit} onClick={startEdit}>
                                Sửa
                            </Button>
                            {/* <Button className={style.change}>Đổi mật khẩu</Button> */}
                        </div>
                    </div>
                    <div className={style.content}>
                        <Form>
                            <div className="row">
                                <div className="col-xs-12 col-lg-4">
                                    <span
                                        className={style.avatar}
                                        style={{
                                            backgroundImage: `url(${
                                                _.isEmpty(dataPreview.avatar) ? SquareLogo : dataPreview.avatar
                                            })`
                                        }}
                                    />
                                </div>

                                <div className="col-xs-12 col-lg-8">
                                    <FormGroup>
                                        <Label>Họ và tên</Label>
                                        {data.firstName}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ngày sinh</Label>
                                        {data.birthday}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Email</Label>
                                        {data.email}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Điện thoại</Label>
                                        {data.phone && !_.isEmpty(data.phone) ? data.phone : 'Đang cập nhật'}
                                    </FormGroup>
                                    {city && (
                                        <Fragment>
                                            <FormGroup>
                                                <Label>Tỉnh/Thành phố</Label>
                                                {city === '-1' ? '...' : city}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Quận/Huyện</Label>
                                                {city === '-1' ? '...' : district}
                                            </FormGroup>
                                        </Fragment>
                                    )}

                                    <FormGroup>
                                        <Label>Địa chỉ</Label>
                                        {data.address && !_.isEmpty(data.address) ? data.address : 'Đang cập nhật'}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Nghề nghiệp</Label>
                                        {data.job && !_.isEmpty(data.job) ? data.job : 'Đang cập nhật'}
                                    </FormGroup>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}
ViewUserComponent.defaultProps = {
    authInfo: {}
};

ViewUserComponent.propTypes = {
    authInfo: PropTypes.object,
    startEdit: PropTypes.func,
    cities: PropTypes.array
};

export default ViewUserComponent;
