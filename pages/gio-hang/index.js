import styles from './style.scss';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';

import { actions } from 'src/redux-utils';
import TableCart from './components/TableCart';
import TotalCart from './components/TotalCart';

class Cart extends Component {
    static async getInitialProps(context) {
        return {
            title: 'Giỏ hàng'
        };
    }

    render() {
        const { title, cart, cartActions } = this.props;
        return (
            <Fragment>
                <Helmet
                    title={`${title}`}
                    meta={[
                        {
                            property: 'og:title',
                            content: title
                        }
                    ]}
                />
                <div className={styles.pageCartWrapper}>
                    <div className="container">
                        <h1>GIỎ HÀNG CỦA BẠN</h1>
                        <div className="row">
                            <div className="col-12 col-lg-9 table-cart">
                                <TableCart cart={cart} cartActions={cartActions} />
                            </div>

                            <div className="col-12 col-lg-3 total-cart">
                                <TotalCart
                                    displayCheckoutButton={(cart.courses || []).length > 0}
                                    total={Math.floor(cart.courses.reduce((sum, item) => sum + item.amount, 0))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Cart.propTypes = {
    title: PropTypes.string.isRequired,
    cart: PropTypes.object.isRequired,
    cartActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, cart } = state;
    return {
        auth,
        cart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        cartActions: bindActionCreators(actions.cartActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
