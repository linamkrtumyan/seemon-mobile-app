import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FilterIcon from '../../assets/FilterIcon';
import GestureRecognizer from 'react-native-swipe-gestures';
import CheckBox from 'react-native-checkbox';
import CrossIcon from '../../assets/CrossIcon';
import request from '../../request';
import {useNavigation} from '@react-navigation/native';
import lang from '../../lang.json';
import {AuthContext} from '../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Filter({
  setFruits,
  name,
  orderBy,
  id,
  setIsLoading,
  byTag = false,
}) {
  const navigation = useNavigation();
  const appContext = React.useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000000);
  const [sendMinPrice, setSendMinPrice] = useState(0);
  const [sendMaxPrice, setSendMaxPrice] = useState(1000000000000);
  const [discount, setDiscount] = useState(false);
  const [sendDiscount, setSendDiscount] = useState(false);
  const [render, setRender] = useState(false);
  const [result, setResult] = useState([]);
  const [categoriesSendIds, setCategoriesSendIds] = useState([0]);
  const [newCategoriesArray, setNewCategoriesArray] = useState([0]);

  const [sendOrderBy, setSendOrderBy] = useState(orderBy);

  useEffect(() => {
    if (byTag === false) {
      if (orderBy != 'NameAsc') {
        fetchData(
          categoriesSendIds,
          orderBy,
          sendMinPrice,
          sendMaxPrice,
          sendDiscount,
        );
      }
    }
  }, [orderBy]);

  const fetchData = (ids, a, min, max, disc) => {
    setIsLoading(true);
    request(`/api-frontend/Catalog/SearchFilteredProducts`, 'POST', {
      q: name === undefined ? '' : name,
      discount: disc,
      price_min: min,
      price_max: max,
      category_ids: ids,
      // category_ids: categoriesSendIds.length > 0 ? categoriesSendIds : [0],
      order_by: a,
      page_index: 0,
      page_number: 0,
      page_size: 100,
      total_items: 0,
      total_pages: 0,
      first_item: 0,
      last_item: 0,
      has_previous_page: true,
      has_next_page: true,
      custom_properties: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: '',
      },
    })
      .then(({data, headerData}) => {
        setFruits(data.Products);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  useEffect(() => {
    if (byTag === false) {
      if (id === undefined) {
        setCategoriesSendIds([0]);
        fetchData([0], orderBy, sendMinPrice, sendMaxPrice, sendDiscount);
      } else {
        newCategoriesArray.length = 0;
        addToArray(id);
        setCategoriesSendIds([id]);
        fetchData([id], orderBy, sendMinPrice, sendMaxPrice, sendDiscount);
      }
    }
  }, [id]);

  useEffect(() => {
    if (name != undefined) {
      fetchData(
        categoriesSendIds,
        orderBy,
        sendMinPrice,
        sendMaxPrice,
        sendDiscount,
      );
    }
  }, [name]);

  const forceRender = () => {
    setRender(prev => !prev);
  };

  const fetchByFilter = () => {
    setCategoriesSendIds([...newCategoriesArray]);
    setSendMinPrice(minPrice);
    setSendMaxPrice(maxPrice);
    setSendDiscount(discount);
    setModalVisible(false);
    if (newCategoriesArray.length > 1) {
      navigation.setOptions({
        title: lang[appContext.state.lang].headerTitles.categoriesFiltered,
      });
    } else {
      const title = result?.filter(res => res.Id === newCategoriesArray[0]);
      navigation.setOptions({
        title:
          title[0]?.Name ??
          lang[appContext.state.lang].headerTitles.categoriesFiltered,
      });
    }
    // setTimeout(function(){
    fetchData(
      [...newCategoriesArray],
      sendOrderBy,
      minPrice,
      maxPrice,
      discount,
    );
    //  }, 2000)

    //
  };

  const fetchCategories = () => {
    request(
      `/api-frontend/Catalog/GetCategoriesDisplayedOnHomePage?pageIndex=0&pageSize=300&getOnlyTotalCount=false&storeId=0&showHidden=false`,
    )
      .then(({data, headerData}) => {
        setResult(data.Categories);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addToArray = id => {
    if (!newCategoriesArray.some(i => i === id)) {
      newCategoriesArray.push(id);
    } else {
      const index = newCategoriesArray.indexOf(id);
      newCategoriesArray.splice(index, 1);
    }
    forceRender();
  };

  function onChangedMinPrice(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
      }
    }
    setMinPrice(newText);
  }
  function onChangedMaxPrice(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
      }
    }
    setMaxPrice(newText);
  }

  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 300,
    gestureIsClickThreshold: 99,
  };

  return (
    <View style={styles.centeredView}>
      <GestureRecognizer
        config={config}
        style={{flex: 1}}
        onSwipeUp={() => setModalVisible(true)}
        onSwipeDown={() => {
          setModalVisible(false);
          // setNewCategoriesArray(filteredCatId)
          setNewCategoriesArray([...categoriesSendIds]);
          setMinPrice(sendMinPrice);
          setMaxPrice(sendMaxPrice);
          setDiscount(sendDiscount);
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <KeyboardAwareScrollView>
              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);

                  setNewCategoriesArray([...categoriesSendIds]);
                  setMinPrice(sendMinPrice);
                  setMaxPrice(sendMaxPrice);
                  setDiscount(sendDiscount);
                }}>
                <CrossIcon />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {lang[appContext.state.lang].filter.priceRange}
              </Text>
              <View style={styles.priceContainer}>
                <TextInput
                  placeholderTextColor="#8F8F8F"
                  style={styles.input}
                  placeholder="150"
                  value={minPrice}
                  onChangeText={text => onChangedMinPrice(text)}
                  keyboardType="numeric"
                />
                <View style={styles.line} />

                <TextInput
                  placeholderTextColor="#8F8F8F"
                  style={styles.input}
                  placeholder="995000"
                  value={maxPrice}
                  onChangeText={text => onChangedMaxPrice(text)}
                  keyboardType="numeric"
                />
              </View>

              <CheckBox
                tintColors={{true: 'red', false: 'yellow'}}
                label={lang[appContext.state.lang].filter.discount}
                checked={discount}
                onChange={discount => {
                  setDiscount(!discount);
                  forceRender();
                }}
              />

              <Text style={styles.modalTitle}>
                {lang[appContext.state.lang].filter.category}
              </Text>

              <View style={styles.menuItemContainer}>
                {result?.map((res, index) => {
                  return (
                    <View key={index} style={styles.checkBoxItem}>
                      <CheckBox
                        label={res.Name}
                        checked={newCategoriesArray?.some(s => s == res.Id)}
                        onChange={() => {
                          addToArray(res.Id);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => fetchByFilter()}
              style={styles.loginScreenButton}>
              <Text style={styles.loginText}>
                {lang[appContext.state.lang].button.show}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </GestureRecognizer>
      <TouchableOpacity
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        onPress={() => {
          forceRender();
          setModalVisible(true);
        }}>
        {!(categoriesSendIds.length === 1 && categoriesSendIds[0] === 0) ||
        minPrice > 0 ||
        maxPrice < 1000000000000 ? (
          <FilterIcon active={true} />
        ) : (
          <FilterIcon />
        )}
      </TouchableOpacity>
    </View>
  );
}
// }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  modalView: {
    marginTop: '30%',

    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(242, 243, 242)',
    borderTopRightRadius: 51,
    borderTopLeftRadius: 51,
    paddingVertical: 40,
    paddingHorizontal: 20, // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonClose: {
    alignItems: 'flex-end',
    paddingRight: '3%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalTitle: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 10,
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#F04A38',
    height: 34,
    width: '25%',
    borderRadius: 4,
    padding: 0,
    textAlign: 'left',
    paddingLeft: 5,
  },
  line: {
    borderBottomColor: '#F04A38',
    borderBottomWidth: 1,
    width: 40,
    height: 1,
  },
  menuItemContainer: {
    marginTop: 16,
  },
  loginScreenButton: {
    width: '90%',
    marginLeft: '5%',
    padding: 14,
    backgroundColor: '#F04A38',
    borderRadius: 8,
    marginBottom: '30%',
  },
  loginText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
  checkBoxItem: {
    marginBottom: 10,
  },
});
