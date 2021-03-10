import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';

export const Root = styled.div`
    background-image: linear-gradient(249deg, #36d1dc, #5b86e5);
    padding: 50px 150px;
`;

export const RootContent = styled.div`
    height: 340px;
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
    .row {
        width: 100%;
    }
`;

export const Heading = styled('div')`
    color: inherit;
    font-size: 48px;
    font-weight: 900;
    line-height: 60px;
    margin: 0 0 25px;
    text-transform: uppercase;
    color: #fff;
    h2 {
        color: inherit;
        font-size: 48px;
        font-weight: 900;
        line-height: 60px;
        margin: 0 0 25px;
        text-transform: uppercase;
        color: #fff;
    }
`;

export const Description = styled('div')`
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.79;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
    margin: 0 0 25px;
    line-height: 1.79;
`;
export const Text = styled('div')`
    background-color: #f9cf00;
    border-color: #f9cf00;
    color: #0071bb;
    font-style: 14px;
    font-weight: 700;
    padding: 10px 15px;
    text-transform: uppercase;
    float: left;
    border-radius: 5px;
    &:hover {
        background-color: #0071bb;
        border-color: #0071bb;
        color: #f9cf00;
    }
`;
export const DivCategory = styled('div')`
    &:focus {
        outline: -webkit-focus-ring-color auto 5px;
    }
    &:hover {
        background-color: #fff;
    }
    border-radius: 5px;
    background-color: hsla(0, 0%, 100%, 0.68);
    padding: 10px;
    min-height: 120px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
    margin: 0 0 30px;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
`;

export const TextBottom = styled('div')`
    text-transform: uppercase;
    font-weight: 700;
    line-height: 20px;
`;
export const IconCate = styled('div')`
    margin: 0 0 15px;
`;

export const Img = styled('img')`
    max-height: 30px;
`;
