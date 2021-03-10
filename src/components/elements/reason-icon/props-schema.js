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
        label: 'Lý do 1',
        type: 'ReasonIcon',
        id: 'ReasonIcon1'
    },
    {
        label: 'Lý do 2',
        type: 'ReasonIcon',
        id: 'ReasonIcon2'
    },
    {
        label: 'Lý do 3',
        type: 'ReasonIcon',
        id: 'ReasonIcon3'
    },
    {
        label: 'Lý do 4',
        type: 'ReasonIcon',
        id: 'ReasonIcon4'
    }
];
