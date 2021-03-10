import React, { PureComponent } from 'react';
import Theme from 'components/shared/Theme';
import styled from 'styled-components';

import Menu from './menu';

const WrapMenu = styled(Menu)`
    background-color: ${({ theme }) => theme.colors.chromeBackgroundColor};
`;

export default class PageBuilderMenuContainer extends PureComponent {
    static defaultProps = {
        editing: false
    };
    render() {
        return (
            <Theme>
                <WrapMenu {...this.props} />
            </Theme>
        );
    }
}
