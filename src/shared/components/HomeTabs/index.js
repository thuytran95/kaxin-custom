import style from './style.scss';

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import CarouselComponent from 'src/shared/components/Course/carousel/index';
import { CoursePropTypes } from 'src/prop-types';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class TabHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
    }
    callback(key) {}
    render() {
        const { courseHigtLight, courseNew } = this.props;
        return (
            <Fragment>
                <div className={style.tabHomeWrapper}>
                    <div className="container">
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Nổi bật" key="1">
                                <CarouselComponent type={1} items={_.get(courseHigtLight, 'rows', [])} />
                            </TabPane>
                            <TabPane tab="Mới nhất" key="2">
                                <CarouselComponent type={2} items={_.get(courseNew, 'rows', [])} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Fragment>
        );
    }
}

TabHomeComponent.propTypes = {
    data: CoursePropTypes,
    cartActions: PropTypes.object,
    listCourse: PropTypes.object,
    courseNew: PropTypes.object,
    courseHigtLight: PropTypes.object,
    coursePercent: PropTypes.object
};

export default TabHomeComponent;
