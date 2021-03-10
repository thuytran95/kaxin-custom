import style from './style.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import _ from 'lodash';

import ListCourse from './ListCourse';

class SlideComponent extends PureComponent {
    render() {
        const { data, authInfo: { isAuthenticated = false, userInfo = {} } } = this.props;
        return (
            <div className={style.slideWrapper}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className={style.boxText}>
                                <h2>Nâng cấp bản thân</h2>
                                <p>
                                    Với 500 khoá học online từ KAIXIN, bạn có thể học bất cứ lúc nào, bất cứ nơi đâu
                                    bạn muốn.
                                </p>
                                {!isAuthenticated ? (
                                    <Link href="/dang-nhap">
                                        <a className={`btn btn-primary btnSignUp`}>Đăng ký ngay</a>
                                    </Link>
                                ) : userInfo.role === 'teacher' ||
                                userInfo.rolePermissions.name === 'teacher' ||
                                userInfo.role === 'admin' ||
                                userInfo.rolePermissions.name === 'admin' ? null : (
                                    <Link href="/dang-ky-lam-giang-vien">
                                        <a className={`btn btn-primary btnSignUp`}>Đăng ký làm giảng viên</a>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 list-course">
                            <ListCourse data={_.get(data, 'data.rows', [])} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SlideComponent.propTypes = {
    data: PropTypes.object,
    authInfo: PropTypes.object
};

export default SlideComponent;
