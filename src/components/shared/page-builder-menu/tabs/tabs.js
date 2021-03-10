import styles from './tabs.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Settings from './settings';
import Layout from './layout';
import TabButton from './tab-button';

export default class Tabs extends PureComponent {
    static defaultProps = {
        setMenuTab: () => null,
        menuTab: 'settings'
    };
    static propTypes = {
        menuTab: PropTypes.string.isRequired,
        setMenuTab: PropTypes.func.isRequired,
        dataLinkable: PropTypes.bool
    };

    render() {
        const { menuTab, setMenuTab } = this.props;

        return (
            <div>
                <div className={styles.tabs}>
                    <TabButton tab="settings" icon="cogs" active={menuTab === 'settings'} onClick={setMenuTab} />
                    <TabButton tab="layout" icon="layer-group" active={menuTab === 'layout'} onClick={setMenuTab} />
                    {/*
                    <TabButton
                        tab="layers"
                        icon="bars"
                        active={menuTab === 'layers'}
                        dataLinkable={dataLinkable}
                        onClick={setMenuTab}
                    />
                    <TabButton
                        tab="link"
                        icon="share-alt"
                        active={menuTab === 'link'}
                        dataLinkable={dataLinkable}
                        onClick={setMenuTab}
                    /> */}
                </div>
                <div className={styles.content}>{this.renderContent()}</div>
            </div>
        );
    }

    renderContent = () => {
        const { menuTab } = this.props;
        switch (menuTab) {
            case 'settings':
                return <Settings />;
            case 'layout':
                return <Layout />;

            default:
                return <div />;
        }
    };
}
