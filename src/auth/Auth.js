import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import SplashScreen from 'components/common/SplashScreen';
import firebaseService from 'services/firebaseService';
import mainApiService from 'services/mainApiService';
import { hideMessage, showMessage } from 'store/ui/messageSlice';

import { logoutUser, setUserDataMainApi, setUserDataFirebase, createUserSettingsFirebase } from './store/userSlice';

class Auth extends Component {
    state = {
        waitAuthCheck: true
    };

    componentDidMount() {
        return Promise.all([this.mainApiCheck()]).then(() => {
            this.setState({ waitAuthCheck: false });
        });
    }

    mainApiCheck = () =>
        new Promise((resolve) => {
            const { appInformation } = this.props;

            mainApiService.getUserData().then(
                (user) => {
                    if (!user) return resolve();

                    this.props.setUserDataMainApi(user);

                    resolve();

                    this.props.showMessage({
                        message: `Logged in to ${appInformation?.appTitle}`,
                        variant: 'success'
                    });
                },
                (error) => {
                    this.props.showMessage({
                        message: 'There was a problem with the connection',
                        variant: 'error'
                    });
                    this.props.logout();
                    resolve();
                }
            );

            return Promise.resolve();
        });

    firebaseCheck = () =>
        new Promise((resolve) => {
            const { appInformation } = this.props;

            firebaseService.init((success) => {
                if (!success) {
                    resolve();
                }
            });

            firebaseService.onAuthStateChanged((authUser) => {
                if (authUser) {
                    this.props.showMessage({ message: `Logging in to ${appInformation?.appTitle}`, variant: 'info' });

                    /**
                     * Retrieve user data from Firebase
                     */
                    firebaseService.getUserData().then(
                        (user) => {
                            this.props.setUserDataFirebase(user, authUser);

                            resolve();

                            this.props.showMessage({
                                message: `Logged in to ${appInformation?.appTitle}`,
                                variant: 'success'
                            });
                        },
                        (error) => {
                            // this.props.createUserSettingsFirebase({ uid: authUser.uid, email: authUser.email });
                            this.props.showMessage({
                                message: 'There was a problem with the connection',
                                variant: 'error'
                            });
                            this.props.logout();
                            resolve();
                        }
                    );
                } else {
                    resolve();
                }
            });

            return Promise.resolve();
        });

    render() {
        return this.state.waitAuthCheck ? <SplashScreen /> : <>{this.props.children}</>;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout: logoutUser,
            setUserDataFirebase,
            setUserDataMainApi,
            showMessage,
            createUserSettingsFirebase,
            hideMessage
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {
        appInformation: state.ui?.appInformation
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
