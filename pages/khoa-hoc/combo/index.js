import styles from './styles.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
//import _ from 'lodash';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import classnames from 'classnames';
import { actions } from 'src/redux-utils';
import FilterSidebar from 'src/shared/components/Filter/combo/index';
import ComboComponent from 'src/shared/components/Course/combo';
// import { Select } from 'antd';

class ComboCourse extends Component {
    static async getInitialProps(context) {
        //const { store, query } = context;
        const { store } = context;
        const { courseActions } = mapDispatchToProps(store.dispatch);
        try {
            const filterCombos = JSON.stringify([{ operator: 'eq', value: 'true', property: 'status' }]);
            await courseActions.listCombos({
                limit: 6,
                filter: filterCombos,
                sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }])
            });
            return {
                title: 'Danh mục Combo khóa học'
            };
        } catch (err) {
            return {
                title: 'Danh mục Combo khóa học'
            };
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: '',
            params: {
                priceRange: {
                    min: props.course.listCombos.minPrice,
                    max: props.course.listCombos.maxPrice
                },
                sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }]),
                pagination: {
                    current: 1,
                    perPage: 6
                }
            }
        };
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { courseActions } = this.props;
        const { sort, priceRange, pagination } = this.state.params;
        const filter = JSON.stringify([
            { operator: 'eq', value: 'true', property: 'status' },
            { operator: 'between', value: [priceRange.min, priceRange.max], property: 'price' }
        ]);
        courseActions.listCombos({
            sort,
            filter,
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage
        });
    };
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };
    closeToggle = () => {
        this.setState({ isShowInfo: '' });
    };
    render() {
        const { title, course: { listCombos = {} }, courseActions } = this.props;
        const { isShowInfo, params } = this.state;
        //console.log('listCombos: ', listCombos);
        return (
            <Fragment>
                <Helmet
                    title={`${title}`}
                    meta={[
                        {
                            property: 'og:title',
                            content: title
                        }
                    ]}
                />
                <div className={`main-container ${styles.category}`}>
                    <div
                        className={`closeModal ${classnames({
                            active: isShowInfo !== ''
                        })}`}
                        onClick={() => {
                            this.closeToggle();
                        }}
                    />
                    <div className={styles.headerTitlePage}>
                        <div className="container">
                            <h2>Danh sách combo khoá học</h2>
                            <p>
                                Với 500 khoá học online từ <strong>Kaixin.vn</strong>, bạn có thể học bất cứ lúc nào,
                                bất cứ nơi đâu bạn muốn.
                            </p>
                        </div>
                    </div>
                    <div className="site-main">
                        <div className="container">
                            <div className="row">
                                <ComboComponent
                                    handleToggle={this.handleToggle}
                                    isShowInfo={isShowInfo}
                                    listCombos={listCombos}
                                    courseActions={courseActions}
                                    updateParams={this.updateParams}
                                    pagination={params.pagination}
                                />
                                <FilterSidebar
                                    isShowInfo={isShowInfo}
                                    updateParams={this.updateParams}
                                    minPrice={listCombos.minPrice}
                                    maxPrice={listCombos.maxPrice}
                                    initialPriceRange={params.priceRange}
                                    updatePriceRange={({ min = params.priceRange.min, max = params.priceRange.max }) =>
                                        this.updateParams({ priceRange: { min, max } })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
ComboCourse.defaultProps = {
    authInfo: {},
    authActions: {}
};

ComboCourse.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const { auth, course } = state;
    return { authInfo: auth, course };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComboCourse);
