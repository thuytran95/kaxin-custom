import styles from './actions.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Animate from 'components/shared/animate';
import Theme from 'components/shared/Theme';
import styled from 'styled-components';
import Notification from 'helpers/Notification';
import { history } from 'historyConfigure';
import Route from 'helpers/Route';
import { Button } from 'antd';

const CButton = styled(Button)`
    flex: 1;
    margin: 0 5px !important;
    border-radius: 4px !important;
    &:hover {
        background-color: #0071bb !important;
        border-color: #0071bb !important;
        color: #fff !important;
    }
`;

const WrapButton = styled(Button.Group)`
    display: flex !important;
`;
export default class Actions extends PureComponent {
    static propTypes = {
        updatePageBuilder: PropTypes.func.isRequired
    };

    state = {
        isFetching: false
    };

    onCancel = () => {
        history.push(Route.adminPage);
    };
    onPublish = (active = true) => {
        this.setState({
            isFetching: true
        });
        this.props
            .updatePageBuilder(active)
            .then(() => {
                Notification.success('Cập nhật trang thành công');
                this.setState({
                    isFetching: false
                });
            })
            .catch(err => {
                this.setState({
                    isFetching: false
                });
                const error = err.response.message.route;
                if (error === 'page.validation.routeExist') {
                    Notification.error('Url key đã tồn tại.');
                } else {
                    Notification.error('Cập nhật trang thất bại');
                }
            });
    };

    render() {
        return (
            <Theme>
                <div className={styles.root}>{this.renderContent()}</div>
            </Theme>
        );
    }

    renderContent = () => {
        return (
            <Animate key="changes">
                <div className={styles.table}>{this.renderPush()}</div>
            </Animate>
        );
    };

    renderPush = () => {
        return (
            <WrapButton size="large">
                <CButton type="primary" loading={this.state.isFetching} ghost onClick={() => this.onPublish(true)}>
                    Publish
                </CButton>
                <CButton ghost onClick={() => this.onPublish(false)} loading={this.state.isFetching}>
                    Draft
                </CButton>
                <CButton type="danger" ghost onClick={this.onCancel} loading={this.state.isFetching}>
                    Cancel
                </CButton>
            </WrapButton>
        );
    };
}
