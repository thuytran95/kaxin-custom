import style from 'pages/khoa-hoc/chi-tiet/components/section/style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { timeAgo, generateAvatarUrl } from 'src/helpers/Common';

const ReplyRowItem = ({ item, createdBy, onReplyUser }) => {
    const { firstName = '', lastName = '', avatar = '' } = createdBy;
    return (
        <li className={style.itemWrapper}>
            <span
                className={style.theAvt}
                style={{
                    backgroundImage: `url(${generateAvatarUrl(avatar)})`
                }}
            />
            <div className={style.infoComment}>
                <h4>
                    {firstName} {lastName}
                </h4>
                <h6>{timeAgo(item.created_at)}</h6>
                <p>{item.comment}</p>
                <div className={style.reply} onClick={() => onReplyUser(createdBy)}>
                    Trả lời
                </div>
            </div>
        </li>
    );
};

ReplyRowItem.defaultProps = {
    onReplyUser: () => null
};

ReplyRowItem.propTypes = {
    replyId: PropTypes.number.isRequired,
    createdBy: PropTypes.shape({
        avatar: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }).isRequired,
    item: PropTypes.shape({
        createdBy: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired
    }),
    onReplyUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ entities, comment }, { replyId }) => {
    const { users = {} } = entities;
    const { reply = {} } = comment.entities;
    const item = _.get(reply, replyId, {});
    const createdBy = _.get(users, item.createdBy, {});
    return {
        createdBy,
        item
    };
};

export default connect(mapStateToProps)(ReplyRowItem);
