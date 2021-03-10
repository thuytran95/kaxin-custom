import style from './style.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Form, Input, Button } from 'reactstrap';
import _ from 'lodash';

import { CategoryLink } from 'src/shared/components/Link';
import ImageLoad from 'src/components/image-load';
class ItemTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        //const { isShowFilter, filterMobile } = this.state;
        const { data } = this.props;
        const picture = !_.isEmpty(data.picture) ? data.picture : '/static/assets/images/courses/default.png';
        return (
            <Fragment>
                <div className={style.itemTheme}>
                    <div className={style.inner}>
                        <div
                            className={style.imgTheme}
                            style={
                                {
                                    //backgroundImage: `url(${data.picture})`
                                }
                            }
                        >
                            <CategoryLink {...data} />
                            <ImageLoad src={picture} alt={data.name} />
                        </div>
                        <div className={style.infoTheme}>
                            <h4>
                                <CategoryLink {...data} />
                            </h4>
                            <p>
                                <b>{data.totalCourses ? data.totalCourses : '0'}</b> khoá học
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
ItemTheme.propTypes = {
    data: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps)(ItemTheme);
