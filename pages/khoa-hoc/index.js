import styles from './styles.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import classnames from 'classnames';
import { actions } from 'src/redux-utils';
import FilterSidebar from 'src/shared/components/Filter/index';
import CategoryComponent from 'src/shared/components/Course/category';
import { BASE_LINK_NL } from 'src/constants/config';
import Router from 'next/router';
class Course extends Component {
    static async getInitialProps(context) {
        const { store, url, query } = context;
        const { courseActions, categoryActions } = mapDispatchToProps(store.dispatch);
        try {
            let filterCourses = JSON.stringify([
                { operator: 'eq', value: query.id, property: 'categoryId' },
                { operator: 'eq', value: '1', property: 'active' }
            ]);
            if (!query.id) {
                filterCourses = JSON.stringify([{ operator: 'eq', value: '1', property: 'active' }]);
            }
            const params = {
                filter: JSON.stringify([
                    { operator: 'eq', value: 'website', property: 'type' },
                    { operator: 'eq', value: '1', property: 'active' }
                ])
            };
            const paramsTop = {
                filter: JSON.stringify([
                    { operator: 'eq', value: 'website', property: 'type' },
                    { operator: 'eq', value: '1', property: 'active' },
                    { operator: 'eq', value: 'true', property: 'publish' }
                ]),
                limit: 8,
                start: 0
            };
            const paramsCourseMaxPrice = { limit: 1, sort: JSON.stringify([{ property: 'price', direction: 'DESC' }]) };
            const paramsCourseMinPrice = { limit: 1, sort: JSON.stringify([{ property: 'price', direction: 'ASC' }]) };

            const requestResult = await Promise.all([
                courseActions.getPrice(paramsCourseMaxPrice),
                courseActions.getPrice(paramsCourseMinPrice),
                courseActions.listCourse({ limit: 9, filter: filterCourses }),
                categoryActions.listCateTop(paramsTop),
                categoryActions.listCategory(params)
            ]);
            const [maxPrice, minPrice] = requestResult;
            if (query.id) {
                await Promise.all([categoryActions.getCategory(query.id)]);
            }
            return {
                title: 'Danh mục khóa học',
                maxPrice,
                minPrice,
                asPath: _.get(url, 'asPath', '/')
            };
        } catch (err) {
            return {
                title: '',
                asPath: _.get(url, 'asPath', '/')
            };
        }
    }

    constructor(props) {
        super(props);
        const categoryId = _.get(props, 'url.query.id');    
        const categoryIds = _.get(this.props, 'category.categoryData.rows', []);
        this.state = {
            isShowInfo: '',
            params: {
                categoryIds: categoryId ? [parseInt(categoryId, 10)] : categoryIds.map(item => item.id).concat([-1]),
                priceRange: {
                    min: props.minPrice,
                    max: props.maxPrice
                },
                sort: '',
                pagination: {
                    current: 1,
                    perPage: 9
                }
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        const oldId = _.get(this.props, 'url.query.id');
        const newId = _.get(nextProps, 'url.query.id');
        if (oldId !== newId) {
            this.setState({...this.state, params: { ...this.state.params, categoryIds: [parseInt(newId, 10)] } });
        }
    }
    updateParamDiMount(prevState, newId) {
        this.setState({
            params: { ...prevState.params, categoryIds: [parseInt(newId, 10)]}
        });
    }


    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { courseActions } = this.props;
        const { sort, categoryIds, priceRange, pagination } = this.state.params;
        const filter = JSON.stringify([
            { operator: 'in', value: categoryIds, property: 'categoryId' },
            { operator: 'eq', value: '1', property: 'active' }
        ]);
        courseActions.listCourse({
            sort,
            filter,
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage,
            prices: JSON.stringify(priceRange)
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
    getListRootCategories = () => {
        return _.get(this.props, 'category.categoryData.rows', []).filter(item => !item.parent_id && item.active === 1);
    };
    render() {
        const {
            title,
            course: { listCourse },
            category: { categoryInfo = {} },
            common: { seoCommon = {} },
            cart,
            cartActions,
            courseActions,
            minPrice,
            maxPrice,
            asPath
        } = this.props;
        const { isShowInfo, filterId, params } = this.state;
        //console.log(seoCommon);
        const metaDescription = _.get(seoCommon, 'shop_metaDescription');
        const metaKeywords = _.get(seoCommon, 'shop_metaKeywords');
        const picture = _.get(seoCommon, 'shop_featuredImage');
        //console.log(Router, asPath);
        return (
            <Fragment>
                <Helmet
                    title={_.get(categoryInfo, 'name', title)}
                    meta={[
                        {
                            name: 'description',
                            content: _.trim(_.get(categoryInfo, 'metaDescription', metaDescription))
                        },
                        {
                            name: 'keywords',
                            content: _.get(categoryInfo, 'metaKeywords', metaKeywords)
                        },
                        {
                            property: 'og:title',
                            content: _.get(categoryInfo, 'name', title)
                        },
                        {
                            property: 'og:image',
                            content: _.get(categoryInfo, 'picture', picture)
                        },
                        {
                            property: 'og:image:width',
                            content: '720'
                        },
                        {
                            property: 'og:image:height',
                            content: '480'
                        }
                    ]}
                    link={[{ rel: 'canonical', href: BASE_LINK_NL + asPath }]}
                />
                <Helmet>
                    <script type="application/ld+json">
                        {`{
                "@context" : "http://schema.org",
                "@type" : "WebSite",
                "name" : "${_.get(categoryInfo, 'name', title)}",
                "alternateName" : "${_.trim(_.get(categoryInfo, 'metaDescription', metaDescription))}",
                "dateModified": "",
                "url" : ""
                }`}
                    </script>
                </Helmet>
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
                            <h2>Danh sách khoá học</h2>
                            <p>
                                Với 500 khoá học online từ <strong>Kaixin.vn</strong>, bạn có thể học bất cứ lúc nào,
                                bất cứ nơi đâu bạn muốn.
                            </p>
                        </div>
                    </div>
                    <div className="site-main">
                        <div className="container">
                            <div className="row">
                                <CategoryComponent
                                    handleToggle={this.handleToggle}
                                    isShowInfo={isShowInfo}
                                    listCourse={listCourse}
                                    cart={cart}
                                    cartActions={cartActions}
                                    courseActions={courseActions}
                                    filterId={filterId}
                                    updateParams={this.updateParams}
                                    pagination={params.pagination}
                                />
                                <FilterSidebar
                                    data={this.getListRootCategories()}
                                    isShowInfo={isShowInfo}
                                    categoryIds={params.categoryIds}
                                    updateCategoryIds={ids => this.updateParams({ categoryIds: ids })}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
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
Course.defaultProps = {
    authInfo: {},
    authActions: {}
};

Course.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    title: PropTypes.string.isRequired,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    categoryActions: PropTypes.object,
    category: PropTypes.object,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    common: PropTypes.object,
    asPath: PropTypes.string
};

const mapStateToProps = state => {
    const { auth, course, cart, category, common } = state;
    return { authInfo: auth, course, cart, category, common };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
