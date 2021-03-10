import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';

class PaginationComponent extends Component {
    render() {
        const { total, perPage, current, onChangePage, totalPage } = this.props;
        let page;
        if (!totalPage) page = Math.ceil(total / perPage);
        else page = totalPage;
        return (
            <Pagination>
                {current > 1 && (
                    <PaginationItem>
                        <PaginationLink previous onClick={() => onChangePage(current - 1)} />
                    </PaginationItem>
                )}

                {_.times(page, v => {
                    const numb = v + 1;
                    return (
                        <PaginationItem key={numb} active={numb === current} disabled={numb === current}>
                            <PaginationLink onClick={() => onChangePage(numb)}>{numb}</PaginationLink>
                        </PaginationItem>
                    );
                })}
                {current !== page &&
                    page > 1 && (
                        <PaginationItem>
                            <PaginationLink next onClick={() => onChangePage(current + 1)} />
                        </PaginationItem>
                    )}
            </Pagination>
        );
    }
}

PaginationComponent.defaultProps = {
    total: 0,
    perPage: 0,
    current: 1
};

PaginationComponent.propTypes = {
    total: PropTypes.number.isRequired,
    totalPage: PropTypes.number,
    perPage: PropTypes.number,
    onChangePage: PropTypes.func.isRequired,
    current: PropTypes.number
};

export default PaginationComponent;
