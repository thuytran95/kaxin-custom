import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { PDFViewer, EventBus } from 'pdfjs-dist/web/pdf_viewer';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.initEventBus();
        this.state = {
            doc: null,
            scale: 0,
            pageNumber: 1
        };
    }
    initEventBus = () => {
        const eventBus = new EventBus();
        eventBus.on('pagesinit', e => {
            this.setState({
                scale: this._pdfViewer.currentScale
            });
            if (this.props.onInit) {
                this.props.onInit({});
            }
            if (this.props.onScaleChanged) {
                this.props.onScaleChanged({ scale: this.state.scale });
            }
            if (this.props.onPageChanged) {
                this.props.onPageChanged({ pageNumber: this.state.pageNumber });
            }
            this.props.onFinishWatching();
        });
        eventBus.on('scalechange', e => {
            if (this.props.onScaleChanged) {
                this.props.onScaleChanged({ scale: e.scale });
            }
        });
        eventBus.on('pagechange', e => {
            if (this.props.onPageChanged) {
                this.props.onPageChanged({ pageNumber: e.pageNumber });
            }
        });
        this._eventBus = eventBus;
    };
    componentDidMount() {
        const viewerContainer = ReactDOM.findDOMNode(this);
        this._pdfViewer = new PDFViewer({
            container: viewerContainer,
            eventBus: this._eventBus
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.doc !== nextState.doc) {
            this._pdfViewer.setDocument(nextState.doc);
        }
        if (this.state.scale !== nextState.scale) {
            this._pdfViewer.currentScale = nextState.scale;
        }
        if (this.state.pageNumber !== nextState.pageNumber) {
            this._pdfViewer.currentPageNumber = nextState.pageNumber;
        }
    }
    render() {
        return (
            <div className="Viewer">
                <div className="pdfViewer" />
            </div>
        );
    }
}

Viewer.propTypes = {
    onInit: PropTypes.func,
    onScaleChanged: PropTypes.func,
    onPageChanged: PropTypes.func,
    onFinishWatching: PropTypes.func
};

export default Viewer;
