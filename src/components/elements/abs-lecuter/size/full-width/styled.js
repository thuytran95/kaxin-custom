import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    background-image: radial-gradient(circle at 42% 66%, #1196ed, #0071bb);
    overflow: hidden;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        top: 0;
        left: 46%;
        width: 110%;
        height: 1000px;
        background-image: linear-gradient(to bottom, #f4bd3f, #f7a61c);
        transform: rotate(10deg);
        z-index: 100;
    }
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
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
    `};
`;
export const Left = styled.div`
    flex: 6;
    position: relative;
    padding-top: 30px;
    padding-bottom: 100px;
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
        flex: 12;
    `};
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 90%;
        background-image: url(${props => props.bannerImage});
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 10;
    }
`;

export const Right = styled.div`
    flex: 6;
    position: relative;
    padding-top: 30px;
    padding-bottom: 100px;
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
        flex: 12;
    `};
`;
export const HideText = styled('h2')`
    font-size: 140px;
    font-weight: 900;
    line-height: 0.82;
    color: #fff;
    opacity: 0.2;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
`;

export const BoxText = styled('div')`
    position: relative;
    z-index: 999;
    text-align: right;
    font-family: 'Montserrat', sans-serif;
`;

export const Heading = styled('h2')`
    font-size: 72px;
    font-weight: 900;
    line-height: 80px;
    margin: 0 0 25px;
    text-transform: uppercase;
    color: #0071bb;
    b {
        display: block;
        font-size: 39px;
        line-height: 50px;
        color: #000;
    }
`;
export const Description = styled('div')`
    p {
        margin: 0 0 25px;
        line-height: 1.79;
    }
`;

export const Button = styled.div`
    a {
        display: inline-block;
        background-color: #0071bb;
        border-color: #0071bb;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff !important;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 5px;
        border-radius: 4px;
        &:hover {
            background-color: #000;
            border-color: #000;
            color: #fff !important;
        }
    }
`;
