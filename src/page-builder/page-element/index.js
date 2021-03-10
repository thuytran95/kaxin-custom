import React, { PureComponent } from 'react';
import calculateElement from 'helpers/element/calculate';
import { get, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';

import Element from './element';
import ElementText from './element-text';

class PageElement extends PureComponent {
    static defaultProps = {
        id: 'Body',
        display: 'desktop'
    };

    render() {
        const { element } = this.props;
        let result = null;
        if (element) {
            const { processedElement, customProps } = this.props;
            if (processedElement.displayElement) {
                const { ElementClass, props, children } = processedElement;
                // render element
                if (ElementClass) {
                    result = (
                        <ElementClass
                            {...props}
                            {...customProps}
                            Element={Element}
                            ElementText={ElementText}
                            renderChildren={this.renderChildren}
                        >
                            {children}
                        </ElementClass>
                    );
                }
            }
        }

        return result;
    }

    renderChildren = (options = {}) => {
        const { processedElement } = this.props;
        const { children } = processedElement;

        return options.children || (children && children.map(this.renderChild));
    };

    renderChild = (childId, position) => {
        const { processedElement, display } = this.props;
        const { customChildrenProps } = processedElement;
        return (
            <ConnectedPageElement
                key={childId}
                id={childId}
                customProps={customChildrenProps}
                positionInParent={position}
                display={display}
            />
        );
    };
}

PageElement.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // element id
    contextDoc: PropTypes.string, // element doc context
    element: PropTypes.shape({
        tag: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        props: PropTypes.object
    }).isRequired, // element object
    positionInParent: PropTypes.number, // index position in parent
    display: PropTypes.string, // current display
    links: PropTypes.object, // links map [elementID] -> links
    linksData: PropTypes.oneOfType([
        PropTypes.string, // doc identifier for current data object
        PropTypes.object // current data object
    ]),
    processedElement: PropTypes.object.isRequired,
    context: PropTypes.object,
    customProps: PropTypes.object
};

// Calculate info
const calculateInfo = (nextUpdatable, nextState, nextOwnProps) => {
    const result = {};

    const { contextDoc, contextProperty, display } = nextOwnProps;
    const { element } = nextUpdatable;

    // Context object
    const context = {
        doc: contextDoc,
        property: contextProperty
    };

    // Process element
    const processedElement = calculateElement({
        element,
        context,
        display
    });

    // assign to props
    result.context = context;
    result.processedElement = processedElement;

    return result;
};

const calculateUpdatable = (prevUpdatable, prevState, nextState, nextOwnProps) => {
    const { id } = nextOwnProps;
    // const { pageBuilder } = pageBuilderData;
    // element
    const updatable = { element: get(nextState, ['pageBuilder', 'pageData', 'data', id], {}) };
    // linked properties

    return updatable;
};

const selectorFactory = () => {
    let result = {};
    let ownProps = {};
    let state = {};
    let updatable = {};
    let info = {};

    return (nextState, nextOwnProps) => {
        // console.log(111, nextOwnProps);
        let needsUpdate = !isEqual(ownProps, nextOwnProps);

        if (state !== nextState || needsUpdate) {
            // calculates element info that should
            // trigger an update when changed
            const nextUpdatable = calculateUpdatable(updatable, state, nextState, nextOwnProps);

            // if (needsUpdate || !shallowEqual(updatable, nextUpdatable)) {
            // updatable is different
            // calculate other info for this element
            info = calculateInfo(nextUpdatable, nextState, nextOwnProps);

            updatable = nextUpdatable;
            needsUpdate = true;
            // }
        }

        ownProps = nextOwnProps;
        state = nextState;

        // change result if needed
        if (needsUpdate) {
            result = { ...ownProps, ...updatable, ...info };
        }
        return result;
    };
};

// Connected element
const ConnectedPageElement = connectAdvanced(selectorFactory)(PageElement);

export default ConnectedPageElement;
