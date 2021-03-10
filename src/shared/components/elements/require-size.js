import _ from 'lodash';

export default requireContext => {
    const size = {};

    requireContext.keys().forEach(path => {
        const splitted = path.split('/');
        const name = _.replace(splitted[1], new RegExp('-', 'g'), '_');

        size[name] = requireContext(path).default;
    });
    return size;
};
