import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import HLSSource from './HLSSource';
import { Icon } from 'antd';
import { actions } from 'src/redux-utils';
class VideoReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vttLink: undefined,
            playing: false,
            fullScreen: false,
            duration: 0,
            played: 0,
            loaded: 0,
            seeking: false
        };
    }
    ref = player => {
        this.player = player;
    };
    async componentDidMount() {
        if (this.props.track)
            actions.commonActions
                .convertSrt(this.props.track)
                .then(vttLink => {
                    this.setState({
                        success: true,
                        vttLink
                    });
                })
                .catch(() => {
                    this.setState({
                        success: true
                    });
                });
        else {
            this.setState({
                success: true
            });
        }
        await this.play();
    }
    play = e => {
        this.player.play();
        this.setState({ playing: true });
    };

    pause = e => {
        this.player.pause();
        this.setState({ playing: false });
    };
    fullscreen = e => {
        this.setState({ fullScreen: !this.state.fullScreen }, () => this.player.toggleFullscreen());
    };
    onProgress = state => {
        if (!this.state.seeking) {
            this.setState(state);
        }
    };
    onDuration = duration => {
        this.setState({ duration });
    };
    onSeekMouseDown = e => {
        this.setState({ seeking: true });
    };
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
    };
    onSeekMouseUp = e => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    };
    render() {
        const { url, poster, onClickPrev, onClickNext, onFinishWatching, type } = this.props;
        const { vttLink, playing } = this.state;
        //console.log(url, type);
        return (
            <Fragment>
                <div className={style.player}>
                    {type === 'm3u8' ? (
                        <Player
                            ref={this.ref}
                            poster={poster}
                            onEnded={onFinishWatching}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                            autoPlay={playing}
                            loop={false}
                        >
                            <ControlBar autoHide={false} className="my-class" />
                            <HLSSource isVideoChild src={url} track={vttLink} />
                            <BigPlayButton position="center" />
                        </Player>
                    ) : (
                        <Player
                            ref={this.ref}
                            poster={poster}
                            onEnded={onFinishWatching}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                            autoPlay={playing}
                            src={url}
                        >
                            <ControlBar autoHide={false} className="my-class" />
                            <BigPlayButton position="center" />
                        </Player>
                    )}
                </div>

                <div className={style.controls}>
                    <span className={style.icon} onClick={onClickPrev}>
                        <Icon type="step-backward" />
                    </span>

                    <span className={style.icon} onClick={onClickNext}>
                        <Icon type="step-forward" />
                    </span>
                </div>
            </Fragment>
        );
    }
}
VideoReact.propTypes = {
    url: PropTypes.string,
    type: PropTypes.string,
    poster: PropTypes.string,
    onFinishWatching: PropTypes.func,
    onClickPrev: PropTypes.func,
    onClickNext: PropTypes.func,
    track: PropTypes.string
};

export default VideoReact;
