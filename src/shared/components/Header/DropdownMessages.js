import './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import SquareLogo from 'static/assets/images/logo.png';
import classnames from 'classnames';
import { redirect } from 'src/helpers/Common';

class DropdownMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    readMe = data => {
        this.props.readMe(data);
    };
    onChangeShow = () => {
        this.props.onChangeShow(false);
    };
    onMe = () => {
        redirect('/thong-bao');
    };
    render() {
        const { data, totalManual } = this.props;
        const today = moment().format('dddd');
        const yesterday = moment()
            .subtract(1, 'days')
            .format('dddd');
        return (
            <Fragment>
                <div className="dropdown-inner">
                    <span className="readAll">
                        <b>Thông báo</b>
                        <i onClick={this.props.readAllNotice}>Đánh dấu đã đọc</i>
                    </span>
                    {data && data.length > 0 ? (
                        _.take(data, 7).map((item, index) => (
                            <div
                                className={classnames(['itemWrapper'], { active: item.isRead === false })}
                                key={index}
                                onClick={() => this.readMe(item)}
                            >
                                <div
                                    className="theAvt"
                                    style={{
                                        backgroundImage: `url(${
                                            item.detailMsg && item.detailMsg.avatar && !_.isEmpty(item.detailMsg.avatar)
                                                ? item.detailMsg.avatar
                                                : SquareLogo
                                        })`
                                    }}
                                />
                                <div className="message">
                                    <span className="title">{item.message ? item.message : 'Đang cập nhật'}</span>
                                    <span className="date">
                                        {!_.isEmpty(item.createdAt)
                                            ? moment(item.createdAt).format('dddd') === today
                                                ? moment(item.createdAt)
                                                      .startOf('second')
                                                      .fromNow()
                                                : moment(item.createdAt).format('dddd') === yesterday
                                                    ? moment(item.createdAt).calendar(null, {
                                                          lastDay: '[Hôm qua] HH:mm',
                                                          sameDay: 'DD/MM/YYYY HH:mm',
                                                          nextDay: 'DD/MM/YYYY HH:mm',
                                                          lastWeek: 'DD/MM/YYYY HH:mm',
                                                          nextWeek: 'DD/MM/YYYY HH:mm',
                                                          sameElse: 'DD/MM/YYYY HH:mm'
                                                      })
                                                    : moment(item.createdAt).format('DD/MM/YYYY HH:mm')
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-title">Không có thông báo nào</div>
                    )}
                </div>

                {data &&
                    data.length > 7 && (
                        <p className="readmore" onClick={this.onChangeShow}>
                            <span onClick={this.onMe}>Tin của bạn</span>
                            <span
                                className={classnames({ active: parseInt(totalManual, 0) > 0 })}
                                onClick={this.props.onReset}
                            >
                                Tin hệ thống ({parseInt(totalManual, 0) > 0 ? totalManual : 0})
                            </span>
                        </p>
                    )}
            </Fragment>
        );
    }
}
DropdownMessages.propTypes = {
    data: PropTypes.array,
    showNotice: PropTypes.bool,
    onChangeShow: PropTypes.func,
    readMe: PropTypes.func,
    readAllNotice: PropTypes.func,
    onReset: PropTypes.func,
    totalManual: PropTypes.number,
    commonActions: PropTypes.object
};
export default DropdownMessages;
