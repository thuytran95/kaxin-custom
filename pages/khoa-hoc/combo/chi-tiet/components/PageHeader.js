import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
//import { notification } from 'antd';
//import NumberFormat from 'react-number-format';
//import { Button } from 'reactstrap';
import classnames from 'classnames';
import Link from 'next/link';
import { makeSlug } from 'src/helpers/Common';
import { BuyComboLink } from 'src/shared/components/Link';
import PriceComponent from 'src/shared/components/common/Price';
import _ from 'lodash';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directTab: 0
        };
    }

    handleToggle = tab => {
        if (this.state.directTab !== tab || this.state.directTab !== '') {
            this.setState({ directTab: tab });
        }
        if (this.state.directTab === tab) {
            this.setState({ directTab: '' });
        }
    };

    renButton() {
        const { data = {} } = this.props;
        return (
            <Fragment>
                <BuyComboLink type="combo" name={data.name} id={data.id}>
                    <a className={`btn btn-primary ${style.buyNow}`}>Mua ngay</a>
                </BuyComboLink>
            </Fragment>
        );
    }

    renderActionsDiv() {
        const { courseBought, data = {} } = this.props;
        if (courseBought) return null;
        return (
            <div className={`col-12 col-lg-5 rightHeader ${style.rightHeader}`}>
                <div className={style.summary}>
                    <div className={`price ${style.price}`}>
                        <span className={style.salePrice}>
                            <PriceComponent value={data.totalPrice} salePercent={data.discount} /> đ
                        </span>
                        {data.discount === 0 ? null : (
                            <span className={style.regularPrice}>
                                <PriceComponent value={data.totalPrice} /> đ
                            </span>
                        )}
                    </div>

                    <div className={`btnActions ${style.btnActions}`}>{this.renButton()}</div>
                </div>
            </div>
        );
    }

    render() {
        const { data = {} } = this.props;
        const listTabs = ['Thông tin chung', 'Chi tiết combo'];
        return (
            <div className={`pageHeaderStyle ${style.pageHeaderStyle}`}>
                <div className="container">
                    <div className="row">
                        <div className={`col-12 col-lg-7 ${style.leftHeader}`}>
                            <h2>{data.name || 'Chưa có tên khóa học'}</h2>
                            <ul>
                                {listTabs.map((tab, index) => (
                                    <li
                                        key={index}
                                        onClick={() => this.handleToggle(index)}
                                        className={classnames({ active: this.state.directTab === index })}
                                    >
                                        {/* <Link href={`#${makeSlug(tab)}`}>
                                            <a>{tab}</a>
                                        </Link> */}
                                        <AnchorLink href={`#${makeSlug(tab)}`}>{tab}</AnchorLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {this.renderActionsDiv()}
                    </div>
                </div>
            </div>
        );
    }
}

PageHeader.defaultProps = {
    cart: {}
};

PageHeader.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object,
    rateData: PropTypes.object,
    data: PropTypes.object,
    price: PropTypes.number,
    courseBought: PropTypes.bool
};

export default PageHeader;
