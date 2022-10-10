import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import EmptyOrder from "./EmptyOrder";
import OrderCard from "./OrderCard";
import request from "../../../../request";
import Loading from "../../../Authentication/Loading";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchOrders = () => {
    setIsLoading(true);
    request("/api-frontend/Order/CustomerOrders")
      .then(({ data, headerData }) => {
        setOrders(data.orders);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "customer order get error ---------------------");
      });
  }

  useEffect(() => {
    fetchOrders()
  }, []);





  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {orders.length > 0 ? (
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchOrders}
          />
        } style={styles.container}>
          {orders.map((order, index) => {
            return <OrderCard item={order} key={index} />;
          })}
        </ScrollView>
      ) : (
        <EmptyOrder />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
});
