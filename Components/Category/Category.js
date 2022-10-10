import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import React, { useState } from "react";

export default function Category({ item, onHomeScreen = false }) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={onHomeScreen ? styles.homeMenuWrapper : styles.menuItemWrapper}
        onPress={() => {
          navigation.navigate({
            name: "Category",
            params: {
              id: item.Id,
              title: item.Name,
              onHomeScreen: onHomeScreen,
            },
          });
        }}
      >
        <View
          style={[
            styles.menuItem,
            {
              backgroundColor: `${item.Color}`,
              height: onHomeScreen ? 79 : 121,
            },
          ]}
        >
          <SvgUri
            width={onHomeScreen ? 30 : 40}
            height={onHomeScreen ? 27 : 36}
            uri={item.IconUrl.replace("http://", "https://")}
            
          />

          {/* <ImageBackground
          style={{
            width: onHomeScreen ? 30 : 40,
            height: onHomeScreen ? 27 : 36,
          }}
          source={{ uri: item.IconUrl }}
        /> */}
          <Text style={styles.menuItemTitle}>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  homeMenuWrapper: {
    flex: 1 / 2,
    flexDirection: "row",
  },
  menuItemWrapper: {
    width: "50%",
  },
  menuItem: {
    width: "98%",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    alignItems: "center",
    marginBottom: 10,
  },
  menuItemTitle: {
    color: "#ffffff",
    lineHeight: 15,
    fontSize: 12,
  },
});
