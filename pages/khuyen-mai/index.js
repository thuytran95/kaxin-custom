import styles from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import TopFooter from 'src/shared/components/Footer/TopFooter';
import CourseItem from 'src/shared/components/Course/CourseItem';
import { CoursePropTypes } from 'src/prop-types';

class PromotionComponent extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);
        try {
            const filter = JSON.stringify([{ operator: 'eq', value: '1', property: 'active' }]);
            const { data } = await courseActions.listCourse({ limit: 6, filter });
            return {
                title: 'Chương trình khuyến mại',
                listCourse: data
            };
        } catch (err) {
            return {
                title: 'Lỗi trang'
            };
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { title, listCourse, cart, cartActions } = this.props;
        const items = _.get(listCourse, 'rows', []);
        const banner = '/static/assets/images/km/banner.png';
        return (
            <Fragment>
                <Helmet
                    title={`${title}`}
                    meta={[
                        {
                            property: 'og:title',
                            content: title
                        }
                    ]}
                />
                <div className={styles.mainContainer}>
                    <div className={styles.headerTitlePage}>
                        <div className="container">
                            <div className={styles.inner}>
                                <div className={styles.text}>
                                    <span>CHÀO MỪNG NGÀY</span>
                                    <span>NHập mã KAIXIN304</span>
                                </div>
                                <h3>GIẢI PHÓNG MIỀN NAM</h3>
                                <p>-40%</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className="container">
                            <h3 className={styles.boxTitle}>Các khoá học đề xuất</h3>
                            <div className="row">
                                <div className={`col-6 col-lg-9 ${styles.siteContent}`}>
                                    <div className={styles.innerContent}>
                                        <div className="row">
                                            {items.length > 0 ? (
                                                items.map(item => (
                                                    <div
                                                        key={item.id}
                                                        className={`col-6 col-lg-4 ${styles.courseItems}`}
                                                    >
                                                        <CourseItem data={item} cart={cart} cartActions={cartActions} />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Không có dữ liệu</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-6 col-lg-3 ${styles.sidebar}`}>
                                    <div className={styles.bannerImage}>
                                        <img src={banner} alt="Công ty sách Kaixin – Knowlege sharing" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopFooter />
                </div>
            </Fragment>
        );
    }
}
PromotionComponent.defaultProps = {
    items: []
};

PromotionComponent.propTypes = {
    course: PropTypes.object,
    courseActions: PropTypes.object,
    title: PropTypes.string.isRequired,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    listCourse: PropTypes.shape({
        data: PropTypes.shape({
            count: PropTypes.number,
            rows: PropTypes.arrayOf(CoursePropTypes),
            totalCourseActive: PropTypes.number,
            totalCourseDeactive: PropTypes.number,
            totalCoursePending: PropTypes.number
        })
    })
};

const mapStateToProps = state => {
    const { course, cart, category } = state;
    return { course, cart, category };
};

const mapDispatchToProps = dispatch => {
    return {
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionComponent);
