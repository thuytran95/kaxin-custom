import elements from 'components/elements';
import _ from 'lodash';

import getProps from './get-props';

export default ({ element = {}, context, display }) => {
    const isSymbol = element.tag === 'Symbol';
    const ElementClass = _.get(elements, element.tag, undefined);

    // output
    const props = getProps(element, display);
    const displayElement = true;

    // children info
    const children = !isSymbol && element.children;
    const childrenParent = element.id;
    const childrenContext = context;

    return {
        ElementClass,
        props,
        displayElement,
        children,
        childrenParent,
        childrenContext
    };
};
