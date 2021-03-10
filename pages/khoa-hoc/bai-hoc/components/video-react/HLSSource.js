import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

class HLSSource extends Component {
    constructor(props, context) {
        super(props, context);
        this.hls = new Hls();
    }

    componentDidMount() {
        const { src, video } = this.props;
        if (Hls.isSupported()) {
            this.hls.loadSource(src);
            this.hls.attachMedia(video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }

    componentWillUnmount() {
        // destroy hls video source
        if (this.hls) {
            this.hls.destroy();
        }
    }

    render() {
        return (
            <Fragment>
                <source src={this.props.src} type="application/x-mpegURL" />
                <track src={this.props.track} kind="subtitles" label="English" language="en" default={true} />
            </Fragment>
        );
    }
}

HLSSource.propTypes = {
    src: PropTypes.string,
    type: PropTypes.string,
    track: PropTypes.string,
    video: PropTypes.object,
    onFinishWatching: PropTypes.func,
    prevStep: PropTypes.func,
    nextStep: PropTypes.func,
    isSub: PropTypes.bool
};
export default HLSSource;
