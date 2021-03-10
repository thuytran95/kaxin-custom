import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class Portal extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        attachTo: PropTypes.string
    };

    componentDidMount() {
        this._target = this.props.attachTo
            ? document.getElementById(this.props.attachTo).appendChild(document.createElement('div'))
            : document.body.appendChild(document.createElement('div'));
        this._portal = renderSubtreeIntoContainer(this, this.props.children, this._target);
    }

    componentDidUpdate() {
        this._portal = renderSubtreeIntoContainer(this, this.props.children, this._target);
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._target);
        if (this.props.attachTo) {
            document.getElementById(this.props.attachTo).removeChild(this._target);
        } else {
            document.body.removeChild(this._target);
        }
    }

    render() {
        return null;
    }
}
