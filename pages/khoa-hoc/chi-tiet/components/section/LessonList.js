import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Modal } from 'antd';
import _ from 'lodash';
import { redirect } from 'src/helpers/Common';
import { learningLink } from 'src/helpers/RouteURL';
import Duration from './Duration';
import Link from 'next/link';
import { makeSlug } from 'src/helpers/Common';
const Panel = Collapse.Panel;

class LessonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            lessonView: {}
        };
        this.video = React.createRef();
    }

    showModal = item => {
        Array.from(document.querySelectorAll('video'))
            .filter(video => !video.paused)
            .forEach(video => video.pause());
        this.setState({
            visible: true,
            lessonView: item
        });
    };

    handleOk() {
        this.setState(
            {
                visible: false,
                lessonView: {}
            },
            () => {
                this.video.current.pause();
            }
        );
    }

    handleCancel() {
        this.setState(
            {
                visible: false,
                lessonView: {}
            },
            () => {
                this.video.current.pause();
            }
        );
    }
    onRedirect = (courseName, courseId, lessonId) => {
        redirect(
            learningLink({
                courseId,
                courseName,
                lessonId
            })
        );
    };
    renderLesson = (data = {}) => {
        const { courseName, courseId, courseBought, lesson } = this.props;
        const status = data.checked ? 'learnt' : 'notlearn';
        const play = lesson.id === data.id ? 'learning' : 'none';
        const learningPage = `/khoa-hoc/bai-hoc?courseId=${courseId}&lessonId=${data.id}&slug=${makeSlug(courseName)}`
        const learningURL = learningLink({courseId, courseName, lessonId: data.id});
        return (
            <li key={data.id} className={style.lessonPost}>
                {courseBought && (
                    <span className={`status ${status}`}>
                        {status === 'notlearn' && play === 'learning' && <i className="zmdi zmdi-time" />}
                        {status === 'learnt' && play === 'learning' && <i className="zmdi zmdi-check-circle" />}
                        {(status === 'learnt' || status === 'notlearn') &&
                            play === 'none' && <i className="zmdi zmdi-check-circle" />}
                    </span>
                )}
                {courseBought ? (
                    <Link href={learningPage} as={learningURL}>
                        <span className="name">
                            {data.name}
                        </span>
                    </Link>
                ) : data.try && data.mediaType !== 'pdf' ? (
                    <span className="name" onClick={() => this.showModal(data)}>
                        {data.name}
                    </span>
                ) : (
                    <span className="name" style={{cursor: 'default'}}>{data.name}</span>
                )}
                {data.mediaType === 'video' &&
                    (courseBought ? (
                        play === 'learning' ? (
                            'Đang xem...'
                        ) : (
                            <Link href={learningPage} as={learningURL}>
                                <span className={`icon ${data.mediaType}`} />
                            </Link>
                        )
                    ) : data.try ? (
                        <span className={`icon ${data.mediaType}`} onClick={() => this.showModal(data)} />
                    ) : (
                        <span className={`icon ${data.mediaType}`}/>
                    ))}
                {data.mediaType === 'pdf' &&
                    (courseBought ? (
                        play === 'learning' ? (
                            'Đang đọc...'
                        ) : (
                            <Link href={learningPage} as={learningURL}>
                                <span className={`icon ${data.mediaType}`} />
                            </Link>
                        )
                    ) : (
                        <span className={`icon ${data.mediaType}`} />
                    ))}
                <span className="time">
                    {(data.mediaType === 'video' || data.mediaType === 'audio') && (
                        <Duration seconds={data.duration ? data.duration : 0} />
                    )}
                </span>

                {!courseBought && (
                    <span className="try-tag">
                        {data.try && data.mediaType !== 'pdf' ? (
                            <img src="/static/assets/images/courses/try-tag.png" alt="Học thử" />
                        ) : null}
                    </span>
                )}
            </li>
        );
    };

    render() {
        const { chapters, lesson } = this.props;
        const { lessonView = {} } = this.state;
        const chapterElements = chapters.map((item = {}) => (
            <Panel header={item.name} key={item.id}>
                <ul>{(item.lessons || []).map(this.renderLesson)}</ul>
            </Panel>
        ));
        return (
            <Fragment>
                <div className={`${style.boxLesson}`}>
                    <Collapse defaultActiveKey={(lesson.chapterId || _.get(chapters, '[0].id', 0)).toString()}>
                        {chapterElements}
                    </Collapse>
                    <Modal
                        title={lessonView.name || ''}
                        visible={this.state.visible}
                        onOk={() => this.handleOk()}
                        onCancel={() => this.handleCancel()}
                        width="80%"
                        footer={null}
                    >
                        <video
                            controls
                            ref={this.video}
                            src={lessonView.media}
                            style={{ width: '100%' }}
                            controlsList="nodownload"
                        />
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

LessonList.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    chapters: PropTypes.array,
    courseBought: PropTypes.bool,
    courseName: PropTypes.string,
    courseId: PropTypes.number,
    lesson: PropTypes.object
};

LessonList.defaultProps = {
    chapters: [],
    lesson: {}
};

export default LessonList;
