import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { moneyFormat } from 'src/helpers/Common';

const LabelStar = ({ count = 0 }) => {
    return <span className="label-star">{_.times(count, v => <i key={v} className="zmdi zmdi-star" />)}</span>;
};

LabelStar.propTypes = {
    count: PropTypes.number
};

const countPrect = (pen, pem) => {
    return pem > 0 ? pen / pem * 100 : 0;
};
class RateCount extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { rateData } = this.props;
        const { rows = [], rate = 0 } = rateData;
        return (
            <Fragment>
                <div className={style.totalCount}>
                    <div className="row">
                        <div className="col-12 col-lg-5">
                            <div className={style.boxTotal}>
                                <h3>{isNaN(rate) === true ? 5 : rate}</h3>
                                <div className="rating">
                                    <span
                                        className="star"
                                        style={{
                                            width: `${countPrect(rate, 5)}%`
                                        }}
                                    />
                                </div>
                                <em>{moneyFormat(rateData.count)} đánh giá</em>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className={style.boxTotalProcess}>
                                <ul>
                                    {_.orderBy(rows, ['rate'], ['desc']).map(item => (
                                        <li key={item.rate}>
                                            <LabelStar count={item.rate} />
                                            <span className="process">
                                                <i
                                                    style={{
                                                        width: `${countPrect(item.count, rateData.count)}%`
                                                    }}
                                                />
                                            </span>
                                            <span className="number">{moneyFormat(item.count)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
RateCount.defaultProps = {};

RateCount.propTypes = {
    rateData: PropTypes.object
};

export default RateCount;
