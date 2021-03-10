import { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';

export default class AnimateProps extends PureComponent {
    static propTypes = {
        props: PropTypes.object,
        options: PropTypes.object,
        children: PropTypes.node
    };

    static defaultProps = {
        props: {},
        options: {}
    };

    // componentDidMount() {
    //     const dom = findDOMNode(this);
    // }

    render() {
        return this.props.children;
    }
}
