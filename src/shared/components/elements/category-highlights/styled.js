import styled from 'styled-components';
import mediaQueries from 'components/shared/Theme/media-queries';
export const Root = styled.div`
    background-image: url(${props => props.backgroundImage}) !important;
    background: #ccc;
    padding: 0px 150px;
`;

export const RootContent = styled.div`
    min-height: 340px;
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
export const Content = styled('div')`
    flex: 1;
    max-height: 100%;
    ${mediaQueries.lessThan('tablet')`
    flex: 1
`};
    padding: 15px 0;
    align-items: center;
    overflow: hidden;
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
`;

export const Heading = styled('h2')`
    color: #fff;
    font-size: 52px;
    font-weight: 900;
    margin: 0 0 50px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
`;

export const DivCategory = styled('div')`
    margin: 0 0 30px;
    background-color: #fff;
    .topItem {
        overflow: hidden;
        height: 350px;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(${props => props.backgroundImageCate});
        a {
            display: block;
            overflow: hidden;
            text-indent: -999px;
            height: 100%;
        }
    }
    .botItem {
        padding: 20px;
        h4 {
            font-size: 18px;
            font-weight: 700;
            color: #0071bb;
            text-transform: uppercase;
            min-height: 57px;
            overflow: hidden;
            display: block;
            margin-bottom: 24px;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 15px;
            :before {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 20px;
                height: 4px;
                opacity: 0.68;
                background-color: #c5cdd3;
                -webkit-transition: all 0.4s ease-in-out;
                transition: all 0.4s ease-in-out;
            }
            :focus {
                outline: -webkit-focus-ring-color auto 5px;
            }
        }
        p {
            font-size: 14px;
            font-style: italic;
        }
    }
`;
