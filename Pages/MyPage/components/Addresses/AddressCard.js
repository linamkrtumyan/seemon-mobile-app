import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import request from "../../../../request";
import EditAddressIcon from "../../../../assets/EditAddressIcon";
import DeleteAddress from "../../../../Components/Address/DeleteAddress";
import React from "react";


export default function AddressCard({ item, addressCount, setAddressCount }) {
  const navigation = useNavigation();

  const deleteAddress = () => {
    request(`/api-frontend/Checkout/DeleteEditAddress/${item.id}`, "DELETE")
      .then(({ data, headerData }) => {
        if (data.success) {
          setAddressCount(addressCount - 1);
        }
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  return (
    <>
      <View style={styles.addressItem}>
        <Text style={{ width: "80%", color:"#000" }}>
          {item.address1} {item?.building}
          {","} բն․{item?.apartment} ք․{item.city}
          {", "}
          {item.zip_postal_code}{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={styles.addressAction}
            onPress={() => {
              navigation.navigate({
                name: "EditAddress",
                params: { address: item, customer: true },
                merge: true,
              });
            }}
          >
            <EditAddressIcon />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => deleteAddress()}
          >
            <DeleteAddress
              id={item.id}
              addressCount={addressCount}
              setAddressCount={setAddressCount}
              customer={true}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.phone}>{item.phone_number}</Text>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "95%",
  },

  phone: {
    color: "#8F8F8F",
    fontSize: 14,
    marginTop: 6,
  },
  addressAction: {
    marginHorizontal: 25,
  },
  line: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    width: "100%",
    height: 1,
    marginVertical: 24,
  },
});
