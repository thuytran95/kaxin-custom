import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import PageHeader from './components/PageHeader';
import Sticky from 'react-sticky-el';

import LessonList from './components/section/LessonList';
import BoxMeta from './components/sidebar/BoxMeta';

class DetailCourse extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);

        try {
            await courseActions.getCombos(parseInt(query.id, 0));
            return {
                title: 'Chi tiết combos khóa học'
            };
        } catch (err) {
            return { title: 'Chi tiết combos khóa học', statusCode: 404, courseRelate: {} };
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            directTab: '1'
        };
    }

    handleToggle = tab => {
        if (this.state.directTab !== tab || this.state.directTab !== '') {
            this.setState({ directTab: tab });
        }
        if (this.state.directTab === tab) {
            this.setState({ directTab: '' });
        }
    };

    render() {
        const { title, authInfo, course: { infoCombo = {} } } = this.props;
        //console.log(infoCombo);
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
                <div className={`main-container ${style.singlePage}`}>
                    <Sticky>
                        <PageHeader authInfo={authInfo} data={infoCombo} />
                    </Sticky>

                    <div className="site-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-lg-8 site-content">
                                    <div className="visible-small">
                                        <BoxMeta authInfo={authInfo} data={infoCombo} />
                                    </div>
                                    <div id="thong-tin-chung" className={style.boxSingle}>
                                        <h3 className={style.titleBox}>Nội dung combo</h3>
                                        <div
                                            className="entryContent"
                                            dangerouslySetInnerHTML={{ __html: infoCombo.introduce }}
                                        />
                                    </div>
                                    <div className={style.boxSingle}>
                                        <h3 className={style.titleBox}>Đối tượng đào tạo</h3>
                                        <div
                                            className="entryContent"
                                            dangerouslySetInnerHTML={{ __html: infoCombo.trainingObject }}
                                        />
                                    </div>
                                    <div id="chi-tiet-combo" className={style.boxSingle}>
                                        <h3 className={style.titleBox}>Chi tiết combo</h3>
                                        <div className="entryContent">
                                            <LessonList
                                                courseName={infoCombo.name}
                                                courseId={infoCombo.id}
                                                chapters={infoCombo.listCourses}
                                                authInfo={authInfo}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 widget-area">
                                    <div className="visible-large">
                                        <BoxMeta authInfo={authInfo} data={infoCombo} />
                                    </div>
                                </div>
                            </div>
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
    ratingActions: PropTypes.object.isRequired
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
