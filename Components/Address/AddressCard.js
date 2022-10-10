import { StyleSheet, Text, View, TouchableOpacity , Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import EditAddressIcon from "../../assets/EditAddressIcon";
import DeleteAddress from "./DeleteAddress";
import React from "react";

export default function AddressCard({ item, addressCount, setAddressCount }) {
  const navigation = useNavigation();



  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{width:"70%"}} >
           <RadioButton.Item
          color="#F04A38"
          uncheckedColor="#F04A38"
          mode="android"
          label={
            item.address1  + " " +
            item?.building + ", բն․" + 
            item?.apartment + " " + "ք․" +
            item.city + ","+ " "+
            item.zip_postal_code
          }
          value={item.id}
          style={styles.radioItem}
          labelStyle={{ fontSize: 16 }}
        />
        </View>
       

        <View style={{ flexDirection: "row", paddingTop:15  }}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={styles.addressAction}
            onPress={() => {
              navigation.navigate({
                name: "EditAddress",
                params: { address: item },
                merge: true,
              });
            }}
          >
            <EditAddressIcon />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <DeleteAddress id={item.id} setAddressCount={setAddressCount} addressCount={addressCount}  />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.phone}>{item.phone_number}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  radioItem: {
    flexDirection: "row-reverse",
    alignItems:"flex-start"
  },
  phone: {
    color: "#8F8F8F",
    fontSize: 14,
    marginLeft: "8%",
  },
  addressAction: {
    marginHorizontal: 25,
  },
});
