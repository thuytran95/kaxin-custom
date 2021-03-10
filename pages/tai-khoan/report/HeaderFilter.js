import style from './style.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Label, FormGroup } from 'reactstrap';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

class HeaderFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: null,
            toDate: null,
            courseId: [],
            status: ''
        };
    }
    componentDidMount() {
        const { courseId, fromDate, toDate, status } = this.props;
        if (courseId) {
            this.updateData(courseId, fromDate, toDate, status);
        }
    }
    updateData = (courseId, fromDate, toDate, status) => {
        this.setState({
            courseId: [courseId],
            status
        });
    };
    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    onChangeSelect = value => {
        this.setState({ courseId: value });
    };
    onSearch = e => {
        e.preventDefault();
        const { onSearch } = this.props;
        onSearch(this.state);
    };
    onCancel = () => {
        const { onSearch } = this.props;
        this.setState({
            fromDate: null,
            toDate: null,
            courseId: this.props.courseId ? this.props.courseId : [],
            status: ''
        });
        onSearch({});
    };
    disabledDate = current => {
        return (
            current &&
            current <
                moment()
                    .subtract(1, 'days')
                    .endOf('day')
        );
    };
    onChangeDate = (value, dateString) => {
        if (value) {
            this.setState({
                fromDate: moment(value[0]),
                toDate: moment(value[1])
            });
        } else {
            this.setState({
                fromDate: null,
                toDate: null
            });
        }
    };
    onOk = value => {
        if (value) {
            this.setState({
                fromDate: moment(value[0]),
                toDate: moment(value[1])
            });
        } else {
            this.setState({
                fromDate: null,
                toDate: null
            });
        }
    };
    render() {
        const { dataCourses } = this.props;
        return (
            <Form onSubmit={this.onSearch} className={style.formSearchKey}>
                <div className={`${style.section} ${this.props.courseId ? [style.full] : [style.none]}`}>
                    <FormGroup>
                        <Label>Chọn khoảng ngày</Label>
                        <RangePicker
                            placeholder={['Bắt đầu', 'Kết thúc']}
                            onChange={this.onChangeDate}
                            onOk={this.onOk}
                            value={[this.state.fromDate, this.state.toDate]}
                            format="DD/MM/YYYY"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Trạng thái</Label>
                        <Input
                            type="select"
                            value={this.state.status ? this.state.status : ''}
                            name="status"
                            id="status"
                            onChange={this.onChange}
                        >
                            <option value="">--- Chọn ---</option>
                            <option value={true}>Đã thanh toán</option>
                            <option value={false}>Chưa thanh toán</option>
                        </Input>
                    </FormGroup>
                    {this.props.courseId ? null : (
                        <FormGroup>
                            <Label>Khóa học</Label>
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Chọn khóa học"
                                id="courseId"
                                value={this.state.courseId ? this.state.courseId : []}
                                onChange={this.onChangeSelect}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {/* <Option value={null}>--- Chọn khóa học ---</Option> */}
                                {dataCourses &&
                                    dataCourses.map(item => (
                                        <Option value={item.id} key={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                            </Select>
                        </FormGroup>
                    )}
                </div>
                <FormGroup className={style.buttons}>
                    <Label />
                    <Button className={style.edit}>Lọc</Button>
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
    onSearch: () => null,
    dataCourses: []
};

HeaderFilter.propTypes = {
    onSearch: PropTypes.func,
    pagination: PropTypes.object,
    dataCourses: PropTypes.array,
    courseId: PropTypes.string,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    status: PropTypes.bool
};

export default HeaderFilter;
