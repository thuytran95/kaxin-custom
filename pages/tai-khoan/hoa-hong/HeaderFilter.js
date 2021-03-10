import style from './style.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Label, FormGroup } from 'reactstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';
const { MonthPicker } = DatePicker;

class HeaderFilter extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: '',
            dateFilter: null
        };
    }
    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    onSearch = e => {
        e.preventDefault();
        const { onSearch } = this.props;
        onSearch(this.state);
    };
    onFilter = () => {
        const { onSearch } = this.props;
        onSearch(this.state);
    };

    onCancel = () => {
        const { onSearch } = this.props;
        this.setState({
            status: '',
            dateFilter: null
        });
        onSearch({});
    };
    _onChangeStart = (date, dateString) => {
        if (date) {
            this.setState(
                {
                    dateFilter: moment(date).startOf('day')
                },
                () => {
                    //console.log(this.state.dateFilter);
                }
            );
        } else {
            this.setState({
                dateFilter: moment()
            });
        }
    };
    renderDatepickerStart = () => {
        return (
            <FormGroup className={style.formGroup}>
                <Label>Chọn thời gian</Label>
                <MonthPicker
                    disabledDate={this.disabledDate}
                    name="dateFilter"
                    onChange={this._onChangeStart}
                    value={!_.isNull(this.state.dateFilter) ? moment(this.state.dateFilter) : null}
                    placeholder="Chọn thời gian"
                />
            </FormGroup>
        );
    };
    render() {
        return (
            <Form onSubmit={this.onSearch} className={style.formSearchKey}>
                {this.renderDatepickerStart()}
                {/* <FormGroup>
                    <Label>Trạng thái</Label>
                    <Input
                        type="select"
                        value={this.state.status ? this.state.status : ''}
                        name="status"
                        id="status"
                        onChange={this.onChange}
                    >
                        <option value="">--- Chọn ---</option>
                        <option value="paid">Đã thanh toán</option>
                        <option value="pending">Chưa thanh toán</option>
                    </Input>
                </FormGroup> */}
                <FormGroup>
                    <Label />
                    <Button className={style.edit}>Tìm kiếm</Button>
                    <Button
                        className={style.cancel}
                        onClick={e => {
                            e.preventDefault();
                            this.onCancel();
                        }}
                    >
                        Bỏ lọc
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

HeaderFilter.defaultProps = {
    onSearch: () => null
};

HeaderFilter.propTypes = {
    onSearch: PropTypes.func
};

export default HeaderFilter;
