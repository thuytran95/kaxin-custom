import style from 'pages/khoa-hoc/chi-tiet/components/section/style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from 'src/redux-utils';
import RateCount from 'pages/khoa-hoc/chi-tiet/components/section/RateCount';
import Rate from 'src/shared/components/Rating';
import RatingRowItem from './RatingRowItem';
import PaginationComponent from 'src/shared/components/Pagination';

class RatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            rate: 0,
            pagination: {
                page: 1,
                perPage: 15
            }
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { pagination } = this.state;
        const { ratingActions, courseDetail } = this.props;
        const start = (pagination.page - 1) * pagination.limit;
        ratingActions.getRatingList(courseDetail.id, { start: start >= 0 ? start : 0, limit: pagination.limit });
    };

    onSubmitRating = e => {
        e.preventDefault();
        const { ratingActions, authInfo: { isAuthenticated }, courseDetail, authInfo: { userInfo = {} } } = this.props;
        const userId = _.find(courseDetail.students, obj => {
            return obj.userId === userInfo.id;
        });
        if (!isAuthenticated) {
            // Dang nhap
            notification.error({
                message: 'Thông báo',
                description: 'Bạn cần đăng nhập hoặc đăng ký để đánh giá khóa học.'
            });
        } else {
            if (_.isEmpty(userId) || _.isNull(userId)) {
                // Khong phai la hoc vien
                notification.error({
                    message: 'Thông báo',
                    description: 'Bạn phải là học viên của khóa học mới được phép đánh giá'
                });
            } else {
                // Rate
                const params = _.pick(this.state, ['feedback', 'rate']);
                ratingActions
                    .sendRating({ enityId: courseDetail.id, ...params })
                    .then(data => {
                        this.setState(
                            {
                                feedback: '',
                                rate: 0
                            },
                            this.props.getDataCount(courseDetail.id)
                        );
                        notification.success({
                            message: 'Thành công',
                            description: 'Cảm ơn bạn đã đánh giá cho khóa học'
                        });
                    })
                    .catch(err => {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Bạn phải là học viên của khóa học mới được phép đánh giá.'
                        });
                    });
            }
        }
    };

    onRatingChange = value => {
        this.setState({ rate: value });
    };

    _onChangeValue = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
        const { ratingData: { total, rows }, rateData } = this.props;
        const { rate, feedback, pagination } = this.state;
        return (
            <Fragment>
                <div className={`${style.boxRating}`}>
                    <div className={style.rateWrapper}>
                        <RateCount rateData={rateData} />
                        <div className={style.formRate}>
                            <Form onSubmit={this.onSubmitRating}>
                                <FormGroup>
                                    <Label>Viết đánh giá của bạn</Label>
                                    <Rate
                                        allowHalf={true}
                                        onChange={this.onRatingChange}
                                        value={rate}
                                        style={{ fontSize: '26px' }}
                                    />
                                    <Input
                                        maxLength={500}
                                        type="textarea"
                                        value={feedback}
                                        name="feedback"
                                        rows="4"
                                        onChange={this._onChangeValue}
                                    />
                                    <span>{feedback.length}/500 ký tự</span>
                                </FormGroup>
                                <Button
                                    disabled={rate === 0 || !!_.trim(feedback) === false}
                                    className="btn btn-primary"
                                >
                                    Gửi đi
                                </Button>
                            </Form>
                        </div>
                        <ul>{rows.map(v => <RatingRowItem key={v} ratingId={v} />)}</ul>
                        <div className="d-flex justify-content-center">
                            <PaginationComponent
                                total={total}
                                onChange={this.onPageChange}
                                current={pagination.page}
                                perPage={pagination.perPage}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
RatingComponent.defaultProps = {
    ratingData: {
        total: 0,
        rows: []
    }
};

RatingComponent.propTypes = {
    rateData: PropTypes.object,
    ratingData: PropTypes.shape({
        total: PropTypes.number,
        rows: PropTypes.array
    }),
    authInfo: PropTypes.shape({
        isAuthenticated: PropTypes.bool
    }),
    ratingActions: PropTypes.object.isRequired,
    courseDetail: PropTypes.shape({
        id: PropTypes.number
    }),
    getDataCount: PropTypes.func
};

const mapStateToProps = ({ auth, rating }, ownProps) => {
    const { courseDetail = {} } = ownProps;
    const ratingData = _.get(rating.rateContentData, courseDetail.id, { total: 0, rows: [] });
    const rateData = _.get(rating.rateData, courseDetail.id, {});
    return {
        authInfo: auth,
        ratingData,
        rateData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ratingActions: bindActionCreators(actions.ratingActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingComponent);
