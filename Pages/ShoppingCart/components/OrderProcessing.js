import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import CheckBox from "react-native-checkbox";
import request from "../../../request";
import Loading from "../../Authentication/Loading";
import { AuthContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import lang from "../../../lang.json"

export default function OrderProcessing({ navigation }) {
  const appContext = React.useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bonusCard, setBonusCard] = useState(false);
  const [prices, setPrices] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [deliveryTime, setDeliveryTime] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState([]);
  const [paymentsMethod, setPaymentsMethod] = useState([]);
  const [slectedPayMethod, setSelectedPayMethod] = useState("");
  const [isLoadingRecipient, setIsLoadingRecipient] = useState(true);
  const [isLoadingDeliveryAddress, setIsLoadingDeliveryAddress] =
    useState(true);
  const [isLoadingDeliveryDateAndTime, setIsLoadingDeliveryDateAndTime] =
    useState(true);
  const [isLoadingPaymentMethod, setIsLoadingPaymentMethod] = useState(true);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [isLoadingOrderProcess, setIsLoadingOrderProcess] = useState(false);
  const [enableBonus, setEnableBonus] = useState(true);

  const [showBonusSection, setShowBonusSection] = useState(false);


  useEffect(() => {
    // setIsLoadingRecipient(true);
    request("/api-frontend/Checkout/PaymentMethod")
      .then(({data, headerData}) => {
        setShowBonusSection(data.model.display_reward_points);
        setPaymentsMethod(data.model.payment_methods);
        setSelectedPayMethod(
          data.model.payment_methods[0]?.payment_method_system_name
        );
        setIsLoadingPaymentMethod(false);
      })
      .catch((e) => console.log(e, "get payment method error"));

    request("/api-frontend/ShoppingCart/Cart")
      .then(({data, headerData}) => {
        setShippingAddress(data.order_review_data.shipping_address);
        setIsLoadingDeliveryAddress(false);
        //for delivery time
        // let values =
        let result = data.checkout_attributes[0].values.filter(
          (value) => value.is_pre_selected === true
        );
     
        setDeliveryTime(result);
        setDeliveryDate(data.checkout_attributes[1].default_value);
        setIsLoadingDeliveryDateAndTime(false);

        // setPaymentsMethod(data.model.payment_methods)
        // setSelectedPayMethod(data.model.payment_methods[0]?.payment_method_system_name)
      })
      .catch((e) => console.log(e, "get shop cart error"));

    request("/api-frontend/Customer/Info")
      .then(({data, headerData}) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhone(data.phone);
        setIsLoadingRecipient(false);
      })
      .catch((e) => console.log(e, "get Customer/Info error"));
  }, []);

  useEffect(() => {
    setIsLoadingPrices(true);
    request(
      `/api-frontend/Checkout/PaymentMethodDetails?useRewardPoints=${bonusCard}`
    )
      .then(({data, headerData}) => {
        setPrices(data.model);
        setIsLoadingPrices(false);

        if (!data.success) {
          setEnableBonus(false);
        }
      })
      .catch((e) => console.log(e, "get PaymentMethodDetails error"));
  }, [bonusCard]);

  const sendPaymentMethod = () => {
    setIsLoadingOrderProcess(true);
    request(
      `/api-frontend/Checkout/SelectPaymentMethod?paymentMethod=${slectedPayMethod}`,
      "POST",
      {
        payment_methods: [
          {
            payment_method_system_name: slectedPayMethod,
            name: "string",
            description: "string",
            fee: "string",
            selected: true,
            logo_url: "string",
            custom_properties: {},
          },
        ],
        display_reward_points: prices.display_reward_points,
        reward_points_balance: prices.reward_points_balance,
        reward_points_amount: prices.reward_points_amount,
        reward_points_enough_to_pay_for_order:
          prices.reward_points_enough_to_pay_for_order,
        use_reward_points: prices.use_reward_points,
        total_price: prices.total_price,
        shipping_price: prices.shipping_price,
        all_amount: prices.all_amount,
        will_earn_reward_points: prices.will_earn_reward_points,
        all_reward_points: prices.all_reward_points,
        custom_properties: {},
      }
    )
      .then(({data, headerData}) => {

        if (data.success) {
          request("/api-frontend/Checkout/Confirm", "POST")
            .then(({data, headerData}) => {
              if (data.Success) {
                // navigation.navigate("OrderCompleted");
                navigation.navigate({
                  name: "OrderCompleted",
                  params: { message: data.Messages },
                });
                AsyncStorage.setItem("cartItemCount", null);
                appContext.authContext.setCartItemCount(null);
                setIsLoadingOrderProcess(false);
              } else {
                navigation.navigate({
                  name: "OrderFailed",
                  params: { message: data.Messages },
                });
                setIsLoadingOrderProcess(false);
              }
            })
            .catch(() => {
              navigation.navigate({
                name: "OrderFailed",
                params: {
                  message: ["Something bad happened", "Please try again"],
                },
              });
              setIsLoadingOrderProcess(false);
            });
        }
      })
      .catch((e) => console.log(e, "get payment method error"));
  };

  if (
    isLoadingRecipient ||
    isLoadingDeliveryAddress ||
    isLoadingDeliveryDateAndTime ||
    isLoadingPaymentMethod
  ) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>{lang[appContext.state.lang].shoppingCartPage.recipient}</Text>
        <Text style={styles.mainText}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.subText}>{phone}</Text>

        <View style={styles.line} />

        <Text style={styles.title}>{lang[appContext.state.lang].shoppingCartPage.shippingAddress}</Text>
        <Text style={styles.mainText}>
          {shippingAddress.address1}
          {shippingAddress.building}
          {shippingAddress.apartment} {shippingAddress.city}
          {shippingAddress.zip_postal_code}
        </Text>
        <Text style={styles.subText}>{shippingAddress.phone_number}</Text>

        <View style={styles.line} />

        <Text style={styles.title}>{lang[appContext.state.lang].shoppingCartPage.deliveryTime}</Text>
        <Text style={styles.mainText}>
          {deliveryTime[0]?.name}, {deliveryDate}
        </Text>

        <View style={styles.line} />

        <Text style={styles.title}>{lang[appContext.state.lang].shoppingCartPage.paymentMethod}</Text>
        <RadioButton.Group
          onValueChange={(value) => setSelectedPayMethod(value)}
          value={slectedPayMethod}
        >
          {
            paymentsMethod?.map((paym, index) => {
              return (
                <View style={styles.menuItemContainer} key={index}>
                   <RadioButton.Item
                color="#F04A38"
                uncheckedColor="#F04A38"
                mode="android"
                label={paym.name}
                value={paym.payment_method_system_name}
                style={styles.radioItem}
                labelStyle={{ fontSize: 14 }}
              />
                </View>
              )
            } )
          }
       
        </RadioButton.Group>

        <View style={styles.line} />

        {showBonusSection ? (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CheckBox
                label={lang[appContext.state.lang].shoppingCartPage.bonusCard}
                checked={bonusCard}
                onChange={(bonusCard) => {
                  setBonusCard(!bonusCard);
                  // forceRender();
                }}
                labelStyle={{ fontSize: 16 }}
              />
              <Text style={styles.bonus}>{prices?.all_reward_points}</Text>
            </View>
            <TextInput  placeholderTextColor="#8F8F8F"

            style={styles.input}
            // placeholder={prices?.used_reward_points}
            placeholder={String(prices?.used_reward_points)}
            editable={false}
            // selectTextOnFocus={false}
          />

            <View style={styles.dottedLine} />
          </>
        ) : null}

        {/* {isLoadingPrices ? (
          <>
            <ActivityIndicator color="#F04A38" />
          </>
        ) : bonusCard && !isLoadingPrices && enableBonus ? (
          <TextInput  placeholderTextColor="#8F8F8F"

            style={styles.input}
            // placeholder={prices?.used_reward_points}
            placeholder={String(prices?.used_reward_points)}
            editable={false}
            // selectTextOnFocus={false}
          />
        ) : <Text>Ձեր վաստակած միավորները  բավարար չեն</Text>} */}

        <View style={styles.priceContainer}>
          <Text style={styles.bonusText}>{lang[appContext.state.lang].shoppingCartPage.bonus}</Text>
          <Text style={styles.bonusText}>
            +{prices?.will_earn_reward_points}
          </Text>
        </View>

        <View style={styles.dottedLine} />
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.cost}</Text>
          <Text style={styles.priceText}>{prices?.total_price}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.shipment}</Text>
          <Text style={styles.priceText}>{prices?.shipping_price}</Text>
        </View>
        {bonusCard ? (
          <View style={styles.priceContainer}>
            <Text style={[styles.bonusText, { marginTop: 16 }]}>{lang[appContext.state.lang].shoppingCartPage.bonusUnit}</Text>
            <Text style={[styles.bonusText, { marginTop: 16 }]}>
              -{prices?.reward_points_amount}
            </Text>
          </View>
        ) : null}

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{lang[appContext.state.lang].shoppingCartPage.totalPrice}</Text>
          {bonusCard ? (
            <Text style={styles.priceText}>
              {" "}
              {prices?.total_price_with_reward_points_amount}
            </Text>
          ) : (
            <Text style={styles.priceText}> {prices?.all_amount}</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextButton}
        //   onPress={() =>
        //     navigation.navigate({
        //       name: "Checkout",
        //       params: { products: shoppingCartProducts },
        //     })
        //   }
        disabled={isLoadingOrderProcess}
        onPress={sendPaymentMethod}
      >
        {isLoadingOrderProcess ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>{lang[appContext.state.lang].button.order}</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: "5%",
    height: "100%",
    marginTop: 32,
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    color:"#000"
  },
  mainText: {
    fontSize: 16,
    marginBottom: 6,
    color:"#000"
  },
  subText: {
    color: "#8F8F8F",
    fontSize: 14,
  },
  line: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    width: "100%",
    height: 1,
    marginVertical: 24,
  },
  radioItem: {
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
  },
  addNewAddress: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    marginLeft: "8%",
    marginBottom: 24,
  },
  addNewAddressTitle: {
    color: "#0B73EE",
    fontSize: 14,
    marginLeft: 8,
  },
  bonus: {
    fontSize: 16,
    color: "#F04A38",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 44,
    // width: "25%",
    borderRadius: 8,
    // padding: 14,
    paddingHorizontal: 14,
    marginTop: 16,
    padding:0,
    color:"#000"
  },
  input: { color: "#000",
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 29,
    // width: "25%",
    borderRadius: 8,
    // padding: 14,
    // paddingHorizontal: 14,
    marginTop: 16,
    textAlign: "center",
    width: 162,
    alignSelf: "flex-end",
    fontSize: 13,
    padding:0
  },
  dottedLine: {
    marginVertical: 24,
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#E2E2E2",
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
  nextButton: {
    width: "90%",
    marginHorizontal: "5%",
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
});
