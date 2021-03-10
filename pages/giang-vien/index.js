import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import NavHeader from './components/NavHeader';
import ListContent from './components/ListContent';

class TeacherInfoPage extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);
        try {
            await Promise.all([courseActions.listCourse({ limit: 8 })]);
        } catch (err) {
            return { title: 'Thông tin giảng viên' };
        }
        return {
            title: 'Thông tin giảng viên'
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pagination: {
                    current: 1,
                    perPage: 8
                }
            }
        };
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { courseActions } = this.props;
        const { pagination } = this.state.params;
        courseActions.listCourse({
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage
        });
    };
    render() {
        const { params } = this.state;
        const { title, course: { listCourse }, cart, cartActions, courseActions } = this.props;
        return (
            <Fragment>
                <Helmet title={`${title}`} meta={[{ property: 'og:title', content: `${title}` }]} />
                <div className={style.pageWrapper}>
                    <NavHeader />
                    <div className="site-main">
                        <div className="container">
                            <ListContent
                                listCourse={listCourse}
                                cart={cart}
                                cartActions={cartActions}
                                courseActions={courseActions}
                                updateParams={this.updateParams}
                                pagination={params.pagination}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
TeacherInfoPage.defaultProps = {
    authInfo: {},
    authActions: {}
};

TeacherInfoPage.propTypes = {
    authInfo: PropTypes.object,
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    history: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    categoryActions: PropTypes.object,
    category: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, course, cart } = state;
    return { authInfo: auth, course, cart };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TeacherInfoPage);
