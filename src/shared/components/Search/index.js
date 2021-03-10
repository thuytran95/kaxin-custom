import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'reactstrap';
import _ from 'lodash';
//import { TreeSelect } from 'antd';
import Link from 'next/link';
import { CategoryLink } from 'src/shared/components/Link';

import { withRouter } from 'next/router';
import Route from 'src/helpers/Route';

//const TreeNode = TreeSelect.TreeNode;

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                keyword: '',
                course: ''
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const { router: { query } } = nextProps;
        this.setState({
            query: { ...this.state.query, ...query }
        });
    }

    onChangeSelect = course => {
        this.setState({
            query: { ...this.state.query, course }
        });
    };
    onChange = e => {
        const target = e.target;
        const name = target.name;
        const value =
            target.type === 'checkbox'
                ? target.checked
                : target.type === 'select' ? parseInt(target.value, 10) : target.value;
        this.setState({
            query: { ...this.state.query, [name]: value }
        });
    };
    onSearch = e => {
        e.preventDefault();
        const { query } = this.state;
        this.props.router.replace({
            pathname: Route.search,
            query: _.pickBy(query, _.identity),
            shallow: true
        });
    };
    renderTree = data => {
        const { children = [] } = data;
        return (
            <li key={data.id} className={children.length > 0 ? [style.hasMenuChildren] : ''} >
                <CategoryLink {...data} />
                {children.length > 0 ? (
                    <ul>{children.filter(item => item.active === 1).map(item => this.renderTree(item))}</ul>
                ) : (
                    ''
                )}
            </li>
        );
    };
    render() {
        const { query } = this.state;
        const { categories } = this.props;
        return (
            <Fragment>
                <div className={style.filterHeader}>
                    <div className={style.menuCategory}>
                        <h3>
                            <i className="zmdi zmdi-menu" /> Danh mục
                        </h3>
                        <ul className={style.menu}>
                            <li>
                                <Link href="/khoa-hoc" as="/danh-muc">
                                    <a>Tất cả danh mục</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/khoa-hoc/combo" as="/combo-khoa-hoc">
                                    <a>Danh sách combo</a>
                                </Link>
                            </li>
                            {categories.filter(item => item.parentId === null).map(item => this.renderTree(item))}
                        </ul>
                    </div>
                    <Form onSubmit={this.onSearch}>
                        <Input
                            name="keyword"
                            onChange={this.onChange}
                            value={query.keyword}
                            placeholder="Tìm kiếm khóa học"
                        />
                        <Button type="submit">Search</Button>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

SearchComponent.defaultProps = {
    categories: []
};

SearchComponent.propTypes = {
    categories: PropTypes.array,
    router: PropTypes.object.isRequired
};

export default withRouter(SearchComponent);
