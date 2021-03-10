import styles from './styles.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import _ from 'lodash';
import { redirect } from 'src/helpers/Common';
import { learningLink } from 'src/helpers/RouteURL';
import VideoPlayer from './components/VideoPlayer';
import LearningProgress from './components/LearningProgress';
import Navbar from './components/Navbar';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(import('src/components/pdf-viewer/PDFViewer'), { ssr: false });
class LearningPage extends Component {
    static async getInitialProps(context) {
        const { store, query } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);
        try {
            await courseActions.getCourse(query.courseId);
            await courseActions.getLesson(query.lessonId);
            return {
                layout: 'empty',
                requireAuth: true,
                title: 'Học bài'
            };
        } catch (err) {
            return {
                layout: 'empty',
                requireAuth: true
            };
        }
    }

    redirectToLesson = id => {
        const { course } = this.props;
        const { courseDetail = {} } = course;
        redirect(
            learningLink({
                courseId: courseDetail.id,
                courseName: courseDetail.name,
                lessonId: id
            })
        );
    };

    prevLesson = () => {
        const { course } = this.props;
        const { courseDetail = {}, lessonDetail = {} } = course;
        const lessonIds = (courseDetail.chapters || []).reduce((result, chapter) => {
            return result.concat(chapter.lessons.map(lesson => lesson.id));
        }, []);
        const prevIndex = lessonIds.indexOf(lessonDetail.id) - 1;
        if (prevIndex >= 0) this.redirectToLesson(lessonIds[prevIndex]);
    };

    nextLesson = () => {
        const { course } = this.props;
        const { courseDetail = {}, lessonDetail = {} } = course;
        const lessonIds = (courseDetail.chapters || []).reduce((result, chapter) => {
            return result.concat(chapter.lessons.map(lesson => lesson.id));
        }, []);
        const nextIndex = lessonIds.indexOf(lessonDetail.id) + 1;
        if (nextIndex < lessonIds.length) {
            this.redirectToLesson(lessonIds[nextIndex]);
        } else {
            window.location.reload(true);
        }
    };

    finishLesson = () => {
        const { course, courseActions } = this.props;
        courseActions.finishLesson(_.get(course, 'lessonDetail.id')).finally(() => {
            if (
                _.get(course, 'lessonDetail.mediaType') === 'video' ||
                _.get(course, 'lessonDetail.mediaType') === 'audio'
            ) {
                this.nextLesson();
            }
        });
    };

    render() {
        const { course, title } = this.props;
        const { lessonDetail = {} } = course;
        //console.log(lessonDetail);
        return (
            <Fragment>
                <Helmet title={title} meta={[{ property: 'og:title', content: title }]} />
                <div className={`row ${styles.page}`}>
                    <div className={`col-md-9 ${styles.col}`} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Navbar course={course} />
                        {lessonDetail.mediaType === 'video' && (
                            <VideoPlayer
                                src={lessonDetail.media}
                                style={{ flexGrow: 1 }}
                                onClickNext={this.nextLesson}
                                onClickPrev={this.prevLesson}
                                onFinishWatching={this.finishLesson}
                                durationVideo={lessonDetail.duration}
                            />
                        )}
                        {lessonDetail.mediaType === 'pdf' && (
                            <PDFViewer
                                url={lessonDetail.media}
                                onFinishWatching={this.finishLesson}
                                prevStep={this.prevLesson}
                                nextStep={this.nextLesson}
                            />
                        )}
                    </div>
                    <div className={`col-md-3 ${styles.col}`}>
                        <LearningProgress course={course} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

LearningPage.propTypes = {
    title: PropTypes.string,
    hasError: PropTypes.bool,
    statusCode: PropTypes.number,
    authInfo: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    lesson: PropTypes.object
};
LearningPage.defaultProps = {
    title: '',
    lesson: {}
};

const mapStateToProps = state => {
    const { auth, course } = state;
    return { authInfo: auth, course };
};

const mapDispatchToProps = dispatch => {
    return {
        courseActions: bindActionCreators(actions.courseActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage);
