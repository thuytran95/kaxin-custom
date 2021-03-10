import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import ViewUserComponent from './ViewComponent';
import ViewBank from './BankInfo/View';
import EditBank from './BankInfo/Edit';

class ViewUserContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            isBanking: false
        };
    }

    startEdit = () => this.setState({ isEditing: true });

    stopEdit = () => this.setState({ isEditing: false });

    startEditBank = () => this.setState({ isBanking: true });

    stopEditBank = () => this.setState({ isBanking: false });

    render() {
        const { authInfo, authActions, cities } = this.props;
        const { isEditing, isBanking } = this.state;
        //console.log(authInfo.userInfo);
        return (
            <Fragment>
                <div className={style.contentWrapper}>
                    {isEditing ? (
                        <UserForm
                            authInfo={authInfo}
                            stopEdit={this.stopEdit}
                            authActions={authActions}
                            cities={cities}
                        />
                    ) : (
                        <ViewUserComponent authInfo={authInfo} startEdit={this.startEdit} cities={cities} />
                    )}
                </div>
                {authInfo &&
                authInfo.userInfo &&
                authInfo.userInfo.rolePermissions &&
                authInfo.userInfo.rolePermissions.name === 'partner' ? (
                    <div className={style.contentWrapper}>
                        {isBanking ? (
                            <EditBank authInfo={authInfo} stopEdit={this.stopEditBank} authActions={authActions} />
                        ) : (
                            <ViewBank authInfo={authInfo} startEdit={this.startEditBank} />
                        )}
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

ViewUserContainer.propTypes = {
    authInfo: PropTypes.object,
    authActions: PropTypes.object,
    cities: PropTypes.array
};

export default ViewUserContainer;
