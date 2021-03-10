import styled from 'styled-components';

export const Root = styled.div`
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        display: block;
        margin: 0 auto;
        width: 100%;
        max-width: 500px;
    }
`;

export const Heading = styled('h3')`
    font-size: 36px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: rgba(74, 74, 74, 0.38);
    text-transform: uppercase;
`;
