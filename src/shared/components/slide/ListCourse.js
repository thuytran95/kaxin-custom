import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { CategoryLink } from 'src/shared/components/Link';
import ImageLoad from 'src/components/image-load';

class ListCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { data } = this.props;
        const elmItems = data.map((item, index) => {
            let result = null;
            if (data.length > 0) {
                result = (
                    <div key={index} className={`col-xs-6 col-md-3 ${style.itemWrapper}`}>
                        <div className={style.itemCourse}>
                            <CategoryLink {...item} />
                            <div className={style.urlImage}>
                                <ImageLoad
                                    src={
                                        !_.isEmpty(item.icon) ? item.icon : '/static/assets/images/courses/default.png'
                                    }
                                    alt={item.name}
                                />
                            </div>
                            <div className={style.name}>{item.name}</div>
                        </div>
                    </div>
                );
            }
            return result;
        });
        return (
            <Fragment>
                <div className={style.listCourseWrapper}>
                    <div className="row">{elmItems}</div>
                </div>
            </Fragment>
        );
    }
}
ListCourse.propTypes = {
    data: PropTypes.array
};

export default ListCourse;
