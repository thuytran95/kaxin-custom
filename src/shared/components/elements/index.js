import _ from 'lodash';
const elements = {};

const requireContext = require.context('.', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);

requireContext.keys().forEach(path => {
    const splitted = path.split('/');
    const name = _.replace(_.startCase(splitted[1]), new RegExp(' ', 'g'), '');

    elements[name] = requireContext(path).default;
});

export default elements;
