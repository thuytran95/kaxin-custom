import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { RootContainer, RootRow, WrapSidebar, WrapContent, Heading } from './styled';
class LayoutElement extends PureComponent {
    render() {
        const { Element, editing } = this.props;
        return (
            <Fragment>
                <Element id="BannerHeader" positionInParent={0} editing={editing} />
                <RootContainer>
                    <Heading>Các khóa học đề xuất</Heading>
                    <RootRow>
                        <WrapSidebar>
                            <Element id="LeftBanner" positionInParent={0} editing={editing} />
                        </WrapSidebar>
                        <WrapContent>
                            <Element id="RightContent" positionInParent={0} editing={editing} />
                        </WrapContent>
                    </RootRow>
                </RootContainer>
                <Element id="BottomApp" positionInParent={0} editing={editing} />
            </Fragment>
        );
    }
}

LayoutElement.propTypes = {
    editing: PropTypes.bool,
    Element: PropTypes.func
};

const mapStateToProps = ({ pageBuilder }) => {
    const { editing } = pageBuilder;
    return { editing };
};

export default connect(mapStateToProps)(LayoutElement);
