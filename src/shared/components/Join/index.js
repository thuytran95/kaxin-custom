import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class JoinCoimponent extends Component {
    constructor(props) {
        super(props);
        this.state = { kc: {} };
    }
    async componentDidMount() {
        const kc = await require('src/helpers/Keycloak');
        this.setKC(kc);
    }
    setKC = kc => {
        this.setState({ kc });
    };
    onRegisterClick = e => {
        const options = {};
        this.state.kc.register(options);
    };
    render() {
        const { authInfo } = this.props;
        const { authInfo: { isAuthenticated = false } } = this.props;
        return (
            <Fragment>
                <div className={style.joinWrapper}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6 leftColumn">
                                <h2 className={style.hideText}>
                                    Join <br />us
                                </h2>
                            </div>
                            <div className="col-12 col-lg-6 rightColumn">
                                <div className={style.boxText}>
                                    <h2>
                                        <b>Đăng ký làm </b>giảng viên
                                    </h2>
                                    <p>
                                    Một nguồn thu nhập thụ động hấp dẫn nhưng dành cho người dám thử thách! Thực ra, trở thành một giảng viên học trực tuyến không “xa vời” như bạn đang nghĩ: - Bạn không cần phải là giáo viên, giảng viên chuyên nghiệp. Giảng viên chuyên nghiệp thường được đào tạo ngoại trừ về chuyên môn thì còn có các nghiệp vụ sư phạm khác nhưng dạy học online thì bạn không cần các nghiệp vụ liên quan tới đào tạo là mấy. - Bạn không cần phải giảng dạy những môn học mang tính chính thống. Có rất nhiều người sẵn sàng mua các khóa học về đàn ghita, đàn cò, nói trước đám đông, MC đám cưới, thanh nhạc để hát karaoke, làm bánh không chuyên, hay thậm chí: chơi game sao cho hay. Đừng xem thường nó, nó là những kiến thức mà ngoài kia còn rất nhiều người hứng thú. - Bạn không cần nhiều chi phí để bắt đầu, chỉ cần các thiết bị sẵn có mà gần như mỗi người chúng ta đều có rồi. Thế là đủ.
                                    </p>

                                    {!isAuthenticated ? (
                                        <span
                                            className={`btn btn-primary btnSignUp ${style.btnJoin}`}
                                            onClick={this.onRegisterClick}
                                        >
                                            Đăng ký ngay
                                        </span>
                                    ) : authInfo.userInfo.role === 'teacher' ||
                                    authInfo.userInfo.rolePermissions.name === 'teacher' ||
                                    authInfo.userInfo.role === 'admin' ||
                                    authInfo.userInfo.rolePermissions.name === 'admin' ? null : (
                                        <Link href="/dang-ky-lam-giang-vien">
                                            <a className={`btn btn-primary btnSignUp ${style.btnJoin}`}>Đăng kí ngay</a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

JoinCoimponent.propTypes = {
    authInfo: PropTypes.object
};

export default JoinCoimponent;
