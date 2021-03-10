import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import { Select } from 'antd';
//import _ from 'lodash';
import PaginateComponent from 'src/shared/components/Pagination';
import ComboItem from 'src/shared/components/Course/ComboItem/index';

class ComboComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChangeOrdering = value => {
        this.props.updateParams({ sort: value });
    };
    goToPage = page => {
        this.props.updateParams({ pagination: { ...this.props.pagination, current: page } });
    };
    render() {
        const { listCombos, pagination } = this.props;
        const { rows = [], count = 0 } = listCombos;
        return (
            <Fragment>
                <div className="col-12 col-lg-9 site-content">
                    <div className="visible-small">
                        <div className={style.sortWrapper}>
                            <span
                                className={style.btnFilter}
                                onClick={() => {
                                    this.props.handleToggle('filter');
                                }}
                            >
                                <i className="zmdi zmdi-filter-list" /> Bộ lọc
                            </span>
                        </div>
                    </div>
                    <div className={style.contentWrapper}>
                        <div className="row">
                            {rows.map(item => (
                                <div key={item.id} className={`col-6 col-lg-4 ${style.courseItems}`}>
                                    <ComboItem data={item} />
                                </div>
                            ))}
                        </div>
                        {count >= pagination.perPage && (
                            <PaginateComponent
                                total={count}
                                perPage={pagination.perPage}
                                onChangePage={this.goToPage}
                                current={pagination.current}
                            />
                        )}
                        {rows.length === 0 && 'Chưa có khóa học nào trong danh mục này'}
                    </div>
                </div>
            </Fragment>
        );
    }
}

ComboComponent.propTypes = {
    courseActions: PropTypes.object,
    listCombos: PropTypes.object,
    updateParams: PropTypes.func,
    pagination: PropTypes.object,
    handleToggle: PropTypes.func,
    isShowInfo: PropTypes.string
};

export default ComboComponent;
