import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "../assets/HomeIcon";
import CategoryIcon from "../assets/CategoryIcon";
import FavoritesIcon from "../assets/FavoritesIcon";
import ProfileIcon from "../assets/ProfileIcon";
import MoreIcon from "../assets/MoreIcon";
import ToCart from "./components/ToCart";
import CategoriesStackScreen from "./CategoriesStackScreen";
import HomeStackScreen from "./HomeStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import FavoritesStackScreen from "./FavoritesStackScreen";
import lang from "../lang.json";
import { AuthContext } from "../App";
import MoreStackScreen from "./MoreStackScreen";


const Tab = createBottomTabNavigator();

export default function UserNavigate({ navigation, route }) {
  const forLanguage = React.useContext(AuthContext);


  return (

    <Tab.Navigator
      initialRouteName={"HomeStackScreen"}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#F04A38",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          // position: 'absolute',
          // borderTopColor: 'rgba(0, 0, 0, .2)',
          // height: 60,
          // top:2
          },
       
      })}
      tabBarOptions={{
        showIcon: true,
        // , showLabel: false
        // style: {
        //   height: 65,
        //   padding:50
        // },
        tabStyle: {
          height: 50,
          backgroundColor: '#fff',
          padding:8
        },
      }}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => <HomeIcon active={tabInfo.focused} />,
          title: lang[`${forLanguage.state.lang}`].barTitles.home,
        }}
      />
      <Tab.Screen
        name="CategoriesStackScreen"
        component={CategoriesStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => <CategoryIcon active={tabInfo.focused} />,
          headerRight: () => <ToCart />,
          title: lang[`${forLanguage.state.lang}`].barTitles.categories,
          style: {
            padding: 500,
          }
          // showLabel: false,
          // showIcon: true,
        }}
      />
      <Tab.Screen
        name="FavoritesStackScreen"
        component={FavoritesStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => <FavoritesIcon active={tabInfo.focused} />,
          title: lang[`${forLanguage.state.lang}`].barTitles.favorites,
        }}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => <ProfileIcon active={tabInfo.focused} />,
          title: lang[`${forLanguage.state.lang}`].barTitles.profile,
        }}
      />
      <Tab.Screen
        name="MoreStackScreen"
        component={MoreStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => <MoreIcon active={tabInfo.focused} />,
          title: lang[`${forLanguage.state.lang}`].barTitles.more,
        }}
      />
    </Tab.Navigator>
  
  );
}
