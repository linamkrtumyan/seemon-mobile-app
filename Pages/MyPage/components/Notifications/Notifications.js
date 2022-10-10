import { StyleSheet, ScrollView ,RefreshControl} from "react-native";
import React, { useState, useEffect } from "react";
import EmptyNotification from "./EmptyNotification";
import NotificationCard from "./NotificationCard";
import request from "../../../../request";
import Loading from "../../../Authentication/Loading";

export default function Notifications({ navigation, initialRoute }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchNotifications = () => {
    setIsLoading(true);
    request("/api-frontend/Order/GetOrdersPublicNotes")
      .then(({ data, headerData }) => {
        setNotifications(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "get notification error");
      });
  }

  useEffect(() => {
    fetchNotifications()
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {notifications.length > 0 ? (
          <ScrollView  refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchNotifications}
            />
          } style={styles.container}>
            {notifications.map((notification, index) => {
              return <NotificationCard item={notification} key={index} />;
            })}
          </ScrollView>
        ) : (
          <EmptyNotification />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
});
