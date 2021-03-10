import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import { Tree } from 'antd';
import InputRange from 'react-input-range';
import classnames from 'classnames';
import { moneyFormat, numberFromMoneyFormat } from 'src/helpers/Common';

const { TreeNode } = Tree;

class FilterSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priceRange: props.initialPriceRange
        };
    }

    handleChangePriceRange = value => {
        this.setState(prevState => {
            const priceRange = Object.assign(prevState.priceRange, value);
            return { priceRange };
        });
    };

    handleCheckCategory = (checkedKeys, info) => {
        this.props.updateCategoryIds(checkedKeys.map(str => Number(str)));
    };

    renderTreeNode = node => {
        const { children = [] } = node;
        
        return (
            <TreeNode title={node.name} key={node.id} selectable={false}>
                {children.filter(item => item.active === 1).map(this.renderTreeNode)}
            </TreeNode>
        );
    };

    render() {
        const { data = [], categoryIds, updatePriceRange, minPrice, maxPrice } = this.props;
        const { priceRange } = this.state;
        const keyCategory = [...categoryIds.join().split(',')];
      
        return (
            <Fragment>
                <div className="col-12 col-lg-3 site-sidebar">
                    <div
                        className={classnames(style.sidebarWrapper, {
                            [style.filterActive]: this.props.isShowInfo === 'filter'
                        })}
                    >
                        <section className={style.widget}>
                            <div className="listCheckBox">
                                <Tree
                                    checkable
                                    checkedKeys={keyCategory[0] !== "NaN" ? keyCategory: ['-1']}
                                    defaultExpandedKeys={keyCategory[0] !== "NaN" ? keyCategory: ['-1']}
                                    onCheck={this.handleCheckCategory}
                                >
                                    <TreeNode title="Tất cả danh mục" key={-1} selectable={false}>
                                        {data.map(this.renderTreeNode)}
                                    </TreeNode>
                                </Tree>
                            </div>
                        </section>
                        <section className={`${style.widget} ${style.widgetRange}`}>
                            <h3>Học phí</h3>
                            <div className={style.innerWidget}>
                                <InputRange
                                    maxValue={maxPrice}
                                    minValue={minPrice}
                                    value={priceRange}
                                    onChange={this.handleChangePriceRange}
                                    step={1}
                                />
                                <div className={style.formRange}>
                                    <Input
                                        name="minValue"
                                        onChange={e =>
                                            this.handleChangePriceRange({ min: numberFromMoneyFormat(e.target.value) })
                                        }
                                        value={moneyFormat(priceRange.min)}
                                    />
                                    <Input
                                        name="maxValue"
                                        onChange={e =>
                                            this.handleChangePriceRange({ max: numberFromMoneyFormat(e.target.value) })
                                        }
                                        value={moneyFormat(priceRange.max)}
                                    />
                                    <Button
                                        type="submit"
                                        onClick={e => {
                                            e.preventDefault();
                                            updatePriceRange(priceRange);
                                        }}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }
}
FilterSidebar.propTypes = {
    isShowInfo: PropTypes.string,
    data: PropTypes.array,
    categoryIds: PropTypes.array,
    updateCategoryIds: PropTypes.func,
    initialPriceRange: PropTypes.object,
    updatePriceRange: PropTypes.func,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number
};

FilterSidebar.defaultProps = {
    initialPriceRange: {
        min: 0,
        max: 1000000
    },
    minPrice: 0,
    maxPrice: 1000000
};
export default FilterSidebar;
