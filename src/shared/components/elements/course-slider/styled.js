import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    background-image: url(${props => props.backgroundImage}) !important;
    background: #fff;
    padding: 60px 0;
    font-family: 'Montserrat';
`;

export const RootContent = styled.div`
    min-height: 340px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    overflow: hidden;
    ${mediaQueries.greaterThan('desktop')`
        max-width: 1140px;
    `};
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
        padding: 20px;
    `};
`;
export const Content = styled('div')`
    flex: 1;
    max-height: 100%;
    .ant-tabs-bar {
        display: block;
        border-bottom: 4px solid #d9d9d9;
        text-align: center;
    }
    .ant-tabs-nav-container {
        margin-bottom: -4px;
    }
    .ant-tabs-nav .ant-tabs-tab {
        display: inline-block;
        margin: 0 20px;
        border: 0 !important;
        padding: 0 0 15px;
        position: relative;
        font-size: 18px;
        font-weight: bold;
        color: #9b9b9b !important;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
            color: #0071bb !important;
        }
    }
    .ant-tabs-nav .ant-tabs-tab-active {
        color: #0071bb !important;
    }
    .ant-tabs-ink-bar {
        height: 4px;
    }
    ${mediaQueries.lessThan('tablet')`
    flex: 1
`};
    padding: 15px 0;
    align-items: center;
    overflow: hidden;
`;

export const LeftContent = styled('div')`
    flex: 3;
    max-height: 100%;
    ${mediaQueries.lessThan('tablet')`
        flex: 1
    `};
    padding: 15px 0;
`;

export const RightContent = styled('div')`
    flex: 7;
    max-height: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 15px 0;
    padding-left: 20px;
    ${mediaQueries.lessThan('tablet')`
        flex: 1;
        padding-left: 0px;
    `};
`;

export const Heading = styled('h2')`
    color: #fff;
    font-size: 52px;
    font-weight: 900;
    margin: 0 0 50px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
`;

export const CourseItem = styled('div')`
    background-color: #fff;
`;

export const CarouselWrapper = styled('div')`
    .slick-slider {
        width: 100%;
    }

    .slick-list {
        padding-top: 50px;
        padding-bottom: 20px;
    }

    .slick-slide {
        padding: 0 15px;
    }

    .slick-next,
    .slick-prev {
        display: block;
        position: absolute;
        padding: 0;
        top: 50%;
        width: 50px;
        height: 50px;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        cursor: pointer;
        color: transparent;
        border: none;
        outline: 0;
        background: transparent;
        overflow: hidden;
        text-indent: -9999px;
        border: 0 !important;
        outline: none !important;
        z-index: 1000;
        &::before {
            content: '';
            font-family: 'Material-Design-Iconic-Font';
            font-size: 50px;
            line-height: 50px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-indent: 0;
            text-align: center;
            color: #9b9b9b;
        }
        &:hover,
        &:focus {
            &::before {
                color: #4a4a4a;
            }
        }
    }

    .slick-next {
        left: 100%;
        &::before {
            content: '\f2fb';
        }
    }

    .slick-prev {
        right: 100%;
        &::before {
            content: '\f2fa';
        }
    }

    .itemCourse {
        max-width: 300px;
        .infoCourse {
            max-height: 200px;
            overflow: hidden;
        }
        .imgCourse {
            height: 200px;
        }
        &:hover {
            .infoCourse {
                max-height: none;
                overflow: visible;
            }
        }
    }
    .itemCourse {
        min-height: 370px;
        margin: 0 0 30px;
        transition: all 0.3s linear;
        position: relative;
        font-family: 'Montserrat';
        &:hover {
            .inner {
                position: absolute;
                top: -50px;
                right: -15px;
                bottom: -50px;
                left: -15px;
                box-shadow: 0 0 10px 0 #dadada;
                z-index: 100;
            }
            .addToCart {
                height: auto;
                transform: translateY(0);
                visibility: visible;
            }
        }
        .inner {
            position: relative;
            border-radius: 4px;
            background-color: #fff;
            border: solid 1px #d9d9d9;
            box-shadow: 0 0 10px 0 #fff;
            transition: all 0.4s linear;
        }
        .imgCourse {
            overflow: hidden;
            position: relative;
            max-height: 250px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            img {
                display: block;
                width: 100%;
            }
            a {
                display: block;
                overflow: hidden;
                text-indent: -999px;
                height: 100%;
            }
        }
        .labelSale {
            position: absolute;
            top: 20px;
            right: 0;
            display: inline-block;
            background-color: #f19f4d;
            color: #fff;
            font-size: 13px;
            line-height: 25px;
            line-height: 25px;
            font-weight: bold;
            min-width: 50px;
            padding: 0 5px;
            text-align: center;
        }
        .infoCourse {
            position: relative;
            padding: 15px;
            min-height: 200px;
            h4 {
                font-size: 13px;
                line-height: 18px;
                font-weight: 700;
                text-transform: uppercase;
                height: 36px;
                overflow: hidden;
                display: block;
                margin-bottom: 1.5rem;
            }
            p {
                font-size: 12px;
                font-weight: 500;
                font-style: italic;
                color: #0071bb;
                min-height: 25px;
            }
        }
        .price {
            span {
                display: inline-block;
                vertical-align: middle;
                font-size: 18px;
                line-height: 24px;
                font-weight: 700;
                color: #0071bb;
            }
            .regularPrice {
                font-size: 13px;
                color: #9b9b9b;
                text-decoration: line-through;
                margin-left: 5px;
            }
        }
        .rating {
            display: block;
            position: relative;
            width: 80px;
            height: 16px;
            line-height: 16px;
            margin-bottom: 1rem;
            color: #eb9f4d;
            &::before {
                content: '\f27c\f27c\f27c\f27c\f27c';
                font-family: 'Material-Design-Iconic-Font';
                display: block;
                width: 100%;
                height: 100%;
                letter-spacing: 5px;
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .addToCart {
            overflow: hidden;
            height: 0;
            transform: translateY(30px);
            visibility: hidden;
            margin-top: 25px !important;
            transition: all 0.2s linear;
            button {
                display: block;
                border-color: #f19f4d;
                background-color: #f19f4d;
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                width: 100%;
                outline: none !important;
                &:hover {
                    border-color: #0071bb;
                    background-color: #0071bb;
                }
            }
        }
    }
`;
export const Button = styled.div`
    display: inline-block;
    color: #fff;
    line-height: 40px;
    padding: 0 20px;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    background-color: #f19f4d;
    border-color: #f19f4d;
    display: block;
    font-size: 14px;
    font-weight: 700;
    outline: 0 !important;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    &:hover {
        background-color: #0071bb;
        border-color: #0071bb;
    }
`;
