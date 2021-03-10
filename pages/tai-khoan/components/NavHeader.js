import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
//import classnames from 'classnames';

class NavHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: ''
        };
    }
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };
    render() {
        const { authInfo } = this.props;
        return (
            <Fragment>
                <div className={style.headerTitlePage}>
                    <div className="container">
                        <h1>{_.get(authInfo, 'userInfo.fullname', 'Thông tin cá nhân')}</h1>
                        <p>Thông tin tài khoản, các khoá học đã mua, lịch sử đăng ký khóa học…</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}
NavHeader.propTypes = {
    authInfo: PropTypes.object
};
export default NavHeader;
