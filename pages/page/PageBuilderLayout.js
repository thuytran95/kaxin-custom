import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import _ from 'lodash';

import layout from 'src/components/layouts';

class PageBuilderLayout extends PureComponent {
    render() {
        const { LayoutElement } = this.props;
        return <LayoutElement />;
    }
}

PageBuilderLayout.propTypes = {
    LayoutElement: PropTypes.func.isRequired
};

const caculateLayout = templateName => {
    const LayoutElement = _.get(layout, templateName, 'div');
    return {
        LayoutElement
    };
};

const selectorFactory = () => {
    let result = {};
    let info = {};
    let templateName = '';
    return (nextState, nextOwnProps) => {
        const nextTemplateName = _.get(nextState.pageBuilder, ['pageData', 'templateName'], 'DynamicLayout');
        let needsUpdate = templateName !== nextTemplateName;

        if (needsUpdate) {
            info = caculateLayout(nextTemplateName);
            needsUpdate = true;
            templateName = nextTemplateName;
        }

        if (needsUpdate) {
            result = {
                ...nextOwnProps,
                ...info
            };
        }

        return result;
    };
};

const ConnectedPageBuilderLayoutElement = connectAdvanced(selectorFactory)(PageBuilderLayout);

export default ConnectedPageBuilderLayoutElement;
