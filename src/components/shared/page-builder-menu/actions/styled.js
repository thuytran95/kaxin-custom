import styled from 'styled-components';
export const WrapButton = styled.div`
    display: flex;
`;
export const Button = styled.button`
    cursor: pointer;
    padding: 8px 15px;
    text-decoration: none;
    font-size: 12px;
    line-height: 15px;
    border-radius: 3px;
    outline: 0;
    display: block;
    text-align: center;
    width: 50%;
    margin-right: 0;
    text-transform: uppercase;
    border: 1px solid #fff;
    background-color: transparent;
    color: ${({ buttonType, theme }) => {
        switch (buttonType) {
            case 'primary':
                return theme.colors.primary;
            case 'danger':
                return theme.colors.red;
            default:
                return theme.colors.primary;
        }
    }};
    border-color: ${({ buttonType, theme }) => {
        switch (buttonType) {
            case 'primary':
                return theme.colors.primary;
            case 'danger':
                return theme.colors.red;
            default:
                return theme.colors.primary;
        }
    }};
`;
