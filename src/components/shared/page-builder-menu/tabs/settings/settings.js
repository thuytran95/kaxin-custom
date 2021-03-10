import styles from './settings.scss';

import Scrollable from 'components/shared/scrollable';
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Props from './props';
import TabEmpty from '../tab-empty';

const ScrollWraper = styled(Scrollable)`
    position: absolute;
    top: 30px;
    bottom: 45px;
    left: 0;
    right: 0;
`;

const DeleteButton = styled.button`
    display: flex;
    vertical-align: top;
    text-align: center;
    text-decoration: none;
    margin: 0;
    border: none;
    outline: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: hsl(348, 100%, 61%);
`;

export default class SettingsTab extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        selectedElement: PropTypes.object,
        isTemplate: PropTypes.bool,
        remove: PropTypes.func
    };

    render() {
        const { selected } = this.props;
        let result;

        if (selected && selected.id !== 'Body') {
            result = this.renderContent();
        } else {
            result = this.renderNonSelected();
        }

        return result;
    }

    renderContent = () => {
        return (
            <Fragment>
                {this.renderActionButtons()}
                <ScrollWraper>
                    <Props {...this.props} />
                </ScrollWraper>
            </Fragment>
        );
    };

    renderNonSelected = () => {
        return <TabEmpty />;
    };

    renderActionButtons = () => {
        const { selected, selectedElement, isTemplate, remove } = this.props;

        if (selected && selected.id !== 'Body') {
            let result;

            if (isTemplate) {
                result = <div className={styles.template}>This is a template element</div>;
            } else if (selectedElement.subComponent) {
                result = <div className={styles.subElement}>This is a sub element</div>;
            } else {
                result = (
                    <div className={styles.actions}>
                        <DeleteButton onClick={remove}>
                            <FontAwesomeIcon icon="trash" />
                            <span style={{ marginLeft: 8 }}>Remove</span>
                        </DeleteButton>
                    </div>
                );
            }

            return result;
        }
    };
}
