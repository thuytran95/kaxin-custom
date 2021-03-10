/* eslint no-console: 0 */
import styles from './index.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TypesOptionsMap, { TypesOptionsDefaultProps } from 'components/input-options';

import Option from './option';

export default class OptionsList extends PureComponent {
    static defaultProps = {
        options: []
    };
    static propTypes = {
        options: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        passToOptions: PropTypes.object,
        white: PropTypes.bool,
        tight: PropTypes.bool,
        elementOverrides: PropTypes.array,
        displayOverrides: PropTypes.array,
        filter: PropTypes.any
    };

    static defaultProps = {
        passToOptions: {}
    };

    render() {
        return this.renderOptions(this.props.options);
    }

    renderOptions = options => {
        return <div className={styles.group}>{options.map(this.renderOption)}</div>;
    };

    renderColumn = (option, index) => {
        return (
            <div className={styles.column} key={index}>
                {this.renderOption(option)}
            </div>
        );
    };

    renderColumns = (option, key) => {
        return (
            <div className={styles.columns} key={key}>
                {option.options.map(this.renderColumn, this)}
            </div>
        );
    };

    renderOption = (option, index) => {
        const OptionComponent = TypesOptionsMap[option.type];

        if (OptionComponent) {
            const {
                values,
                onChange,
                tight,
                passToOptions,
                white,
                elementOverrides,
                displayOverrides,
                filter
            } = this.props;
            const value = values[option.id];
            const extraProps = { ..._.get(TypesOptionsDefaultProps, option.type, {}), ...option.props };
            let disabled = false;

            let elementOverride = false;
            let displayOverride = false;

            if (elementOverrides) {
                elementOverride = elementOverrides.indexOf(option.id) !== -1;
            }
            if (displayOverrides) {
                displayOverride = displayOverrides.indexOf(option.id) !== -1;
            }

            if (filter && filter.length) {
                disabled = filter.indexOf(option.id) === -1;
            }
            return (
                <Option
                    OptionComponent={OptionComponent}
                    value={value}
                    onChange={onChange}
                    extraProps={extraProps}
                    id={option.id}
                    label={option.label || option.title}
                    type={option.type}
                    description={option.description}
                    unlocks={option.unlocks}
                    tight={tight}
                    OptionsList={OptionsList}
                    passToOptions={passToOptions}
                    elementOverride={elementOverride}
                    displayOverride={displayOverride}
                    white={white}
                    disabled={disabled}
                    key={option.id || index}
                />
            );
        } else {
            // console.error(`Option type ${option.type} is not valid!`);
            return null;
        }
    };
}
