import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Category from "../Pages/Categories/components/Category";
import ProductDetails from "../Pages/Product/ProductDetails";
import ToCart from "./components/ToCart";
import ToBack from "./components/ToBack";
import HomeLogo from "../assets/HomeLogo";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import lang from "../lang.json";
import { AuthContext } from "../App";
import More from "../Pages/More/More";
import Languages from "../Pages/More/components/Languages";
import Notifications from "../Pages/More/components/Notifications";
import Faq from "../Pages/More/components/Faq";
import ContactUs from "../Pages/More/components/ContactUs";
import PrivacyPolicy from "../Pages/Authentication/PrivacyPolicy";
import AboutUs from "../Pages/More/components/AboutUs";
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
import LoginCodeVerification from "../Pages/Authentication/Login/LoginCodeVerification";
import PhoneVerification from "../Pages/Authentication/ForgotPassword/PhoneVerification";
import CodeVerification from "../Pages/Authentication/ForgotPassword/CodeVerification";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import TermOfUse from "../Pages/Authentication/TermOfUse";
import ShippingReturns from "../Pages/Authentication/ShippingReturns";

const MoreStack = createStackNavigator();

export default function MoreStackScreen({ route }) {
  const appContext = React.useContext(AuthContext);

  return (
    <MoreStack.Navigator initialRouteName="More">
      {appContext.state.userToken == null ? (
        <React.Fragment>
          <MoreStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <MoreStack.Screen
            name="LoginCodeVerification"
            component={LoginCodeVerification}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="SignUpCodeVerification"
            component={SignUpCodeVerification}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="RegistrationSuccess"
            component={RegistrationSuccess}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="PhoneVerification"
            component={PhoneVerification}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ headerShown: false }}
          />

          <MoreStack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <MoreStack.Screen
            name="TermOfUse"
            component={TermOfUse}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.termOfUse,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
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

          <MoreStack.Screen
            name="More"
            component={More}
            options={{
              //   title: "Նախընտրելի",
              //   tabBarLabel: "Նախընտրելի",
              // headerShown: false,
              headerRight: () => <ToCart />,
              headerTitleAlign: "center",
              // headerLeft: () => <ToBack />,
            }}
          />
          <MoreStack.Screen
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
          <MoreStack.Screen
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
          <MoreStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Languages"
            component={Languages}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Languages",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Notifications"
            component={Notifications}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Notifications",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="FAQ"
            component={Faq}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "FAQ",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Contactus"
            component={ContactUs}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Contact Us",
              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <MoreStack.Screen
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
          <MoreStack.Screen
            name="AboutUs"
            component={AboutUs}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.aboutUs,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MoreStack.Screen
            name="More"
            component={More}
            options={{
              //   title: "Նախընտրելի",
              //   tabBarLabel: "Նախընտրելի",
              // headerShown: false,
              headerRight: () => <ToCart />,
              headerTitleAlign: "center",
              // headerLeft: () => <ToBack />,
            }}
          />
          <MoreStack.Screen
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
          <MoreStack.Screen
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
          <MoreStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Languages"
            component={Languages}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Languages",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Notifications"
            component={Notifications}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Notifications",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="FAQ"
            component={Faq}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "FAQ",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="Contactus"
            component={ContactUs}
            options={({ route }) => ({
              // title: lang[`${appContext.state.lang}`].headerTitles.shoppingCart,
              title: "Contact Us",
              headerShown: true,
              headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <MoreStack.Screen
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
          <MoreStack.Screen
            name="AboutUs"
            component={AboutUs}
            options={({ route }) => ({
              title: lang[`${appContext.state.lang}`].headerTitles.aboutUs,

              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />

          <MoreStack.Screen
            name="Checkout"
            component={Checkout}
            options={({ route }) => ({
              title: "Իմ Զամբյուղը",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="AddNewAddress"
            component={AddNewAddress}
            options={({ route }) => ({
              title: "Ավելացնել նոր հասցե",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="EditAddress"
            component={EditAddress}
            options={({ route }) => ({
              title: "Փոխել Առաքման Հասցեն",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
            name="OrderProcessing"
            component={OrderProcessing}
            options={({ route }) => ({
              title: "Պատվերի Ձևակերպում",
              headerShown: true,
              // headerRight: () => <ToCart />,
              headerLeft: () => <ToBack />,
            })}
          />
          <MoreStack.Screen
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

          <MoreStack.Screen
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
    </MoreStack.Navigator>
  );
}
