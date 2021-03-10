import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SquareLogo from 'static/assets/images/logo.png';
import classnames from 'classnames';
import _ from 'lodash';

class NotifyDetailComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true
        };
    }
    render() {
        const { data } = this.props;
        return (
            <Fragment>
                <div className={style.pageWrapper}>
                    <div className={style.titlePageHeader}>
                        <h3>Chi tiết thông báo</h3>
                    </div>
                    <div className={style.contentInner}>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <div
                                    className={classnames(style.itemWrapper, {
                                        [style.active]: item.isRead === false
                                    })}
                                    key={index}
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
                                        <span className="title">{_.get(item, 'message')}</span>
                                        <span
                                            className="content"
                                            dangerouslySetInnerHTML={{
                                                __html: _.get(item, 'detailMsg.content')
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={style.textNote}>Không có thông báo nào</p>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}
NotifyDetailComponent.defaultProps = {
    data: []
};
NotifyDetailComponent.propTypes = {
    data: PropTypes.array,
    updateParams: PropTypes.func.isRequired,
    limit: PropTypes.number,
    count: PropTypes.number,
    onChangeShow: PropTypes.func,
    readMe: PropTypes.func,
    readAllNotice: PropTypes.func
};

export default NotifyDetailComponent;
