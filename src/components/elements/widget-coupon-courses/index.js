import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import PriceComponent from './Price';
import defaultAvatar from './images/course1.png';
import { Wrapper, Course, Button } from './styled';
class WidgetCouponCourseElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataCourse: []
        };
    }

    static defaultProps = {
        couponCode: ''
    };
    static propsSchema = propsSchema;

    static settings = settings;

    componentDidMount() {
        const { couponCode, widgetActions } = this.props;
        widgetActions.listCouponCourse(couponCode).then(data => {
            this.setState({ dataCourse: data.data.rows });
        });
    }
    renderItem = data => {
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
                                        <Button>Thêm vào giỏ hàng</Button>
                                    </div>
                                </div>
                            </div>
                        </Course>
                    </div>
                </Fragment>
            );
        });
    };

    render() {
        const { Element, builder } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        return (
            <Element {...props}>
                <Wrapper>
                    <div className="row">{this.renderItem(this.state.dataCourse)}</div>
                </Wrapper>
            </Element>
        );
    }
}

WidgetCouponCourseElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    widgetActions: PropTypes.object.isRequired,
    couponCode: PropTypes.string
};
const mapStateToProps = state => {
    const { widget } = state;
    return {
        widget
    };
};

const mapDispatchToProps = dispatch => {
    return {
        widgetActions: bindActionCreators(actions.widgetActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetCouponCourseElement);
