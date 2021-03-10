import _ from 'lodash';
import alignOption from 'helpers/widget-options/align';

const requireContext = require.context('./size', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);
const values = [];
requireContext.keys().forEach(path => {
    const splitted = path.split('/');
    const name = _.replace(splitted[1], new RegExp('-', 'g'), '_');
    values.push(name);
});
const labels = _.map(values, _.startCase);

export default [
    {
        label: 'Layout',
        type: 'Select',
        id: 'layout',
        props: {
            labels,
            values
        }
    },
    ...alignOption,
    {
        label: 'Enable',
        type: 'Toggle',
        id: 'isEnable'
    },
    {
        label: 'Heading Title',
        description: 'Des for Heading Title',
        type: 'String',
        id: 'heading'
    },
    {
        label: 'Heading Sub Title',
        type: 'String',
        id: 'subHeading'
    },
    {
        label: 'Content',
        type: 'String',
        id: 'content'
    },
    {
        label: 'Button Text',
        type: 'String',
        id: 'buttonText'
    },
    {
        label: 'Button Link',
        type: 'String',
        id: 'buttonLink'
    },
    {
        label: 'Image',
        type: 'String',
        id: 'image'
    }
];
