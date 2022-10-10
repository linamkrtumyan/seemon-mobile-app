import { StyleSheet, Text, View , ScrollView,RefreshControl} from "react-native";
import request from "../../../../request";
import React, { useEffect, useState } from "react";
import Loading from "../../../Authentication/Loading";

export default function OrderDetails({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([]);

  const [endDate, setEndDate] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    getDetails()
  }, []);

  const getDetails = () => {
    setIsLoading(true);
    request(`/api-frontend/Order/Details/${route.params.id}`)
      .then(({ data, headerData }) => {
        setDetails(data);
        setIsLoading(false);

        if (data.end_date != null) {
          let formattedDay = new Date(data.end_date).getDay().toString();
          let formattedMonth = new Date(data.end_date).getMonth().toString();
          let formattedYear = new Date(data.end_date).getFullYear().toString();
          let formattedHour = new Date(data.end_date).getHours().toString();
          let formattedMinute = new Date(data.end_date).getMinutes().toString();

          let localEndDate =
            formattedDay +
            "/" +
            formattedMonth +
            "/" +
            formattedYear +
            " " +
            formattedHour +
            ":" +
            formattedMinute;
          setEndDate(localEndDate);
        }

        if (data.created_on != null) {
          let formattedCrtDay = new Date(data.created_on ?? " ")
            ?.getDay()
            .toString();
          let formattedCrtMonth = new Date(data.created_on)
            .getMonth()
            .toString();
          let formattedCrtYear = new Date(data.created_on)
            .getFullYear()
            .toString();
          let formattedCrtHour = new Date(data.created_on)
            .getHours()
            .toString();
          let formattedCrtMinute = new Date(data.created_on)
            .getMinutes()
            .toString();

          if (formattedCrtMinute.length === 1) {
            formattedCrtMinute = "0" + formattedCrtMinute;
          }

          let localCreatedDate =
            formattedCrtDay +
            "/" +
            formattedCrtMonth +
            "/" +
            formattedCrtYear +
            " " +
            formattedCrtHour +
            ":" +
            formattedCrtMinute;
          setCreatedDate(localCreatedDate);
        }
      })
      .catch((e) => console.log(e, "order details error"));
  };

  const renderImage = (status) => {
    switch (status) {
      case 10:
        return <Text style={{ color: "#F04A38" }}>{details.order_status}</Text>;
      case 20:
        return <Text style={{ color: "#F9A000" }}>{details.order_status}</Text>;
      case 30:
        return <Text style={{ color: "#53B175" }}>{details.order_status}</Text>;
      case 40:
        return <Text style={{ color: "#B70202" }}>{details.order_status}</Text>;
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView  refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={getDetails}
      />
    } style={styles.notificationItem}>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի համարը</Text>
        <Text  style={styles.text}>{details.custom_order_number}</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի ամսաթիվը</Text>
        <Text style={styles.text}>
          {details.created_on
            ?.replace("T", " ")
            ?.substring(0, details.created_on.length - 3)}
        </Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի գումարը</Text>
        <Text style={styles.text}>{details.order_total}.</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Առաքման գումարը</Text>
        <Text style={styles.text}>{details.order_shipping}</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Ընդհանուր գումարը</Text>
        <Text style={styles.text}>{details.all_amount}</Text>
      </View>

      <View style={styles.dottedLine} />

      <View style={styles.productContainer}>
        {details?.items.map((detail, index) => {
          return (
            // <>
            <View key={index} style={styles.menuItemContainer}>
              <Text style={styles.itemName}>
                {detail.product_name}{" "}
                {detail.short_description ? (
                  <Text>({detail.short_description})</Text>
                ) : null}
              </Text>
              <Text style={styles.dateText}>
                {detail.sub_total} {"  "}
                <Text style={styles.measureText}>
                  ({detail.quantity} {detail.measure_weight_name})
                </Text>
              </Text>
            </View>
            // </>
          );
        })}

        <View style={styles.orderStatusContainer}>
          {renderImage(details.order_status_id)}
          {/* <Text style={styles.orderStatus}>{details.order_status}</Text> */}
          {/* <Text style={styles.endDate}>{details.end_date}</Text> */}
          <Text style={styles.endDate}>{details?.end_date ?.replace("T", " ")
            ?.substring(0, details.end_date.length - 3)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    // borderBottomWidth: 1,
    // borderColor: "#E2E2E2",
    paddingVertical: 24,
    fontSize: 14,
    paddingHorizontal: "5%",
  },
  productContainer: {
    position: "relative",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // width:"100%"
  },
  itemName: {
    fontSize: 16,
    width: "50%",
    color:"#000"
  },
  dateText: {
    color: "#000",
    marginTop: 4,
    fontSize: 14,
    marginBottom: 8,
  },
  dottedLine: {
    marginVertical: 24,
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
  },

  orderStatusContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    right: 0,
  },
  endDate: {
    color: "#8F8F8F",
    fontSize: 12,
  },
  orderSubitem: {
    //   flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  orderSubitemTitle: {
    color: "#8F8F8F",
  },
  measureText: {
    color: "#8F8F8F",
    fontSize:14
  },
  menuItemContainer: {
    // flexDirection:"column",
    // width:"50%"
  },
  text: {
    color:"#000"
  }
});
