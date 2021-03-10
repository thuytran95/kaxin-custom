import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import SquareLogo from 'static/assets/images/logo.png';
import moment from 'moment';
import classnames from 'classnames';
import _ from 'lodash';
import PaginateComponent from 'src/shared/components/Pagination';

class NotifyComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    readMe = data => {
        this.props.readMe(data);
    };
    render() {
        const { data, pagination, count, type } = this.props;
        const today = moment().format('dddd');
        const yesterday = moment()
            .subtract(1, 'days')
            .format('dddd');
        // console.log(data, type);
        return (
            <Fragment>
                <div className={style.titlePageHeader}>
                    <h3>{type === 'manual' ? 'Thông báo hệ thống' : 'Thông báo'}</h3>
                    {type === 'manual' ? null : <i onClick={this.props.readAllNotice}>Đánh dấu đã đọc</i>}
                </div>
                <div className={style.pageWrapper}>
                    <div className={style.contentInner}>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <div
                                    className={classnames(style.itemWrapper, { [style.active]: item.isRead === false })}
                                    key={index}
                                    onClick={() => this.readMe(item)}
                                >
                                    <div
                                        className={style.theAvt}
                                        style={{
                                            backgroundImage: `url(${
                                                item.detailMsg &&
                                                item.detailMsg.avatar &&
                                                !_.isEmpty(item.detailMsg.avatar)
                                                    ? item.detailMsg.avatar
                                                    : SquareLogo
                                            })`
                                        }}
                                    />
                                    <div className={style.message}>
                                        <span className="title"> {type === 'manual' ? item.title : item.message}</span>
                                        {type === 'manual' ? (
                                            <span className="content">
                                                {ReactHtmlParser(_.get(item, 'content', null))}
                                            </span>
                                        ) : item.detailMsg ? (
                                            <span className="content">
                                                {ReactHtmlParser(_.get(item.detailMsg, 'content', null))}
                                            </span>
                                        ) : null}
                                        <span className="date">
                                            {type === 'manual'
                                                ? !_.isEmpty(item.created_at)
                                                    ? moment(item.created_at).format('dddd') === today
                                                        ? moment(item.created_at)
                                                              .startOf('second')
                                                              .fromNow()
                                                        : moment(item.created_at).format('dddd') === yesterday
                                                            ? moment(item.created_at).calendar(null, {
                                                                  lastDay: '[Hôm qua] HH:mm',
                                                                  sameDay: 'DD/MM/YYYY HH:mm',
                                                                  nextDay: 'DD/MM/YYYY HH:mm',
                                                                  lastWeek: 'DD/MM/YYYY HH:mm',
                                                                  nextWeek: 'DD/MM/YYYY HH:mm',
                                                                  sameElse: 'DD/MM/YYYY HH:mm'
                                                              })
                                                            : moment(item.createdAt).format('DD/MM/YYYY HH:mm')
                                                    : 'N/A'
                                                : !_.isEmpty(item.createdAt)
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
                            <p className={style.textNote}>Không có thông báo nào</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        {count > pagination.perPage ? (
                            <PaginateComponent
                                total={count}
                                perPage={pagination.perPage}
                                onChangePage={this.goToPage}
                                current={pagination.current}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}
NotifyComponent.defaultProps = {
    data: []
};
NotifyComponent.propTypes = {
    data: PropTypes.array,
    updateParams: PropTypes.func.isRequired,
    pagination: PropTypes.object,
    count: PropTypes.number,
    onChangeShow: PropTypes.func,
    readMe: PropTypes.func,
    readAllNotice: PropTypes.func,
    type: PropTypes.string
};

export default NotifyComponent;
