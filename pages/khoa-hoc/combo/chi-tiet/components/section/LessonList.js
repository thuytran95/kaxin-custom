import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import _ from 'lodash';
import PriceComponent from 'src/shared/components/common/Price';
import { CourseLink } from 'src/shared/components/Link';
const Panel = Collapse.Panel;

class LessonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            lessonView: {}
        };
    }
    renderLesson = (data = {}) => {
        return (
            <li key={data.id} className={style.lessonPost}>
                <span className="lecuter">{data.lecturerId ? data.lecturerId.fullname : '...'}</span>
                <span className="lesson">
                    <b>Bài học: </b>
                    {data.totalLesson ? data.totalLesson : 0} bài
                </span>
                <span className="chapter">
                    <b>Số chương: </b>
                    {data.totalChapter ? data.totalChapter : 0} chương
                </span>
                <span className="price">
                    <b>Giá gốc: </b>
                    <PriceComponent value={data.price} /> đ
                </span>
            </li>
        );
    };

    render() {
        const { chapters, lesson } = this.props;
        const chapterElements = chapters.map((item = {}) => (
            <Panel header={<CourseLink {...item} />} key={item.id}>
                <ul>{this.renderLesson(item)}</ul>
            </Panel>
        ));
        return (
            <Fragment>
                <div className={`${style.boxLesson}`}>
                    <Collapse defaultActiveKey={(lesson.chapterId || _.get(chapters, '[0].id', 0)).toString()}>
                        {chapterElements}
                    </Collapse>
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
