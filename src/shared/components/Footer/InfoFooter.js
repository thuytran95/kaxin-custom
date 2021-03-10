import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
//import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'src/redux-utils';
//import classnames from 'classnames';
import { getValueByKey, getNameByKey } from 'src/helpers/Common';

class InfoFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: '',
            allSetting: ''
        };
    }
    componentWillMount() {}
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };

    render() {
        const { setting: { listSetting = {} } } = this.props;
        return (
            <Fragment>
                <div className={style.footerInfoWrapper}>
                    <h2>CÔNG TY CỔ PHẦN SÁCH KAIXIN</h2>
                    <div className="row">
                        <div className="col-12 col-lg-6 col-footer">
                            <div className={style.footerInfo}>
                                <h3 className={style.widgetTitleFooter}>{getNameByKey(listSetting, 'tru_so_chinh')}</h3>
                                <ul>
                                    <li>
                                        {getValueByKey(listSetting, 'tru_so_chinh') !== '' ? (
                                            <i className="fa fa-map-marker" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'tru_so_chinh')}</span>
                                    </li>
                                    <li>
                                        {getValueByKey(listSetting, 'dien_thoai') !== '' ? (
                                            <i className="fa fa-phone" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'dien_thoai')}</span>
                                    </li>
                                    <li>
                                        {getValueByKey(listSetting, 'email_lien_he') !== '' ? (
                                            <i className="fa fa-envelope" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'email_lien_he')}</span>
                                    </li>
                                </ul>
                                <div className="clearfix" />
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-footer">
                            <div className={style.footerInfo}>
                                <h3 className={style.widgetTitleFooter}>{getNameByKey(listSetting, 'chi_nhanh')}</h3>
                                <ul>
                                    <li>
                                        {getValueByKey(listSetting, 'chi_nhanh') !== '' ? (
                                            <i className="fa fa-map-marker" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'chi_nhanh')}</span>
                                    </li>
                                    <li>
                                        {getValueByKey(listSetting, 'dt_chi_nhanh') !== '' ? (
                                            <i className="fa fa-phone" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'dt_chi_nhanh')}</span>
                                    </li>
                                    <li>
                                        {getValueByKey(listSetting, 'email_chi_nhanh') !== '' ? (
                                            <i className="fa fa-envelope" />
                                        ) : (
                                            ''
                                        )}
                                        <span>{getValueByKey(listSetting, 'email_chi_nhanh')}</span>
                                    </li>
                                </ul>
                                <div className="clearfix" />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
InfoFooter.defaultProps = {
    settingActions: {}
};
InfoFooter.propTypes = {
    settingActions: PropTypes.object.isRequired,
    setting: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, setting } = state;
    return { auth, setting };
};

const mapDispatchToProps = dispatch => {
    return {
        settingActions: bindActionCreators(actions.settingActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoFooter);
