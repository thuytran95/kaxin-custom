import styles from './tab-button.scss';

import cx from 'classnames';
import Tooltip from 'components/shared/tooltip';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Button = styled.button`
    background: transparent;
    height: 49px;
    border: 0;
    outline: 0;
    padding: 0;
`;

export default class TabButton extends PureComponent {
    static propTypes = {
        tab: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        active: PropTypes.bool,
        icon: PropTypes.string,
        prefix: PropTypes.string,
        dataLinkable: PropTypes.bool
    };

    static defaultProps = {
        prefix: 'fas'
    };

    onClick = () => {
        const { onClick, tab } = this.props;
        onClick(tab);
    };

    render() {
        const { active, icon, prefix, tab } = this.props;

        return (
            <Tooltip label={tab.toUpperCase()} className={cx(styles.root, active && styles.selected, styles[tab])}>
                <Button className={styles.button} onClick={this.onClick}>
                    <FontAwesomeIcon icon={[prefix, icon]} size={`lg`} />
                </Button>
            </Tooltip>
        );
    }
}
