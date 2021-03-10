import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { notification } from 'antd';
import classnames from 'classnames';
import defaultAvatar from 'static/assets/images/logo/logo-kaixin.png';
import { Collapse } from 'antd';
import { MyCourseLink } from 'src/shared/components/Link';
const Panel = Collapse.Panel;
class GiftComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            giftCode: '',
            isShowInfo: ''
        };
    }
    _handleChangeInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    redeemCode = data => {
        const { giftActions } = this.props;
        giftActions
            .redeemGiftCode(data)
            .then(({ data = {} }) => {
                notification['success']({
                    message: 'Kích hoạt nhận quà thành công!',
                    duration: 2
                });
                window.location.reload();
            })
            .catch(err => {
                const error = err.data.message;
                if (error === '{{error.promotionHasReceived}}') {
                    notification['error']({
                        message: 'Khuyến mại quà tặng đã được nhận',
                        duration: 2
                    });
                } else {
                    notification['error']({
                        message: 'Mã kích hoạt sai. Vui lòng nhập lại',
                        duration: 2
                    });
                }
            });
    };
    generateData = () => {
        return {
            giftCode: this.state.giftCode,
            platform: 'website'
        };
    };
    _onSubmitHandle = () => {
        const data = this.generateData();
        this.redeemCode({ ...data });
    };
    notice = () => {
        notification['info']({
            message: 'Chú ý',
            description: 'Quà tặng này chỉ có thể xem trên MCBook App && MCBook WebApp'
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
    render() {
        const { items } = this.props;
        return (
            <Fragment>
                <div className={style.contentInner}>
                    <section>
                        <h3>Nhận quà tặng</h3>
                        <p>Vui lòng nhập mã quà tặng mà bạn nhận được vào ô bên dưới:</p>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                this._onSubmitHandle();
                            }}
                        >
                            <Label>ID</Label>
                            <FormGroup>
                                <Input
                                    name="giftCode"
                                    value={this.state.giftCode}
                                    onChange={this._handleChangeInput}
                                    placeholder="VD: MCB09876541"
                                />
                                <Button>Nhận quà</Button>
                            </FormGroup>
                        </Form>
                    </section>
                    <section>
                        <h3>Quà tặng đã nhận</h3>

                        <div className={style.tableWrapper}>
                            {items && items.length > 0 ? (
                                <Fragment>
                                    <Collapse defaultActiveKey={['1']}>
                                        {items.map((item, index) => (
                                            <Panel
                                                header={
                                                    <ul>
                                                        <li className="chanel">
                                                            <i>Chương trình khuyến mãi</i>
                                                            <b>{item.name}</b>
                                                        </li>
                                                        <li className="number">
                                                            <i>Số lượng quà tặng</i>
                                                            {parseInt(item.gifts.length, 0)}
                                                        </li>
                                                        <li className="code">
                                                            <i>ID khuyến mãi</i>
                                                            <b>{item.id}</b>
                                                        </li>
                                                        <li className="actions">
                                                            <span
                                                                onClick={() => {
                                                                    this.handleToggle(item.id);
                                                                }}
                                                            >
                                                                Bộ quà tặng
                                                            </span>
                                                        </li>
                                                    </ul>
                                                }
                                                key={item.id}
                                            >
                                                <div
                                                    className={`${classnames({
                                                        [style.active]: this.state.isShowInfo === item.id
                                                    })} ${style.children}` } 
                                                    style={{
                                                        display: 'flex',
                                                        "flex-wrap": 'wrap',
                                                    }}
                                                >
                                                    {item.gifts &&
                                                        item.gifts.map(data => (
                                                            <div className="item" key={data.id}>
                                                                <div className="inner">
                                                                    {(data.type === 'pdf' ||
                                                                        data.type === 'video' ||
                                                                        data.type === 'audio' ||
                                                                        data.type === 'course') && (
                                                                        <span
                                                                            className="avatar"
                                                                            style={{
                                                                                backgroundImage: `url(${
                                                                                    data.coverUri
                                                                                        ? data.coverUri
                                                                                        : defaultAvatar
                                                                                })`
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {data.type === 'exam' && (
                                                                        <span
                                                                            className="avatar"
                                                                            style={{
                                                                                backgroundImage: `url(${
                                                                                    data.examData &&
                                                                                    data.examData.avatarUri
                                                                                        ? data.examData.avatarUri ===
                                                                                          'https://beta.file.mentor.vnnull'
                                                                                            ? defaultAvatar
                                                                                            : data.examData.avatarUri
                                                                                        : defaultAvatar
                                                                                })`
                                                                            }}
                                                                        />
                                                                    )}

                                                                    <span className="type">
                                                                        {data.type === 'pdf' && (
                                                                            <img
                                                                                src="/static/assets/images/icons/open-book.png"
                                                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                                                            />
                                                                        )}
                                                                        {data.type === 'audio' && (
                                                                            <img
                                                                                src="/static/assets/images/icons/music-note.png"
                                                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                                                            />
                                                                        )}
                                                                        {data.type === 'video' && (
                                                                            <img
                                                                                src="/static/assets/images/icons/ic-play-circle-filled.png"
                                                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                    <span className="name">
                                                                        {data.type !== 'course' ? (
                                                                            <span onClick={this.notice}>
                                                                                {data.name}
                                                                            </span>
                                                                        ) : (
                                                                            <MyCourseLink
                                                                                id={data.courseId}
                                                                                name={data.name}
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </Panel>
                                        ))}
                                    </Collapse>
                                </Fragment>
                            ) : (
                                <div className="text-center noGift">
                                    <h4>Bạn chưa có quà tặng nào.</h4>
                                    <img
                                        src="/static/assets/images/no-gift.png"
                                        alt="Công ty sách MCBooks – Knowlege sharing"
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
}
GiftComponent.defaultProps = {
    items: []
};
GiftComponent.propTypes = {
    authInfo: PropTypes.object,
    items: PropTypes.array,
    giftActions: PropTypes.object
};

export default GiftComponent;
