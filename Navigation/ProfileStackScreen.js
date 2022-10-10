import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../Pages/Product/ProductDetails";
import ToCart from "./components/ToCart";
import ToBack from "./components/ToBack";
import HomeLogo from "../assets/HomeLogo";
import MyPage from "../Pages/MyPage/MyPage";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration";
import { AuthContext } from "../App";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import lang from "../lang.json";
import Notifications from "../Pages/MyPage/components/Notifications/Notifications";
import Orders from "../Pages/MyPage/components/Orders/Orders";
import EditUserInfo from "../Pages/MyPage/components/EditUserInfo";
import Addresses from "../Pages/MyPage/components/Addresses/Addresses";
import EditAddress from "../Components/Address/EditAddress";
import AddNewAddress from "../Components/Address/AddNewAddress";
import EditPassword from "../Pages/MyPage/components/EditPassword";
import OrderDetails from "../Pages/MyPage/components/Orders/OrderDetails";
import BonusCard from "../Pages/MyPage/components/BonusCard";
import PhoneVerification from "../Pages/Authentication/ForgotPassword/PhoneVerification";
import CodeVerification from "../Pages/Authentication/ForgotPassword/CodeVerification";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import TermOfUse from "../Pages/Authentication/TermOfUse";
import ShippingReturns from "../Pages/Authentication/ShippingReturns";
import PrivacyPolicy from "../Pages/Authentication/PrivacyPolicy";
import RegistrationSuccess from "../Pages/Authentication/RegistrationSuccess";
import SignUpCodeVerification from "../Pages/Authentication/SignUpCodeVerification";
import LoginCodeVerification from "../Pages/Authentication/Login/LoginCodeVerification";
import Checkout from "../Pages/ShoppingCart/Checkout";
import OrderProcessing from "../Pages/ShoppingCart/components/OrderProcessing";
import OrderCompleted from "../Pages/ShoppingCart/components/OrderCompleted";
import OrderFailed from "../Pages/ShoppingCart/components/OrderFailed";
import AccountDeletion from "../Pages/MyPage/components/AccountDeletion";

const ProfileStack = createStackNavigator();


export default function ProfileStackScreen({ route, navigation }) {
  const appContext = React.useContext(AuthContext);

  return (
    <ProfileStack.Navigator>
      {appContext.state.userToken == null ? (
        <> 
         <ProfileStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="SignUpCodeVerification"
          component={SignUpCodeVerification}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="RegistrationSuccess"
          component={RegistrationSuccess}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="PhoneVerification"
          component={PhoneVerification}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="CodeVerification"
          component={CodeVerification}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="LoginCodeVerification"
          component={LoginCodeVerification}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
         <ProfileStack.Screen
          name="TermOfUse"
          component={TermOfUse}

          options={({ route }) => ({
            title: lang[`${appContext.state.lang}`].headerTitles.termOfUse,

            headerShown: true,
            // headerRight: () => <ToCart />,
            headerLeft: () => <ToBack />,
          })}

        />
         <ProfileStack.Screen
          name="ShippingReturns"
          component={ShippingReturns}

          options={({ route }) => ({
            title: lang[`${appContext.state.lang}`].headerTitles.shippingReturns,

            headerShown: true,
            // headerRight: () => <ToCart />,
            headerLeft: () => <ToBack />,
          })}

        />
         <ProfileStack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}

          options={({ route }) => ({
            title: lang[`${appContext.state.lang}`].headerTitles.privacyPolicy,

            headerShown: true,
            // headerRight: () => <ToCart />,
            headerLeft: () => <ToBack />,
          })}

        />

        </>
      
      ) : (
        <>
          <ProfileStack.Screen
            name="MyProfile"
            component={MyPage}
            

            options={({ route }) => ({
              title: false,
              headerShown: true,
              headerRight: () => <ToCart />,
              title: "Իմ էջը",
              // headerBackground: () => <HomeLogo />,
              // headerBackgroundContainerStyle: {
              //   flexDirection: "row",
              //   justifyContent: "center",
              //   alignItems: "flex-end",
              // },
            })}
          />
          <ProfileStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <ProfileStack.Screen
            name="Notifications"
            component={Notifications}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title:"Notifications",

              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <ProfileStack.Screen
            name="Orders"
            component={Orders}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title:"Orders",

              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <ProfileStack.Screen
            name="EditUserInfo"
            component={EditUserInfo}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title:"EditUserInfo",

              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <ProfileStack.Screen
            name="Addresses"
            component={Addresses}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title:"Addresses",

              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
             <ProfileStack.Screen
            name="EditAddress"
            component={EditAddress}
            options={({ route }) => ({
              title: "Փոխել Առաքման Հասցեն",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
             <ProfileStack.Screen
            name="AddNewAddress"
            component={AddNewAddress}
            options={({ route }) => ({
              title: "Add new address",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
             <ProfileStack.Screen
            name="EditPassword"
            component={EditPassword}
            options={({ route }) => ({
              title: "Edit password",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
             <ProfileStack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={({ route }) => ({
              title: "Order Details",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
             <ProfileStack.Screen
            name="BonusCard"
            component={BonusCard}
            options={({ route }) => ({
              title: "Bonus Card",
              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

<ProfileStack.Screen
            name="OrderFailed"
            component={OrderFailed}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: ()=> null,
              headerTitleStyle: { alignSelf: 'center' },
            })}
          />


<ProfileStack.Screen
            name="OrderProcessing"
            component={OrderProcessing}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <ProfileStack.Screen
            name="OrderCompleted"
            component={OrderCompleted}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: ()=> null,
              headerTitleStyle: { alignSelf: 'center' },
            })}
          />


<ProfileStack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={({ route }) => ({
              title: false,
              headerBackground: () => <HomeLogo />,
              headerBackgroundContainerStyle: {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
              },
              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <ProfileStack.Screen
            name="Checkout"
            component={Checkout}
            options={({ route }) => ({
              title: "Իմ Զամբյուղը",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <ProfileStack.Screen
            name="AccountDeletion"
            component={AccountDeletion}
            options={({ route }) => ({
              title: "AccountDeletion",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          
        </>
      )}
    </ProfileStack.Navigator>
  );
}
