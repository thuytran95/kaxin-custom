import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
//import Link from 'next/link';
//import { Button } from 'reactstrap';

class BoxMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { data = {}, courseBought } = this.props;

        return (
            <Fragment>
                <div className={`${style.boxMeta}`}>
                    <div className={style.frame}>
                        {!courseBought ? (
                            data.courseVideo ? (
                                <video width="100%" controls controlsList="nodownload">
                                    <source src={data.courseVideo} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={data.courseAvatar || '/static/assets/images/courses/default.png'}
                                    alt="Smiley face"
                                    width="100%"
                                />
                            )
                        ) : (
                            <Progress type="circle" percent={Math.round(data.lessonSuccess)} />
                        )}
                    </div>
                    <ul>
                        <li>
                            <strong>Chủ đề</strong>
                            <span>{data.name ? data.name : ''}</span>
                        </li>
                        <li>
                            <strong>Số lượng chương</strong>
                            <span>{data.totalChapter ? data.totalChapter : '0'} chương</span>
                        </li>
                        <li>
                            <strong>Số lượng bài học</strong>
                            <span>{data.totalLesson ? data.totalLesson : '0'} bài học</span>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

BoxMeta.propTypes = {
    data: PropTypes.object,
    courseBought: PropTypes.bool
};

export default BoxMeta;
