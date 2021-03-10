import styles from './context-menu.scss';

import cx from 'classnames';
import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Theme from 'components/shared/Theme';

const Button = styled.button`
    width: 23px;
    height: 23px;
    border: 1px solid;
    border-color: ${({ dark, theme }) => (dark ? theme.colors.chromeTextColor : theme.colors.primary)};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;

    border-radius: 50%;

    font-size: 11px;
    line-height: 23px;
    text-align: center;
    color: ${({ dark, theme }) => (dark ? theme.colors.chromeTextColor : theme.colors.primary)};
    cursor: pointer;
    pointer-events: all;
    background-color: transparent;
`;

export default class ContextMenu extends PureComponent {
    static propTypes = {
        element: PropTypes.object.isRequired,
        opened: PropTypes.bool,
        open: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        removeElement: PropTypes.func.isRequired,
        context: PropTypes.object.isRequired,
        dark: PropTypes.bool
    };
    titleInput = createRef();

    remove = event => {
        event.preventDefault();
        const { removeElement, element, context } = this.props;
        removeElement(element.id, context);
    };

    render() {
        const { opened } = this.props;
        return opened ? this.renderOpened() : this.renderClosed();
    }

    renderOpened = () => {
        return this.renderActions();
    };

    renderClosed = () => {
        const { dark } = this.props;

        return (
            <Theme>
                <Button dark={dark} onClick={this.props.open}>
                    <FontAwesomeIcon icon="ellipsis-h" />
                </Button>
            </Theme>
        );
    };

    renderActions = () => {
        const { close, element } = this.props;

        return (
            <div className={cx(styles.opened)} onMouseLeave={close}>
                <div className={styles.label}>{element.label || element.tag}</div>
                <div className={cx(styles.action, styles.destroy)} onClick={this.remove}>
                    Remove
                </div>
            </div>
        );
    };
}
