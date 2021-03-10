import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Label, FormGroup } from 'reactstrap';
import style from './style.scss';
import { Select } from 'antd';
const Option = Select.Option;

class HeaderFilter extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            categoryId: [],
            ordering: ''
        };
    }
    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    onChangeSelect = value => {
        this.setState({ categoryId: value });
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
            name: '',
            categoryId: [],
            ordering: ''
        });
        onSearch({});
    };
    onChangeOrdering = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.props.updateParams({ sort: value });
        });
    };
    render() {
        const { categories } = this.props;
        return (
            <Form onSubmit={this.onSearch} className={style.formSearchKey}>
                <FormGroup>
                    <Label>Tìm kiếm khóa học</Label>
                    <Input
                        value={this.state.name ? this.state.name : ''}
                        name="name"
                        id="name"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Danh mục</Label>

                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Chọn danh mục"
                        id="categoryId"
                        value={this.state.categoryId ? this.state.categoryId : ''}
                        onChange={this.onChangeSelect}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {categories &&
                            categories.map(item => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Sắp xếp</Label>
                    <Input
                        type="select"
                        value={this.state.ordering ? this.state.ordering : ''}
                        name="ordering"
                        id="ordering"
                        onChange={this.onChangeOrdering}
                    >
                        <option value="">--- Chọn ---</option>
                        <option value={'[{"property":"price", "direction":"DESC" }]'}>Giá thấp dần</option>
                        <option value={'[{"property":"price", "direction":"ASC" }]'}>Giá cao dần</option>
                        <option value={'[{"property":"name", "direction":"ASC" }]'}>Sắp xếp từ A-Z</option>
                        <option value={'[{"property":"name", "direction":"DESC" }]'}>Sắp xếp từ Z-A</option>
                    </Input>
                </FormGroup>
                <FormGroup>
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
    categories: []
};

HeaderFilter.propTypes = {
    onSearch: PropTypes.func,
    updateParams: PropTypes.func.isRequired,
    pagination: PropTypes.object,
    categories: PropTypes.array
};

export default HeaderFilter;
