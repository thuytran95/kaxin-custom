import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    max-width: 50%;
    padding: 60px 0;
    background-color: #0071bb;
    color: #fff;
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

export const SectionTitle = styled.div`
    text-align: center;
    margin: 0;
    font-size: 30px;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 40px;
`;

export const Heading = styled('h3')`
    font-size: 56px;
    font-weight: 900;
    line-height: 60px;
    margin-bottom: 10px;
    color: #f9cf00;
    font-family: 'Montserrat', sans-serif;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
`;

export const Description = styled('p')`
    font-family: 'Montserrat', sans-serif;
    b {
        color: #0071bb;
    }
`;

export const WrapList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
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
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 15px;
    list-style: none;
    text-align: center;
    padding: 0 15px;
    position: relative;
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 70px;
        left: 0;
        right: 50%;
        height: 4px;
        background-color: #b7d1ee;
        z-index: 1;
    }
    &:after {
        left: 50%;
        right: 0;
    }
    &:nth-child(2n + 1) {
        &:before {
            display: none;
        }
    }
    &:nth-child(2n + 2),
    &:last-child {
        &:after {
            display: none;
        }
    }
    ${mediaQueries.lessThan('mobile')`
        flex: 0 0 100%;
        max-width: 100%;
        margin-bottom: 15px;
        &:before,
        &:after{
            display:none;
        }
    `};
`;

export const Thumbnail = styled.div`
    position: relative;
    z-index: 10;
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ffffff;
    border: solid 4px #b7d1ee;
    line-height: 150px;
    margin: 0 auto 30px;
    img {
        display: inline-block;
        max-width: 50px;
    }
`;
export const HeadingItem = styled('h4')`
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
`;
