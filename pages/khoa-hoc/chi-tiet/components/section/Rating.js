import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Rate } from 'antd';
import RateCount from './RateCount';

class RatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { items, rateData } = this.props;
        const SquareLogo = '/static/assets/images/logo/logo.png';
        return (
            <Fragment>
                <div className={`${style.boxRating}`}>
                    <div className={style.rateWrapper}>
                        <RateCount rateData={rateData} />
                        <div className={style.formRate}>
                            <Form>
                                <FormGroup>
                                    <Label>Viết đánh giá của bạn</Label>
                                    <Rate />
                                    <Input
                                        type="textarea"
                                        value="hihi"
                                        rows="4"
                                        name="text"
                                        onChange={this._onChangeValue}
                                    />
                                    <span>250/500 ký tự</span>
                                </FormGroup>
                                <Button className="btn btn-primary">Gửi đi</Button>
                            </Form>
                        </div>
                        <ul>
                            {items &&
                                items.map((item, index) => (
                                    <li key={index} className={style.itemWrapper}>
                                        <span
                                            className={style.theAvt}
                                            style={{
                                                backgroundImage: `url(${
                                                    !_.isEmpty(item.avatar) ? item.avatar : SquareLogo
                                                })`
                                            }}
                                        />
                                        <div className={style.infoComment}>
                                            <h4>{item.name}</h4>
                                            <h6>{moment(item.create_at).format('DD/MM/YYYY hh:mm')}</h6>
                                            <p>{item.text}</p>
                                            <div className="rating">
                                                <span
                                                    className="star"
                                                    style={{
                                                        width: `${item.rating / 5 * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}
RatingComponent.defaultProps = {
    items: [
        {
            id: 1,
            avatar: '',
            name: 'Nguyễn Văn Tùng',
            text:
                'Tôi biết bạn đã cố gắng học rất nhiều trước đó nhưng đều không mang lại hiệu quả gì. Đó không phải là lỗi của bạn.',
            rating: 4,
            create_at: '2018-04-17T14:55:30.850Z'
        },
        {
            id: 2,
            avatar: '',
            name: 'Nguyễn Văn Tùng',
            text:
                'Tôi biết bạn đã cố gắng học rất nhiều trước đó nhưng đều không mang lại hiệu quả gì. Đó không phải là lỗi của bạn.',
            rating: 4,
            create_at: '2018-04-17T14:55:30.850Z'
        },
        {
            id: 3,
            avatar: '',
            name: 'Nguyễn Văn Tùng',
            text:
                'Tôi biết bạn đã cố gắng học rất nhiều trước đó nhưng đều không mang lại hiệu quả gì. Đó không phải là lỗi của bạn.',
            rating: 5,
            create_at: '2018-04-17T14:55:30.850Z'
        },
        {
            id: 4,
            avatar: '',
            name: 'Nguyễn Văn Tùng',
            text:
                'Tôi biết bạn đã cố gắng học rất nhiều trước đó nhưng đều không mang lại hiệu quả gì. Đó không phải là lỗi của bạn.',
            rating: 3,
            create_at: '2018-04-17T14:55:30.850Z'
        },
        {
            id: 5,
            avatar: '',
            name: 'Nguyễn Văn Tùng',
            text:
                'Tôi biết bạn đã cố gắng học rất nhiều trước đó nhưng đều không mang lại hiệu quả gì. Đó không phải là lỗi của bạn.',
            rating: 5,
            create_at: '2018-04-17T14:55:30.850Z'
        }
    ]
};

RatingComponent.propTypes = {
    rateData: PropTypes.object,
    items: PropTypes.array
};

export default RatingComponent;
