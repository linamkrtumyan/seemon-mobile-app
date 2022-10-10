import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserNavigate from './Navigation/UserNavigate';
// import { Alert, Linking, BackHandler} from 'react-native';
import {LogBox, Alert, Linking, BackHandler} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import request from './request';
import Loading from './Pages/Authentication/Loading';
import 'react-native-gesture-handler';
import {getDeviceId} from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VersionCheck from 'react-native-version-check';
export const AuthContext = React.createContext();
// import SplashScreen from 'react-native-splash-screen';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function App() {


  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  useEffect(() => {
    getFCMToken();
  }, []);

  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    const latestVersion = await VersionCheck.getLatestVersion();
    const currentVersion = VersionCheck.getCurrentVersion();

    let updateNeeded = await VersionCheck.needUpdate();

    request(`/api-frontend/Common/CheckVersion?version=${currentVersion}`)
      .then(({data, headerData}) => {
        if (data) {
          Alert.alert(
            'Please Update',
            'You will have to update your app to latest version to continue using.',
            [
              {
                text: 'Update',
                onPress: () => {
                  BackHandler.exitApp();
                  Linking.openURL(updateNeeded.storeUrl);
                },
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(e => console.log(e, 'error CheckVersion'));
  };

  const addOrUpdateCustomerDeviceToken = token => {
    request(`/api-frontend/Customer/AddOrUpdateCustomerDeviceToken`, 'POST', {
      DeviceToken: token,
      DeviceUniqueId: getDeviceId(),
    })
      .then(data => {})
      .catch(e => {
        console.log(e, 'AddOrUpdateCustomerDeviceToken error');
      });
  };

  const getFCMToken = async () => {
    const enabled = await firebase.messaging().hasPermission();
    let fcmToken;
    if (enabled) {
      // if not generate one on firebase and set on database and local storage
      fcmToken = await messaging().getToken();
    } else {
      firebase.messaging().requestPermission();
    }
    addOrUpdateCustomerDeviceToken(fcmToken);
  };

  LogBox.ignoreAllLogs();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userMessage: action.message,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action?.token ?? null,
            isLoading: false,
            userMessage: action.message,
            cartItemCount: action.shoppingCartItemsCount,
            guestToken: action?.guestToken ?? null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action?.token ?? null,
            isLoading: false,
            guestToken: action?.guestToken ?? null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            cartItemCount: null,
          };
        case 'CART_ITEM_COUNT':
          return {
            ...prevState,
            cartItemCount: action.cartItemCount,
          };
        case 'SET_LANGUAGE':
          return {
            ...prevState,
            lang: action.language,
            isLoading: action.loading,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userMessage: '',
      cartItemCount: null,
      lang: null,
      guestToken: null,
    },
  );

  const guestToken = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        is_guest: true,
        username: '',
        email: '',
        password: '',
      }),
    };
    var h;
    fetch(
      // "http://192.168.1.40:59436/api-frontend/Authenticate/GetToken",
      'https://dev.seemon.am/api-frontend/Authenticate/GetToken',
      requestOptions,
    )
      .then(response => {
        var headers = response.headers.get('set-cookie');
        const guestToken = headers?.split(',')[2].split(';')[0].split('=')[1];
        h = guestToken;

        return response.json();
      })
      .then(json => {
        if (json.token) {
          AsyncStorage.setItem('guestToken', h),
            AsyncStorage.setItem(
              'cartItemCount',
              json.shopping_cart_items_count.toString(),
            );

          dispatch({
            type: 'SIGN_IN',
            guestToken: h,
            shoppingCartItemsCount: json.shopping_cart_items_count,
          });
        } else {
          AsyncStorage.setItem('token', null),
            dispatch({
              type: 'SIGN_IN',
              token: null,
              message: json.message,
            });
        }
      })
      .catch(error => console.error(error));
  };

  const localization = async () => {
    let lang;
    let deviceLang = RNLocalize.getLocales().shift()?.languageCode;

    try {
      lang = await AsyncStorage.getItem('language');

      if (lang == null) {
        switch (deviceLang) {
          case 'en':
            AsyncStorage.setItem('language', 'eng');

            lang = 'eng';
            break;
          case 'hy':
            AsyncStorage.setItem('language', 'arm');
            lang = 'arm';

            break;
          case 'ru':
            AsyncStorage.setItem('language', 'ru');
            lang = 'ru';

            break;

          default:
            AsyncStorage.setItem('language', 'arm');

            lang = 'arm';
        }

        // AsyncStorage.setItem("language", "eng");
      }
    } catch (e) {
      console.log(e, 'error');
      userMessage = 'something goes wrong';
      lang = 'arm';
      AsyncStorage.setItem('language', 'arm');
    }
    dispatch({
      type: 'SET_LANGUAGE',
      language: lang,
      loading: false,
    });
    switch (lang) {
      case 'eng':
        request('/api-frontend/Common/SetLanguage/1', 'POST').catch();
        break;
      case 'arm':
        request('/api-frontend/Common/SetLanguage/2', 'POST').catch();
        break;
      case 'ru':
        request('/api-frontend/Common/SetLanguage/3', 'POST').catch();
        break;
      default:
        request('/api-frontend/Common/SetLanguage/3', 'POST').catch();
    }
  };

  useEffect(() => {
    localization();
  }, [state.lang]);

  // useEffect(() => {
  //   request("/api-frontend/Customer/Info")
  //   .then((data) => {
  //       })
  //       .catch((e) => {});
  // },[])

  const bootstrapAsync = async () => {
    let userToken;
    let userMessage;
    var cartCount;

    try {
      // Restore token stored in `SecureStore` or any other encrypted storage
      userToken = await AsyncStorage.getItem('token');
    } catch (e) {
      // Restoring token failed
      userMessage = 'something goes wrong';
    }
    dispatch({
      type: 'RESTORE_TOKEN',
      token: userToken,
      message: userMessage,
    });

    try {
      cartCount = await AsyncStorage.getItem('cartItemCount');
    } catch (e) {
      console.log(e, 'errorik');
    }
    dispatch({
      type: 'CART_ITEM_COUNT',
      cartItemCount: cartCount,
    });
  };

  React.useEffect(async () => {
    let token = await AsyncStorage.getItem('token');

    if (!token) {
      guestToken();
    } else {
      bootstrapAsync();
    }
    // localization();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: data1 => {
        request('/api-frontend/Authenticate/GetToken', 'POST', {
          is_guest: false,
          username: '',
          email: '',
          password: '',
          phone_number: data1.username,
          verification_code: data1.code,
        })
          .then(({data, headerData}) => {
            if (data.token) {
              let headers = headerData.get('set-cookie');
              let authToken = headers.split(',')[4].split(';')[0].split('=')[1];
              AsyncStorage.setItem('authToken', String(authToken));
              AsyncStorage.setItem('token', String(data.token)),
                AsyncStorage.setItem(
                  'cartItemCount',
                  String(data.shopping_cart_items_count),
                );

              dispatch({
                type: 'SIGN_IN',
                token: data.token,
                shoppingCartItemsCount: data.shopping_cart_items_count,
              });
            } else {
              AsyncStorage.removeItem('token');

              dispatch({
                type: 'SIGN_IN',
                token: null,
                message: data.ErrorMessage,
              });
            }
          })
          .catch(e => {
            console.log(e, 'log out error');
          });
      },
      signOut: () => {
        request(`/api-frontend/Customer/Logout`)
          .then(({data, headerData}) => {
            if (data.Succcess) {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('authToken');
              AsyncStorage.removeItem('cartItemCount');
              AsyncStorage.removeItem('guestToken');
              dispatch({type: 'SIGN_OUT'});
            }
          })
          .catch(e => {
            console.log(e, 'log out error');
          });
      },
      signUp: async data => {
        dispatch({
          type: 'SIGN_UP',
          token: data,
        });
      },
      setCartItemCount: count =>
        dispatch({type: 'CART_ITEM_COUNT', cartItemCount: count}),
      setLanguage: lang =>
        dispatch({type: 'SET_LANGUAGE', language: lang, loading: true}),
    }),
    [],
  );

  const providerValue = {
    state,
    authContext,
  };
  if (state.isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ToastProvider
        placement="bottom"
        duration={5000}
        animationType="slide-in"
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="#8F8F8F"
        offsetBottom={80}
        swipeEnabled={true}>
        <AuthContext.Provider value={providerValue}>
          <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
              <UserNavigate />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </ToastProvider>
    </>
  );
}
