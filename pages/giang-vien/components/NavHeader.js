import style from './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class NavHeader extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className={style.pageHeaderWrapper}>
                <div className="container">
                    <div className="row">
                        <div className={`col-12 col-lg-3 ${style.avatar}`}>
                            <div className={style.theAvt}>
                                <span
                                    style={{
                                        backgroundImage: `url(${
                                            _.isEmpty(data.avatar) ? '/static/assets/images/avatar.jpeg' : data.avatar
                                        })`
                                    }}
                                />
                            </div>
                        </div>
                        <div className={`col-12 col-lg-9 ${style.content}`}>
                            <h1>Nguyen Van A</h1>
                            <h5>
                                Chuyên môn: <i>Công nghệ thông tin</i>
                            </h5>
                            <div className={style.desc}>
                                <p>
                                    Nguyen Van A sinh năm 1986, tốt nghiệp Đại học Bách khoa, khoa Công nghệ thông tin.
                                    Anh hiện đang là Giảng viên Thiết kế web tại FPT - Arena.
                                </p>

                                <p>
                                    Với 8 năm kinh nghiệm giảng dạy, anh đã có hàng nghìn học viên đã tốt nghiệp và làm
                                    việc trong lĩnh vực thiết kế, đặc biệt là thiết kế web chuyên nghiệp. Ngoài ra anh
                                    còn tham gia rất nhiều dự án web cho FPT và các dự án Freelance khác về thiết kế web
                                    dựa trên ngôn ngữ lập trình mã nguồn mở, PHP, NET.
                                </p>

                                <p>
                                    Anh đã tham gia hiệu đính và dịch rất nhiều đầu sách về thiết kế web cho hệ thống
                                    thư viện đại học FPT.
                                </p>

                                <p>
                                    Ngoài ra anh còn tham gia rất nhiều dự án web cho FPT, dạy các shortcourse cho người
                                    đi làm và các dự án Freelance khác về thiết kế web dựa trên ngôn ngữ lập trình mã
                                    nguồn mở.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
NavHeader.defaultProps = {
    data: {}
};

NavHeader.propTypes = {
    data: PropTypes.object
};

export default NavHeader;
