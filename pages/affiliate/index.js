import styles from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import ErrMessage from 'src/components/errors/ErrMessage';
import _ from 'lodash';
import Link from 'next/link';
import TopFooter from 'src/shared/components/Footer/TopFooter';
import classnames from 'classnames';

class AffiliateComponent extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'empty',
            title: 'Tham gia Affiliate cùng Kaixin.vn'
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                phone: '',
                year: '',
                url: '',
                money: ''
            },
            validationForm: {},
            errorMessage: '',
            isRegPartner: false
        };
    }
    handleChangeInput = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };
    regPartner = () => {
        //console.log('regPartner');
        this.setState({
            isRegPartner: !this.state.isRegPartner
        });
    };
    onCloseRegPartner = () => {
        this.setState({
            isRegPartner: false
        });
    };
    render() {
        const { title, itemHeader, itemWhy, itemChoose, authInfo, common: { seoCommon = {} } } = this.props;
        //const { data } = this.state;
        const { isAuthenticated = false } = authInfo;
        return (
            <Fragment>
                <Helmet
                    title={`${title}`}
                    meta={[
                        {
                            name: 'description',
                            content: _.get(seoCommon, 'homepage_metaDescription')
                        },
                        {
                            name: 'keywords',
                            content: _.get(seoCommon, 'homepage_metaKeywords')
                        },
                        {
                            property: 'og:title',
                            content: title
                        },
                        {
                            property: 'og:image',
                            content: _.get(seoCommon, 'homepage_featuredImage')
                        },
                        {
                            property: 'og:image:width',
                            content: '720'
                        },
                        {
                            property: 'og:image:height',
                            content: '480'
                        }
                    ]}
                />
                <div
                    className={classnames([styles.popupWrapper], {
                        [styles.active]: this.state.isRegPartner
                    })}
                >
                    <div className={styles.overlay} onClick={this.onCloseRegPartner} />
                    <div className={styles.popupContent}>
                        <section>
                            <h3>Vui lòng đăng nhập</h3>
                            <h5>Chương trình chỉ áp dụng cho các thành viên Kaixin.vn</h5>
                            <p>Nếu bạn chưa có tài khoản</p>
                            <div className={styles.btnActions}>
                                <Link href={`/dang-ky`}>
                                    <a className="btn">Đăng kí</a>
                                </Link>
                            </div>
                        </section>
                        <section className={styles.last}>
                            Bạn đã có tài khoản?{' '}
                            <Link href="/dang-nhap">
                                <a>Đăng nhập</a>
                            </Link>
                        </section>
                    </div>
                </div>
                <div className={styles.headerTab}>
                    <div className="container">
                        <div className={styles.inner}>
                            <div className={styles.siteLogo}>
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/static/assets/images/logo/logo-kaizin-ngang.jpg"
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </a>
                                </Link>
                            </div>

                            <ul>
                                <li className="active">
                                    <Link href="#what">
                                        <a>Là gì?</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#why">
                                        <a>Vì sao?</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how">
                                        <a>Làm thế nào</a>
                                    </Link>
                                </li>
                            </ul>

                            <div className={styles.btnActions}>
                                {!isAuthenticated ? (
                                    // <span onClick={this.regPartner} className="btn">
                                    //     Đăng ký ngay
                                    // </span>
                                    <Link href="/dang-ky">
                                        <a className="btn">Đăng ký ngay</a>
                                    </Link>
                                ) : (
                                    <Link href="/dang-ky-lam-giang-vien">
                                        <a className="btn">Đăng ký ngay</a>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.mainContainer} id="what">
                    <div className={styles.blockSection1}>
                        <div className="container">
                            <div className={styles.text}>
                                <h4>
                                    Tham gia affiliate cùng <b>Kaixin.vn</b>
                                </h4>
                                <h2>PHÂN PHỐI KHOÁ HỌC</h2>
                                <p>Thu nhập khủng dành cho các Affiliator tài năng!</p>
                            </div>
                            <div className={styles.btnActions}>
                                {!isAuthenticated ? (
                                    // <span onClick={this.regPartner} className="btn">
                                    //     Đăng ký ngay
                                    // </span>
                                    <Link href="/dang-ky">
                                        <a className="btn">Đăng ký ngay</a>
                                    </Link>
                                ) : (
                                    <Link href="/dang-ky-lam-giang-vien">
                                        <a className="btn">Đăng ký ngay</a>
                                    </Link>
                                )}
                                <Link href="#what">
                                    <a className="btn">Affiliate là gì?</a>
                                </Link>
                            </div>

                            <ul>
                                {itemHeader.length > 0 ? (
                                    itemHeader.map((item, i) => (
                                        <li key={i}>
                                            <img src={item.icon} alt="Công ty sách Kaixin – Knowlege sharing" />

                                            <h4>{item.title}</h4>
                                        </li>
                                    ))
                                ) : (
                                    <p>Không có dữ liệu</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.blockSection2} id="why">
                        <div className="container">
                            <div className={styles.sectionTitle}>
                                <h3>Vì sao?</h3>
                                <p>
                                    nên giảng dạy trên <b>Kaixin.vn</b>
                                </p>
                            </div>
                            <div className="row">
                                {itemWhy.length > 0 ? (
                                    itemWhy.map((item, i) => (
                                        <div key={i} className={`col-6 col-lg-3 ${styles.itemWhy}`}>
                                            <img src={item.icon} alt="Công ty sách Kaixin – Knowlege sharing" />
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có dữ liệu</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.blockSection3} id="how">
                        <div className="container">
                            <div className={styles.sectionTitle}>
                                <h3>LÀM THẾ NÀO?</h3>
                                <p>Trở thành Affiliate</p>
                            </div>
                            <ul>
                                {itemChoose.length > 0 ? (
                                    itemChoose.map((item, i) => (
                                        <li key={i}>
                                            <div className={styles.icon}>
                                                <img src={item.icon} alt="Công ty sách Kaixin – Knowlege sharing" />
                                            </div>

                                            <h4>{item.title}</h4>
                                        </li>
                                    ))
                                ) : (
                                    <p>Không có dữ liệu</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.blockSection4}>
                        <div className="container">
                            <div className={styles.sectionTitle}>
                                <h3>Đăng ký AFFILIATE</h3>
                            </div>
                            <div className="row">
                                <div className={`col-12 col-lg-12 ${styles.left}`}>
                                    <div className={styles.text}>
                                        <h4>Yêu cầu cho Affiliate</h4>
                                        <p>
                                            Bạn tự tin mình đáp ứng được những yêu cầu dưới? Bạn chỉ cần điền thông tin
                                            vào form bên phải. Chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
                                        </p>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className={styles.icon}>
                                                <img
                                                    src="/static/assets/images/aff/002-application.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </div>
                                            <div className={styles.content}>
                                                <p>Có kinh nghiệm trong lĩnh vực Marketing online từ 1 năm trở lên</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={styles.icon}>
                                                <img
                                                    src="/static/assets/images/aff/003-monitor.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </div>
                                            <div className={styles.content}>
                                                <p>Sở hữu hệ thống, công cụ: Website/Blog/Forum , Fanpage</p>
                                                <span>Traffic: từ 9.000 visit/tháng, 5.000 like/page</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={styles.icon}>
                                                <img
                                                    src="/static/assets/images/aff/001-school.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </div>
                                            <div className={styles.content}>
                                                <p>
                                                    Ưu tiên các đối tác đã từng có kinh nghiệm tham giá các hệ thống
                                                    Affiliate
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={styles.btnActions}>
                                        {!isAuthenticated ? (
                                            // <span onClick={this.regPartner} className="btn">
                                            //     Đăng ký ngay
                                            // </span>
                                            <Link href="/dang-ky">
                                                <a className="btn">Đăng ký ngay</a>
                                            </Link>
                                        ) : (
                                            <Link href="/dang-ky-lam-giang-vien">
                                                <a className="btn">Đăng ký ngay</a>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                {/* <div className={`col-6 col-lg-4 ${styles.right}`}>
                                    <Form>
                                        <FormGroup>
                                            <Label>Họ và tên</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                onChange={this.handleChangeInput}
                                                value={data.name}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['name']
                                                })}
                                            />
                                            <ErrMessage name="name" obj={this.state.validationForm} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input
                                                value={data.email}
                                                type="email"
                                                name="email"
                                                onChange={this.handleChangeInput}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['email']
                                                })}
                                            />
                                            <ErrMessage name="email" obj={this.state.validationForm} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>SĐT</Label>
                                            <Input
                                                value={data.phone}
                                                name="phone"
                                                onChange={this.handleChangeInput}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['phone']
                                                })}
                                            />
                                            <ErrMessage name="phone" obj={this.state.validationForm} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Số năm kinh nghiệm lĩnh vực Marketing</Label>
                                            <Input
                                                value={data.year}
                                                type="select"
                                                name="year"
                                                onChange={this.handleChangeInput}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['year']
                                                })}
                                            >
                                                <option value="0">Chọn số năm</option>
                                                <option value="1">1 năm</option>
                                                <option value="2">2 năm</option>
                                                <option value="3">3 năm</option>
                                                <option value="4">Trên 3 năm</option>
                                            </Input>
                                            <ErrMessage name="year" obj={this.state.validationForm} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Kênh marketing đã chạy</Label>
                                            <Input
                                                value={data.url}
                                                type="text"
                                                name="url"
                                                onChange={this.handleChangeInput}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['url']
                                                })}
                                            />
                                            <ErrMessage name="url" obj={this.state.validationForm} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Thu nhập mong muốn khi tham gia chương trình</Label>
                                            <Input
                                                value={data.money}
                                                name="money"
                                                onChange={this.handleChangeInput}
                                                className={classnames({
                                                    'is-invalid text-danger': this.state.validationForm['money']
                                                })}
                                            />
                                            <ErrMessage name="money" obj={this.state.validationForm} />
                                        </FormGroup>

                                        <Button type="submit" onClick={this.handleSubmit}>
                                            Đăng ký ngay
                                        </Button>
                                    </Form>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <TopFooter />
                </div>
            </Fragment>
        );
    }
}

AffiliateComponent.defaultProps = {
    itemHeader: [
        {
            icon: '/static/assets/images/aff/khoa-hoc-chat-luong.png',
            title: 'Khoá học chất lượng'
        },
        {
            icon: '/static/assets/images/aff/hoa-hong-hap-dan.png',
            title: 'Hoa hồng hấp dẫn'
        },
        {
            icon: '/static/assets/images/aff/chia-se-de-dang.png',
            title: 'Dễ dàng chia sẻ'
        }
    ],
    itemWhy: [
        {
            icon: '/static/assets/images/aff/004-money.png',
            title: 'HOA HỒNG HẤP DẪN',
            desc: 'Hoa hồng tăng theo doanh thu, lên tới 40% khi khách hàng thanh toán khóa học thành công'
        },
        {
            icon: '/static/assets/images/aff/003-teamwork.png',
            title: 'Hệ thống tối Ưu',
            desc: 'Hệ thống cập nhật realtime, báo cáo doanh thu, ghi nhận doanh thu chính xác'
        },
        {
            icon: '/static/assets/images/aff/002-work-team.png',
            title: 'HỖ TRỢ MIỄN PHÍ',
            desc:
                'Trung tâm Sale với 200+ chuyên viên, đảm bảo doanh thu hàng tháng lên tới triệu đô. Đối tác giao vận với mạng lưới toàn quốc. Đội ngũ hỗ trợ về chuyên môn, kỹ thuật'
        },
        {
            icon: '/static/assets/images/aff/001-certificate.png',
            title: 'CHẤT LƯỢNG SẢN PHẨM',
            desc: 'Sản phẩm có 500.000+ học viên cùng đội ngũ 500+ giảng viên với 1000+ khóa học thuộc nhiều lĩnh vực'
        }
    ],
    itemChoose: [
        {
            icon: '/static/assets/images/aff/005-curriculum.png',
            title: 'Đăng ký hợp tác với kaixin.vn tại đây'
        },
        {
            icon: '/static/assets/images/aff/004-advertising.png',
            title: 'Sử dụng tài nguyên của kaixin.vn để triển khai quảng cáo'
        },
        {
            icon: '/static/assets/images/aff/003-buy.png',
            title: 'Khách hàng Đăng ký mua khoá học'
        },
        {
            icon: '/static/assets/images/aff/002-credit-card.png',
            title: 'khách hàng thanh toán thành công'
        },
        {
            icon: '/static/assets/images/aff/001-get-money.png',
            title: 'Affiliate nhận tiền hoa hồng từ doanh thu mang về'
        }
    ]
};

AffiliateComponent.propTypes = {
    title: PropTypes.string.isRequired,
    itemHeader: PropTypes.array,
    itemWhy: PropTypes.array,
    itemChoose: PropTypes.array,
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    common: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, common } = state;
    return { authInfo: auth, common };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateComponent);
