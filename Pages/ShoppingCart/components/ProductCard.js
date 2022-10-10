import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import HeartIcon from '../../../assets/HeartIcon';
import MinusIcon from '../../../assets/MinusIcon';
import PlusIcon from '../../../assets/PlusIcon';
import DeleteProduct from './DeleteProduct';
import request from '../../../request';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function PruductCard({item, setTotalPrice}) {
  // console.log(item,"item shop cart")
  const toast = useToast();
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(item.exist_in_wish_list);
  const [itemCount, setItemCount] = useState(item?.quantity);
  const [wishlistId, setWishlistId] = useState(null);

  useEffect(() => {
    if (item.RelatedShoppingCartItemId != null) {
      setWishlistId(item.RelatedShoppingCartItemId);
    }
  }, []);

  const onChangeAdd = async (id, count) => {
    request(
      `/api-frontend/ShoppingCart/UpdateCart?onlyOneItemUpdate=true`,
      'POST',
      {
        [`itemquantity${id}`]: count,
        removefromcart: '',
      },
    )
      .then(({data, headerData}) => {
        if (data.success) {
          setTotalPrice(data.all_amount);
          // toast.show(data.message)
        } else {
          setItemCount(itemCount);
          toast.show(data.message);
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  useEffect(() => {
    // if (itemCount != item?.quantity) {
    //   onChangeAdd();
    // }
  }, [itemCount]);

  const addWishlist = async () => {
    request(
      // "/api-frontend/ShoppingCart/AddProductToCartFromCatalog/8?shoppingCartType=ShoppingCart&quantity=8","POST"
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${item.product_id}?shoppingCartType=Wishlist&quantity=${item.order_min_quantity}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(String(data.message));

          setWishlistId(data.shopping_cart_item_id);
        } else {
          toast.show(String(`${data?.errors[0]}`));
        }
      })
      .catch(e => {
        console.log(e, 'add to wishlist error');
      });
  };
  const deleteFromWishlist = () => {
    request('/api-frontend/Wishlist/UpdateWishlist', 'POST', {
      removefromcart: item.id,
    })
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(String(data.message));
        } else {
          // toast.show(String(`${data?.errors[0]}`));
          toast.show(data.message);
        }
      })
      .catch(e => {
        console.log(e, 'remove from wishlist error');
      });
  };

  const addToFavorite = () => {
    if (favorite) {
      deleteFromWishlist();
    } else {
      addWishlist();
    }

    // if (!favorite) {
    //   toast.show(`${item.Name} Added to Favorite`);
    // } else {
    //   toast.show(`${item.Name} Remove from Favorite`);
    // }
    setFavorite(!favorite);
  };

  const addToCart = () => {
    //   toast.show(`${itemCount} ${item.Measure.Name} ${item.Name} Added to Cart`);
  };

  var swipeoutBtns = [
    {
      component: <DeleteProduct cartItemId={item.id} />,
    },
  ];

  const rightSwipeActions = () => {
    return <DeleteProduct cartItemId={item.id} />;
  };

  return (
    <>
      <Swipeable renderRightActions={rightSwipeActions}>
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
              <TouchableOpacity
                onPress={() => addToFavorite()}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                style={styles.favoriteIcon}></TouchableOpacity>
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
              <Text style={styles.productItemName}>{item.product_name}</Text>
              <Text style={styles.measureName}>
                {item.baseprice_amount} {item.measure.name}
              </Text>
              <Text style={{color: '#000'}}>{item.unit_price}</Text>
              <Text style={styles.productPriceByQty} > ({item.product_price.standard_price}/{item.product_price.reference_measure_name}) </Text>

            </View>
          </TouchableOpacity>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => addToFavorite()}
              style={{alignSelf: 'flex-end'}}>
              <HeartIcon favorite={favorite} />
            </TouchableOpacity>
            <View style={styles.countContainer}>
              <TouchableOpacity
                disabled={itemCount < item.order_min_quantity ? true : false}
                hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}
                onPress={() => {
                  itemCount - item?.baseprice_amount < item.order_min_quantity
                    ? (setItemCount(item.order_min_quantity),
                      onChangeAdd(item.id, item.order_min_quantity))
                    : (setItemCount(
                        (itemCount * 10 - item.baseprice_amount * 10) / 10,
                      ),
                      onChangeAdd(
                        item.id,
                        (itemCount * 10 - item.baseprice_amount * 10) / 10,
                      ));
                }}>
                <MinusIcon />
              </TouchableOpacity>
              <View>
              <TextInput
                placeholderTextColor="#8F8F8F"
                onChangeText={text => {
                  setItemCount(text.replace(',', '.'));
                  onChangeAdd(item.id, text);
                }}
                keyboardType="decimal-pad"
                style={styles.countInput}
                value={String(itemCount)}
                editable={false}
                selectTextOnFocus={false}
              />
              <Text style={{color: "#8F8F8F", textAlign: "center", fontSize: 12 }} >{item.measure.name}</Text>
              </View>
           
              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
                onPress={() => {
                  setItemCount(
                    (itemCount * 10 + item.baseprice_amount * 10) / 10,
                  );
                  onChangeAdd(
                    item.id,
                    (itemCount * 10 + item.baseprice_amount * 10) / 10,
                  );
                }}
                // onPress={() => setItemCount(itemCount + Number(item.ratio))}
              >
                <PlusIcon />
              </TouchableOpacity>           
             
            </View>
            
          </View>
        </View>
      </Swipeable>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  productInfoContainer: {
    flexDirection: 'row',
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
  productImage: {
    width: 62,
    height: 50,
    marginHorizontal: 14,
    marginTop: 25,
    paddingBottom: 14,
    position: 'relative',
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
    width: 54,
    height: 27,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#53B175',
    color: '#53B175',
    textAlign: 'center',
    marginHorizontal: 16,
    padding: 0,
    paddingHorizontal: 5,
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
  },
  measureName: {
    color: '#8f8f8f',
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
