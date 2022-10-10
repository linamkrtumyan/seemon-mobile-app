import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

export default function OrderCard({initialRoute, item}) {
  const navigation = useNavigation();

  const [createdDate, setCreatedDate] = useState(null);

  const renderImage = status => {
    switch (status) {
      case 10:
        return <Text style={{color: '#F04A38'}}>{item.order_status}</Text>;
      case 20:
        return <Text style={{color: '#F9A000'}}>{item.order_status}</Text>;
      case 30:
        return <Text style={{color: '#53B175'}}>{item.order_status}</Text>;
      case 40:
        return <Text style={{color: '#B70202'}}>{item.order_status}</Text>;
    }
  };

  useEffect(() => {
    // if (item.created_on != null) {
    //     let formattedCrtDay =  Date(item.created_on ?? " ")
    //       ?.getDay()
    //       .toString();
    //     let formattedCrtMonth =  Date(item.created_on)
    //       .getMonth()
    //       .toString();
    //     let formattedCrtYear =  Date(item.created_on)
    //       .getFullYear()
    //       .toString();
    //     let formattedCrtHour =  Date(item.created_on)
    //       .getHours()
    //       .toString();
    //     let formattedCrtMinute =  Date(item.created_on)
    //       .getMinutes()
    //       .toString();
    //       if(formattedCrtMinute.length === 1) {
    //         formattedCrtMinute = "0" + formattedCrtMinute
    //       }
    //     let localCreatedDate =
    //       formattedCrtDay +
    //       "/" +
    //       formattedCrtMonth +
    //       "/" +
    //       formattedCrtYear +
    //       " " +
    //       formattedCrtHour +
    //       ":" +
    //       formattedCrtMinute;
    //     setCreatedDate(localCreatedDate);
    //   }
  }, []);

  const getDetails = id => {
    navigation.navigate('OrderDetails');

    navigation.navigate('OrderDetails', {
      id: id,
    });
  };
  return (
    <View style={styles.notificationItem}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {renderImage(item.order_status_enum)}
      </View>

      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի համարը</Text>
        <Text style={styles.text}>{item.custom_order_number}</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի ամսաթիվը</Text>
        {/* <Text>{createdDate}</Text> */}
        <Text style={styles.text}>
          {item.created_on
            .replace('T', ' ')
            .substring(0, item.created_on.length - 3)}
        </Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Պատվերի գումարը</Text>
        <Text style={styles.text}>{item.order_total}.</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Առաքման գումարը</Text>
        <Text style={styles.text}>{item.shipping_price}</Text>
      </View>
      <View style={styles.orderSubitem}>
        <Text style={styles.orderSubitemTitle}>Ընդհանուր գումարը</Text>
        <Text style={styles.text}>{item.all_amount}</Text>
      </View>

      <TouchableOpacity
        style={styles.moreBtn}
        onPress={() => getDetails(item.id)}>
        <Text style={styles.moreText}>Ավելին</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    paddingVertical: 24,
    fontSize: 14,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#8F8F8F',
    marginTop: 8,
    fontSize: 12,
  },
  dottedLine: {
    marginVertical: 24,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E2E2E2',
  },
  orderSubitem: {
    //   flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  orderSubitemTitle: {
    color: '#8F8F8F',
  },
  moreBtn: {
    backgroundColor: '#53B175',
    borderRadius: 29,
    marginTop: 16,
  },
  moreText: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
  },
  text: {
    color: '#000',
  },
});
