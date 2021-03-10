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
    ${mediaQueries.lessThan('tablet')`
        flex-direction: column;
    `};
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin: 0;
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 40px;
`;

export const Heading = styled('h3')`
    font-size: 56px;
    font-weight: 900;
    line-height: 60px;
    margin: 0;
    color: #4a4a4a;
    opacity: 0.7;
    font-family: 'Montserrat', sans-serif;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
`;
export const ColumnLeft = styled.div`
    flex: 12;
    padding: 0 15px;
    ${mediaQueries.lessThan('tablet')`
        flex: 12;
        padding:15px;
    `};
    ul {
        margin: 0 0 30px;
        padding: 0;
        li {
            display: flex;
            align-items: center;
            border-radius: 4px;
            background-color: #e7f2f9;
            border: solid 1px #d9d9d9;
            margin-bottom: 20px;
            padding: 20px;
            padding-left: 50px;
            font-family: 'Montserrat', sans-serif;
        }
    }
`;
export const Icon = styled('div')`
    width: 70px;
    img {
        max-width: 70px;
    }
`;
export const Content = styled('div')`
    padding-left: 40px;
    p {
        margin-bottom: 0;
    }
`;

export const TitleItem = styled('div')`
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    color: #031f31;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
`;

export const DescriptionItem = styled('div')`
    display: block;
    margin-top: 5px;
    color: #8191a0;
    font-family: 'Montserrat', sans-serif;
`;
export const ColumnRight = styled.div`
    flex: 4;
    padding: 0 15px;
    ${mediaQueries.lessThan('tablet')`
        flex: 12;
        padding:15px;
    `};
    form {
        .form-group {
            margin-bottom: 20px;
        }

        label {
            font-size: 13px;
            font-weight: bold;
            color: #8191a0;
            font-family: 'Montserrat', sans-serif;
        }
        .btn {
            background-color: #0071bb;
            border-color: #0071bb;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
            line-height: 20px;
            outline: 0;
            padding: 8px 10px;
            color: #fff;
            border-radius: 4px;
            font-family: 'Montserrat', sans-serif;
            &:hover {
                background-color: #f19f4d;
                border-color: #f19f4d;
            }
        }
    }
`;

export const Text = styled('div')`
    margin-bottom: 25px;
    h4 {
        font-size: 24px;
        font-weight: bold;
        color: #0071bb;
        text-transform: uppercase;
        margin-bottom: 15px;
        font-family: 'Montserrat', sans-serif;
    }
    p {
        font-size: 13px;
        line-height: 20px;
        font-weight: bold;
        font-style: italic;
        color: #8191a0;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
    }
`;
export const TitleBox = styled('h4')`
    font-size: 24px;
    font-weight: bold;
    color: #0071bb;
    text-transform: uppercase;
    margin-bottom: 15px;
    font-family: 'Montserrat', sans-serif;
`;
export const DescriptionBox = styled.p`
    font-size: 14px;
    line-height: 26px;
    font-weight: bold;
    font-style: italic;
    color: #8191a0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
`;

export const SignUp = styled.div`
    text-align: center;
    a {
        display: inline-block;
        background-color: #0071bb;
        border-color: #0071bb;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 5px;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        &:hover {
            background-color: #f19f4d;
            border-color: #f19f4d;
            color: #fff;
        }
    }
`;
