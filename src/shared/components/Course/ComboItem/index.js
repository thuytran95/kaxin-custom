import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import { ComboLink } from 'src/shared/components/Link';
import PriceComponent from 'src/shared/components/common/Price';
import { CoursePropTypes } from 'src/prop-types';
//import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tooltip } from 'antd';

class ItemComboComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { data } = this.props;
        const avatarUri = !_.isEmpty(data.avatarUri) ? data.avatarUri : '/static/assets/images/courses/default.png';
        return (
            <div className={style.wrapper}>
                <div className={style.itemCombo}>
                    <div className={style.inner}>
                        <div
                            className={style.imgCombo}
                            style={{
                                backgroundImage: `url(${avatarUri})`
                            }}
                        >
                            {data.discount > 0 ? <span className={style.labelSale}>{data.discount}%</span> : ''}
                            <ComboLink {...data} />
                        </div>
                        <div className={style.infoCombo}>
                            <Tooltip placement="top" title={data.name}>
                                <h4>
                                    <ComboLink {...data} />
                                </h4>
                            </Tooltip>

                            <span className={style.labelTag}>Combo</span>
                            <p className={style.quantity}>{data.numberCourses} khóa học</p>
                            <div className={style.price}>
                                {data.discount > 0 ? (
                                    <Fragment>
                                        <span className={style.amount}>
                                            <PriceComponent value={data.totalPrice} salePercent={data.discount} />đ
                                        </span>
                                        <span className="regularPrice">
                                            <PriceComponent value={data.totalPrice} />đ
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span className={style.amount}>
                                        <PriceComponent value={data.totalPrice} />đ
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemComboComponent.propTypes = {
    data: CoursePropTypes
};

export default ItemComboComponent;
