import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class InfoAuhor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toogle = () => {};
    render() {
        const { user } = this.props;
        let avatar = '/static/assets/images/course1.png';
        if (user.avatar) {
            avatar = user.avatar;
        }
        //const name = _.get(user, 'fullname');
        const description = _.get(user, 'description');
        return (
            <Fragment>
                <div className={`widget ${style.infoAuhor}`}>
                    <div className={style.info}>
                        <span
                            className={style.theAvt}
                            style={{
                                backgroundImage: `url(${avatar}`
                            }}
                        />
                        <strong>Giảng viên</strong>
                        <h5>{_.get(user, 'firstName')}</h5>
                    </div>
                    <div className={style.desc}>
                        <p>{!_.isEmpty(description) ? description : 'Đang cập nhật'}</p>
                        {/* <Link href="/">
                            <a>Đọc tiếp</a>
                        </Link> */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

InfoAuhor.propTypes = {
    user: PropTypes.object
};

export default InfoAuhor;
