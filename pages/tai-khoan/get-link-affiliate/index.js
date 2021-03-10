import style from './style.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import AccountPageLayout from '../layout';
import _ from 'lodash';
import numeral from 'numeral';
import { Table } from 'reactstrap';
import PaginateComponent from 'src/shared/components/Pagination';
import HeaderFilter from './HeaderFilter';
import classnames from 'classnames';
import PriceComponent from 'src/shared/components/common/Price';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { generateLinkCourse } from 'src/helpers/Common';
import { courseDetailLink } from 'src/helpers/RouteURL';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CourseLink } from 'src/shared/components/Link';

class GetLinkPage extends Component {
    static async getInitialProps(context) {
        return {
            title: 'Lấy link Affiliate',
            layout: 'auth',
            requireAuth: true
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            status: '',
            isPopup: false,
            dataLink: {},
            copied: false,
            filter: {},
            params: {
                sort: [],
                pagination: {
                    current: 1,
                    perPage: 10
                }
            }
        };
    }
    componentDidMount() {
        this.getDataCategory();
        this.getData();
    }
    getDataCategory = () => {
        const { categoryActions } = this.props;
        const params = {
            filter: JSON.stringify([
                { operator: 'eq', value: 'website', property: 'type' },
                { operator: 'eq', value: '1', property: 'active' }
            ])
        };
        categoryActions.listCategoryMenu(params);
    };
    onSearch = filter => {
        this.setState(
            {
                filter,
                params: {
                    pagination: {
                        current: 1,
                        perPage: 10
                    }
                }
            },
            () => this.getData()
        );
    };

    genFilter = () => {
        const { filter = {} } = this.state;
        const { name = '' } = filter;
        const data = _.pick(filter, ['categoryId']);
        const que = [{ operator: 'eq', value: '1', property: 'active' }];
        _.forOwn(data, (value, property) => {
            if (value && !_.isEmpty(value)) {
                que.push({ operator: 'in', value, property });
            }
        });
        if (_.trim(name)) {
            que.push({ operator: 'iLike', value: _.trim(name), property: 'name' });
        }

        return JSON.stringify(que);
    };
    updateParams = (obj = {}) => {
        this.setState(prevState => ({ params: { ...prevState.params, ...obj } }), this.getData);
    };
    onChangePage = current => {
        const { pagination } = this.state.params;

        this.setState(
            {
                params: {
                    ...this.state.params,
                    pagination: { ...pagination, current }
                }
            },
            () => this.getData()
        );
    };

