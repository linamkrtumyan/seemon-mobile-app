import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import LogoutIcon from "../../assets/LogoutIcon";
import ProfileAddressIcon from "../../assets/ProfileAddressIcon";
import ProfileBonusIcon from "../../assets/ProfileBonusIcon";
import ProfileEditIcon from "../../assets/ProfileEditIcon";
import ProfileNavigationArrowIcon from "../../assets/ProfileNavigationArrowIcon";
import ProfileNotificationIcon from "../../assets/ProfileNotificationIcon";
import ProfileOrderIcon from "../../assets/ProfileOrderIcon";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../App";
import Loading from "../Authentication/Loading";
import request from "../../request";
import ProfileEmptyAvatar from "../../assets/ProfileEmptyAvatar";
import lang from "../../lang.json";
import AccountDeletion from "./components/AccountDeletion"



export default function MyPage() {
  const appContext = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

  const [image, setImage] = useState(null);



  const fetchAvatar = async () => {
    request("/api-frontend/Customer/Avatar")
      .then(({ data, headerData }) => {
        console.log(data.avatar_url,"data.avatar_url //////////--------------")
        setAvatar(data.avatar_url);
        setIsLoadingAvatar(false);
      })
      .catch((e) => console.log(e, "get avatar error"));
  };



  const fetchCustomerInfo = () => {
    request("/api-frontend/Customer/Info")
      .then(({ data, headerData }) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone);
        setIsLoading(false);
      })
      .catch((e) => console.log(e, "customer info error"));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCustomerInfo();
      fetchAvatar();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    fetchCustomerInfo();
    fetchAvatar();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              fetchCustomerInfo();
              fetchAvatar();
            }}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.userDataContainer}>
            <View style={styles.userAvatarContainer}>
           

              {/* {!isLoadingAvatar ? ( */}
                <>
                  {avatar ? (
                    <View
                      style={styles.avatarContainer}
                    >
                      <View style={styles.elevationLow}>
                        <ImageBackground
                          style={{
                            width: 64,
                            height: 64,
                          }}
                          imageStyle={{ borderRadius: 20 }}
                          source={{ uri: avatar.replace(
                            'http://',
                            'https://',
                          ), }}
                        />
                      </View>
                    </View>
                  ) : (
                    <ProfileEmptyAvatar />
                    // null
                  )}
                </>
              {/* ) : (
                <ActivityIndicator color="#F04A38" />
              )} */}
            </View>
            <View style={styles.userInfoContainer}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userNameText}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => navigation.navigate("EditUserInfo")}
                >
                  <ProfileEditIcon />
                </TouchableOpacity>
              </View>

              <Text style={{color:"#000"}} >{phoneNumber}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.profileNavigationItem}
            onPress={() => navigation.navigate("Addresses")}
          >
            <View style={styles.profileNavigationTextSide}>
              <ProfileAddressIcon />
              <Text style={styles.profileNavigationTitle}>
                {lang[appContext.state.lang].profile.addresses}
              </Text>
            </View>
            <ProfileNavigationArrowIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileNavigationItem}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View style={styles.profileNavigationTextSide}>
              <ProfileNotificationIcon />
              <Text style={styles.profileNavigationTitle}>
                {lang[appContext.state.lang].profile.notifications}
              </Text>
            </View>
            <ProfileNavigationArrowIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileNavigationItem}
            onPress={() => navigation.navigate("Orders")}
          >
            <View style={styles.profileNavigationTextSide}>
              <ProfileOrderIcon />
              <Text style={styles.profileNavigationTitle}>
                {lang[appContext.state.lang].profile.orders}
              </Text>
            </View>
            <ProfileNavigationArrowIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileNavigationItem}
            onPress={() => navigation.navigate("BonusCard")}
          >
            <View style={styles.profileNavigationTextSide}>
              <ProfileBonusIcon />
              <Text style={styles.profileNavigationTitle}>
                {lang[appContext.state.lang].profile.bonusCard}
              </Text>
            </View>
            <ProfileNavigationArrowIcon />
          </TouchableOpacity>
          <View 
          style={styles.profileNavigationItem} 
          //  onPress={() => navigation.navigate("AccountDeletion")}
          >
            <View 
            style={styles.profileNavigationTextSide}
            >
             
              <AccountDeletion/>
              
            </View>
            <ProfileNavigationArrowIcon />
          </View>
          {/* <TouchableOpacity
            style={styles.profileNavigationItem}
            onPress={() => navigation.navigate("EditPassword")}
          >
            <View style={styles.profileNavigationTextSide}>
              <ProfileChangePasswordIcon />
              <Text style={styles.profileNavigationTitle}>
                Փոխել գաղտնաբառը
              </Text>
            </View>
            <ProfileNavigationArrowIcon />
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => appContext.authContext.signOut()}
        >
          <LogoutIcon />
          <Text style={styles.nextButtonText}>
            {lang[appContext.state.lang].button.signOut}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
    marginTop: 12,
  },
  userDataContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: "#E2E2E2",
  },
  userNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userNameText: {
    fontSize: 16,
    marginRight: 10,
    color:"#000"
  },
  userAvatarContainer: {
    // background: "#FFFFFF",
    // boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderColor: "#fff",
    // opacity:0.3,
    borderWidth: 1,
    borderRadius: 20,
  },
  userInfoContainer: {
    marginLeft: 17,
  },
  profileNavigationItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  profileNavigationTextSide: {
    flex: 1,
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "flex-start",
    width:"100%"

  },
  profileNavigationTitle: {
    fontSize: 14,
    marginLeft: 12,
    color:"#000"
  },
  actionsContainer: {
    paddingHorizontal: "5%",
    backgroundColor: "transparent",
    height: 60,
  },
  nextButton: {
    width: "100%",
    // padding: 10,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // height:40
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    // padding:10
  },

  avatarContainer: {
    position: "relative",
  },
  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: "#00000040",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        // shadowColor: 'black',
        // shadowOpacity: 0.8,
        // shadowOffset: { width: 8, height: 8},
        // shadowRadius: 20,
        // elevation: 20,
        // backgroundColor: 'black',
        // outlineProvider: 'bounds'
      },
    }),

    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    width: "100%",
    height: "100%",
    // margin: 20,
    // paddingVertical: 40,
    // paddingHorizontal: 20, // alignItems: "center",
    backgroundColor: "#000",
    // width:64,
    // height:64,
    borderRadius: 20,
  },
});
