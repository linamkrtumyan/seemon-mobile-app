import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Category from "../../../Components/Category/Category";
import { useNavigation } from "@react-navigation/native";
import lang from "../../../lang.json";
import { AuthContext } from "../../../App";

export default function CategoriesSection({ categories }) {
  const forLanguage = React.useContext(AuthContext);

  const navigation = useNavigation();

  const [language, setLanguage] = useState(forLanguage.state.lang);

  return (
    <>
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>
          {lang[`${forLanguage.state.lang}`].homePage.categories}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CategoriesStackScreen", {
              name: "Categories",
            })
          }
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Text style={styles.allProduct}>
            {lang[`${forLanguage.state.lang}`].homePage.all}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {categories?.map((category, index) => {
          return <Category key={index} item={category} onHomeScreen={true} />;
        })}
      </View>
    </>
  );
  // }
}

const styles = StyleSheet.create({
  menuItemContainer: {
    flex: 1 / 3,
    marginBottom: 25,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 18,
    lineHeight: 22,
    color:"#000"
  },
  allProduct: {
    color: "#A5DACF",
    fontSize: 14,
    lineHeight: 17,
  },
});
