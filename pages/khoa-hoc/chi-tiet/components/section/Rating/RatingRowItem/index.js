import style from 'pages/khoa-hoc/chi-tiet/components/section/style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { timeAgo, generateAvatarUrl } from 'src/helpers/Common';

const RatingRowItem = ({ item, createdBy }) => {
    const { feedback = '', created_at } = item;
    const { firstName = '', avatar = '' } = createdBy;
    return (
        <li className={style.itemWrapper}>
            <span
                className={style.theAvt}
                style={{
                    backgroundImage: `url(${generateAvatarUrl(avatar)})`
                }}
            />
            <div className={style.infoComment}>
                <h4>{firstName}</h4>
                <h6>{timeAgo(created_at)}</h6>
                <p>{feedback}</p>
                <div className="rating">
                    <span
                        className="star"
                        style={{
                            width: `${item.rate / 5 * 100}%`
                        }}
                    />
                </div>
            </div>
        </li>
    );
};

RatingRowItem.propTypes = {
    ratingId: PropTypes.number.isRequired,
    item: PropTypes.shape({
        feedback: PropTypes.string,
        created_at: PropTypes.string,
        rate: PropTypes.number,
        createdBy: PropTypes.string
    }).isRequired,
    createdBy: PropTypes.shape({
        avatar: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }).isRequired
};

const mapStateToProps = ({ entities, rating }, { ratingId }) => {
    const { users = {} } = entities;
    const { ratings = {} } = rating.entities;
    const item = _.get(ratings, ratingId, {});
    const createdBy = _.get(users, item.createdBy, {});
    return {
        item,
        createdBy
    };
};

export default connect(mapStateToProps, null)(RatingRowItem);
