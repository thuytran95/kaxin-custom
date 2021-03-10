import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import settings from './settings';
import propsSchema from './props-schema';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import NumberFormat from 'react-number-format';

import { RootContent, Root, Content, CarouselWrapper, Button } from './styled';
import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class CategoryHighlightsElement extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataCourseNew: [],
            dataCourseSale: [],
            dataCourseHighlight: []
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
                this.setState({ dataCourseHighlight: data.data.rows });
            });
        }
        if (newEnable && numberNew > 0) {
            const param = {
                numberNew: numberNew,
                newCommentNews: commentNews.toggle1,
                hotCommentNews: commentNews.toggle2
            };
            widgetActions.listSliderCourseNews(param).then(data => {
                this.setState({ dataCourseNew: data.data.rows });
            });
        }
        if (saleEnable && numberSale > 0) {
            const paramSale = {
                numberSale: numberSale,
                hotCommentSale: commentSale.toggle2,
                newCommentSale: commentSale.toggle1
            };
            widgetActions.listSliderCourseSale(paramSale).then(data => {
                this.setState({ dataCourseSale: data.data.rows });
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
                    this.setState({ dataCourseHighlight: data.data.rows });
                });
            }
        }
        if (newEnable && numberNew > 0) {
            if (this.props.numberNew !== prevProps.numberNew) {
                widgetActions.listSliderCourseNews(paramNew).then(data => {
                    this.setState({ dataCourseNew: data.data.rows });
                });
            }
        }
        if (saleEnable && numberSale > 0) {
            if (this.props.numberSale !== prevProps.numberSale) {
                widgetActions.listSliderCourseSale(paramSale).then(data => {
                    this.setState({ dataCourseSale: data.data.rows });
                });
            }
        }
    }

    renderItemSlider = (item, index) => {
        return (
            <div className="course-items" key={index}>
                <div className="itemCourse ">
                    <div className="inner">
                        <div
                            className="imgCourse"
                            style={{
                                backgroundImage: `url(${item.courseAvatar})`
                            }}
                        >
                            {item.percent ? (
                                <span className="labelSale">{item.percent} %</span>
                            ) : (
                                <span className="labelSale" />
                            )}
                        </div>
                        <div className="infoCourse">
                            <h4>{item.name ? item.name : '...'}</h4>
                            <p>{item.lecturer ? item.lecturer.fullname : '...'}</p>
                            <div className="rating">
                                <span
                                    className="star"
                                    style={{
                                        width: `${item.rating / 5 * 100}%`
                                    }}
                                />
                            </div>
                            <div className="price">
                                <NumberFormat
                                    value={item.price ? item.price : '0'}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={''}
                                    renderText={value => <span className="amount">{value} đ</span>}
                                />
                            </div>
                            <div className="addToCart">
                                <Button>Thêm vào giỏ hàng</Button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                    {!_.isEmpty(dataCourseHighlight)
                                                        ? dataCourseHighlight.map((item, index) =>
                                                              this.renderItemSlider(item, index)
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
                                                    {!_.isEmpty(dataCourseNew)
                                                        ? dataCourseNew.map((item, index) =>
                                                              this.renderItemSlider(item, index)
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
                                                    {!_.isEmpty(dataCourseSale)
                                                        ? dataCourseSale.map((item, index) =>
                                                              this.renderItemSlider(item, index)
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

CategoryHighlightsElement.propTypes = {
    Element: PropTypes.func.isRequired,
    builder: PropTypes.object.isRequired,
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
    highlightSale: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHighlightsElement);
