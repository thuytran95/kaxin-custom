export default [
    {
        label: 'Align',
        description: 'Content Align',
        type: 'Select',
        id: 'align',
        props: {
            labels: ['Left', 'Right', 'Center', 'Justify'],
            values: ['left', 'right', 'center', 'justify']
        }
    },
    {
        label: 'Text',
        type: 'Html',
        id: 'value'
    }
];
