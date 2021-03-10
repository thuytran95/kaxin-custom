import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import TeacherComponent from 'src/shared/components/Account/Teacher/Course/index';

class TeachingPage extends Component {
    static async getInitialProps(context) {
        return {
            title: 'Khóa học tôi giảng dạy',
            layout: 'auth',
            requireAuth: true
        };
    }
    state = {
        params: {
            sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }]),
            pagination: {
                current: 1,
                perPage: 10
            }
        }
    };
    componentDidMount() {
        this.getData();
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { courseActions } = this.props;
        const { pagination } = this.state.params;
        courseActions
            .teacherCourses({
                limit: pagination.perPage,
                start: (pagination.current - 1) * pagination.perPage
            })
            .finally();
    };
    render() {
        const { params } = this.state;
        const { title, course: { teacherCourses = {} }, ...remains } = this.props;
        return (
            <Fragment>
                <AccountPageLayout title={title} {...remains}>
                    <TeacherComponent
                        data={teacherCourses}
                        updateParams={this.updateParams}
                        pagination={params.pagination}
                    />
                </AccountPageLayout>
            </Fragment>
        );
    }
}
TeachingPage.defaultProps = {
    courseActions: {},
    course: {}
};

TeachingPage.propTypes = {
    title: PropTypes.string.isRequired,
    courseActions: PropTypes.object,
    course: PropTypes.object
};

const mapStateToProps = state => {
    const { course } = state;
    return { course };
};

const mapDispatchToProps = dispatch => {
    return {
        courseActions: bindActionCreators(actions.courseActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TeachingPage);
