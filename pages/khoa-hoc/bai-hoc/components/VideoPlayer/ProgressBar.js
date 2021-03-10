import styles from './progress-bar.scss';

import React from 'react';
import PropTypes from 'prop-types';

let progressBar;

const ProgressBar = ({ percent, onChange }) => {
    return (
        <div
            className={styles['progress-bar']}
            ref={ref => (progressBar = ref)}
            onClick={e => {
                onChange(e.nativeEvent.offsetX * 100 / progressBar.offsetWidth);
            }}
        >
            <div className={styles.loaded} style={{ width: `${percent}%` }} />
        </div>
    );
};

ProgressBar.propTypes = {
    percent: PropTypes.number,
    onChange: PropTypes.func
};

export default ProgressBar;
