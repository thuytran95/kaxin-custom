import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import InputRange from 'react-input-range';
import classnames from 'classnames';
import { moneyFormat, numberFromMoneyFormat } from 'src/helpers/Common';
import { Select } from 'antd';
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
    onChangeOrdering = value => {
        this.props.updateParams({ sort: value });
    };
    render() {
        const { updatePriceRange, minPrice, maxPrice } = this.props;
        const { priceRange } = this.state;
        return (
            <Fragment>
                <div className="col-12 col-lg-3 site-sidebar">
                    <div
                        className={classnames(style.sidebarWrapper, {
                            [style.filterActive]: this.props.isShowInfo === 'filter'
                        })}
                    >
                        <div className={`${style.widget} ${style.ordering}`}>
                            <h3>Sắp xếp</h3>
                            <div className={style.innerWidget}>
                                <Select
                                    defaultValue={'[{"property":"createdAt", "direction":"DESC" }]'}
                                    onChange={this.onChangeOrdering}
                                >
                                    <Select.Option value={'[{"property":"createdAt", "direction":"DESC" }]'}>
                                        Mới nhất
                                    </Select.Option>
                                    <Select.Option value={'[{"property":"createdAt", "direction":"ASC" }]'}>
                                        Cũ nhất
                                    </Select.Option>
                                    <Select.Option value={'[{"property":"price", "direction":"DESC" }]'}>
                                        Giá thấp dần
                                    </Select.Option>
                                    <Select.Option value={'[{"property":"price", "direction":"ASC" }]'}>
                                        Giá cao dần
                                    </Select.Option>
                                    <Select.Option value={'[{"property":"name", "direction":"ASC" }]'}>
                                        Sắp xếp từ A-Z
                                    </Select.Option>
                                    <Select.Option value={'[{"property":"name", "direction":"DESC" }]'}>
                                        Sắp xếp từ Z-A
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                        <section className={`${style.widget} ${style.widgetRange}`}>
                            <h3>Lọc theo học phí</h3>
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
    maxPrice: PropTypes.number,
    updateParams: PropTypes.func.isRequired
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
