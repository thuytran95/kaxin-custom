import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

//import ItemCourseComponent from 'src/shared/components/Item/Course/index';
import CourseItem from 'src/shared/components/Course/CourseItem';

class RelatedPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    url: '/static/assets/images/course1.png',
                    slug: 'khoa-hoc-1',
                    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    coach: 'Lê Văn Hùng',
                    star: 80,
                    salePrice: '800.000',
                    regularPrice: '1.200.000'
                },
                {
                    id: 2,
                    url: '/static/assets/images/course2.png',
                    slug: 'khoa-hoc-2',
                    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    coach: 'Lê Văn Hùng',
                    star: 80,
                    salePrice: null,
                    regularPrice: '1.200.000'
                }
            ]
        };
    }

    render() {
        const { courseRelate: { rows = [] }, cart, cartActions } = this.props;
        const elmItems = rows.filter(item => item.active === 1).map((item, index) => {
            return (
                <div key={index} className="col-6 col-lg-12 itemsPost">
                    <CourseItem data={item} key={index} cartActions={cartActions} cart={cart} />
                </div>
            );
        });
        return (
            <Fragment>
                <div className={`widget ${style.relatedPost}`}>
                    <h3 className="widgetTitle">Khóa học cùng danh mục</h3>
                    <div className="row">
                        {elmItems.length > 0 ? (
                            elmItems
                        ) : (
                            <div className="col-12">Không tìm thấy khóa học cùng danh mục nào.</div>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

RelatedPost.propTypes = {
    courseRelate: PropTypes.object,
    cart: PropTypes.object,
    cartActions: PropTypes.object
};

export default RelatedPost;
