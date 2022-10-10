import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import request from '../../request';

export default function AddNewAddress({navigation, route}) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [states, setStates] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [zipCode, setZipCode] = useState(null);
  const [address, setAddress] = useState(null);
  const [building, setBuilding] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [customer, setCustomer] = useState(false);

  useEffect(() => {
    if (route?.params.customer) {
      setCustomer(route?.params.customer);
    }
  }, [route?.params.customer]);

  useEffect(() => {
    request('/api-frontend/Customer/Info')
      .then(({data, headerData}) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      })
      .catch(e => {
        console.log(e, 'errorik');
      });

    request('/api-frontend/Checkout/GetStates')
      .then(({data, headerData}) => {
        let newArr = [];
        data?.map(obj => {
          newArr.push({label: obj.Name, value: obj.Id});
        });
        setStates(newArr);
        setCountryId(newArr[0].value);
      })
      .catch(e => console.log(e, 'get state error'));
  }, []);

  const addAddress = () => {
    if (customer) {
      request(`/api-frontend/Customer/AddressAdd`, 'POST', {
        model: {
          address: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            company: '',
            country_id: 0,
            country_name: '',
            state_province_id: countryId,
            state_province_name: '',
            county: '',
            city: '',
            address1: String(address),
            building: String(building),
            apartment: String(apartment),
            address2: '',
            zip_postal_code: String(zipCode),
            phone_number: String(phoneNumber),
            fax_number: '',
            id: 0,
            custom_properties: {},
          },
          custom_properties: {},
        },
        form: {},
      })
        .then(({data, headerData}) => {
          if (data.success) {
            route?.params.setAddressCount(route?.params.addressCount + 1);
            navigation.goBack();
          }
        })
        .catch(e => {
          console.log(e, ' new customer address error');
        });
    } else {
      request(`/api-frontend/Checkout/NewShippingAddress`, 'POST', {
        model: {
          existing_addresses: [],
          invalid_existing_addresses: [],

          shipping_new_address: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            company: '',
            country_id: countryId,
            country_name: '',
            state_province_id: 0,
            state_province_name: '',
            county: '',
            city: '',
            address1: String(address),
            building: String(building),
            apartment: String(apartment),
            address2: '',
            zip_postal_code: String(zipCode),
            phone_number: String(phoneNumber),
            fax_number: '',
            id: 0,
            custom_properties: {
              additionalProp1: '',
              additionalProp2: '',
              additionalProp3: '',
            },
          },
          custom_properties: {
            additionalProp1: '',
            additionalProp2: '',
            additionalProp3: '',
          },
        },
        new_address_preselected: true,
        display_pickup_in_store: true,
        pickup_points_model: {
          warnings: [''],
          pickup_points: [
            {
              id: '',
              name: '',
              description: '',
              provider_system_name: '',
              address: '',
              city: '',
              county: '',
              state_name: '',
              country_name: '',
              zip_postal_code: '',
              latitude: 0,
              longitude: 0,
              pickup_fee: '',
              opening_hours: '',
              custom_properties: {
                additionalProp1: '',
                additionalProp2: '',
                additionalProp3: '',
              },
            },
          ],
          allow_pickup_in_store: true,
          pickup_in_store: true,
          pickup_in_store_only: true,
          display_pickup_points_on_map: true,
          google_maps_api_key: '',
          custom_properties: {
            additionalProp1: '',
            additionalProp2: '',
            additionalProp3: '',
          },
        },
        custom_properties: {
          additionalProp1: '',
          additionalProp2: '',
          additionalProp3: '',
        },

        form: {
          additionalProp1: '',
          additionalProp2: '',
          additionalProp3: '',
        },
      })
        .then(({data, headerData}) => {
          if (data.success) {
            route?.params.setAddressCount(route?.params.addressCount + 1);
            navigation.goBack();
          }
        })
        .catch(e => {
          console.log(e, 'error');
        });
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <DropDownPicker
          open={open}
          value={countryId}
          items={states}
          setOpen={setOpen}
          setValue={setCountryId}
          defaultValue={countryId}
          setItems={setStates}
          placeholder="Ընտրեք մարզը"
          placeholderStyle={{
            color: '#8F8F8F',
          }}
          listItemLabelStyle={{
            color: '#8F8F8F',
          }}
          selectedItemLabelStyle={{
            color: '#000000',
          }}
        />
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          placeholder="Փոստային դասիչ"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="number-pad"
        />
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          placeholder="Փողոց"
          value={address}
          onChangeText={setAddress}
          keyboardType="default"
        />

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholderTextColor="#8F8F8F"
            style={[styles.input, {width: '49%'}]}
            placeholder="Շենք"
            value={building}
            onChangeText={setBuilding}
            keyboardType="number-pad"
          />
          <TextInput
            placeholderTextColor="#8F8F8F"
            style={[styles.input, {width: '49%'}]}
            placeholder="Բն․"
            value={apartment}
            onChangeText={setApartment}
            keyboardType="number-pad"
          />
        </View>
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          placeholder="Հեռախոսահամար"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.nextButton,
          countryId && zipCode && address && building && phoneNumber
            ? styles.enableButton
            : styles.disableButton,
        ]}
        onPress={addAddress}
        disabled={
          countryId && zipCode && address && building && phoneNumber
            ? false
            : true
        }>
        <Text style={styles.nextButtonText}>Պահպանել</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 44,
    paddingHorizontal: '5%',
    height: '100%',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#A5DACF',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  nextButton: {
    width: '100%',
    padding: 14,
    backgroundColor: '#F04A38',
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  disableButton: {
    opacity: 0.5,
  },
  enableButton: {
    opacity: 1,
  },
});
