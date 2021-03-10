import styled from 'styled-components';

export const RootWrap = styled.div`
    display: inline-block;
`;

export const WrapTooltip = styled.div`
    display: inline-block;
    background-color: ${({ dark, theme }) => (dark ? theme.colors.chromeBackgroundColor : theme.colors.primary)};
    color: #ffffff;
    padding: 5px 7px;
    font-size: 11px;
    border-radius: 3px;

    &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: -7px;
        transform: translateX(-5px);
        left: 50%;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 7px 5px;
        border-color: transparent;
        border-bottom-color: ${({ dark, theme }) => (dark ? theme.colors.chromeBackgroundColor : theme.colors.primary)};
    }
`;
