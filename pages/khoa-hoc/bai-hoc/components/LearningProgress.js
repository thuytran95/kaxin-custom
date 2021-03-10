import styles from './learning-progress.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LessonList from '../../chi-tiet/components/section/LessonList';

class LearningProgress extends Component {
    state = {
        activeTab: 0
    };
    render() {
        const { course } = this.props;
        const { activeTab } = this.state;
        const { lessonDetail = {}, courseDetail = {} } = course;
        return (
            <div className={styles.wrapper}>
                <Tabs selectedIndex={activeTab} onSelect={activeTab => this.setState({ activeTab })}>
                    <TabList>
                        <Tab>Giáo trình</Tab>
                    </TabList>

                    <div className="tab-panels">
                        <TabPanel>
                            <LessonList
                                chapters={courseDetail.chapters}
                                courseId={courseDetail.id}
                                courseName={courseDetail.name}
                                courseBought={true}
                                lesson={lessonDetail}
                            />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }
}

LearningProgress.propTypes = {
    course: PropTypes.object
};
LearningProgress.defaultProps = {
    // course: {
    //     courseDetail: {
    //         id: 12,
    //         name: 'Phuong phap tu hoc tieng anh dinh cao',
    //         chapters: [
    //             {
    //                 name: 'Chapter 1: Introduction to Gatsby basics',
    //                 lessons: [
    //                     { name: 'Check environment', mediaType: 'video', active: 1, time: '00:22:14', checked: true },
    //                     {
    //                         name: 'Install the "Hello World" starter',
    //                         mediaType: 'video',
    //                         active: 1,
    //                         time: '00:22:14',
    //                         checked: true
    //                     },
    //                     { name: 'Linking between pages', mediaType: 'video', active: 1, time: '00:22:14' },
    //                     { name: 'Interactive page', mediaType: 'video', active: 1, time: '00:22:14' },
    //                     { name: 'Deploying Gatsby.js websites', mediaType: 'video', active: 1, time: '00:22:14' }
    //                 ]
    //             },
    //             {
    //                 name: 'Chapter 2: Introduction to using CSS in Gatsby',
    //                 lessons: [
    //                     {
    //                         name: 'Building with components',
    //                         mediaType: 'video',
    //                         active: 1,
    //                         time: '00:22:14',
    //                         checked: true
    //                     },
    //                     { name: 'Creating Global Styles', mediaType: 'video', active: 1, time: '00:22:14' },
    //                     { name: 'Typography.js', mediaType: 'video', active: 1, time: '00:22:14' },
    //                     { name: 'Gatsby Plugins', mediaType: 'video', active: 1, time: '00:22:14' },
    //                     { name: 'Component CSS', mediaType: 'video', active: 1, time: '00:22:14' }
    //                 ]
    //             }
    //         ]
    //     }
    // }
};

export default LearningProgress;
