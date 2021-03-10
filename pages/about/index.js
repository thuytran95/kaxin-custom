import styles from './styles.scss';

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'src/redux';

import { actions } from 'src/redux-utils';

const token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaVWZfbm9rMkNHeFMzbFBHc3d5S0stdWh4STNYZEdpMnQ1QlhLS3IzODJ3In0.eyJqdGkiOiJmMjM1MDYwNS03YjBjLTRmOTktYTQyNS1hZjM0MTVkNjA1MTEiLCJleHAiOjE1MzI0OTkyMTcsIm5iZiI6MCwiaWF0IjoxNTMyNDk4NjE3LCJpc3MiOiJodHRwOi8vc3NvLm1jYm9va3Mudm46ODA4MC9hdXRoL3JlYWxtcy9NQ0I2ODYiLCJhdWQiOiJ3ZWJzaXRlIiwic3ViIjoiZTQ0ZjcyODgtOTgwNi00OTZiLWFmNGYtZmY5NjIyMzA0YWE1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2Vic2l0ZSIsIm5vbmNlIjoiYjc1ZjI4OGMtYWQwMy00ZWFhLTgxMTAtMzEyYWE0MGI3YzMzIiwiYXV0aF90aW1lIjoxNTMyNDk4NjE0LCJzZXNzaW9uX3N0YXRlIjoiNjhhODRkYzAtYzRjMC00N2RlLThlYjUtYzIxZTc0ZWY5M2Q1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvcmRlcl92aWV3IiwiY291cnNlX3ZpZXciLCJ1c2VyX3ZpZXciLCJjYXRlZ29yeV92aWV3Iiwicm9sZV91cGRhdGUiLCJhY2Nlc3NfYWRtaW4iLCJib29rX3ZpZXciXX0sInJlc291cmNlX2FjY2VzcyI6eyJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwiaWQiOiJlNDRmNzI4OC05ODA2LTQ5NmItYWY0Zi1mZjk2MjIzMDRhYTUifQ.iXDbezYgbbXl-lXpooV3TokJIDl3ehBASAgnNmY7y-fX-j9U_Uo56_fQYCYNcyH_1FloVv7PczbFDynIQjkst9IX_3q5m-4jZxSNY15mPk-R_Vv_U4mCwiMYNul1fuyB7x3a4xfDtCj-AsQthlMoyfLw2Vq0cbuqN6clWz59C7NS_9Lg5Wk8rHuK-QSZpRGO-4VCeGo3s3L1GS2enCBj3YELh4JKKF8SHUojsIu2DzItPjLS8W7ODVuDFpXHMh-pm_7-iVSxncEqLOvYICHVQh-GlOx2uxgMgeY5jrhMljaF0eRzgR5RIKEprsJS2cYq-fJAfUPhzvdDbZ8QDnmfbw`;
const refreshToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaVWZfbm9rMkNHeFMzbFBHc3d5S0stdWh4STNYZEdpMnQ1QlhLS3IzODJ3In0.eyJqdGkiOiIzOGQxNDhjMi05MjA5LTRlYWEtYWZhYS04OTQ3ZDM0YTY3MzciLCJleHAiOjE1MzI2MDY2MTQsIm5iZiI6MCwiaWF0IjoxNTMyNDk4NjE3LCJpc3MiOiJodHRwOi8vc3NvLm1jYm9va3Mudm46ODA4MC9hdXRoL3JlYWxtcy9NQ0I2ODYiLCJhdWQiOiJ3ZWJzaXRlIiwic3ViIjoiZTQ0ZjcyODgtOTgwNi00OTZiLWFmNGYtZmY5NjIyMzA0YWE1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYnNpdGUiLCJub25jZSI6ImI3NWYyODhjLWFkMDMtNGVhYS04MTEwLTMxMmFhNDBiN2MzMyIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjY4YTg0ZGMwLWM0YzAtNDdkZS04ZWI1LWMyMWU3NGVmOTNkNSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvcmRlcl92aWV3IiwiY291cnNlX3ZpZXciLCJ1c2VyX3ZpZXciLCJjYXRlZ29yeV92aWV3Iiwicm9sZV91cGRhdGUiLCJhY2Nlc3NfYWRtaW4iLCJib29rX3ZpZXciXX0sInJlc291cmNlX2FjY2VzcyI6eyJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fX0.i8lk5jCAUv2UOUW16R0gaFMU3vULFOPyUYxRKAJQkSnG-0to-KPtxQwcJCGJESBjIW9FQspZjGXNXNSqexKES2zpwv3ITfqvWpt-4LiLIsqvYMZj75wpqGSZFNLOP2yMOJ_JQIW1tX7xfZ9nCVnuYjT6w13EzkEGAW7p5peAX4jcNTUVjPt3JUHJB2otIYVwtgRgYw6tdqD19uCpdNsbyztmlz8X7a5kMMJqNlB92iQB7N6_Uex2WgEvNfAzKVE7IB2uUPzWONJk_KS71lEISiVLoRJ4DZkr_Awljo7cyCN7QVuzKUgcRZ7NdFW21lGA8amMz5QrzagrCsWLqbKvOw`;

class About extends PureComponent {
    static async getInitialProps(context) {
        return {
            title: 'About'
        };
    }

    async componentDidMount() {
        const { kc } = require('src/helpers/Keycloak');
        // kc.init().then(authentication => {
        //     if (authentication) {
        //         console.log(kc);
        //     }
        // });
        
        const authentication = await kc.init({ token, refreshToken });
        if (authentication) {
            // console.log(kc);
        }
    }

    render() {
        const { title } = this.props;
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
                <div className={styles.paragraph}>
                    <h2>About</h2>
                </div>
            </Fragment>
        );
    }
}

About.propTypes = {
    title: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
