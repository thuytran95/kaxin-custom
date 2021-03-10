import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import styled from 'styled-components';

import { changeLayoutBuilder, changeTitlePage, changeRoute } from 'redux-utils/page-builder/actions';
import InputOptions from 'components/input-options';
import Input from 'components/input-options/input';
const { Select } = InputOptions;
const Root = styled.div`
    padding: 15px;
    padding-top: 20px;
`;

const Wrap = styled.div`
    margin-bottom: 25px;
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 5px;
`;

class LayoutSetting extends PureComponent {
    onChange = layoutName => {
        this.props.changeLayoutBuilder(layoutName);
    };

    onChangePageName = title => {
        this.props.changeTitlePage(title);
    };

    onChangePageRoute = route => {
        this.props.changeRoute(route);
    };

    render() {
        const { layouts, pageData } = this.props;
        const labels = _.map(layouts, 'name');
        return (
            <Root>
                <Wrap>
                    <Label>Giao diện</Label>
                    <Select values={labels} labels={labels} onChange={this.onChange} value={pageData.templateName} />
                </Wrap>

                {pageData && pageData.canEdit ? null : (
                    <Wrap>
                        <Label>Tên trang</Label>
                        <Input value={pageData.title} onChange={this.onChangePageName} />
                    </Wrap>
                )}

                {pageData && pageData.canEdit ? null : (
                    <Wrap>
                        <Label>URL key</Label>
                        <Input value={pageData.route} onChange={this.onChangePageRoute} />
                    </Wrap>
                )}
            </Root>
        );
    }
}

LayoutSetting.propTypes = {
    layouts: PropTypes.array,
    changeLayoutBuilder: PropTypes.func,
    changeTitlePage: PropTypes.func,
    changeRoute: PropTypes.func,
    pageData: PropTypes.object
};

export default connect(
    ({ pageBuilder }) => ({
        layouts: pageBuilder.layouts,
        pageData: pageBuilder.pageData
    }),
    dispatch => ({
        ...bindActionCreators({ changeLayoutBuilder, changeTitlePage, changeRoute }, dispatch)
    })
)(LayoutSetting);
