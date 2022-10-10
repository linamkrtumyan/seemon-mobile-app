import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import request from '../../../request';
import UploadAvatar from '../../../assets/UploadAvatar';
const ImagePicker = {};
import ActionSheet from 'react-native-actionsheet';
import ProfileEmptyAvatar from '../../../assets/ProfileEmptyAvatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import base64 from 'react-native-base64';
import ImgToBase64 from 'react-native-image-base64';

export default function EditUserInfo() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  //
  const [userName, setUserName] = useState('');
  const [timeZoneId, setTimeZoneId] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [avatar, setAvatar] = useState('');

  const [render, setRender] = useState(false);

  let actionSheet = useRef();

  const [optionArray, setOptionArray] = useState([
    'Take a photo',
    'Upload photo',
    'Remove photo',
    'Cancel',
  ]);

  const handleImagePick = result => {
    if (result.didCancel) {
      return [];
    }

    if (result.assets) {
      // onImagesPick(result.assets);
      console.log(result.assets, 'result.assets');
    }
  };
  const handleCamera = async () => {
    const result = await launchCamera();
    handleImagePick(result);
    setAvatar(result.assets[0].uri);
    sendToBack(result);
  };
  const handleImageLibrary = async () => {
    const result = await launchImageLibrary();
    handleImagePick(result);
    setAvatar(result.assets[0].uri);
    sendToBack(result);
  };

  const sendToBack = async result => {
    let fileExtension = result.assets[0].uri.substr(
      result.assets[0].uri.lastIndexOf('.') + 1,
    );

    ImgToBase64.getBase64String(`${result.assets[0].uri}`)
      .then(base64String => {
        console.log('-**--*7896416541653');
        request(
          `/api-frontend/Customer/UploadAvatar?fileName=avatar&contentType=${result.assets[0].type}/${fileExtension}`,
          'POST',
          `${base64String}`,
        )
          .then(({data, headerData}) => {
            // setAvatarLoading(false)
          })
          .catch(e => console.log(e, 'upload image error'));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    //  if(avatar) {
    if (avatar?.length > 0) {
      setOptionArray(['Remove photo', 'Cancel']);
    } else {
      setOptionArray(['Take a photo', 'Upload photo', 'Cancel']);
    }
    //  }
  }, [avatar]);

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  const action = index => {
    console.log(index,"index")
    switch (index) {
      case 0:
        // openCamera();
        handleCamera();
        break;
      case 1:
        // pickImage();
        handleImageLibrary();
        break;

      case 2:
        removeAvatar();

        break;
      default:
        console.log(`Sorry`);
    }
  };

  const removeAvatar = () => {
    console.log(
      'remove avatar ***********************************************************************',
    );
    request('/api-frontend/Customer/RemoveAvatar', 'DELETE')
      .then(({data, headerData}) => {
        // console.log(data, 'remove avatar data');
        console.log(headerData, 'remove avatar headerData');
        // setAvatar(data.avatar_url);
        // setIsLoadingAvatar(false);
      })
      .catch(e => console.log(e, 'get avatar error'));
  };

  const fetchAvatar = async () => {
    request('/api-frontend/Customer/Avatar')
      .then(({data, headerData}) => {
        console.log(data, 'get avatar response');
        setAvatar(data.avatar_url);
        // setIsLoadingAvatar(false);
      })
      .catch(e => console.log(e, 'get avatar error'));
  };
  // console.log(avatarLoading,"avatarloading")
  const pickImage = async () => {
    // setAvatarLoading(true)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      setAvatar(result.uri);

      // console.log((result?.uri).base64())
      // let fileBase64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64'  });

      // selectedFile.convertToBase64(function(base64)
      let fileExtension = result.uri.substr(result.uri.lastIndexOf('.') + 1);
      request(
        `/api-frontend/Customer/UploadAvatar?fileName=avatar&contentType=${result.type}/${fileExtension}`,
        'POST',
        `${result.base64}`,
      )
        .then(({data, headerData}) => {
          // setAvatarLoading(false)
        })
        .catch(e => console.log(e, 'upload image error'));
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    // Explore the result

    if (!result.cancelled) {
      // setPickedImagePath(result.uri);
      setAvatar(result.uri);

      let fileExtension = result.uri.substr(result.uri.lastIndexOf('.') + 1);
      request(
        `/api-frontend/Customer/UploadAvatar?fileName=avatar&contentType=${result.type}/${fileExtension}`,
        'POST',
        `${result.base64}`,
      )
        .then(({data, headerData}) =>
          console.log(data, 'upload image response'),
        )
        .catch(e => console.log(e, 'upload image error'));
    }
  };

  const fetchCustomerInfo = () => {
    request('/api-frontend/Customer/Info')
      .then(({data, headerData}) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone);
        setEmail(data.email);
        //
        setUserName(data.username);
        setTimeZoneId(data.time_zone_id);
        setVatNumber(data.vat_number);
      })
      .catch(e => console.log(e, 'customer info error'));
  };

  useEffect(() => {
    fetchCustomerInfo();
    fetchAvatar();
  }, [render]);

  const forceRender = () => {
    setRender(prev => !prev);
  };

  const editInfo = () => {
    request('/api-frontend/Customer/Info', 'POST', {
      model: {
        email: email,
        email_to_revalidate: 'string',
        check_username_availability_enabled: true,
        allow_users_to_change_usernames: true,
        usernames_enabled: true,
        username: userName,
        gender_enabled: true,
        gender: 'string',
        first_name_enabled: true,
        first_name: firstName,
        first_name_required: true,
        last_name_enabled: true,
        last_name: lastName,
        last_name_required: true,
        date_of_birth_enabled: true,
        date_of_birth_day: 0,
        date_of_birth_month: 0,
        date_of_birth_year: 0,
        date_of_birth_required: true,
        company_enabled: true,
        company_required: true,
        company: 'string',
        street_address_enabled: true,
        street_address_required: true,
        street_address: 'string',
        street_address2_enabled: true,
        street_address2_required: true,
        street_address2: 'string',
        zip_postal_code_enabled: true,
        zip_postal_code_required: true,
        zip_postal_code: 'string',
        city_enabled: true,
        city_required: true,
        city: 'string',
        county_enabled: true,
        county_required: true,
        county: 'string',
        country_enabled: true,
        country_required: true,
        country_id: 0,
        available_countries: [
          {
            disabled: true,
            group: {
              disabled: true,
              name: 'string',
            },
            selected: true,
            text: 'string',
            value: 'string',
          },
        ],
        state_province_enabled: true,
        state_province_required: true,
        state_province_id: 0,
        available_states: [
          {
            disabled: true,
            group: {
              disabled: true,
              name: 'string',
            },
            selected: true,
            text: 'string',
            value: 'string',
          },
        ],
        phone_enabled: true,
        phone_required: true,
        phone: phoneNumber,
        fax_enabled: true,
        fax_required: true,
        fax: 'string',
        newsletter_enabled: true,
        newsletter: true,
        signature_enabled: true,
        signature: 'string',
        time_zone_id: timeZoneId,
        allow_customers_to_set_time_zone: true,
        available_time_zones: [
          {
            disabled: true,
            group: {
              disabled: true,
              name: 'string',
            },
            selected: true,
            text: 'string',
            value: 'string',
          },
        ],
        vat_number: 'string',
        vat_number_status_note: 'string',
        display_vat_number: true,
        associated_external_auth_records: [
          {
            email: 'string',
            external_identifier: 'string',
            auth_method_name: 'string',
            id: 0,
            custom_properties: {},
          },
        ],
        number_of_external_authentication_providers: 0,
        allow_customers_to_remove_associations: true,
        customer_attributes: [
          {
            name: 'string',
            is_required: true,
            default_value: 'string',
            attribute_control_type: 'DropdownList',
            values: [
              {
                name: 'string',
                is_pre_selected: true,
                id: 0,
                custom_properties: {},
              },
            ],
            id: 0,
            custom_properties: {},
          },
        ],
        gdpr_consents: [
          {
            message: 'string',
            is_required: true,
            required_message: 'string',
            accepted: true,
            id: 0,
            custom_properties: {},
          },
        ],
        custom_propertie: {},
      },
      form: {},
    })
      .then(({data, headerData}) => {
        // console.log(data,"data")
        navigation.goBack();
        // forceRender()
      })
      .catch(e => console.log(e, 'user info edit response error'));
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.userDataContainer}>
            <View style={styles.userAvatarContainer}>
              {/* <AvatarIcon/> */}

              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                // onPress={pickImage}
                onPress={showActionSheet}
                style={styles.avatarContainer}>
                <ActionSheet
                  ref={actionSheet}
                  options={optionArray}
                  cancelButtonIndex={avatar ? 1 : 2}
                  // destructiveButtonIndex={2}
                  onPress={index => {
                    action(index);
                  }}
                />
                {}
                {avatar ? (
                  <View style={styles.elevationLow}>
                    {/* {
                      avatarLoading ?
                      <ActivityIndicator  />
                       : */}
                    <ImageBackground
                      style={{
                        width: 64,
                        height: 64,
                      }}
                      imageStyle={{borderRadius: 20}}
                      source={{uri: avatar.replace(
                        'http://',
                        'https://',
                      )}}
                    />
                    {/* } */}
                  </View>
                ) : (
                  <ProfileEmptyAvatar />
                )}

                <View
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    zIndex: 9,
                  }}>
                  <UploadAvatar />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.profileNavigationItem}>
            <View style={styles.profileNavigationTextSide}>
              <Text style={styles.profileNavigationTitle}>Անուն</Text>
              <TextInput
                placeholderTextColor="#8F8F8F"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                keyboardType="default"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileNavigationItem}>
            <View style={styles.profileNavigationTextSide}>
              <Text style={styles.profileNavigationTitle}>Ազգանուն</Text>
              <TextInput
                placeholderTextColor="#8F8F8F"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileNavigationItem}>
            <View style={styles.profileNavigationTextSide}>
              <Text style={styles.profileNavigationTitle}>Հեռախոսահամար</Text>
              <TextInput
                placeholderTextColor="#8F8F8F"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileNavigationItem}>
            <View style={styles.profileNavigationTextSide}>
              <Text style={styles.profileNavigationTitle}>Էլ. հասցե</Text>
              <TextInput
                placeholderTextColor="#8F8F8F"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.profileNavigationItem} >
            <View style={styles.profileNavigationTextSide} >
                <Text style={styles.profileNavigationTitle} >Գաղտնաբառ</Text>
                <TextInput  placeholderTextColor="#8F8F8F"

                style={styles.input}
                value={password}
                onChangeText={setPassword}
                keyboardType="number-pad"
                />
            </View>           
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={editInfo}>
          <Text style={styles.nextButtonText}>Պահպանել փոփոխությունները</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: "center",
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    marginTop: 12,
  },
  userDataContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: '#E2E2E2',
  },
  userNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 16,
    marginRight: 10,
  },
  userAvatarContainer: {
    // background: "#FFFFFF",
    // boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderColor: '#fff',
    // opacity:0.3,
    borderWidth: 1,
    borderRadius: 20,
  },
  userInfoContainer: {
    marginLeft: 17,
  },
  profileNavigationItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  profileNavigationTextSide: {
    flex: 1,
    flexDirection: 'column',
  },
  profileNavigationTitle: {
    fontSize: 13,
    // marginLeft:12,
    color: '#8F8F8F',
  },
  actionsContainer: {
    paddingHorizontal: '5%',
    backgroundColor: 'transparent',
    height: 60,
  },
  nextButton: {
    // width: "100%",
    paddingVertical: 12,
    backgroundColor: '#F04A38',
    borderRadius: 8,
    marginBottom: 20,

    height: 50,
  },
  nextButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    // lineHeight: 20,
    letterSpacing: -0.24,
    // padding:10
  },
  input: {color: '#000', fontSize: 15},
});
