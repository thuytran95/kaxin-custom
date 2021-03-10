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
        label: 'Layout',
        type: 'Select',
        id: 'layout',
        props: {
            labels,
            values
        }
    },
    {
        label: 'Ảnh Banner',
        type: 'ImageUpload',
        id: 'bannerImage'
    },
    {
        label: 'Tiêu đề ẩn',
        type: 'String',
        id: 'overlayHeading'
    },
    {
        label: 'Tiêu đề',
        type: 'Html',
        id: 'headingTitle'
    },
    {
        label: 'Mô tả',
        type: 'Html',
        id: 'description'
    },
    {
        label: 'Tên Button',
        type: 'String',
        id: 'nameButton'
    },
    {
        label: 'Link Button',
        type: 'Link',
        id: 'linkButton'
    }
];
