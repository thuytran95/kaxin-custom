import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import settings from './settings';
import { notification } from 'antd';
import propsSchema from './props-schema';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import PriceComponent from './Price';
import defaultAvatar from './images/course1.png';
import { Wrapper, Course, Button, Heading, ErrorText } from './styled';
class WidgetDiscountElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataCourse: []
        };
    }

    static defaultProps = {
        promotionId: null
    };
    static propsSchema = propsSchema;

    static settings = settings;

    componentDidMount() {
        const { promotionId, widgetActions } = this.props;
        if (promotionId) {
            widgetActions.listDiscountCourse(promotionId).then(data => {
                if (data) {
                    this.setState({ dataCourse: data.data.rows });
                }
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { promotionId, widgetActions } = this.props;
        if (promotionId) {
            if (this.props.promotionId !== prevProps.promotionId) {
                widgetActions.listDiscountCourse(promotionId).then(data => {
                    if (data) {
                        this.setState({ dataCourse: data.data.rows });
                    }
                });
            }
        }
    }

    addToCart = data => {
        const { cartActions } = this.props;
        cartActions.addToCart(data.id);
        notification['success']({
            message: 'Thêm thành công!',
            duration: 2,
            description: 'Khóa học ' + data.name + ' đã được thêm vào giỏ hàng thành công!'
        });
    };

    renderItem = data => {
        const courses = [];
        const alreadyInCart = courses.some(item => item.id === data.id);
        if (data.length > 0) {
            return data.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <Course>
                                <div className="inner">
                                    <div
                                        className="thumbnail"
                                        style={{
                                            backgroundImage: `url(${
                                                !_.isEmpty(item.courseAvatar) ? item.courseAvatar : defaultAvatar
                                            })`
                                        }}
                                    />
                                    <div className="info">
                                        <h4>{item.name}</h4>
                                        <p>{_.get(item, 'lecturer.fullname', 'Đang cập nhật')}</p>
                                        <div className="rating">
                                            <span
                                                className="star"
                                                style={{
                                                    width: `${item.rating / 5 * 100}%`
                                                }}
                                            />
                                        </div>
                                        <div className="price">
                                            <span className="amount">
                                                <PriceComponent value={item.price} /> đ
                                            </span>
                                        </div>
                                        <div className="addToCart">
                                            <Button
                                                className="btn btn-primary"
                                                onClick={() => this.addToCart(item)}
                                                disabled={alreadyInCart}
                                            >
                                                {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Course>
                        </div>
                    </Fragment>
                );
            });
        } else {
            return <ErrorText>Không tồn tại khóa học nào</ErrorText>;
        }
    };

    render() {
        const { Element, builder, promotionId } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        return (
            <Element {...props}>
                {!!promotionId === false && <Heading>Lựa chọn chương trình khuyến mại</Heading>}
                <Wrapper>
                    {!!promotionId === true && <div className="row">{this.renderItem(this.state.dataCourse)}</div>}
                </Wrapper>
            </Element>
        );
    }
}

WidgetDiscountElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object.isRequired,
    widgetActions: PropTypes.object.isRequired,
    promotionId: PropTypes.number,
    cartActions: PropTypes.object
};
const mapStateToProps = state => {
    const { widget, cart } = state;
    return {
        widget,
        cart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        widgetActions: bindActionCreators(actions.widgetActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetDiscountElement);
