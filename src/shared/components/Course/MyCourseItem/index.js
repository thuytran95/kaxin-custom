import './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MyCourseLink, ContinueLink } from 'src/shared/components/Link';
import { Progress } from 'antd';
import _ from 'lodash';
class MyCourseItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // const { data, userActions } = this.props;
        // if (data.course && data.course.lecturerId) {
        //     userActions.getUserDetail(data.course.lecturerId);
        // }
    }
    render() {
        const { data = {} } = this.props;
        const courseAvatar = !_.isEmpty(data.course.courseAvatar)
            ? data.course.courseAvatar
            : '/static/assets/images/course1.png';
        return (
            <Fragment>
                <div className="itemCourse">
                    <div className="inner">
                        <div
                            className="imgCourse"
                            style={{
                                backgroundImage: `url(${courseAvatar})`
                            }}
                        >
                            <MyCourseLink id={data.courseId} name={data.course.name} />
                        </div>
                        <div className="infoCourse">
                            <h4>
                                <MyCourseLink id={data.courseId} name={data.course.name} />
                            </h4>
                            <Progress percent={data.process} status="active" />
                            <div className="readmore">
                                <ContinueLink id={data.courseId} name={data.course.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
MyCourseItem.propTypes = {
    data: PropTypes.shape({
        coursesId: PropTypes.string,
        courseName: PropTypes.string
    }),
    order: PropTypes.object,
    orderActions: PropTypes.object,
    user: PropTypes.object,
    userActions: PropTypes.object
};

export default MyCourseItem;
