import displays from 'src/statics/displays';
import { forOwn } from 'lodash';

export default (element, display) => {
    let elementProps = element.props || {};

    if (display !== 'desktop' && element.displayProps) {
        const changes = {};
        forOwn(displays, (value, displayIt) => {
            if (displayIt !== 'desktop' && value >= displays[display] && element.displayProps[displayIt]) {
                Object.assign(changes, element.displayProps[displayIt]);
            }
        });
        elementProps = { ...elementProps, ...changes };
    }

    return elementProps;
};
