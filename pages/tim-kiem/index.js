import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import ListCourse from 'src/shared/components/Course/ListCourse';
class SearchPage extends Component {
    static async getInitialProps(context) {
        const { store, query = {} } = context;

        const { courseActions } = mapDispatchToProps(store.dispatch);
        let filterData = {};
        const filter = [];
        const { keyword = '', course = '' } = query;
        try {
            if (keyword) {
                filter.push(
                    { operator: 'iLike', value: _.trim(keyword), property: 'name' },
                    { operator: 'eq', value: '1', property: 'active' }
                );
            }
            if (course) {
                filter.push({ operator: 'eq', value: course, property: 'categoryId' });
            }
            const params = {
                filter: JSON.stringify(filter)
            };
            if (keyword || course) {
                filterData = await courseActions.filterCourse(params);
            }
        } catch (err) {
            //
        }

        return {
            title: 'Kết quả tìm kiếm',
            filterData,
            query
        };
    }
    render() {
        const { title, filterData, cart, cartActions, query } = this.props;
        const items = _.get(filterData, 'rows', []);
        const keyword = _.get(query, 'keyword', '');
        return (
            <Fragment>
                <Helmet
                    title={`${title + ' - ' + keyword}`}
                    meta={[
                        {
                            property: 'og:title',
                            content: title
                        }
                    ]}
                />
                <div className={style.headerTitlePage}>
                    <div className="container">
                        <h2>Kết quả tìm kiếm </h2>
                    </div>
                </div>
                <div className={style.contentWrapper}>
                    <div className="site-main">
                        <div className="container">
                            <ListCourse cart={cart} cartActions={cartActions} items={items} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

SearchPage.propTypes = {
    title: PropTypes.string,
    filterData: PropTypes.object,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired,
    query: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, course, cart, category } = state;
    return { authInfo: auth, course, cart, category };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
