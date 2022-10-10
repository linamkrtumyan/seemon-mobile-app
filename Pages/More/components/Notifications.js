import {StyleSheet, View, Switch, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../../App';
import request from '../../../request';
import lang from "../../../lang.json";


export default function Notifications() {
  const appContext = React.useContext(AuthContext);

  

  const [discount, setDiscount] = useState(false);
  const [deliveries, setDeliveries] = useState(false);
  const [email, setEmail] = useState(false);
  const toggleDiscount = () => setDiscount(previousState => !previousState);
  const toggleDeliveries = () => setDeliveries(previousState => !previousState);
  const toggleEmail = () => setEmail(previousState => !previousState);

  useEffect(() => {
    request(`/api-frontend/Customer/ChangeCustomerNotificationSettings`)
      .then(({data, headerData}) => {
        setDeliveries(data.delivery_notifications_enabled);
        setDiscount(data.discount_notifications_enabled);
        setEmail(data.email_notifications_enabled);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  }, []);

  const changeNotSettings =  (disc, deliv, mail) => {
    
    request(
      '/api-frontend/Customer/ChangeCustomerNotificationSettings',
      'POST',
      {
        discount_notifications_enabled: disc,
        delivery_notifications_enabled: deliv,
        email_notifications_enabled: mail,
        custom_properties: {},
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{lang[appContext.state.lang].settings.discount}</Text>
          <Switch
            trackColor={{false: '#e2e2e2', true: '#8F8F8F'}}
            thumbColor={discount ? '#F04A38' : '#8F8F8F'}
            ios_backgroundColor="#F04A38"
            onValueChange={() => {
              toggleDiscount();
              changeNotSettings(!discount, deliveries, email);
            }}
            value={discount}
          />
        </View>
        <Text style={styles.subtitle}>
          {lang[appContext.state.lang].settings.notDiscount}

        </Text>
      </View>

      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{lang[appContext.state.lang].settings.deliveries}</Text>
          <Switch
            trackColor={{false: '#e2e2e2', true: '#8F8F8F'}}
            thumbColor={deliveries ? '#F04A38' : '#8F8F8F'}
            ios_backgroundColor="#F04A38"
            onValueChange={() => {
              toggleDeliveries();
              changeNotSettings(discount, !deliveries, email);
            }}
            value={deliveries}
          />
        </View>
        <Text style={styles.subtitle}>
          {lang[appContext.state.lang].settings.notOrder}
        </Text>
      </View>

      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{lang[appContext.state.lang].settings.email}</Text>
          <Switch
            trackColor={{false: '#e2e2e2', true: '#8F8F8F'}}
            thumbColor={email ? '#F04A38' : '#8F8F8F'}
            ios_backgroundColor="#F04A38"
            onValueChange={() => {
              toggleEmail();
              changeNotSettings(discount, deliveries, !email);
            }}
            value={email}
          />
        </View>
        <Text style={styles.subtitle}>
          {lang[appContext.state.lang].settings.notEmail}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    marginTop: 22,
  },
  item: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#8F8F8F',
    // marginTop:16
  },
});