    generateQuery = () => {
        const { sort, pagination } = this.state.params;
        const filter = this.genFilter();
        return {
            limit: pagination.perPage,
            start: (pagination.current - 1) * pagination.perPage,
            sort,
            filter
        };
    };
    getData = (params = {}) => {
        const { courseActions } = this.props;
        const query = this.generateQuery();
        courseActions.listCourse({ ...query, ...params }).finally(() => {
            this.setState({ isFetching: false });
        });
    };
    getLink = dataLink => {
        //console.log(dataLink);
        this.setState({
            isPopup: !this.state.isPopup,
            dataLink
        });
    };
    onClosePopup = () => {
        this.setState({
            isPopup: false,
            copied: false
        });
    };
    render() {
        const {
            title,
            course: { listCourse = {} },
            category: { categoryMenuData = {} },
            authInfo: { userInfo = {} },
            ...remains
        } = this.props;
        const { dataLink, params } = this.state;
        const { rows = [], count } = listCourse.data;
        const SquareLogo = '/static/assets/images/chude3.png';
        //console.log(userInfo);
        return (
            <AccountPageLayout title={title} {...remains}>
                <Fragment>
                    <div className={style.contentInner}>
                        <section>
                            <div className={style.stTitle}>
                                <h3>Lấy link Affiliate</h3>
                                <h5>
                                    Mã cộng tác viên: <b>{userInfo.partnerCode ? userInfo.partnerCode : '...'}</b>
                                </h5>
                            </div>
                            <HeaderFilter
                                onSearch={this.onSearch}
                                updateParams={this.updateParams}
                                pagination={params.pagination}
                                categories={categoryMenuData.rows}
                            />
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Khoá học</th>
                                        <th>Giá</th>
                                        <th>% hoa hồng</th>
                                        <th>Tiền hoa hồng</th>
                                        <th>Lấy link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows && rows.length > 0 ? (
                                        rows.map(item => (
                                            <tr key={item.id}>
                                                <td className={style.courseName} data-title="Khóa học">
                                                    <b>
                                                        <CourseLink {...item}>{item.name}</CourseLink>
                                                    </b>
                                                </td>
                                                <td data-title="Giá">{numeral(item.price).format('0,0')}đ</td>
                                                <td data-title="% hoa hồng">
                                                    {item.percentPartner ? item.percentPartner : 0}%
                                                </td>
                                                <td data-title="Tiền hoa hồng">
                                                    {numeral(item.price * item.percentPartner / 100).format('0,0')}đ
                                                </td>
                                                <td data-title="Lấy link">
                                                    <span
                                                        onClick={() => this.getLink(item)}
                                                        className={style.btnGetLink}
                                                    >
                                                        Lấy link
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" data-title="Kết quả">
                                                Không tìm thấy dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            {count >= params.pagination.perPage && (
                                <PaginateComponent
                                    total={count}
                                    perPage={params.pagination.perPage}
                                    onChangePage={this.onChangePage}
                                    current={params.pagination.current}
                                />
                            )}
                        </section>
                    </div>
                    <div
                        className={classnames([style.popupWrapper], {
                            [style.active]: this.state.isPopup
                        })}
                    >
                        <div className={style.overlay} onClick={this.onClosePopup} />
                        <div className={style.popupContent}>
                            <span className={style.close} onClick={this.onClosePopup}>
                                x
                            </span>
                            <section>
                                <h3>LINK AFFILIATE</h3>
                                <div className={style.itemCourse}>
                                    <div className={style.thumbnail}>
                                        <span
                                            style={{
                                                backgroundImage: `url(${
                                                    dataLink &&
                                                    dataLink.courseAvatar &&
                                                    !_.isEmpty(dataLink.courseAvatar)
                                                        ? dataLink.courseAvatar
                                                        : SquareLogo
                                                })`
                                            }}
                                        />
                                    </div>
                                    <div className={style.content}>
                                        <h4>{dataLink.name}</h4>
                                        <p>
                                            {dataLink.lecturer && dataLink.lecturer.firstName
                                                ? dataLink.lecturer.firstName
                                                : '...'}
                                        </p>
                                    </div>
                                    <div className={style.priceWrapper}>
                                        <div className={style.price}>
                                            <span className={style.amount}>
                                                <PriceComponent value={parseInt(dataLink.price, 0)} />đ
                                            </span>
                                        </div>
                                        <div className={style.text}>
                                            <b>Hoa hồng: </b>{' '}
                                            {dataLink.percentPartner && parseInt(dataLink.percentPartner, 0) > 0
                                                ? dataLink.percentPartner
                                                : 0}%
                                        </div>
                                        <div className={style.text}>
                                            <b>Tiền hoa hồng: </b>{' '}
                                            <PriceComponent
                                                value={parseInt(dataLink.price, 0) * dataLink.percentPartner / 100}
                                            />đ
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className={style.formLink}>
                                {this.state.copied && <p>Lấy link thành công</p>}
                                <FormGroup>
                                    <Label>Link</Label>
                                    <Input
                                        ref={textarea => (this.textArea = textarea)}
                                        value={`${generateLinkCourse(
                                            courseDetailLink({
                                                id: dataLink.id,
                                                name: dataLink.name
                                            })
                                        )}?ref=${userInfo.partnerCode ? userInfo.partnerCode : '123'}`}
                                    />
                                    <CopyToClipboard
                                        text={`${generateLinkCourse(
                                            courseDetailLink({
                                                id: dataLink.id,
                                                name: dataLink.name
                                            })
                                        )}?ref=${userInfo.partnerCode ? userInfo.partnerCode : '123'}`}
                                        onCopy={() => this.setState({ copied: true })}
                                    >
                                        <Button className="btn">Copy link</Button>
                                    </CopyToClipboard>
                                </FormGroup>
                            </section>
                        </div>
                    </div>
                </Fragment>
            </AccountPageLayout>
        );
    }
}

GetLinkPage.defaultProps = {
    process: [],
    authInfo: {}
};
GetLinkPage.propTypes = {
    title: PropTypes.string.isRequired,
    authInfo: PropTypes.object,
    user: PropTypes.object,
    userActions: PropTypes.object,
    course: PropTypes.object,
    courseActions: PropTypes.object,
    category: PropTypes.object,
    categoryActions: PropTypes.object
};

const mapStateToProps = state => {
    const { auth, user, course, category } = state;
    return { authInfo: auth, user, course, category };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(actions.userActions, dispatch),
        courseActions: bindActionCreators(actions.courseActions, dispatch),
        categoryActions: bindActionCreators(actions.categoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetLinkPage);
