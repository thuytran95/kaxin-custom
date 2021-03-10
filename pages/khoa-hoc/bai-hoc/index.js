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
import { Cube as Loading } from 'src/shared/components/loading';
//import ReactPlayer from './components/ReactPlayer';
//import VideoPlayer from './components/VideoPlayer';
import VideoReact from './components/video-react';
import VideoPlayer from './components/ReactPlayer';
import LearningProgress from './components/LearningProgress';
import Navbar from './components/Navbar';
import dynamic from 'next/dynamic';
import axios from 'axios';
import ReactHLS  from 'react-hls';
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
    state = {
        mediaStream: null,
        mediaFile: null,
        isChecking: true
    };
    componentDidMount() {
        const { course } = this.props;
        const { lessonDetail = {} } = course;
        const promises = [];
        promises.push(lessonDetail.mediaStream ? axios.head(lessonDetail.mediaStream).catch(err => {return null}) : Promise.resolve());
        promises.push(lessonDetail.media ? axios.head(lessonDetail.media).catch(err => {return null}) : Promise.resolve());
        return Promise.all(promises)
            .then(results => {
                this.setState({
                    mediaStream: !!results[0],
                    mediaFile: !!results[1],
                    isChecking: false
                });
            })
            .catch(err => {
                this.setState({
                    isChecking: false
                });
            });
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
        const { mediaStream, mediaFile } = this.state;
        const { course, title } = this.props;
        const { lessonDetail = {} } = course;      
        return (
            <Fragment>
                <Helmet title={title} meta={[{ property: 'og:title', content: title }]} />
                <div className={`row ${styles.page}`}>
                    <div className={`col-md-9 ${styles.col}`}>
                        <Navbar course={course} onClickNext={this.nextLesson} onClickPrev={this.prevLesson} />
                        {lessonDetail.mediaType === 'video' ? (
                            <Fragment>
                                <Loading loading={this.state.isChecking}/>
                                {mediaStream && !_.isNull(mediaStream) ? (
                                     <ReactHLS url={lessonDetail.mediaStream} width="100%" height="100%"/>
                                    // <VideoReact
                                    //     url={lessonDetail.mediaStream}
                                    //     poster={lessonDetail.mediaThumbUri}
                                    //     track={lessonDetail.mediaSubUri}
                                    //     onFinishWatching={this.finishLesson}
                                    //     onClickPrev={this.prevLesson}
                                    //     onClickNext={this.nextLesson}
                                    //     type="m3u8"
                                    // />
                                ) : mediaFile && !_.isNull(mediaFile) ? (
                                    <VideoPlayer
                                        url={lessonDetail.media}
                                        track={lessonDetail.mediaSubUri}
                                        onFinishWatching={this.finishLesson}
                                        onClickPrev={this.prevLesson}
                                        onClickNext={this.nextLesson}
                                        type="video"
                                    />
                                ) : (
                                    <p className={styles.textNote}>
                                        {/* Không tồn tại video */}
                                    </p>
                                )}
                            </Fragment>
                        ) : null}
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
                        <div className={styles.colInner}>
                            <LearningProgress course={course} />
                        </div>
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
