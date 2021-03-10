import style from 'pages/khoa-hoc/chi-tiet/components/section/style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup } from 'reactstrap';
import _ from 'lodash';
import classNames from 'classnames';
import { notification, Input } from 'antd';

import { timeAgo, generateAvatarUrl } from 'src/helpers/Common';
import ReplyRowItem from './ReplyRowItem';

const { TextArea } = Input;

class CommentItem extends Component {
    state = {
        hasReply: false,
        replyContent: ''
    };

    commentBox = React.createRef();

    toggleReply = () => {
        this.setState(
            {
                hasReply: true
            },
            () => {
                this.commentBox.current.focus();
            }
        );
    };

    _onChangeValue = e => {
        const { value } = e.target;
        this.setState({
            replyContent: value
        });
    };

    onReplyUser = (user = {}) => {
        const { replyContent } = this.state;
        const { firstName = '' } = user;
        const defaultContent = [firstName].filter(v => !!_.trim(v)).join(' ') + ` `;

        this.setState(
            {
                hasReply: true,
                replyContent: replyContent || defaultContent
            },
            () => {
                this.commentBox.current.focus();
            }
        );
    };

    onSubmitReply = e => {
        e.preventDefault();
        const { replyContent } = this.state;
        if (!_.trim(replyContent)) return;
        const { commentActions, objectId, commentId, authInfo: { isAuthenticated } } = this.props;
        if (!isAuthenticated) {
            // Dang nhap
            notification.error({
                message: 'Thông báo',
                description: 'Bạn cần đăng nhập'
            });
        } else {
            // Comment
            commentActions
                .createReplyComment({ parentId: commentId, enityId: objectId, comment: replyContent })
                .then(() => {
                    this.setState({
                        replyContent: ''
                    });
                });
        }
    };

    render() {
        const { hasReply, replyContent } = this.state;
        const { item, createdBy } = this.props;
        const { firstName = '', avatar = '' } = createdBy;

        const { comment = '', listComments = [] } = item;
        return (
            <li className={style.itemWrapper}>
                <span
                    className={style.theAvt}
                    style={{
                        backgroundImage: `url(${generateAvatarUrl(avatar)})`
                    }}
                />
                <div className={style.infoComment}>
                    <h4>{firstName}</h4>
                    <h6>{timeAgo(item.created_at)}</h6>
                    <p>{comment}</p>
                    <div className={style.reply} onClick={this.toggleReply}>
                        Trả lời
                    </div>
                </div>
                <div>
                    <ul>
                        {listComments.map(v => <ReplyRowItem key={v} replyId={v} onReplyUser={this.onReplyUser} />)}
                    </ul>
                </div>

                <div className={`${style.replyForm} ${classNames({ 'd-none': !hasReply })}`}>
                    <Form onSubmit={this.onSubmitReply}>
                        <span
                            className={style.theAvt}
                            style={{
                                backgroundImage: `url(${generateAvatarUrl(avatar)})`
                            }}
                        />
                        <FormGroup>
                            <TextArea
                                style={{ resize: 'none' }}
                                className="form-control"
                                ref={this.commentBox}
                                value={replyContent}
                                onChange={this._onChangeValue}
                                autosize
                                onPressEnter={this.onSubmitReply}
                            />
                        </FormGroup>
                    </Form>
                </div>
            </li>
        );
    }
}

CommentItem.propTypes = {
    commentId: PropTypes.number.isRequired,
    objectId: PropTypes.number,
    commentActions: PropTypes.object.isRequired,
    authInfo: PropTypes.object.isRequired,
    createdBy: PropTypes.shape({
        avatar: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }).isRequired,
    item: PropTypes.shape({
        listComments: PropTypes.array,
        createdBy: PropTypes.string.isRequired
    })
};

const mapStateToProps = ({ auth, entities, comment }, { commentId }) => {
    const { users = {} } = entities;
    const { comments = {} } = comment.entities;
    const item = _.get(comments, commentId, {});
    const createdBy = _.get(users, item.createdBy, {});
    return {
        authInfo: auth,
        item,
        createdBy
    };
};

export default connect(mapStateToProps)(CommentItem);
