import style from 'pages/khoa-hoc/chi-tiet/components/section/style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Tabs } from 'antd';

import { actions } from 'src/redux-utils';
import CommentRowItem from './CommentRowItem';
import PaginationComponent from 'src/shared/components/Pagination';
import { generateAvatarUrl } from 'src/helpers/Common';

const TabPane = Tabs.TabPane;

class CommentComponent extends Component {
    state = {
        pagination: {
            page: 1,
            limit: 15
        },
        data: {}
    };

    componentWillMount() {
        this.fetchData();
    }

    callback(key) {}

    fetchData = () => {
        const { pagination } = this.state;
        const { commentActions, courseDetail } = this.props;
        const start = (pagination.page - 1) * pagination.limit;
        commentActions.getCommentList(courseDetail.id, { start: start >= 0 ? start : 0, limit: pagination.limit });
    };

    _onChangeValue = e => {
        const { name, value } = e.target;
        this.setState({ data: { ...this.state.data, [name]: value } });
    };

    onSubmitComment = e => {
        e.preventDefault();
        const { commentActions, authInfo: { isAuthenticated }, courseDetail } = this.props;
        if (!isAuthenticated) {
            // Dang nhap
            notification.error({
                message: 'Thông báo',
                description: 'Để bình luận bạn cần phải đăng nhập'
            });
        } else {
            // Comment
            commentActions
                .createComment({ enityId: courseDetail.id, ...this.state.data })
                .then(data => {
                    this.setState({
                        data: {
                            comment: ''
                        }
                    });
                    notification.success({
                        message: 'Thành công',
                        description: 'Cảm ơn bạn đã để lại bình luận'
                    });
                })
                .catch(err => {
                    notification.error({
                        message: 'Hệ thống bình luận đang lỗi',
                        description: 'Vui lòng quay lại sau vài phút. Chân thành cảm ơn'
                    });
                });
        }
    };

    getSEOURL = () => {
        return _.get(window, 'location.origin', '') + _.get(window, 'location.pathname', '');
    };

    onPageChange = page => {
        this.setState(
            {
                pagination: { ...this.state.pagination, page }
            },
            this.fetchData
        );
    };

    render() {
        const { authInfo: { userInfo }, commentData, commentActions, courseDetail } = this.props;
        const { pagination, data } = this.state;
        const { count, rows = [] } = commentData;

        return (
            <Fragment>
                <div className={`${style.boxComment}`}>
                    <div className={style.commentWrapper}>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Mạng xã hội" key="1">
                                <Fragment>
                                    <div
                                        className="fb-comments"
                                        data-href={this.getSEOURL()}
                                        data-width="688"
                                        data-numposts="5"
                                    />
                                </Fragment>
                            </TabPane>
                            <TabPane tab="Người dùng" key="2">
                                <div className={style.formComment}>
                                    <Form onSubmit={this.onSubmitComment}>
                                        <span
                                            className={style.theAvt}
                                            style={{
                                                backgroundImage: `url(${generateAvatarUrl(userInfo.avatar)})`
                                            }}
                                        />
                                        <FormGroup>
                                            <Input
                                                value={data.comment}
                                                name="comment"
                                                type="textarea"
                                                rows="4"
                                                onChange={this._onChangeValue}
                                            />
                                        </FormGroup>
                                        <Button
                                            type="submit"
                                            disabled={!!_.trim(data.comment) === false}
                                            className="btn btn-primary"
                                        >
                                            Gửi đi
                                        </Button>
                                    </Form>
                                </div>
                                <ul>
                                    {rows.map(commentId => (
                                        <CommentRowItem
                                            commentActions={commentActions}
                                            objectId={courseDetail.id}
                                            commentId={commentId}
                                            key={commentId}
                                        />
                                    ))}
                                </ul>
                                <div className="d-flex justify-content-center">
                                    <PaginationComponent
                                        total={count}
                                        onChange={this.onPageChange}
                                        current={pagination.page}
                                        pageSize={pagination.limit}
                                    />
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Fragment>
        );
    }
}
CommentComponent.defaultProps = {
    commentData: {
        count: 0,
        rows: []
    }
};

CommentComponent.propTypes = {
    authInfo: PropTypes.shape({
        isAuthenticated: PropTypes.bool
    }),
    commentActions: PropTypes.object.isRequired,
    courseDetail: PropTypes.shape({
        id: PropTypes.number
    }),
    commentData: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.array
    }).isRequired
};

const mapStateToProps = ({ auth, comment }, ownProps) => {
    const { courseDetail = {} } = ownProps;
    const { commentCourseData } = comment;
    const commentData = _.get(commentCourseData, courseDetail.id, { count: 0, rows: [] });
    return {
        authInfo: auth,
        commentData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        commentActions: bindActionCreators(actions.commentActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
