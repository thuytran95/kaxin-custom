import styles from './styles.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

class PaginateComponent extends PureComponent {
    onChange = page => {
        const { onChangePage } = this.props;
        onChangePage(page);
    };
    render() {
        const { total, perPage, current } = this.props;
        return (
            <div className={styles.wrapStyle}>
                <Pagination
                    total={total}
                    pageSize={perPage}
                    current={current}
                    onChange={this.onChange}
                    hideOnSinglePage
                />
            </div>
        );
    }
}

PaginateComponent.defaultProps = {
    total: 0,
    perPage: 0,
    current: 1
};

PaginateComponent.propTypes = {
    total: PropTypes.number,
    perPage: PropTypes.number,
    pageSize: PropTypes.number,
    current: PropTypes.number,
    onChangePage: PropTypes.func
};

export default PaginateComponent;
