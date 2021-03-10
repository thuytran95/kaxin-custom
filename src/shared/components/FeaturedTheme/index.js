import style from './style.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ItemTheme from 'src/shared/components/Item/Theme/index';

class FeaturedTheme extends PureComponent {
    render() {
        const { data } = this.props;
        const { rows = [] } = data;
        const elmItems = rows.map(item => {
            return (
                <div key={item.id} className="col-6 col-lg-3 itemsTheme">
                    <ItemTheme data={item} />
                </div>
            );
        });
        return (
            <div className={style.themeWrapper}>
                <div className="container">
                    <h2 className="titleHome">Chủ đề nổi bật</h2>
                    <div className="row">{elmItems}</div>
                </div>
            </div>
        );
    }
}

FeaturedTheme.defaultProps = {
    data: {}
};

FeaturedTheme.propTypes = {
    data: PropTypes.object
};

export default FeaturedTheme;
