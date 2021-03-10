import styles from './tab-empty.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class TabEmpty extends PureComponent {
    static propTypes = {
        icon: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        icon: 'hand-pointer',
        children: 'You have to select an element first!'
    };

    render() {
        const { children, icon } = this.props;

        return (
            <div className={styles.info}>
                <FontAwesomeIcon icon={icon} size="2x" color="#FFF" />
                <div className={styles.label}>{children}</div>
            </div>
        );
    }
}
