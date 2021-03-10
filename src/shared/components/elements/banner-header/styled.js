import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    padding: 30px 0;
    background-image: url('/static/assets/images/km/bgKM.png');
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    color: #fff;
    text-align: center;
`;
export const RootContainer = styled.div`
    margin: 0 auto;
    align-items: center;
    padding: 0 15px;
    ${mediaQueries.greaterThan('desktop')`
        max-width: 1140px;
    `};
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
        padding: 20px;
    `};
`;
export const WrapInner = styled('div')`
    padding: 20% 8% 15%;
`;

export const BoxText = styled('div')`
    margin-bottom: 10px;
    &:before,
    &:after {
        content: '';
        display: table;
    }
    &:after {
        clear: both;
    }
    span {
        font-size: 30px;
        line-height: 30px;
        font-weight: 900;
        float: left;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        &:last-child {
            float: right;
        }
    }
`;

export const Code = styled('span')`
    p {
        margin-bottom: 0;
    }
    b {
        text-transform: none;
    }
`;

export const Heading = styled('h4')`
    display: block;
    font-size: 72px;
    line-height: 75px;
    font-weight: 900;
    color: #0071bb;
    text-transform: uppercase;
    padding: 15px 10px 0px;
    background-color: #fff;
    font-family: 'Montserrat', sans-serif;
`;

export const Percent = styled('p')`
    font-size: 144px;
    line-height: 160px;
    font-weight: 900;
    text-align: right;
    font-family: 'Montserrat', sans-serif;
`;
