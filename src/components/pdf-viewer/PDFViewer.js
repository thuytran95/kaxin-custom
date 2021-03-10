import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Viewer from './Viewer';
import Toolbar from './Toolbar';
import PDFJS from 'pdfjs-dist';
import classnames from 'classnames';
import worker from 'pdfjs-dist/build/pdf.worker';

PDFJS.GlobalWorkerOptions.workerSrc = worker;
// PDFJS

class PDFViewer extends Component {
    state = {
        doc: {},
        full: false,
        loading: true,
        success: false
    };
    componentDidMount() {
        if (this.props.url) {
            const loadingTask = PDFJS.getDocument(this.props.url);
            loadingTask.promise
                .then(doc => {
                    this.viewer.setState({
                        doc
                    });
                    this.setState({
                        doc,
                        loading: false,
                        success: true
                    });
                })
                .catch(() => {
                    this.setState({
                        success: true
                    });
                });
        } else {
            this.setState({
                success: true
            });
        }
    }
    zoomIn(e) {
        this.viewer.setState({
            scale: this.viewer.state.scale * 1.1
        });
    }
    zoomOut(e) {
        this.viewer.setState({
            scale: this.viewer.state.scale / 1.1
        });
    }
    displayScaleChanged(e) {
        this.toolbar.setState({
            scale: e.scale
        });
    }
    onFindPrevious(e) {
        this.viewer.setState({
            pageNumber: this.viewer.state.pageNumber > 1 ? this.viewer.state.pageNumber - 1 : 1
        });
    }
    onFindNext(e) {
        this.viewer.setState({
            pageNumber:
                this.viewer.state.pageNumber < this.state.doc.numPages
                    ? this.viewer.state.pageNumber + 1
                    : this.state.doc.numPages
        });
    }
    displayPageChanged(e) {
        this.toolbar.setState({
            pageNumber: e.pageNumber
        });
    }
    onRedirectPage = pageNumber => {
        this.viewer.setState({
            pageNumber
        });
    };
    fullScreen = () => {
        this.setState(prevState => ({ full: !prevState.full }));
    };
    render() {
        const { full } = this.state;
        return (
            <Fragment>
                {this.state.loading && <p className="loading">loading...</p>}
                <div className={classnames(['App-body'], { 'full-screen': full })}>
                    <div className="inner">
                        <Viewer
                            ref={ref => (this.viewer = ref)}
                            onScaleChanged={e => this.displayScaleChanged(e)}
                            onPageChanged={e => this.displayPageChanged(e)}
                            onFinishWatching={this.props.onFinishWatching}
                        />
                        <Toolbar
                            pages={this.state.doc.numPages}
                            ref={ref => (this.toolbar = ref)}
                            onZoomIn={e => this.zoomIn(e)}
                            onZoomOut={e => this.zoomOut(e)}
                            onFindPrevious={this.props.prevStep}
                            onFindNext={this.props.nextStep}
                            onRedirectPage={this.onRedirectPage}
                            fullScreen={this.fullScreen}
                            full={full}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}
PDFViewer.defaultProps = {
    url: '',
    onFinishWatching: () => null
};
PDFViewer.propTypes = {
    url: PropTypes.string,
    onFinishWatching: PropTypes.func,
    prevStep: PropTypes.func,
    nextStep: PropTypes.func
};

export default PDFViewer;
