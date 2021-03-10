import style from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';
import { actions } from 'src/redux-utils';
import _ from 'lodash';
import { Cube as Overlay } from 'src/shared/components/loading';
import Link from 'next/link';

class UnsubscriberPage extends Component {
    static async getInitialProps(context) {
        return {
            title: 'Thông báo cho subscriber'
        };
    }

    state = {
        text: '',
        isFetching: false
    };
    componentDidMount() {
        const { url: { query } } = this.props;
        const data = _.pick(query, ['email', 'expired', 'token']);
        if (!_.isEmpty(query)) {
            this.unSubs(data);
        }
    }
    unSubs = data => {
        const { authActions } = this.props;
        this.setState({ isFetching: true });
        authActions
            .unSubs(data)
            .then(res => {
                this.setState({ isFetching: false });
                this.setState({
                    text: 'Bạn đã hủy theo dõi thành công'
                });
            })
            .catch(err => {
                this.setState({ isFetching: false });
                this.setState({
                    text: 'Hủy theo dõi không thành công'
                });
            });
    };
    render() {
        const { text, isFetching } = this.state;
        const { title } = this.props;
        return (
            <Fragment>
                <Overlay loading={isFetching} />
                <Helmet title={title} meta={[{ property: 'og:title', content: title }]} />
                <div className={style.pageWrapper}>
                    <h3>{text}</h3>
                    <Link href="/">
                        <a className="btn btn-primary">Trở về trang chủ</a>
                    </Link>
                </div>
            </Fragment>
        );
    }
}

UnsubscriberPage.propTypes = {
    url: PropTypes.object,
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    title: PropTypes.string
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnsubscriberPage);
