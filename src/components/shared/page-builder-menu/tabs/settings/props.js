import styles from './props.scss';
import optionsStyles from 'components/shared/options-list/index.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import Input from 'components/input-options/input';
import OptionsList from 'components/shared/options-list';
import elements from 'components/elements';
import getElementProps from 'helpers/element/get-props';
export default class EditProps extends PureComponent {
    static defaultProps = {
        pageBuilderActions: {},
        display: 'desktop',
        selectedLinks: []
    };
    static propTypes = {
        pageBuilderActions: PropTypes.shape({
            changeDocProperty: PropTypes.func.isRequired,
            changeElementLabel: PropTypes.func
        }).isRequired,
        display: PropTypes.string.isRequired,
        selected: PropTypes.object,
        selectedElement: PropTypes.shape({
            tag: PropTypes.string,
            label: PropTypes.string
        }),
        type: PropTypes.string,
        contentElementId: PropTypes.string,
        isTemplate: PropTypes.bool.isRequired,
        selectedLinks: PropTypes.array.isRequired
    };

    changeElementLabel = value => {
        const { selected, pageBuilderActions } = this.props;
        const { changeElementLabel } = pageBuilderActions;
        changeElementLabel(selected.id, value, selected.context);
    };

    changeElementProperty = (key, value) => {
        const { selected, pageBuilderActions } = this.props;
        const { changeElementProperty } = pageBuilderActions;
        changeElementProperty(selected.id, key, value, selected.context);
    };

    render() {
        return (
            <div className={styles.root}>
                {this.renderLabelOption()}
                {this.renderOptions()}
            </div>
        );
    }

    renderLabelOption = () => {
        const { selectedElement, isTemplate } = this.props;
        //console.log(selectedElement);
        if (!isTemplate) {
            return (
                <div className={optionsStyles.option}>
                    <div className={optionsStyles.heading}>{selectedElement.label || selectedElement.tag}</div>
                    {/* <Input
                        value={selectedElement.label || selectedElement.tag}
                        onChange={this.changeElementLabel}
                        disabled
                    /> */}
                </div>
            );
        }
    };

    renderOptions = () => {
        const { selectedElement, display, selectedLinks, isTemplate } = this.props;
        const ElementClass = elements[selectedElement.tag];

        if (ElementClass.propsSchema) {
            const values = { ...ElementClass.defaultProps, ...getElementProps(selectedElement, display) };
            return (
                <OptionsList
                    options={ElementClass.propsSchema}
                    values={values}
                    onChange={this.changeElementProperty}
                    filter={isTemplate && selectedLinks.map(link => link.action)}
                />
            );
        }
    };
}
