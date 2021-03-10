import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import PageHeader from './components/PageHeader';
import Sticky from 'react-sticky-el';
import _ from 'lodash';
import NoSSR from 'src/shared/components/NoSSR';
//Section
import LessonList from './components/section/LessonList';
// import RatingComponent from './components/section/Rating';
import RatingComponent from './components/section/Rating/index';
import CommentComponent from './components/section/Comments';

//Sidebar
import BoxMeta from './components/sidebar/BoxMeta';
import InfoAuthor from './components/sidebar/InfoAuthor';
import RelatedPost from './components/sidebar/RelatedPost';

import { courseDetailLink } from 'src/helpers/RouteURL';
import { BASE_LINK_NL } from 'src/constants/config';
import url from 'url';

class DetailCourse extends Component {
    static async getInitialProps(context) {
        const { store, url, query } = context;
        const { ratingActions, courseActions, userActions } = mapDispatchToProps(store.dispatch);
        let courseRelate = {};

        try {
            const { data } = await courseActions.getCourse(parseInt(query.id, 0));
            if (data.lecturerId) {
                userActions.getUserDetail(data.lecturerId);
            }
            [courseRelate] = await Promise.all([
                courseActions.filterCourse({
                    start: 0,
                    limit: 2,
                    filter: JSON.stringify([
                        { operator: 'eq', value: data.categoryId, property: 'categoryId' },
                        { operator: 'ne', value: data.id, property: 'id' }
                    ])
                }),
                ratingActions.getStatisticsRating({ enityId: query.id })
            ]);

            ratingActions.getRatingList(data.id);
            return {
                title: data.name,
                courseRelate,
                query,
                asPath: _.get(url, 'asPath', '/')
            };
        } catch (err) {
            return { title: '', statusCode: 404, courseRelate: {}, query, asPath: _.get(url, 'asPath', '/') };
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            directTab: '1',
            teacher: {}
        };
    }
    componentDidUpdate() {
        const firstNavLinks = document.querySelectorAll('.pageHeaderStyle ul li:first-child a');
        const mainNavLinks = document.querySelectorAll('.pageHeaderStyle ul li a');
        firstNavLinks.forEach(link => {
            link.classList.add('active');
        });
        window.addEventListener('scroll', event => {
            const fromTop = window.scrollY;

            mainNavLinks.forEach(link => {
                const section = document.querySelector(link.hash);

                if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }
    handleToggle = tab => {
        if (this.state.directTab !== tab || this.state.directTab !== '') {
            this.setState({ directTab: tab });
        }
        if (this.state.directTab === tab) {
            this.setState({ directTab: '' });
        }
    };
    onSort = () => {};

    getDataCount = id => {
        const { ratingActions } = this.props;
        ratingActions.getStatisticsRating({ enityId: id });
    };
    render() {
        const { course: { courseDetail = {} }, user: { userDetail = {} }, courseRelate = {} } = this.props;
        const { title, authInfo, cart, cartActions, rating: { rateData = {} }, asPath } = this.props;
        const params = {
            id: courseDetail.id,
            name: courseDetail.name
        };
        const status = _.get(courseDetail, 'active', 0);
        return (
            <Fragment>
                <Helmet
                    title={`${_.get(courseDetail, 'name', title)}`}
                    meta={[
                        {
                            name: 'description',
                            content: _.trim(_.get(courseDetail, 'metaDescription'))
                        },
                        {
                            name: 'keywords',
                            content: _.get(courseDetail, 'metaKeywords')
                        },
                        {
                            property: 'og:title',
                            content: _.get(courseDetail, 'name', title)
                        },
                        {
                            name: 'og:description',
                            content: _.get(courseDetail, 'metaDescription')
                        },
                        {
                            property: 'og:image',
                            content: _.get(courseDetail, 'courseAvatar')
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
                    link={[{ rel: 'canonical', href: BASE_LINK_NL + asPath }]}
                />
                <Helmet>
                    <script type="application/ld+json">
                        {`{
                "@context" : "http://schema.org",
                "@type" : "WebSite",
                "name" : "${_.get(courseDetail, 'name', title)}",
                "alternateName" : "${_.trim(_.get(courseDetail, 'metaDescription'))}",
                "dateModified": "",
                "url" : ""
                }`}
                    </script>
                </Helmet>
                <div className={`main-container ${style.singlePage}`}>
                    {parseInt(status, 0) === 1 && (
                        <Sticky>
                            <PageHeader
                                authInfo={authInfo}
                                data={courseDetail}
                                courseBought={false}
                                cart={cart}
                                cartActions={cartActions}
                                rateData={rateData}
                                query={this.props.query}
                            />
                        </Sticky>
                    )}

                    <div className="site-main">
                        <div className="container">
                            {parseInt(status, 0) === 1 ? (
                                <div className="row">
                                    <div className="col-12 col-lg-8 site-content">
                                        <div className="visible-small">
                                            <BoxMeta authInfo={authInfo} data={courseDetail} courseBought={false} />
                                        </div>
                                        <div id="thong-tin-chung" className={style.boxSingle}>
                                            <h3 className={style.titleBox}>Nội dung khóa học</h3>
                                            <div
                                                className="entryContent"
                                                dangerouslySetInnerHTML={{ __html: courseDetail.courseContent }}
                                            />
                                        </div>
                                        <div className={style.boxSingle}>
                                            <h3 className={style.titleBox}>Đối tượng đào tạo</h3>
                                            <div className="entryContent">
                                                {/* <ul>
                                                <li>
                                                    Dành cho tất cả những ai sử dụng thường xuyên Power Point để phục vụ
                                                    thuyết trình, đặc biệt là Sinh Viên và Người đi làm.
                                                </li>
                                                <li>Độ tuổi : 19 - 40 tuổi</li>
                                            </ul> */}
                                                {courseDetail.trainingSubject}
                                            </div>
                                        </div>
                                        <div id="giao-trinh" className={style.boxSingle}>
                                            <h3 className={style.titleBox}>Giáo trình khóa học</h3>
                                            <div className="entryContent">
                                                <LessonList
                                                    courseName={courseDetail.name}
                                                    courseId={courseDetail.id}
                                                    chapters={courseDetail.chapters}
                                                    authInfo={authInfo}
                                                    courseBought={false}
                                                />
                                            </div>
                                        </div>
                                        <div id="danh-gia" className={style.boxSingle}>
                                            <h3 className={style.titleBox}>Đánh giá</h3>
                                            <div className="entryContent">
                                                <div
                                                    className="fb-like"
                                                    data-href={url.resolve(
                                                        BASE_LINK_NL,
                                                        courseDetailLink({ ...params })
                                                    )}
                                                    data-layout="standard"
                                                    data-action="like"
                                                    data-size="small"
                                                    data-show-faces="true"
                                                    data-share="true"
                                                />
                                                <RatingComponent
                                                    courseDetail={courseDetail}
                                                    rateData={rateData}
                                                    getDataCount={this.getDataCount}
                                                />
                                            </div>
                                        </div>
                                        <div id="binh-luan" className={style.boxSingle}>
                                            <h3 className={style.titleBox}>Bình luận</h3>
                                            <div id="fb-root" className="entryContent">
                                                <NoSSR>
                                                    <CommentComponent courseDetail={courseDetail} />
                                                </NoSSR>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 widget-area">
                                        <div className="visible-large">
                                            <BoxMeta authInfo={authInfo} data={courseDetail} courseBought={false} />
                                        </div>
                                        <InfoAuthor user={userDetail} />
                                        <RelatedPost
                                            courseRelate={courseRelate}
                                            cartActions={cartActions}
                                            cart={cart}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className={style.noteText}>
                                    {/* <span>404</span> */}
                                    Xin lỗi, khóa học này đang tạm thời không hiệu lực thời điểm hiện tại. Chúng tôi rất
                                    xin lỗi vì sự bất tiện này.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

DetailCourse.defaultProps = {
    authInfo: {},
    authActions: {}
};

DetailCourse.propTypes = {
    statusCode: PropTypes.number,
    authInfo: PropTypes.object,
    course: PropTypes.object,
    authActions: PropTypes.object,
    userActions: PropTypes.object,
    orderActions: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    user: PropTypes.object,
    order: PropTypes.object,
    title: PropTypes.string.isRequired,
    courseBought: PropTypes.bool,
    courseRelate: PropTypes.object,
    rating: PropTypes.object,
    ratingActions: PropTypes.object.isRequired,
    query: PropTypes.object,
    asPath: PropTypes.string
};
const mapStateToProps = state => {
    const { auth, course, user, order, cart, rating } = state;
    return { authInfo: auth, course, user, order, cart, rating };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        userActions: bindActionCreators(actions.userActions, dispatch),
        orderActions: bindActionCreators(actions.orderActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        ratingActions: bindActionCreators(actions.ratingActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailCourse);
