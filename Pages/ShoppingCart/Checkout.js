import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import request from "../../request";
import CarIcon from "../../assets/CarIcon";
import { RadioButton } from "react-native-paper";
import Loading from "../Authentication/Loading";
import AddAddressIcon from "../../assets/AddAddressIcon";
import DropDownPicker from "react-native-dropdown-picker";
import AddedProductCard from "./components/AddedProductCard";
import AddressCard from "../../Components/Address/AddressCard";
import { AuthContext } from "../../App";
import lang from "../../lang.json"

export default function Checkout({ route, navigation }) {
  const appContext = React.useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressCount, setAddressCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchItems = async () => {
    setIsLoading(true);
    request(`/api-frontend/ShoppingCart/Cart`)
      .then(({ data, headerData }) => {
        console.log(data,"shopcart data")
        let newArr = [];
        data.checkout_attributes[0].values?.map((obj) => {
          newArr.push({ label: obj.name, value: obj.id });
        });
        setItems(newArr);
        setData(data);
        setIsLoading(false);
      })
      .catch((e) => {});
  };

  const fetchAddresses = async () => {
    request(`/api-frontend/Checkout/ShippingAddress`)
      .then(({ data, headerData }) => {
        
        setAddresses(data.model.existing_addresses);
        setSelectedAddress(data.model.existing_addresses[0].id);
        setAddressCount(data.model.existing_addresses.length);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    fetchItems();
    fetchAddresses();
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [addressCount]);

  useEffect(() => {
    if (value) {
      request("/api-frontend/ShoppingCart/CheckoutAttributeChange", "POST", {
        checkout_attribute_1: `${value}`,
        checkout_attribute_3: 0,
        checkout_attribute_3_day: null,
        checkout_attribute_3_month: null,
        checkout_attribute_3_year: null,
      })
        .then(({ data, headerData }) => {
        })
        .catch((e) => {
          console.log(e, "error");
        });
    }
  }, [value]);

  useEffect(() => {
    if (selectedAddress) {
      request(`/api-frontend/Checkout/SelectShippingAddress/${selectedAddress}`)
        .then(({ data, headerData }) => {})
        .catch((e) => {});
    }
  }, [selectedAddress]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ScrollView style={styles.container}>
        {data?.items?.map((product, index) => {
          return (
            <View style={styles.menuItemContainer} key={index}>
              <AddedProductCard item={product}  />
            </View>
          );
        })}

        <View style={styles.titleWithIcon}>
          <CarIcon />
          <Text style={{color:"#000"}} > {lang[appContext.state.lang].shoppingCartPage.shippingAddress}</Text>
        </View>

        {addresses.length > 0 ? (
          <RadioButton.Group
            onValueChange={(value) => setSelectedAddress(value)}
            value={selectedAddress}
          >
            {addresses.map((address, index) => {
              return (
                <AddressCard
                  key={index}
                  item={address}
                  setAddressCount={setAddressCount}
                  addressCount={addressCount}
                />
              );
            })}
          </RadioButton.Group>
        ) : (
          <Text style={styles.hintMessage}> Please add a shipping address</Text>
        )}

        <TouchableOpacity
          style={styles.addNewAddress}
          onPress={() =>
            navigation.navigate({
              name: "AddNewAddress",
              // params: { products: shoppingCartProducts },
              params: {
                addressCount: addressCount,
                setAddressCount: setAddressCount,
              },
              merge: true,
            })
          }
        >
          <AddAddressIcon />
          <Text style={styles.addNewAddressTitle}>{lang[appContext.state.lang].button.addNewAddress}</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <Text style={styles.title}>{lang[appContext.state.lang].shoppingCartPage.deliveryTime}</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={lang[appContext.state.lang].shoppingCartPage.deliveryTimePlaceholder}
          placeholderStyle={{
            color: "#8F8F8F",
          }}
          listItemLabelStyle={{
            color: "#8F8F8F",
          }}
          selectedItemLabelStyle={{
            color: "#000000",
          }}
        />
        <View style={styles.line} />

        <View style={styles.priceContainer}>
          <Text style={styles.bonusText}>{lang[appContext.state.lang].shoppingCartPage.bonus}</Text>
          <Text style={styles.bonusText}>+ {data.will_earn_reward_points}</Text>
        </View>

        <View style={styles.dottedLine} />
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.cost}</Text>
          <Text style={styles.priceText}>{data.total_price}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.shipment}</Text>
          <Text style={styles.priceText}>{data.shipping_price}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.totalPrice}</Text>
          <Text style={styles.priceText}>{data.all_amount}</Text>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            value && addresses.length > 0
              ? styles.enableButton
              : styles.disableButton,
          ]}
          onPress={() =>
            navigation.navigate({
              name: "OrderProcessing",
            })
          }
          disabled={value && addresses.length > 0 ? false : true}
        >
          <Text style={styles.nextButtonText}>{lang[appContext.state.lang].button.orderProcessing}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,

    paddingHorizontal: "5%",
  },
  actionsContainer: {
    paddingHorizontal: "5%",
    position: "absolute",
    bottom: -10,
    width: "100%",
  },
  nextButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  emptyButton: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#8F8F8F",
  },
  emptyButtonText: {
    color: "#8F8F8F",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  titleWithIcon: {
    flexDirection: "row",
    marginTop: 24,
  },
  addNewAddress: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },
  addNewAddressTitle: {
    color: "#0B73EE",
    fontSize: 14,
    marginLeft: 8,
  },
  line: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    width: "100%",
    height: 1,
    marginVertical: 24,
  },
  dottedLine: {
    marginVertical: 24,
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#E2E2E2",
  },
  title: {
    fontSize: 16,
    marginBottom: 17,
    color:"#000"
  },
  bonusText: {
    color: "#F04A38",
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 16,
    marginTop: 16,
    color:"#000"
  },
  disableButton: {
    backgroundColor: "rgba(240, 74, 56, 0.7)",
  },
  enableButton: {
    opacity: 1,
  },
  hintMessage: {
    fontSize: 12,
    color: "#B70202",
    marginTop: 10,
  },
});
