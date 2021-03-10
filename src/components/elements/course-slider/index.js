import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { notification } from 'antd';
import settings from './settings';
import propsSchema from './props-schema';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { CourseLink } from 'src/shared/components/Link';

import {
    RootContent,
    Root,
    Content,
    CarouselWrapper,
    Button,
    ImgCourse,
    Rating,
    RatingStar,
    CommentCounts,
    InfoCourse,
    InfoTitle,
    InfoLecturer,
    Price,
    AddToCart,
    ItemCourse,
    Inner,
    CommentDetail,
    ContentComment,
    Avatarspan,
    LabelSale,
    NameUser,
    FontAwesome
} from './styled';
import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class CourseSliderElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataCourseNew: {},
            dataCourseSale: {},
            dataCourseHighlight: {}
        };
    }

    static defaultProps = {
        newEnable: false,
        saleEnable: false,
        highlightEnable: false,
        numberNew: 0,
        commentNews: {
            toggle1: false,
            toggle2: false
        },
        commentSale: {
            toggle1: false,
            toggle2: false
        },
        commentHighlight: {
            toggle1: false,
            toggle2: false
        },

        highlightTopic: 'Nổi bật',
        highlightNew: 'Mới nhất',
        highlightSale: 'Khuyến mại'
    };
    static propsSchema = propsSchema;

    static settings = settings;

    componentDidMount() {
        const {
            newEnable,
            numberNew,
            commentNews,
            saleEnable,
            numberSale,
            commentSale,
            widgetActions,
            dataHighlight,
            commentHighlight,
            highlightEnable
        } = this.props;
        if (highlightEnable && dataHighlight && dataHighlight.items && dataHighlight.items.length > 0) {
            const paramHighlight = {
                hotComment: commentHighlight.toggle2,
                newComment: commentHighlight.toggle1,
                items: dataHighlight.items
            };
            widgetActions.listSliderCourseHighlight(paramHighlight).then(data => {
                this.setState({ dataCourseHighlight: data.data });
            });
        }
        if (newEnable && numberNew > 0) {
            const param = {
                numberNew: numberNew,
                newCommentNews: commentNews.toggle1,
                hotCommentNews: commentNews.toggle2
            };
            widgetActions.listSliderCourseNews(param).then(data => {
                this.setState({ dataCourseNew: data.data });
            });
        }
        if (saleEnable && numberSale > 0) {
            const paramSale = {
                numberSale: numberSale,
                hotCommentSale: commentSale.toggle2,
                newCommentSale: commentSale.toggle1
            };
            widgetActions.listSliderCourseSale(paramSale).then(data => {
                this.setState({ dataCourseSale: data.data });
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            newEnable,
            numberNew,
            saleEnable,
            numberSale,
            commentNews,
            commentSale,
            highlightEnable,
            dataHighlight,
            widgetActions,
            commentHighlight
        } = this.props;
        const paramNew = {
            numberNew: numberNew,
            newCommentNews: commentNews.toggle1,
            hotCommentNews: commentNews.toggle2
        };
        const paramSale = {
            numberSale: numberSale,
            hotCommentSale: commentSale.toggle2,
            newCommentSale: commentSale.toggle1
        };
        if (
            highlightEnable &&
            dataHighlight &&
            dataHighlight.items &&
            dataHighlight.items.length > 0 &&
            prevProps.dataHighlight &&
            prevProps.dataHighlight.items
        ) {
            const paramHighlight = {
                hotComment: commentHighlight.toggle2,
                newComment: commentHighlight.toggle1,
                items: dataHighlight.items
            };
            const dif = _.isEqual(this.props.dataHighlight.items, prevProps.dataHighlight.items);
            if (!dif) {
                widgetActions.listSliderCourseHighlight(paramHighlight).then(data => {
                    this.setState({ dataCourseHighlight: data.data });
                });
            }
        }
        if (newEnable && numberNew > 0) {
            if (this.props.numberNew !== prevProps.numberNew) {
                widgetActions.listSliderCourseNews(paramNew).then(data => {
                    this.setState({ dataCourseNew: data.data });
                });
            }
        }
        if (saleEnable && numberSale > 0) {
            if (this.props.numberSale !== prevProps.numberSale) {
                widgetActions.listSliderCourseSale(paramSale).then(data => {
                    this.setState({ dataCourseSale: data.data });
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

    renderItemSlider = (item, index, isComment) => {
        const SquareLogo = '/static/assets/images/avatar.jpeg';
        const { data } = this.props;
        const courses = [];
        const alreadyInCart = courses.some(item => item.id === data.id);
        return (
            <div className="course-items" key={index}>
                <ItemCourse>
                    <Inner>
                        <ImgCourse courseAvatar={item.courseAvatar}>
                            {item.percent ? <LabelSale>{item.percent} %</LabelSale> : null}
                        </ImgCourse>
                        <InfoCourse>
                            <InfoTitle>
                                <CourseLink {...item} />
                            </InfoTitle>
                            <InfoLecturer>{item.lecturer ? item.lecturer.fullname : '...'}</InfoLecturer>
                            <Rating>
                                <RatingStar star={item.rating ? item.rating : 0} />
                            </Rating>
                            <Price>
                                <NumberFormat
                                    value={item.price ? item.price : '0'}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={''}
                                    renderText={value => <span className="amount">{value} đ</span>}
                                />
                            </Price>
                            {isComment ? (
                                <Fragment>
                                    <CommentCounts>
                                        <FontAwesome>
                                            <FontAwesomeIcon icon={faCommentDots} color="#F76B1C" />
                                        </FontAwesome>
                                        {item.Comments.count} Comments
                                    </CommentCounts>
                                    <CommentDetail>
                                        <ContentComment>
                                            <Avatarspan
                                                bgAvatar={
                                                    item.Comments.rows[0] &&
                                                    item.Comments.rows[0].createdBy &&
                                                    item.Comments.rows[0].createdBy.avatar
                                                        ? item.Comments.rows[0].createdBy.avatar
                                                        : SquareLogo
                                                }
                                            />
                                            <NameUser>
                                                {item.Comments.rows[0] && item.Comments.rows[0].createdBy
                                                    ? item.Comments.rows[0].createdBy.fullname
                                                    : '...'}
                                            </NameUser>
                                            <h5>{item.Comments.rows[0] ? item.Comments.rows[0].comment : null}</h5>
                                        </ContentComment>
                                    </CommentDetail>
                                </Fragment>
                            ) : null}

                            <AddToCart>
                                <Button
                                    className="btn btn-primary"
                                    onClick={() => this.addToCart(item)}
                                    disabled={alreadyInCart}
                                >
                                    {alreadyInCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                                </Button>
                            </AddToCart>
                        </InfoCourse>
                    </Inner>
                </ItemCourse>
            </div>
        );
    };

    render() {
        const { dataCourseNew, dataCourseSale, dataCourseHighlight } = this.state;
        const {
            Element,
            builder,
            backgroundImage,
            newEnable,
            saleEnable,
            highlightEnable,
            highlightTopic,
            highlightNew,
            highlightSale
        } = this.props;
        const props = {
            htmlTag: 'div',
            ...builder,
            settings
        };
        const setting = {
            dots: false,
            infinite: false,
            speed: 10000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },

                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <Element {...props}>
                <Root backgroundImage={backgroundImage}>
                    <RootContent>
                        <Content>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                {highlightEnable ? (
                                    <TabPane
                                        tab={<span dangerouslySetInnerHTML={{ __html: highlightTopic }} />}
                                        key="1"
                                    >
                                        <CarouselWrapper>
                                            <div className="row">
                                                <Slider {...setting}>
                                                    {!_.isEmpty(dataCourseHighlight.rows)
                                                        ? dataCourseHighlight.rows.map((item, index) =>
                                                              this.renderItemSlider(
                                                                  item,
                                                                  index,
                                                                  dataCourseHighlight.hasComment
                                                              )
                                                          )
                                                        : null}
                                                </Slider>
                                            </div>
                                        </CarouselWrapper>
                                    </TabPane>
                                ) : null}

                                {newEnable ? (
                                    <TabPane tab={<span dangerouslySetInnerHTML={{ __html: highlightNew }} />} key="2">
                                        <CarouselWrapper>
                                            <div className="row">
                                                <Slider {...setting}>
                                                    {!_.isEmpty(dataCourseNew.rows)
                                                        ? dataCourseNew.rows.map((item, index) =>
                                                              this.renderItemSlider(
                                                                  item,
                                                                  index,
                                                                  dataCourseNew.hasComment
                                                              )
                                                          )
                                                        : null}
                                                </Slider>
                                            </div>
                                        </CarouselWrapper>
                                    </TabPane>
                                ) : null}
                                {saleEnable ? (
                                    <TabPane tab={<span dangerouslySetInnerHTML={{ __html: highlightSale }} />} key="3">
                                        <CarouselWrapper>
                                            <div className="row">
                                                <Slider {...setting}>
                                                    {!_.isEmpty(dataCourseSale.rows)
                                                        ? dataCourseSale.rows.map((item, index) =>
                                                              this.renderItemSlider(
                                                                  item,
                                                                  index,
                                                                  dataCourseSale.hasComment
                                                              )
                                                          )
                                                        : null}
                                                </Slider>
                                            </div>
                                        </CarouselWrapper>
                                    </TabPane>
                                ) : null}
                            </Tabs>
                        </Content>
                    </RootContent>
                </Root>
            </Element>
        );
    }
}

CourseSliderElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object,
    content: PropTypes.string,
    headingContent: PropTypes.string,
    backgroundImage: PropTypes.string,
    data: PropTypes.object,
    widgetActions: PropTypes.object.isRequired,
    newEnable: PropTypes.bool,
    saleEnable: PropTypes.bool,
    highlightEnable: PropTypes.bool,
    numberNew: PropTypes.string,
    numberSale: PropTypes.string,
    dataHighlight: PropTypes.object,
    commentHighlight: PropTypes.object,
    commentNews: PropTypes.object,
    commentSale: PropTypes.object,
    highlightTopic: PropTypes.string,
    highlightNew: PropTypes.string,
    highlightSale: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseSliderElement);
