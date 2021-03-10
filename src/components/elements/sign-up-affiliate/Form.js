import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ErrMessage from '../../errors/ErrMessage';
import classnames from 'classnames';

class FormElement extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                phone: '',
                year: '',
                url: '',
                money: ''
            },
            validationForm: {},
            errorMessage: ''
        };
    }
    handleChangeInput = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };
    render() {
        const { data } = this.state;
        return (
            <Form>
                <FormGroup>
                    <Label>Họ và tên</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.handleChangeInput}
                        value={data.name}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['name']
                        })}
                    />
                    <ErrMessage name="name" obj={this.state.validationForm} />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        value={data.email}
                        type="email"
                        name="email"
                        onChange={this.handleChangeInput}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['email']
                        })}
                    />
                    <ErrMessage name="email" obj={this.state.validationForm} />
                </FormGroup>

                <FormGroup>
                    <Label>SĐT</Label>
                    <Input
                        value={data.phone}
                        name="phone"
                        onChange={this.handleChangeInput}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['phone']
                        })}
                    />
                    <ErrMessage name="phone" obj={this.state.validationForm} />
                </FormGroup>

                <FormGroup>
                    <Label>Số năm kinh nghiệm lĩnh vực Marketing</Label>
                    <Input
                        value={data.year}
                        type="select"
                        name="year"
                        onChange={this.handleChangeInput}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['year']
                        })}
                    >
                        <option value="0">Chọn số năm</option>
                        <option value="1">1 năm</option>
                        <option value="2">2 năm</option>
                        <option value="3">3 năm</option>
                        <option value="4">Trên 3 năm</option>
                    </Input>
                    <ErrMessage name="year" obj={this.state.validationForm} />
                </FormGroup>
                <FormGroup>
                    <Label>Kênh marketing đã chạy</Label>
                    <Input
                        value={data.url}
                        type="text"
                        name="url"
                        onChange={this.handleChangeInput}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['url']
                        })}
                    />
                    <ErrMessage name="url" obj={this.state.validationForm} />
                </FormGroup>

                <FormGroup>
                    <Label>Thu nhập mong muốn khi tham gia chương trình</Label>
                    <Input
                        value={data.money}
                        name="money"
                        onChange={this.handleChangeInput}
                        className={classnames({
                            'is-invalid text-danger': this.state.validationForm['money']
                        })}
                    />
                    <ErrMessage name="money" obj={this.state.validationForm} />
                </FormGroup>

                <Button type="submit" onClick={this.handleSubmit}>
                    Đăng ký ngay
                </Button>
            </Form>
        );
    }
}

FormElement.propTypes = {};

export default FormElement;
