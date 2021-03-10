import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'src/redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import NotifyComponent from 'src/shared/components/Account/Notify/index';
import { redirect } from 'src/helpers/Common';
import { myCourseDetailLink, courseDetailLink, noticeDetailLink } from 'src/helpers/RouteURL';

class NotifyPage extends Component {
    static async getInitialProps(context) {
        const { store } = context;
        const { commonActions } = mapDispatchToProps(store.dispatch);

        try {
            const params = {
                limit: 20,
                start: 0,
                filter: JSON.stringify([{ operator: 'eq', value: 'website', property: 'platform' }])
            };
            await commonActions.getMyNotice({ ...params });
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Thông báo'
            };
        } catch (e) {
            return {
                layout: 'auth',
                requireAuth: true,
                title: 'Thông báo'
            };
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            params: {
                pagination: {
                    current: 1,
                    perPage: 20
                }
            }
        };
    }
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    getData = () => {
        const { commonActions } = this.props;
        const { pagination } = this.state.params;
        commonActions.getMyNotice({
            filter: JSON.stringify([{ operator: 'eq', value: 'website', property: 'platform' }]),
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage
        });
    };
    readMe = data => {
        const { commonActions } = this.props;
        const params = {
            isRead: true
        };
        commonActions
            .isRead(data.id, {
                ...params
            })
            .finally(() => {
                if (data.type === 'updateCourse' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(myCourseDetailLink({ ...params }));
                } else if (data.type === 'paidCourseToGV' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(courseDetailLink({ ...params }));
                } else if (data.type === 'approvedCourse' && data.detailMsg) {
                    const params = {
                        id: data.dataId,
                        name: data.detailMsg.name
                    };
                    redirect(courseDetailLink({ ...params }));
                } else {
                    // redirect('/thong-bao');
                    // this.getData();
                    const params = {
                        id: data.dataId
                    };
                    redirect(noticeDetailLink({ ...params }));
                }
            });
    };
    readAllNotice = () => {
        const { commonActions } = this.props;
        commonActions.resetRead().finally(() => {
            this.getData();
        });
    };
    render() {
        const { title, common: { myNotice = {} }, ...remains } = this.props;
        const { params } = this.state;
        // console.log('myNotice', myNotice);
        return (
            <AccountPageLayout title={title} {...remains}>
                <NotifyComponent
                    data={myNotice.rows}
                    count={myNotice.count}
                    updateParams={this.updateParams}
                    pagination={params.pagination}
                    readMe={this.readMe}
                    readAllNotice={this.readAllNotice}
                    type="me"
                />
            </AccountPageLayout>
        );
    }
}

NotifyPage.defaultProps = {};

NotifyPage.propTypes = {
    title: PropTypes.string.isRequired,
    common: PropTypes.object,
    commonActions: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, user, common } = state;
    return { authInfo: auth, user, common };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyPage);
