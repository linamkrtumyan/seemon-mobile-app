import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import request from "../../../../request";
import AddressCard from "./AddressCard";
import Loading from "../../../Authentication/Loading";
import EmptyAddress from "../../../../Components/Address/EmptyAddress";

export default function Addresses() {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressCount, setAddressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = async () => {
    setIsLoading(true);
    request(`/api-frontend/Customer/Addresses`)
      .then(({data, headerData}) => {
        setAddresses(data.addresses);
        // setSelectedAddress(data.model?.existing_addresses[0]?.id);
        setAddressCount(data.addresses.length);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses()
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    fetchAddresses();
  }, [addressCount]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {addresses.length > 0 ? (
          <>
            <ScrollView 
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  fetchAddresses()
                }}
              />
            }
             >
              <View style={styles.container}>
                {/* <RadioButton.Group
                  style={{ padding: 0, margin: 0 }}
                  onValueChange={(value) => setSelectedAddress(value)}
                  value={selectedAddress}
                > */}

                {addresses.map((address,index) => {
                  return (
                    <AddressCard
                      key={index}
                      item={address}
                      setAddressCount={setAddressCount}
                      addressCount={addressCount}
                    />
                  );
                })}
          
              </View>
            </ScrollView>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  navigation.navigate({
                    name: "AddNewAddress",
                    params: {
                      addressCount: addressCount,
                      setAddressCount: setAddressCount,
                      customer:true
                    },
                    merge: true,
                  });
                }}
              >
                <Text style={styles.nextButtonText}>Ավելացնել նոր հասցե</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <EmptyAddress
            addressCount={addressCount}
            setAddressCount={setAddressCount}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
    marginTop: 44,
  },
  actionsContainer: {
    paddingHorizontal: "5%",
    backgroundColor: "transparent",
    height: 60,
  },
  nextButton: {
    // width: "100%",
    paddingVertical: 12,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,

    height: 50,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    // lineHeight: 20,
    letterSpacing: -0.24,
    // padding:10
  },
});
