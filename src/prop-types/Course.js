import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    categoryId: PropTypes.number,
    description: PropTypes.string,
    courseContent: PropTypes.string,
    trainingSubject: PropTypes.string,
    lecturerId: PropTypes.string,
    price: PropTypes.number
});
