import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'components/shared/Theme';
import Actions from './actions';

import Tabs from './tabs';

const WrapContent = styled.div`
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: ${({ theme }) => theme.sizes.saveActionsHeight};
    overflow: hidden;
`;

const Content = styled.div`
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
`;

const WrapMenu = styled.div`
    transform: ${({ theme, previewing }) => (!previewing ? `translateX(-${theme.sizes.menuWidth})` : `translateX(0)`)};
    position: absolute;
    left: 100%;
    top: 0;
    bottom: 0;
    width: ${({ theme }) => theme.sizes.menuWidth};
    background-color: ${({ theme }) => theme.colors.chromeBackgroundColor};
    border-left: 1px solid;
    border-left-color: ${({ theme }) => theme.colors.chromeBordersColor};
    transition: transform 0.2s ease-in-out;
`;

export default class PageBuilderMenu extends PureComponent {
    static defaultProps = {
        editing: false,
        previewing: false
    };
    static propTypes = {
        editing: PropTypes.bool.isRequired,
        previewing: PropTypes.bool.isRequired
    };

    render() {
        const { previewing } = this.props;
        return (
            <Theme>
                <WrapMenu previewing={previewing}>
                    <WrapContent>
                        <Content>
                            <Tabs />
                        </Content>
                        {/* <Breadcrumbs className={styles.breadcrumbs} /> */}
                    </WrapContent>
                    <Actions />
                </WrapMenu>
            </Theme>
        );
    }
}
