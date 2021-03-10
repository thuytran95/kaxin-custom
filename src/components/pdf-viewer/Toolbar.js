import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 0,
            inputPage: 1,
            pageNumber: 1
        };
    }
    zoomIn(e) {
        if (this.props.onZoomIn) {
            this.props.onZoomIn(e);
        }
    }
    zoomOut(e) {
        if (this.props.onZoomOut) {
            this.props.onZoomOut(e);
        }
    }
    findPrevious(e) {
        if (this.props.onFindPrevious) {
            this.props.onFindPrevious(e);
        }
    }
    findNext(e) {
        if (this.props.onFindNext) {
            this.props.onFindNext(e);
        }
    }

    onChangeInput = e => {
        this.setState({
            pageNumber: e.target.value
        });
    };
    render() {
        const { fullScreen } = this.props;
        return (
            <div className="Toolbar">
                Trang
                <Input
                    type="number"
                    id="pageNumber"
                    name="pageNumber"
                    value={this.state.pageNumber}
                    min={1}
                    max={this.props.pages}
                    onChange={this.onChangeInput}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            if (this.props.onRedirectPage) {
                                this.props.onRedirectPage(parseInt(this.state.pageNumber, 0));
                            }
                        }
                    }}
                    className="inputPage"
                />
                <span className="Box">
                    {this.state.pageNumber}/{this.props.pages}
                </span>
                <span className="btnIcon ZoomIn" onClick={e => this.zoomOut(e)}>
                    <i className="zmdi zmdi-zoom-out" />
                </span>
                {/* <div className="ZoomPercent">{(this.state.scale * 100).toFixed(1)}%</div> */}
                <span className="btnIcon ZoomOut" onClick={e => this.zoomIn(e)}>
                    <i className="zmdi zmdi-zoom-in" />
                </span>
                <span className="btnIcon findPrevious" onClick={e => this.findPrevious(e)}>
                    <i className="zmdi zmdi-chevron-left" />
                </span>
                <span className="btnIcon findNext" onClick={e => this.findNext(e)}>
                    <i className="zmdi zmdi-chevron-right" />
                </span>
                <span className="btnIcon fullScreen" onClick={fullScreen}>
                    {this.props.full ? (
                        <i className="zmdi zmdi-fullscreen-exit" />
                    ) : (
                        <i className="zmdi zmdi-fullscreen" />
                    )}
                </span>
            </div>
        );
    }
}

Toolbar.propTypes = {
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onFindPrevious: PropTypes.func,
    onFindNext: PropTypes.func,
    pages: PropTypes.number,
    onRedirectPage: PropTypes.func,
    fullScreen: PropTypes.func,
    full: PropTypes.bool,
    onChangePageNumber: PropTypes.func
};

export default Toolbar;
