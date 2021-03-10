import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import _ from 'lodash';
import Link from 'next/link';
import { Cube as Overlay } from 'src/shared/components/loading';
import AccountPageLayout from '../layout';
import MyCourseItem from 'src/shared/components/Course/MyCourseItem';

class MyCourseComponent extends Component {
    static async getInitialProps(context) {
        return {
            layout: 'auth',
            requireAuth: true,
            title: 'Khóa học của tôi'
        };
    }
    state = {
        courses: {},
        isFetching: true
    };
    componentDidMount() {
        const { authActions } = this.props;

        authActions.getMyCourses().then(res => {
            this.setState({ isFetching: false });
            this.setState({ courses: _.get(res, 'data.data', {}) });
        });
    }
    render() {
        const { isFetching, courses } = this.state;
        const { title, user, userActions, ...remains } = this.props;
        const items = _.get(courses, 'rows', []);
        return (
            <Fragment>
                <Overlay loading={isFetching} />
                {!isFetching && (
                    <AccountPageLayout title={title} {...remains}>
                        <div className={style.contentWrapper}>
                            {items && items.length > 0 ? (
                                <div className="row">
                                    {items.map(item => (
                                        <div key={item.id} className={`col-6 col-lg-4 ${style.courseItems}`}>
                                            <MyCourseItem
                                                user={user}
                                                userActions={userActions}
                                                data={item}
                                                courseBought
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={style.note}>
                                    Bạn chưa có khóa học nào.
                                    <Link href="/">
                                        <a> Click vào đây </a>
                                    </Link>
                                    để mua khóa học nhé!
                                </div>
                            )}
                        </div>
                    </AccountPageLayout>
                )}
            </Fragment>
        );
    }
}

MyCourseComponent.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderActions: PropTypes.object,
    user: PropTypes.object,
    userActions: PropTypes.object,
    courseInfo: PropTypes.object,
    title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const { auth, order, user } = state;
    return { authInfo: auth, order, user };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        orderActions: bindActionCreators(actions.orderActions, dispatch),
        userActions: bindActionCreators(actions.userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCourseComponent);
