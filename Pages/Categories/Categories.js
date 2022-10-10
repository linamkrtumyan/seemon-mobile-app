import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Loading from "../Authentication/Loading";
import request from "../../request";
import Category from "../../Components/Category/Category";
import SearchInput from "../../Components/Search/SearchInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Categories({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = () => {
    request(
      `/api-frontend/Catalog/GetCategoriesDisplayedOnHomePage?pageIndex=0&pageSize=300&storeId=0&showHidden=false`
    )
      .then(({ data, headerData }) => {
        console.log(data,"catrgories data res***")
        setFruits(data.Categories);
        setIsLoading(false);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.wrapper}>
        <SearchInput>
          <View>
            {/* <View style={{ height: screenHeight - 230, width: screenWidth }}> */}
              <KeyboardAwareScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    flex: 1,
                    justifyContent: "space-between",
                    paddingHorizontal: "6%",
                    marginTop: 20,
                  }}
                >
                  {fruits?.map((fruit, index) => {
                    return <Category key={index} item={fruit} />;
                  })}
                </View>
              </KeyboardAwareScrollView>

            {/* </View> */}
          </View>
        </SearchInput>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // width: "90%",
    // marginLeft: "5%",
    // marginHorizontal:"5%",
    // marginBottom: 130,
    // flex:1
    height: "100%",
  },
  categoriesContainer: {
    marginTop: 20,
  },
});
