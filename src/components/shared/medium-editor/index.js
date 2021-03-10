import './index.scss';

import MediumEditor from 'medium-editor';
import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MediumEditorElement extends PureComponent {
    static propTypes = {
        tag: PropTypes.string,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.object
    };

    static defaultProps = {
        tag: 'div'
    };

    editor = createRef();

    state = {
        value: this.props.value
    };

    componentDidMount() {
        const { options } = this.props;
        this.medium = new MediumEditor(this.editor.current, {
            toolbar: {
                buttons: [
                    'bold',
                    'italic',
                    'underline',
                    'anchor',
                    'justifyLeft',
                    'justifyCenter',
                    'justifyRight',
                    'justifyFull',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'removeFormat',
                    'html '
                ]
            },
            placeholder: 'Double click to edit text',
            imageDragging: false,
            ...options
        });
        this.medium.subscribe('editableInput', this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value && !this._updated) {
            this.setState({ value: nextProps.value });
        }
        if (this._updated) this._updated = false;
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.value !== prevState.value) {
        //     this.setState({ text: this.props.value });
        // }
        this.medium.restoreSelection();
    }

    componentWillUnmount() {
        this.medium.destroy();
    }

    onChange = e => {
        this._updated = true;
        const value = this.editor.current.innerHTML;
        this.props.onChange && this.props.onChange(value, this.medium);
    };

    render() {
        const { tag: Tag } = this.props;
        if (this.medium) {
            this.medium.saveSelection();
        }
        return <Tag ref={this.editor} contentEditable dangerouslySetInnerHTML={{ __html: this.state.value }} />;
    }
}
