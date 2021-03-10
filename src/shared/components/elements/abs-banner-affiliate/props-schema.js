import _ from 'lodash';
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
        label: 'ID Widget (EXP: idWidget)',
        type: 'String',
        id: 'idSection'
    },
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
        label: 'Ảnh Background',
        type: 'ImageUpload',
        id: 'backgroundImage'
    },
    {
        label: 'Link Logo',
        description: 'Link Logo',
        type: 'Link',
        id: 'linkLogo'
    },
    {
        label: 'Text Link 1',
        description: 'Text Link 1 Menu Tabs',
        type: 'String',
        id: 'textLink1'
    },
    {
        label: 'Link Menu Tab 1 (Sử dụng ID Widget. Exp: #idWidget)',
        type: 'Link',
        id: 'linkTab1'
    },
    {
        label: 'Text Link 2',
        description: 'Text Link 2 Menu Tabs',
        type: 'String',
        id: 'textLink2'
    },
    {
        label: 'Link Menu Tab 2 (Sử dụng ID Widget. Exp: #idWidget)',
        type: 'Link',
        id: 'linkTab2'
    },
    {
        label: 'Text Link 3',
        description: 'Text Link 3 Menu Tabs',
        type: 'String',
        id: 'textLink3'
    },
    {
        label: 'Link Menu Tab 3 (Sử dụng ID Widget. Exp: #idWidget)',
        type: 'Link',
        id: 'linkTab3'
    },
    {
        label: 'Tiêu đề 1',
        type: 'Html',
        id: 'heading1'
    },
    {
        label: 'Tiêu đề 2',
        type: 'Html',
        id: 'heading2'
    },
    {
        label: 'Tiêu đề 3',
        type: 'Html',
        id: 'heading3'
    },
    {
        label: 'Link nút đăng ký',
        description: 'Link nút đăng ký',
        type: 'Link',
        id: 'linkSignUp'
    },
    {
        label: 'Link nút Affiliate là gì?',
        description: 'Link Affiliate',
        type: 'Link',
        id: 'linkAffiliate'
    },
    {
        label: 'Static Icon 1',
        type: 'StepIcon',
        id: 'staticIcon1'
    },
    {
        label: 'Static Icon 2',
        type: 'StepIcon',
        id: 'staticIcon2'
    },
    {
        label: 'Static Icon 3',
        type: 'StepIcon',
        id: 'staticIcon3'
    }
];
