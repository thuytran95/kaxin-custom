import _ from 'lodash';
const requireContext = require.context('./size', true, /^\.\/[a-z-]+?\/index\.(js|jsx)$/);
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
    {
        label: 'ID Section',
        description: 'Dạng slug. Exp: id-section, idsection, idSection,...',
        type: 'String',
        id: 'idSection'
    },
    {
        label: 'Tiêu đề',
        type: 'String',
        id: 'headingTitle'
    },
    {
        label: 'Mô tả tiêu đề',
        type: 'Html',
        id: 'subHeading'
    },
    {
        label: 'Bước 1',
        type: 'StepIcon',
        id: 'stepIcon1'
    },
    {
        label: 'Bước 2',
        type: 'StepIcon',
        id: 'stepIcon2'
    },
    {
        label: 'Bước 3',
        type: 'StepIcon',
        id: 'stepIcon3'
    },
    {
        label: 'Bước 4',
        type: 'StepIcon',
        id: 'stepIcon4'
    },
    {
        label: 'Bước 5',
        type: 'StepIcon',
        id: 'stepIcon5'
    }
];
