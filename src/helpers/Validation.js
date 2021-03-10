import _ from 'lodash';
class Validation {
    constructor(id, x, y) {
        this.validationText = [
            { error: 'badInput', text: '' },
            { error: 'customError', text: '' },
            { error: 'patternMismatch', text: '' },
            { error: 'rangeOverflow', text: '' },
            { error: 'rangeUnderflow', text: '' },
            { error: 'stepMismatch', text: '' },
            { error: 'tooLong', text: '' },
            { error: 'tooShort', text: '' },
            { error: 'typeMismatch', type: 'email', text: '' },
            { error: 'valueMissing', text: '' }
        ];
    }

    validationOnChange = e => {
        const validation = [];
        _.forIn(e.validity, (val, key) => {
            if (val) {
                validation.push(key);
            }
        });
        return this.showValidation(e, validation[0]);
    };

    checkPhone = obj => {
        if (obj.phone !== '') {
            if (obj.phone.match(/^\+?[0-9]{9,16}$/g)) {
                return { error: false, name: 'phone', text: '' };
            } else {
                return {
                    error: true,
                    name: 'phone',
                    text: 'Số điện thoại không đúng định dạng'
                };
            }
        } else {
            return {
                error: true,
                name: 'phone',
                text: 'Vui lòng nhập số điện thoại'
            };
        }
    };
    checkPassword = obj => {
        if (obj.min && obj.password.length >= obj.min) {
            return { error: false, name: 'password', text: '' };
        } else {
            return {
                error: true,
                name: 'password',
                text: 'Vui lòng nhập mật khẩu ít nhất 6 ký tự.'
            };
        }
    };
    validateNumberic = obj => {
        if (obj.number <= 0) {
            return {
                error: true,
                name: obj.text,
                text: 'Phải là số dương'
            };
        } else if (obj.number !== '' && obj.number.match(/^[0-9\b]+$/)) {
            return { error: false, name: obj.text, text: '' };
        } else {
            return {
                error: true,
                name: obj.text,
                text: 'Vui lòng nhập định dạng là số'
            };
        }
    };
    realNumbers = obj => {
        if (obj.number <= 0) {
            return {
                error: true,
                name: obj.text,
                text: 'Phải là số dương'
            };
        }
        if (obj.max && obj.number > obj.max) {
            return {
                error: true,
                name: obj.text,
                text: `Giá trị tối đa là ${obj.max}`
            };
        }
        return { error: false, name: obj.text, text: '' };
    };
    validatePercent = obj => {
        if (obj.number <= 0) {
            return {
                error: true,
                name: obj.text,
                text: 'Vui lòng nhập số nguyên dương'
            };
        }
        if (obj.max && obj.number > obj.max) {
            return {
                error: true,
                name: obj.text,
                text: `Giá trị tối đa là ${obj.max}`
            };
        }
        return { error: false, name: obj.text, text: '' };
    };

    realNumbersAndMaxLength = obj => {
        if (obj.number >= 0 && obj.number < obj.max) {
            return { error: false, name: obj.text, text: '' };
        } else if (obj.number < 0) {
            return {
                error: true,
                name: obj.text,
                text: 'Phải là số dương'
            };
        } else if (obj.number > obj.max) {
            let text = `Không được lớn hơn ${obj.max / 1000000}tr`;
            if (obj.text === 'percent') {
                text = `Không được lớn hơn ${obj.max}`;
            }
            return {
                error: true,
                name: obj.text,
                text: text
            };
        }
    };

    checkConfirmPass = obj => {
        if (obj.password !== '') {
            if (obj.confirm === '') {
                return {
                    error: true,
                    name: 'password_confirm',
                    //text: 'This field is a required field'
                    text: 'Vui lòng nhập trường dữ liệu này.'
                };
            } else {
                if (obj.password !== obj.confirm) {
                    return {
                        error: true,
                        name: 'password_confirm',
                        //text: 'This field is same password'
                        text: 'Mật khẩu bạn nhập không khớp.'
                    };
                } else {
                    return { error: false, name: 'password_confirm', text: '' };
                }
            }
        } else {
            return { error: false, name: 'password_confirm', text: '' };
        }
    };

    validationDropFile = files => {};

    showValidation = (element, validate) => {
        switch (validate) {
            case 'typeMismatch': {
                if (element.type === 'email');
                return {
                    error: true,
                    name: element.name,
                    //text: _.snakeCase(element.name).replace(/_/g, ' ') + ' should be a valid email address'
                    text: 'Vui lòng nhập đúng định dạng của email.'
                };
            }
            case 'valueMissing': {
                return {
                    error: true,
                    name: element.name,
                    //text: _.snakeCase(element.name).replace(/_/g, ' ') + ' is a required field'
                    text: 'Vui lòng nhập trường dữ liệu này.'
                };
            }
            default: {
                return { error: false, name: element.name, text: '' };
            }
        }
    };
    updateValidationForm = (validationInput, validationForm) => {
        if (validationInput && validationInput.error) {
            const objErr = _.find(validationForm, o => {
                return o.name === validationInput.name;
            });
            if (objErr === undefined) {
                validationForm[validationInput.name] = validationInput.text;
            } else {
                delete validationForm[validationInput.name];
                validationForm[validationInput.name] = validationInput.text;
            }
        } else {
            if (validationForm && validationInput) {
                delete validationForm[validationInput.name];
            } else {
                delete validationForm['error'];
            }
        }
        return validationForm;
    };
    validationWhenSubmit = (validationMore = {}, inputs, validationForm) => {
        validationForm = {};
        for (let i = 0; i < inputs.length; i++) {
            const validationInput = this.validationOnChange(inputs[i]);
            if (validationInput.error) {
                validationForm[validationInput.name] = validationInput.text;
            }
        }
        if (!_.isEmpty(validationMore)) {
            _.forEach(validationMore, (val, key) => {
                if (val.value === '') {
                    //validationForm[val.key] = _.snakeCase(val.key).replace(/_/g, ' ') + ' is a required field';
                    validationForm[val.key] = 'Vui lòng nhập trường dữ liệu này.';
                }
            });
        }
        return validationForm;
    };
}
export default new Validation();
