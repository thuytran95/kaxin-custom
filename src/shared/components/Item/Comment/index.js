// import style from './style.scss';

import React, { Component, Fragment } from 'react';
// import Link from 'next/link';
import PropTypes from 'prop-types';
//import { Form, Input, Button } from 'reactstrap';
import { CourseLink } from 'src/shared/components/Link';
import PriceComponent from 'src/shared/components/common/Price';
import { Button } from 'reactstrap';

class ItemComment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        //const { isShowFilter, filterMobile } = this.state;
        const { data } = this.props;
        const { courseAvatar = '/static/assets/images/course1.png', coach = 'Stephen Hawking' } = data;
        return (
            <Fragment>
                {data ? (
                    <div className="itemCourse">
                        <div className="inner">
                            <div className="imgCourse">
                                <img src={courseAvatar} alt={data.name} />
                                {data.percent > 0 ? <span className="labelSale">{data.percent}%</span> : ''}
                            </div>
                            <div className="infoCourse">
                                <h4>
                                    <CourseLink {...data} />
                                </h4>
                                <p>{coach}</p>
                                <div className="rating">
                                    <span
                                        className="star"
                                        style={{
                                            width: `${100}%`
                                        }}
                                    />
                                </div>
                                <div className="price">
                                    {!data.percent ? (
                                        <span className="amount">
                                            <PriceComponent value={data.price} /> đ
                                        </span>
                                    ) : (
                                        <Fragment>
                                            <span className="salePrice">
                                                <PriceComponent value={data.price} salePercent={data.percent} /> đ
                                            </span>{' '}
                                            <span className="regularPrice">
                                                <PriceComponent value={data.price} /> đ{' '}
                                            </span>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="addToCart">
                                    <Button className="btn btn-primary" onClick={this.addToCart}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </Fragment>
            // <Fragment>
            //     <div className={style.itemComment}>
            //         <div className={style.inner}>
            //             <div className={style.imgComment}>
            //                 <img src={data.url} alt={data.name} />
            //             </div>
            //             <div className={style.infoComment}>
            //                 <h4>
            //                     <Link href="/">
            //                         <a>{data.name}</a>
            //                     </Link>
            //                 </h4>
            //                 <p>{data.coach}</p>
            //                 <div className="rating">
            //                     <span
            //                         className="star"
            //                         style={{
            //                             width: `${data.star}%`
            //                         }}
            //                     />
            //                 </div>
            //                 <div className={style.price}>
            //                     {data.salePrice === null ? (
            //                         <span className={style.amount}>{data.regularPrice}</span>
            //                     ) : (
            //                         <Fragment>
            //                             <span className={style.salePrice}>{data.salePrice}</span>{' '}
            //                             <span className={style.regularPrice}> {data.regularPrice} </span>
            //                         </Fragment>
            //                     )}
            //                 </div>
            //             </div>
            //             <div className={style.countComment}>
            //                 <img src="/static/assets/images/icons/comment.png" alt="Công ty sách MCBooks – Knowlege sharing" /> {data.count} comments
            //             </div>
            //             <div className={style.comment}>
            //                 <div className={style.inner}>
            //                     <span className={style.avatar}>
            //                         <i className="zmdi zmdi-account-circle" />
            //                     </span>
            //                     <h5>
            //                         Nguyen Van B <em>19h trước</em>
            //                     </h5>
            //                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing…</p>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </Fragment>
        );
    }
}
ItemComment.propTypes = {
    data: PropTypes.object.isRequired
};

export default ItemComment;
