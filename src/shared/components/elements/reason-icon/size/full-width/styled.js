import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    padding: 60px 0;
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

export const SectionTitle = styled.div`
    text-align: center;
    margin: 0;
    font-size: 30px;
    font-weight: 900;
    color: #8191a0;
    text-transform: uppercase;
    margin-bottom: 40px;
`;

export const Heading = styled('h3')`
    font-size: 56px;
    font-weight: 900;
    line-height: 60px;
    margin-bottom: 10px;
    color: #000;
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

export const ItemWhy = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 15px;
    text-align: center;
    ${mediaQueries.lessThan('tablet')`
        flex: 0 0 50%;
        max-width: 50%;
        padding:15px;
    `};

    ${mediaQueries.lessThan('mobile')`
        flex: 0 0 100%;
        max-width: 100%;
        padding:15px;
    `};

    img {
        max-width: 60px;
        display: block;
        margin: 0 auto 30px;
    }
`;

export const HeadingItem = styled('h4')`
    font-size: 18px;
    font-weight: bold;
    color: #031f31;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
`;

export const DescriptionItem = styled('div')`
    font-size: 14px;
    line-height: 26px;
    font-family: 'Montserrat', sans-serif;
`;
