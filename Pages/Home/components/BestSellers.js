import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Product from "../../../Components/Product/Product";
import lang from "../../../lang.json";
import { AuthContext } from "../../../App";

export default function BestSellers({bestsellers}) {
  const forLanguage = React.useContext(AuthContext);



  // if (isLoading) {
  //   return <Loading />;
  // } else {
    return (
      <View>
        <Text style={[styles.menuTitle, styles.menuTitleForMargin]}>
          {lang[`${forLanguage.state.lang}`].homePage.bestsellers}
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent:"space-between" }}>
        {
          bestsellers?.map((bestseller, index) => {
            return(
              <Product key={index} item={bestseller} onHomeScreen={true} />
            )
          })
        }
            </View>

       
        
      </View>
    );
  }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 18,
    lineHeight: 22,
    color:"#000"

  },
  menuTitleForMargin: {
    marginBottom: 17,
  },
});
