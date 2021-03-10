import styles from './navbar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Button } from 'reactstrap';
import { MyCourseLink } from 'src/shared/components/Link';

const Navbar = ({ course = {} }) => {
    const { courseDetail = {} } = course;
    return (
        <div className={styles.navbar}>
            <MyCourseLink name={courseDetail.name} id={courseDetail.id}>
                <Button outline className={styles.backButton}>
                    <Icon type="double-left" style={{ marginRight: '10px' }} /> {courseDetail.name}
                </Button>
            </MyCourseLink>
            {/* <Button outline className={styles.errorButton}>
                Báo lỗi
            </Button> */}
        </div>
    );
};

Navbar.propTypes = {
    course: PropTypes.object
};

export default Navbar;
