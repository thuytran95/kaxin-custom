import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    width: 50%;
    background-image: none;
    background-color: #f7a61c;
    overflow: hidden;
    position: relative;
    &:after {
        display: none;
    }
    ${mediaQueries.lessThan('mobile')`
        max-width: 320px;
    `};
`;
export const RootContainer = styled.div`
    margin: 0 auto;
    padding: 0 15px;
`;

export const RootRow = styled.div`
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
    flex-direction: column;
`;
export const Left = styled.div`
    display: none;
`;

export const Right = styled.div`
    flex-direction: column;
    flex: 12;
    position: relative;
    padding: 40px 15px;
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
    text-align: center;
    font-family: 'Montserrat', sans-serif;
`;

export const Heading = styled('h2')`
    font-size: 55px;
    font-weight: 900;
    line-height: 70px;
    margin: 0 0 25px;
    text-transform: uppercase;
    color: #fff;
    b {
        display: block;
        font-size: 30px;
        line-height: 50px;
        color: #fff;
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
