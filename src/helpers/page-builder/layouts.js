import layout from 'src/components/layouts';
import _ from 'lodash';

const layouts = [];
_.forOwn(layout, (element, name) => {
    layouts.push({
        name,
        settings: element.settings
    });
});

export { layouts as default };
