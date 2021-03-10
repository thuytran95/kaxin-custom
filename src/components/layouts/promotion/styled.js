import styled from 'styled-components';
import mediaQueries from 'src/components/shared/Theme/media-queries';

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

export const RootRow = styled.div`
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
`;

export const WrapSidebar = styled.div`
    flex: 3;
    max-height: 100%;
`;

export const WrapContent = styled.div`
    flex: 9;
    max-height: 100%;
    padding: 0 15px;
`;

export const Heading = styled('h1')`
    padding: 50px 0 40px;
    text-align: center;
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #0071bb;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
`;
