import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';

export const Wrapper = styled.div`
    width:100%:
    max-width:1170px;
    ${mediaQueries.greaterThan('desktop')`
        max-width:1170px;
    `};
    ${mediaQueries.lessThan('tablet')`
        max-width: 970px;
        flex-direction: column;
    `};

`;
export const Course = styled.div`
    margin: 0 0 30px;
    min-height: 370px;
    position: relative;
    transition: all 0.3s linear;
    .inner {
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-shadow: 0 0 10px 0 #fff;
        position: relative;
        transition: all 0.4s linear;
    }
    .thumbnail {
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        height: 250px;
        overflow: hidden;
        position: relative;
    }
    .info {
        min-height: 205px;
        padding: 15px;
        position: relative;
        h4 {
            display: block;
            font-size: 13px;
            font-weight: 700;
            height: 36px;
            line-height: 18px;
            margin-bottom: 1.5rem;
            overflow: hidden;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
        }
        p {
            color: #0071bb;
            font-size: 12px;
            font-style: italic;
            font-weight: 500;
            min-height: 25px;
            font-family: 'Montserrat', sans-serif;
        }
        .rating {
            color: #eb9f4d;
            display: block;
            height: 16px;
            line-height: 16px;
            margin-bottom: 1rem;
            position: relative;
            width: 80px;
            &:before {
                content: '\f27c\f27c\f27c\f27c\f27c';
                display: block;
                font-family: 'Material-Design-Iconic-Font';
                height: 100%;
                left: 0;
                letter-spacing: 5px;
                overflow: hidden;
                position: absolute;
                top: 0;
                width: 100%;
            }
        }
        .star {
            display: block;
            height: 16px;
            line-height: 16px;
            position: relative;
        }
        .star:before {
            content: '\f27d\f27d\f27d\f27d\f27d';
            display: block;
            font-family: 'Material-Design-Iconic-Font';
            height: 100%;
            left: 0;
            letter-spacing: 5px;
            overflow: hidden;
            position: absolute;
            top: 0;
            width: 100%;
        }
        .price span {
            color: #0071bb;
            display: inline-block;
            font-size: 18px;
            font-weight: 700;
            line-height: 24px;
            vertical-align: middle;
            font-family: 'Montserrat', sans-serif;
        }
        .price .regularPrice {
            color: #9b9b9b;
            font-size: 13px;
            margin-left: 5px;
            text-decoration: line-through;
        }
        .price,
        .rating {
            transition: all 0.25s ease-in-out;
        }
    }
    .addToCart {
        -webkit-transform: translateY(30px);
        height: 0;
        margin-top: 25px !important;
        overflow: hidden;
        transform: translateY(30px);
        transition: all 0.2s linear;
        visibility: hidden;
    }
    &:hover {
        .price {
            opacity: 0;
            -webkit-transform: translateY(20px);
            transform: translateY(20px);
        }
        .rating {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
        .addToCart {
            position: absolute;
            bottom: 15px;
            left: 12px;
            right: 15px;
            -webkit-transform: translateY(0);
            height: auto;
            transform: translateY(0);
            visibility: visible;
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
