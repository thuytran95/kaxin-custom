import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    background: #ececec;
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
    flex: 6;
    max-height: 100%;
    ${mediaQueries.lessThan('tablet')`
        flex: 1
    `};
    padding: 15px 0;
`;

export const RightContent = styled('div')`
    flex: 4;
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

export const Heading = styled('h1')`
    font-size: 36px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: rgba(74, 74, 74, 0.38);
    font-family: 'Montserrat', sans-serif;
`;

export const Description = styled('div')`
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.79;
    letter-spacing: normal;
    text-align: left;
    color: #4a4a4a;
`;
