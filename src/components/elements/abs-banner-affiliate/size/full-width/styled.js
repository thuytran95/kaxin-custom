import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';

export const Root = styled.div`
    background-color: #e5e5e5;
    background-position: center bottom;
    background-repeat: no-repeat;
    text-align: center;
    padding: 150px 0 15%;
    position: relative;
`;
export const RootContainer = styled.div`
    margin: 0 auto;
    padding: 0 15px;
    ${mediaQueries.greaterThan('desktop')`
        max-width: 1140px;
    `};
    ${mediaQueries.lessThan('tablet')`
        max-width: 970px;
    `};
`;

export const RootRow = styled.div`
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
    flex-wrap: wrap;
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
    `};
`;

export const SectionText = styled.div`
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
`;

export const Heading1 = styled('h4')`
    font-size: 30px;
    font-weight: 900;
    color: #000;
    margin-bottom: 10px;
    b {
        color: #f19f4d;
    }
`;
export const Heading2 = styled('h2')`
    font-size: 72px;
    font-weight: 900;
    color: #0071bb;
    margin-bottom: 10px;
`;
export const Heading3 = styled('div')`
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 30px;
    p {
        margin: 0;
    }
`;
export const WrapList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    &:before,
    &:after {
        content: '';
        display: block;
    }
    &:after {
        clear: both;
    }
`;
export const WrapItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-image: linear-gradient(to bottom, #cc2b5e, #753a88);
    margin: 0 auto 30px;
    padding: 20px;
    img {
        max-width: 80px;
        margin-bottom: 10px;
    }
    h4 {
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
    }
`;

export const WrapButtons = styled.div`
    margin-bottom: 60px;
    a {
        display: inline-block;
        background-color: #0071bb;
        border-color: #0071bb;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 5px;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            max-width: 20px;
        }
        &:hover {
            background-color: green;
            border-color: green;
            color: #fff;
        }
        &:last-child {
            background-color: #f19f4d;
            border-color: #f19f4d;
            &:hover {
                background-color: green;
                border-color: green;
            }
        }
    }
`;

export const WrapHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
`;

export const WrapInner = styled.div`
    position: relative;
    ul {
        display: block;
        margin: 0;
        padding: 0;
        list-style: none;
        border-bottom: 1px solid rgba(3, 31, 49, 0.22);
        text-align: center;
        &:before,
        &:after {
            content: '';
            display: block;
        }
        &:after {
            clear: both;
        }
        li {
            display: inline-block;
            margin: 0 15px -1px;
            a {
                display: block;
                padding: 40px 0;
                border-bottom: 4px solid transparent;
                font-size: 18px;
                font-weight: bold;
                text-transform: uppercase;
                color: #031f31;
                font-family: 'Montserrat', sans-serif;
            }
            &.active,
            &:hover {
                a {
                    border-color: #0071bb;
                    color: #0071bb;
                }
            }
        }
    }
`;

export const Logo = styled.div`
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 10;
`;

export const ActionLink = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 10;
    a {
        display: inline-block;
        background-color: #0071bb;
        border-color: #0071bb;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 5px;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        &:hover {
            background-color: #f19f4d;
            border-color: #f19f4d;
        }
    }
`;
