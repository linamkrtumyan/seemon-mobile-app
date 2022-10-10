import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import MinusIcon from '../../../assets/MinusIcon';
import PlusIcon from '../../../assets/PlusIcon';
import DeleteProduct from './DeleteProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../App';
import request from '../../../request';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import WhiteShoppingCartIcon from '../../../assets/WhiteShoppingCartIcon';
import lang from '../../../lang.json';

export default function FavoritePruductCard({
  item,
  productCount,
  setProductCount,
  setDeletedItemId,
  index,
}) {
  console.log(item,"fav item")
  const auth = React.useContext(AuthContext);
  const toast = useToast();
  const navigation = useNavigation();
  const [itemCount, setItemCount] = useState(item.order_min_quantity);
  const swipeableRef = useRef(null);

  const add = async () => {
    request(
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${item.product_id}?shoppingCartType=ShoppingCart&quantity=${itemCount}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          AsyncStorage.setItem('cartItemCount', String(data.total_products)),
            auth.authContext.setCartItemCount(data.total_products),
            toast.show(data.message);
        } else {
          toast.show(data.message);
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  const addToCart = () => {
    add();
  };

  const rightSwipeActions = () => {
    return (
      <DeleteProduct
        id={item.id}
        productCount={productCount}
        setProductCount={setProductCount}
        setDeletedItemId={setDeletedItemId}
      />
    );
  };

  return (
    <>
      <Swipeable ref={swipeableRef} renderRightActions={rightSwipeActions}>
        <View style={styles.productCard}>
          <View style={[styles.productItemContainer]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({
                  name: 'ProductDetails',
                  params: {id: item.product_id},
                });
              }}
              style={styles.productInfoContainer}>
              <View style={styles.itemImageContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}>
                  <ImageBackground
                    style={{
                      width: item.picture?.width,
                      height: item.picture?.height,
                    }}
                    source={{
                      uri: item.picture.full_size_image_url.replace(
                        'http://',
                        'https://',
                      ),
                    }}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={styles.productItemName}>
                    {item.product_name}
                  </Text>
                </TouchableOpacity>
                <Text style={{color: '#8F8F8F'}}>
                  {item.baseprice_amount} {item.measure.name}{' '}
                </Text>

                {item.product_price.old_price != null ? (
                  <>
                    <Text
                      style={{
                        color: '#000',
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        textDecorationColor: 'red',
                        // textAlign: 'center',
                      }}>
                      {item.product_price.old_price}
                    </Text>
                    <Text style={styles.productItemDiscountPrice}>
                      <Text>{item.product_price.price}</Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={{lineHeight: 20, color: 'transparent'}}>
                      {item.product_price.price}
                    </Text>
                    <Text style={styles.productItemPrice}>
                      {item.product_price.price}
                    </Text>
                  </>
                )}
              <Text style={styles.productPriceByQty} > ({item.product_price.standard_price}/{item.product_price.reference_measure_name}) </Text>

              </View>

            </TouchableOpacity>

            <View style={styles.actionsContainer}>
              <View style={styles.countContainer}>
                <TouchableOpacity
                  disabled={itemCount < item.order_min_quantity ? true : false}
                  hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}
                  // onPress={() => setItemCount(itemCount - item.measure.ratio)}
                  onPress={() =>
                    itemCount - item?.baseprice_amount < item.order_min_quantity
                      ? setItemCount(item.order_min_quantity)
                      : setItemCount(
                          (itemCount * 10 - item.baseprice_amount * 10) / 10,
                        )
                  }>
                  <MinusIcon />
                </TouchableOpacity>
                <TextInput
                  placeholderTextColor="#8F8F8F"
                  style={styles.countInput}
                  value={String(itemCount)}
                  editable={false}
                  selectTextOnFocus={false}
                />

                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
                  onPress={() =>
                    setItemCount(
                      (itemCount * 10 + item.baseprice_amount * 10) / 10,
                    )
                  }>
                  <PlusIcon />
                </TouchableOpacity>
              </View>
              <Text style={{color: "#8F8F8F", textAlign: "center", fontSize: 12 }} >{item.measure.name}</Text>

            </View>
          </View>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
            style={styles.toCartButton}
            onPress={() => addToCart()}>
            <WhiteShoppingCartIcon />
            <Text style={styles.toCartButtonText}>
              {' '}
              {lang[`${auth.state.lang}`].productCard.shoppingCart}
            </Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFF',
  },
  productItemContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start"
  },

  itemImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A5DACF',
    position: 'relative',
    marginRight: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 3,
    left: 3.5,
  },

  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  countContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countInput: {
    width: 44,
    height: 27,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#53B175',
    color: '#53B175',
    textAlign: 'center',
    marginHorizontal: 16,
    padding: 0,
  },
  productItemName: {
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
  },
  line: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: '100%',
    height: 1,
    marginVertical: 28,
  },

  toCartButton: {
    paddingVertical: 5,
    paddingHorizontal: 24,
    backgroundColor: '#53B175',
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  toCartButtonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginLeft: 8,
  },
  productItemDiscountPrice: {
    // textAlign: 'center',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: 'red',
    marginTop: 1,
    flexDirection: 'column',
    flex: 1,
  },
  productItemPrice: {
    // textAlign: 'center',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#000000',
    marginTop: 1,
  },
  productPriceByQty: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#8F8F8F',
    marginTop: 6,
  },
});
