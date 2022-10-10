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

export default function EditAddress({navigation, route}) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(route.params.address.id);
  const [firstName, setFirstName] = useState(route.params.address.first_name);
  const [lastName, setLastName] = useState(route.params.address.last_name);
  const [email, setEmail] = useState(route.params.address.email);
  const [states, setStates] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [zipCode, setZipCode] = useState(route.params.address.zip_postal_code);
  const [address, setAddress] = useState(route.params.address.address1);
  const [building, setBuilding] = useState(route.params.address.building);
  const [apartment, setApartment] = useState(route.params.address.apartment);
  const [phoneNumber, setPhoneNumber] = useState(
    route.params.address.phone_number,
  );

  const [stateProvinceId, setStateProvinceId] = useState(
    route.params.address.state_province_id,
  );
  const [stateProvinceName, setStateProvinceName] = useState(
    route.params.address.state_province_name,
  );
  const [countryName, setCountryName] = useState(
    route.params.address.country_name,
  );
  const [city, setCity] = useState(route.params.address.city);

  const [customer, setCustomer] = useState(false);

  useEffect(() => {
    if (route.params.customer) {
      setCustomer(route.params.customer);
    }
  }, [route.params.customer]);

  useEffect(() => {
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

  const editAddress = () => {
    if (customer) {
      request(`/api-frontend/Customer/AddressEdit/${id}`, 'PUT', {
        model: {
          address: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            company: '',
            country_id: countryId,
            country_name: countryName,
            state_province_id: stateProvinceId,
            state_province_name: stateProvinceName,
            county: '',
            city: city,
            address1: String(address),
            building: String(building),
            apartment: String(apartment),
            address2: '',
            zip_postal_code: String(zipCode),
            phone_number: String(phoneNumber),
            fax_number: '',
            id: id,
            custom_properties: {},
          },
          custom_properties: {},
        },
        form: {},
      })
        .then(({data, headerData}) => {
          if (data.success) {
            navigation.goBack();
          }
        })
        .catch(e => {
          console.log(e, 'edit address error');
        });
    } else {
      request(`/api-frontend/Checkout/SaveEditAddress?opc=false`, 'POST', {
        billing_new_address: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: '',
          country_id: 12,
          country_name: countryName,
          state_province_id: stateProvinceId,
          state_province_name: stateProvinceName,
          county: '',
          city: city,
          address1: String(address),
          building: String(building),
          apartment: String(apartment),
          address2: '',
          zip_postal_code: String(zipCode),
          phone_number: String(phoneNumber),
          fax_number: '',
          id: id,
          custom_properties: {},
        },
        ship_to_same_address: true,
        ship_to_same_address_allowed: true,
        custom_properties: {},
      })
        .then(({data, headerData}) => {
          if (data.success) {
            navigation.goBack();
          }
        })
        .catch(e => {
          console.log(e, 'edit address error');
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
        onPress={editAddress}
        style={[
          styles.nextButton,
          countryId && zipCode && address && building && phoneNumber
            ? styles.enableButton
            : styles.disableButton,
        ]}
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
