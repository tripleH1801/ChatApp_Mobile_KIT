import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme, NavigationContainer
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme, Provider as PaperProvider
} from 'react-native-paper';
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootNavigation from './screens/RootNavigation';
import RootAuthenication from './screens/RootAuthenication';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveAuth } from './redux/actions/authAction';
import { getConversationsByUserId } from './redux/actions/conversationsAction';

const Root = () => {

    const [MESS_NOFICATION_COUNT, set_MESS_NOFICATION_COUNT] = React.useState(0);

    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

    const initLoginProps = {
        isLoading: true,
        userToken: null,
    }
    const loginReducer = (prevProps, action) => {
        switch (action.type) {
            case 'CHECK_TOKEN':
                return {
                    ...prevProps,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevProps,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevProps,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevProps,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    }

    // const [loginProps, dispatch] = React.useReducer(loginReducer, initLoginProps);

    // lam cac ham xai chung cho tat ca cac screen
    const authContext = React.useMemo(() => ({
        signIn: async (phoneNumber, password) => {
            let userToken = null;
            var options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "phoneNumber": phoneNumber,
                    "password": password,
                }),
                redirect: 'follow'
            };
            await fetch("http://localhost:8800/api/auth/login", options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    console.log('error', response.status);
                    return
                })
                .then(async result => {
                    try {
                        userToken = result.accessToken;
                        await AsyncStorage.setItem('AccessToken', userToken);
                        await AsyncStorage.setItem('UserId', result.user._id);
                        console.log(result.user._id);
                    } catch (error) {
                        console.log(error)
                    }
                })
                .catch(error => {
                    console.log('error', error)
                });
            dispatch({ type: 'LOGIN', token: userToken })
        },

        signOut: async () => {
            try {
                await AsyncStorage.removeItem('AccessToken')
                await AsyncStorage.removeItem('UserId')
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' })
        },

        register: () => {
            console.log('Chua thực hiện phần register');
            dispatch({ type: 'REGISTER', token: 'firsttimetoken' })
        },

        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        },

        messNoficationCount: MESS_NOFICATION_COUNT,
    }), []);

    const MyDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            text: '#000',
            primary: '#64868E',
            secondary: '#98B4A6',
            background: '#ffffff',
            grayText: '#333',
            error: '#f53e2d'
        }
    }
    const MyDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            primary: '#98B4A6',
            // secondary: '#64868E',
            text: '#fff',
            grayText: '#ccc',
            error: '#f53e2d'
        }
    }

    const dispatch = useDispatch();
    const isDarkTheme = useSelector(state => state.theme);
    const { token, user } = useSelector(state => state.auth);

    useEffect(() => {
        let userToken;
        userToken = null;
        let userStringify = null;
        setTimeout(async () => {
            try {
                userToken = await AsyncStorage.getItem('AccessToken');
                userStringify = await AsyncStorage.getItem('User');

                dispatch(retrieveAuth(JSON.parse(userStringify), userToken));
            } catch (e) {
                console.log(e);
            }
        }, 1000)
    }, [])

    useEffect(() => {
        if (user) {
            try {
                dispatch(getConversationsByUserId(user._id, token));
            } catch (error) {
                console.log(error);
            }
            console.log('Root: da co user', user);
        }
        else{
            console.log('Root: user null');
        }
    }, [token, user, dispatch])

    const theme = isDarkTheme ? MyDarkTheme : MyDefaultTheme;
    const isLoading = useSelector(state => state.alert.loading);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='gray' />
            </View>
        )
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <StatusBar barStyle='light-content' />
                {token == null ?
                    (<RootAuthenication />) :
                    (<RootNavigation />)
                }
            </NavigationContainer>
        </PaperProvider>
    )
}

export default Root
