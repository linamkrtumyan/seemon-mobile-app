import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import request from "../../request";
import SearchCrossIcon from "../../assets/SearchCrossIcon";
import lang from "../../lang.json";
import { AuthContext } from "../../App";

export default function SearchInput({
  searchText = "",
  children,
  withFilter = false,
  onHome = false,
}) {
  const navigation = useNavigation();
  const forLanguage = React.useContext(AuthContext);

  var search = require("../../assets/search.png");
  const [modalVisible, setModalVisible] = useState(false);

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchLabel, setSearchLabel] = useState("");

  useEffect(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      setSearchValue(searchText);
    } 
  }, [searchText]);

  const toSearch =  (search) => {
      navigation.navigate({
        name: "Category",
        params: {
          name: search,
          onHomeScreen: onHome,
        },
      });

    setModalVisible(false);
  };


  useEffect(() => {
    if (
      searchValue.replace(/ /g, "").length > 2 &&
      searchValue !== searchText
    ) {
      const fetchData = async () => {
        request(
          `/api-frontend/Catalog/SearchTermAutoComplete?term=${searchValue}`
        )
          .then(({data, headerData}) => {
            setResult(data);
            setModalVisible(true);
            // searchValue("")
          })
          .catch((e) => {});
      };
      fetchData();
    } else {
      setResult([]);
      setModalVisible(false);
    }
  }, [searchValue]);

  //   if (isLoading) {
  //     return <Loading />;
  //   } else {
  return (
    <>
      <View
        style={{ position: "static", width: "100%" }}
        // style={{ position: withFilter ? "absolute" : "static", width: "100%" }}
      >
        <View
          style={{
            width: withFilter ? "70%" : "90%",
            marginHorizontal: "5%",
            paddingBottom: 5,
          }}
        >
          <TextInput  placeholderTextColor="#8F8F8F"

            // style={{ flex: 1 }}
            value={searchValue}
            style={
              result.length > 0
                ? styles.input
                : [styles.input, styles.inputRadius]
            }
            placeholder={lang[`${forLanguage.state.lang}`].search.placeholder}
            onChangeText={setSearchValue}
            returnKeyType={"done"}
            onSubmitEditing={() => searchValue.length > 0 ? toSearch(searchValue) : null}
            multiline={false}
          />
          <TouchableOpacity
            disabled={!searchValue}
            onPress={() => toSearch(searchValue)}
            style={styles.imageStyle}
          >
            <Image source={search} />
          </TouchableOpacity>
          {searchValue ? (
            // <ScrollWiew>
            <TouchableOpacity
              onPress={() => {
                // Keyboard.dismiss()
                setSearchValue("");
              }}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={styles.closeImageStyle}
            >
              <SearchCrossIcon />
            </TouchableOpacity>
          ) : // </ScrollWiew>

          null}
        </View>

        {children}
        {result.length > 0 && modalVisible ? (
          <View
            style={{
              position: "absolute",
              width: withFilter ? "80%" : "90%",
              // flex: 1,
              height: "100%",
              marginLeft: "5%",
              // top:20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={[styles.centeredView]}
            >
              <TouchableOpacity style={styles.modalView}>
                <FlatList
                  style={styles.menuItemContainer}
                  data={result}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestedItem}
                      onPress={() => {
                        setSearchLabel(item.label);
                        toSearch(item.label);
                      }}
                    >
                      <Text style={{color:"#000"}} > {item.label} </Text>
                    </TouchableOpacity>
                  )}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}
// }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    top: 75, // work on ios
    maxHeight: 128,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: "#A5DACF",
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  imageStyle: {
    position: "absolute",
    left: 11,
    top: "45%",
  },
  closeImageStyle: {
    position: "absolute",
    right: 15,
    top: "60%",
    // zIndex:9999,
    // flexGrow:1
  },
  input: { color: "#000",
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 48,
    // flex:1,
    paddingLeft: 40,
    marginTop: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingRight: 30,
    // marginLeft:"5%"
  },
  inputRadius: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },

  suggestedItem: {
    height: 40,
  },
});
