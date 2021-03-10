import styles from './styles.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import ProgressBar from './ProgressBar';

function formatDuration(seconds) {
    return moment.utc(seconds * 1000).format(seconds < 3600 ? 'mm:ss' : 'HH:mm:ss');
}

class VideoPlayer extends Component {
    state = {
        isPlaying: true,
        currentTime: 0,
        fullScreen: false
    };

    playVideo = () => {
        this.setState({ isPlaying: true }, () => {
            this.video.play();
        });
    };

    pauseVideo = () => {
        this.setState({ isPlaying: false }, () => {
            this.video.pause();
        });
    };

    togglePlay = () => {
        this.setState(
            prevState => ({ isPlaying: !prevState.isPlaying }),
            () => {
                if (this.state.isPlaying) this.video.play();
                else this.video.pause();
            }
        );
    };

    toggleFullScreen = () => {
        this.setState(prevState => ({ fullScreen: !prevState.fullScreen }));
    };

    updateCurrentTime = () => {
        this.setState({ currentTime: this.video.currentTime });
    };

    get duration() {
        return this.video ? this.video.duration : 0.1;
    }

    render() {
        const { src, style, onClickNext, onClickPrev, onFinishWatching } = this.props;
        const { isPlaying, currentTime, fullScreen } = this.state;
        return (
            <div className={classnames(styles['video-player'], { [styles['full-screen']]: fullScreen })} style={style}>
                <video
                    height="200"
                    className={styles.video}
                    ref={ref => (this.video = ref)}
                    onTimeUpdate={this.updateCurrentTime}
                    onEnded={onFinishWatching}
                    onClick={this.togglePlay}
                    src={src}
                    autoPlay
                    loop={false}
                />
                <span
                    className={classnames(styles['iconBig'], { [styles['hidden']]: isPlaying })}
                    onClick={this.togglePlay}
                >
                    <Icon type={isPlaying ? 'pause' : 'caret-right'} />
                </span>
                <div className={styles.controls}>
                    <span className={styles.icon} onClick={onClickPrev}>
                        <Icon type="step-backward" />
                    </span>
                    <span className={styles.icon} onClick={this.togglePlay}>
                        <Icon type={isPlaying ? 'pause' : 'caret-right'} />
                    </span>
                    <span className={styles.icon} onClick={onClickNext}>
                        <Icon type="step-forward" />
                    </span>
                    {/* <span>
                        <Icon type="sound" />
                    </span> */}
                    <span style={{ flexGrow: 1 }}>
                        <ProgressBar
                            percent={currentTime * 100 / this.duration}
                            onChange={percent => (this.video.currentTime = this.duration * percent / 100)}
                        />
                    </span>
                    <span style={{ minWidth: '90px' }}>
                        {formatDuration(currentTime)} / {formatDuration(this.duration)}
                    </span>
                    <span className={styles.icon} onClick={this.toggleFullScreen}>
                        <Icon type={fullScreen ? 'shrink' : 'arrows-alt'} />
                    </span>
                </div>
            </div>
        );
    }
}

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClickNext: PropTypes.func,
    onClickPrev: PropTypes.func,
    onFinishWatching: PropTypes.func
};

VideoPlayer.defaultProps = {
    style: {}
};

export default VideoPlayer;
