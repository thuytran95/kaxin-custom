import styled from 'styled-components';
export const Root = styled.div`
    width: 100%;
    max-width: 320px;
    padding: 60px 0;
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

export const SectionTitle = styled.div`
    text-align: center;
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    color: #8191a0;
    text-transform: uppercase;
    margin-bottom: 30px;
`;

export const Heading = styled('h3')`
    font-weight: 900;
    font-size: 40px;
    line-height: 50px;
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
    flex: 0 0 100%;
    max-width: 100%;
    padding: 15px;
    text-align: center;
    img {
        max-width: 60px;
        display: block;
        margin: 0 auto 30px;
    }
`;

export const HeadingItem = styled('h4')`
    font-size: 16px;
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
