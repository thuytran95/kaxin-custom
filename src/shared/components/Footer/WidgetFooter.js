import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import classnames from 'classnames';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import { PageLink } from 'src/shared/components/Link';
import { getValueByKey } from 'src/helpers/Common';
import ErrMessage from 'src/components/errors/ErrMessage';
import Swal from 'sweetalert2';
import ImageLoad from 'src/components/image-load';
import LazyLoad from 'react-lazyload';
class WidgetFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: 'menu1',
            listPage: {},
            allSetting: '',
            data: {
                email: '',
                active: 1
            },
            validationForm: {}
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.removeValidate, true);
    }
    componentWillMount() {
        const { commonActions } = this.props;
        const filter = JSON.stringify([{ operator: 'eq', value: 'website', property: 'platform' }]);
        commonActions.getFooterPages({ filter });
        this.setState({ data: { email: '', active: 1 } });
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.removeValidate, true);
    }
    removeValidate = () => {
        this.setState({ validationForm: {} });
    };
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };
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
            case 'email':
                return value
                    ? value.match(
                          /^([A-Za-z0-9.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                      )
                        ? null
                        : 'Email không đúng định dạng'
                    : 'Vui lòng nhập email';
            default:
                return null;
        }
    };

    validate = () => {
        const { data = {} } = this.state;

        let res = true;

        const validateObject = ['email'].reduce((result, key) => {
            result[key] = this.validateField(key, data[key]);
            if (result[key] !== null) res = false;
            return result;
        }, {});

        return res || validateObject;
    };
    userSubscriber = data => {
        const { newsletterActions } = this.props;
        const params = {
            email: this.state.data.email,
            active: 1
        };
        newsletterActions
            .createNewsletter(params)
            .then(res => {
                Swal({
                    title: 'Đăng ký nhận tin thành công',
                    text: 'Bạn đã đăng ký nhận tin tức và khuyến mại thành công từ website Kaixin.vn.',
                    type: 'success',
                    imageWidth: 50,
                    imageHeight: 50,
                    confirmButtonText: 'Ok'
                }).then(result => {
                    if (result.value) {
                        this.setState({ data: { email: '' } });
                    }
                });
            })
            .catch(err => {
                if (err.data.message === 'Email must be unique') {
                    Swal({
                        title: 'Email đã tồn tại',
                        text: 'Email của bạn đã được đăng ký nhận tin từ Kaixin.vn.',
                        type: 'error',
                        imageWidth: 50,
                        imageHeight: 50,
                        confirmButtonText: 'Tiếp tục'
                    }).then(result => {
                        if (result.value) {
                            this.setState({ data: { email: '' } });
                        }
                    });
                }
            });
    };
    onHandleSubmit = publish => {
        const { data } = this.state;
        const validation = this.validate();
        if (validation !== true) {
            this.setState({ validationForm: validation });
            return;
        }
        this.userSubscriber({ ...data, publish });
    };
    onRedirect = () => {
        window.open('http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=39629', '_blank');
    };
    render() {
        const { footerPages, mentorsData, setting: { listSetting = {} } } = this.props;
        return (
            <Fragment>
                <div className={style.footerWidgetWrapper}>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-6 col-footer">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-6 col-footer">
                                    <div className={style.footerLink}>
                                        <h3
                                            className={style.widgetTitleFooter}
                                            onClick={() => {
                                                this.handleToggle('menu1');
                                            }}
                                        >
                                            Hỗ trợ khách hàng{' '}
                                            <i
                                                className={`${
                                                    this.state.isShowInfo === 'menu1'
                                                        ? 'fa fa-caret-up'
                                                        : 'fa fa-caret-down'
                                                }`}
                                            />
                                        </h3>
                                        {/* {this.getNameByKey('huong-dan-mua-hang')} */}
                                        <ul
                                            className={classnames({
                                                active: this.state.isShowInfo === 'menu1'
                                            })}
                                        >
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'huong-dan-mua-hang' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'giao-nhan-va-thanh-toan' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'chinh-sach-bao-mat' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'doi-tra-va-bao-hanh' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-6 col-footer">
                                    <div className={style.footerLink}>
                                        <h3
                                            className={style.widgetTitleFooter}
                                            onClick={() => {
                                                this.handleToggle('menu2');
                                            }}
                                        >
                                            Về Kaixin.vn{' '}
                                            <i
                                                className={`${
                                                    this.state.isShowInfo === 'menu2'
                                                        ? 'fa fa-caret-up'
                                                        : 'fa fa-caret-down'
                                                }`}
                                            />
                                        </h3>
                                        <ul
                                            className={classnames({
                                                active: this.state.isShowInfo === 'menu2'
                                            })}
                                        >
                                            {mentorsData.map(item => (
                                                <li key={item.id}>
                                                    <Link href={item.route}>
                                                        <a>{item.title}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'gioi-thieu' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                            {footerPages
                                                ? footerPages.map(
                                                      item =>
                                                          item.route === 'lien-he' && (
                                                              <li key={item.id}>
                                                                  <PageLink {...item} />
                                                              </li>
                                                          )
                                                  )
                                                : null}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="visible-large">
                                <div className={style.verify}>
                                    {/* <img
                                        src="/static/assets/images/bocongthuong.png"
                                        alt="Công ty sách MCBooks – Knowlege sharing"
                                        onClick={this.onRedirect}
                                    /> */}
                                    <span onClick={this.onRedirect}>
                                        <ImageLoad
                                            src="/static/assets/images/bocongthuong.png"
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 col-footer">
                            <div className={style.footerPayment}>
                                <h3 className={style.widgetTitleFooter}>Phương thức thanh toán</h3>

                                <div className={style.text}>
                                    <ImageLoad src="/static/assets/images/pm/paypal.png" alt="Paypal" />
                                    <ImageLoad src="/static/assets/images/pm/visa.png" alt="VISA" />
                                    <ImageLoad src="/static/assets/images/pm/master.png" alt="MasterCard" />
                                    {/* <img src="/static/assets/images/pm/paypal.png" alt="Paypal" />
                                    <img src="/static/assets/images/pm/visa.png" alt="VISA" />
                                    <img src="/static/assets/images/pm/master.png" alt="MasterCard" /> */}
                                </div>
                            </div>
                            <div className={style.footerApp}>
                                <h3 className={style.widgetTitleFooter}>Tải App Kaixin</h3>

                                <div className={style.btnApp}>
                                    {getValueByKey(listSetting, 'link_app_mcbooks_google_play') !== '' ? (
                                        <Link href={getValueByKey(listSetting, 'link_app_mcbooks_google_play')}>
                                            <a>
                                                <ImageLoad
                                                    src="/static/assets/images/app/1.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </a>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                    {getValueByKey(listSetting, 'link_app_mcbooks_app_store') !== '' ? (
                                        <Link href={getValueByKey(listSetting, 'link_app_mcbooks_app_store')}>
                                            <a>
                                                <ImageLoad
                                                    src="/static/assets/images/app/2.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </a>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <div className={style.footerApp}>
                                <h3 className={style.widgetTitleFooter}>Tải App TKBooks</h3>

                                <div className={style.btnApp}>
                                    {getValueByKey(listSetting, 'link_app_tkbooks_google_play') !== '' ? (
                                        <Link href={getValueByKey(listSetting, 'link_app_tkbooks_google_play')}>
                                            <a>
                                                <ImageLoad
                                                    src="/static/assets/images/app/1.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </a>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                    {getValueByKey(listSetting, 'link_app_tkbooks_app_store') !== '' ? (
                                        <Link href={getValueByKey(listSetting, 'link_app_tkbooks_app_store')}>
                                            <a>
                                                <ImageLoad
                                                    src="/static/assets/images/app/2.png"
                                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                                />
                                            </a>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 col-footer last">
                            <div className={style.footerSubcriber}>
                                <h3 className={style.widgetTitleFooter}>Đăng ký nhận tin</h3>
                                <Form
                                    id="activeForm"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.onHandleSubmit();
                                    }}
                                >
                                    <FormGroup>
                                        <Input
                                            type="email"
                                            // required
                                            name="email"
                                            value={this.state.data.email}
                                            onChange={this.onChange}
                                            placeholder="Email..."
                                            className={classnames({
                                                'is-invalid text-danger': this.state.validationForm['email']
                                            })}
                                        />
                                        <Button type="submit">
                                            <i className="fa fa-send" />
                                        </Button>
                                    </FormGroup>
                                    <ErrMessage name="email" obj={this.state.validationForm} />
                                </Form>
                            </div>

                            <div className={style.footerFollow}>
                                <h3 className={style.widgetTitleFooter}>Liên kết với chúng tôi</h3>

                                {getValueByKey(listSetting, 'facebook') !== '' ? (
                                    <div className={style.text}>
                                        <LazyLoad>
                                            <div
                                                className="fb-page"
                                                data-href={getValueByKey(listSetting, 'facebook')}
                                                data-tabs="timeline"
                                                data-width="255"
                                                data-height="70"
                                                data-small-header="false"
                                                data-adapt-container-width="true"
                                                data-hide-cover="false"
                                                data-show-facepile="false"
                                            >
                                                <blockquote
                                                    cite={getValueByKey(listSetting, 'facebook')}
                                                    className="fb-xfbml-parse-ignore"
                                                >
                                                    <Link href={getValueByKey(listSetting, 'facebook')}>
                                                        <a>Kaixin.vn</a>
                                                    </Link>
                                                </blockquote>
                                            </div>
                                        </LazyLoad>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className="visible-small">
                                <div className={style.verify}>
                                    <span onClick={this.onRedirect}>
                                        <ImageLoad
                                            src="/static/assets/images/bocongthuong.png"
                                            alt="Công ty sách Kaixin – Knowlege sharing"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
WidgetFooter.defaultProps = {
    footerPages: [],
    introData: [
        {
            id: 1,
            title: 'Hướng dẫn mua hàng',
            route: 'huong-dan-mua-hang'
        },
        {
            id: 2,
            title: 'Giao nhận và thanh toán',
            route: 'giao-nhan-va-thanh-toan'
        },
        {
            id: 4,
            title: 'Chính sách bảo mật',
            route: 'chinh-sach-bao-mat'
        }
    ],
    mentorsData: [
        {
            id: 1,
            title: 'Trang chủ',
            route: '/'
        },
        {
            id: 2,
            title: 'Khóa học',
            route: '/danh-muc'
        }
    ],
    settingActions: {},
    newsletterActions: {}
};
WidgetFooter.propTypes = {
    commonActions: PropTypes.object.isRequired,
    footerPages: PropTypes.array.isRequired,
    introData: PropTypes.array.isRequired,
    mentorsData: PropTypes.array.isRequired,
    settingActions: PropTypes.object.isRequired,
    setting: PropTypes.object.isRequired,
    newsletterActions: PropTypes.object.isRequired
};

const mapStateToProps = ({ common, setting }) => {
    const { footerPages = [] } = common;
    return {
        footerPages,
        setting
    };
};

const mapDispatchToProps = dispatch => {
    return {
        commonActions: bindActionCreators(actions.commonActions, dispatch),
        settingActions: bindActionCreators(actions.settingActions, dispatch),
        newsletterActions: bindActionCreators(actions.newsletterActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetFooter);
