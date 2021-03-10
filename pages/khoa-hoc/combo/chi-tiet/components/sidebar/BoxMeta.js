import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import { Progress } from 'antd';
//import Link from 'next/link';
//import { Button } from 'reactstrap';

class BoxMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { data = {} } = this.props;
        return (
            <Fragment>
                <div className={`${style.boxMeta}`}>
                    <div className={style.frame}>
                        <img
                            src={data.avatarUri || '/static/assets/images/courses/default.png'}
                            alt={data.name ? data.name : 'MCBooks'}
                            width="100%"
                        />
                    </div>
                    <ul>
                        <li>
                            <strong>Chủ đề</strong>
                            <span>{data.name ? data.name : ''}</span>
                        </li>
                        <li>
                            <strong>Số lượng khóa học</strong>
                            <span>{data.listCourses.length} khóa học</span>
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
