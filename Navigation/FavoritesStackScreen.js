import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../Pages/Categories/Categories";
import Category from "../Pages/Categories/components/Category";
import ProductDetails from "../Pages/Product/ProductDetails";
import ToCart from "./components/ToCart";
import ToBack from "./components/ToBack";
import HomeLogo from "../assets/HomeLogo";
import Favorites from "../Pages/Favorites/Favorites";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import lang from "../lang.json";
import { AuthContext } from "../App";
import LoginCodeVerification from "../Pages/Authentication/Login/LoginCodeVerification";
import PhoneVerification from "../Pages/Authentication/ForgotPassword/PhoneVerification";
import CodeVerification from "../Pages/Authentication/ForgotPassword/CodeVerification";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import TermOfUse from "../Pages/Authentication/TermOfUse";
import ShippingReturns from "../Pages/Authentication/ShippingReturns";
import PrivacyPolicy from "../Pages/Authentication/PrivacyPolicy";
import RegistrationSuccess from "../Pages/Authentication/RegistrationSuccess";
import SignUpCodeVerification from "../Pages/Authentication/SignUpCodeVerification";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login/Login";
import Checkout from "../Pages/ShoppingCart/Checkout";
import OrderProcessing from "../Pages/ShoppingCart/components/OrderProcessing";
import AddNewAddress from "../Components/Address/AddNewAddress";
import EditAddress from "../Components/Address/EditAddress";
import OrderCompleted from "../Pages/ShoppingCart/components/OrderCompleted";
import OrderFailed from "../Pages/ShoppingCart/components/OrderFailed";

const FavoritesStack = createStackNavigator();

export default function FavoritesStackScreen({ route }) {
  const appContext = React.useContext(AuthContext);

  return (
    <FavoritesStack.Navigator initialRouteName="Favorites">
      {appContext.state.userToken == null ? (
        <React.Fragment>
          <FavoritesStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <FavoritesStack.Screen
            name="LoginCodeVerification"
            component={LoginCodeVerification}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="SignUpCodeVerification"
            component={SignUpCodeVerification}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="RegistrationSuccess"
            component={RegistrationSuccess}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="PhoneVerification"
            component={PhoneVerification}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ headerShown: false }}
          />

          <FavoritesStack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <FavoritesStack.Screen
            name="TermOfUse"
            component={TermOfUse}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.termOfUse,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="ShippingReturns"
            component={ShippingReturns}
            options={({ route }) => ({
              title:
                lang[`${appContext.state.lang}`].headerTitles.shippingReturns,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={({ route }) => ({
              title:
                lang[`${appContext.state.lang}`].headerTitles.privacyPolicy,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <FavoritesStack.Screen
            name="Favorites"
            component={Favorites}
            options={{
              title: lang[`${appContext.state.lang}`].headerTitles.favorites,
              tabBarLabel: "Նախընտրելի",
              headerShown: true,
              headerRight: () => <ToCart />,
              headerTitleAlign: "center",
              // headerLeft: () => <ToBack />,
            }}
          />
          <FavoritesStack.Screen
            name="Category"
            component={Category}
            options={({ route }) => ({
              title: route.params.title ?? false,
              headerBackground: () =>
                route.params.title ? false : <HomeLogo />,
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
          <FavoritesStack.Screen
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
          <FavoritesStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FavoritesStack.Screen
            name="Favorites"
            component={Favorites}
            options={{
              title: lang[`${appContext.state.lang}`].headerTitles.favorites,
              tabBarLabel: "Նախընտրելի",
              headerShown: true,
              headerRight: () => <ToCart />,
              headerTitleAlign: "center",
              // headerLeft: () => <ToBack />,
            }}
          />
          <FavoritesStack.Screen
            name="Category"
            component={Category}
            options={({ route }) => ({
              title: route.params.title ?? false,
              headerBackground: () =>
                route.params.title ? false : <HomeLogo />,
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
          <FavoritesStack.Screen
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
          <FavoritesStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <FavoritesStack.Screen
            name="Checkout"
            component={Checkout}
            options={({ route }) => ({
              title: "Իմ Զամբյուղը",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="AddNewAddress"
            component={AddNewAddress}
            options={({ route }) => ({
              title: "Ավելացնել նոր հասցե",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="EditAddress"
            component={EditAddress}
            options={({ route }) => ({
              title: "Փոխել Առաքման Հասցեն",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="OrderProcessing"
            component={OrderProcessing}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <FavoritesStack.Screen
            name="OrderCompleted"
            component={OrderCompleted}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />

          <FavoritesStack.Screen
            name="OrderFailed"
            component={OrderFailed}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => null,
              headerTitleStyle: { alignSelf: "center" },
            })}
          />
        </React.Fragment>
      )}
    </FavoritesStack.Navigator>
  );
}
