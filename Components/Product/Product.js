import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import HeartIcon from '../../assets/HeartIcon';
import request from '../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App';
import lang from '../../lang.json';
import WhiteShoppingCartIcon from '../../assets/WhiteShoppingCartIcon';
import ProductPlusIcon from '../../assets/ProductPlusIcon';
import ProductMinusIcon from '../../assets/ProductMinusIcon';

export default function Pruduct({item, onHomeScreen = false}) {
  // console.log(item,"item")
  const cartItemCount = React.useContext(AuthContext);
  const toast = useToast();
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(item.ExistInWishlist);
  const [itemCount, setItemCount] = useState(item.OrderMinQuantity);
  const [wishlistId, setWishlistId] = useState(null);

  useEffect(() => {
    setFavorite(item.ExistInWishlist);
    setItemCount(item.OrderMinQuantity)
  }, [item]);

  useEffect(() => {
    if (item.RelatedShoppingCartItemId != null) {
      setWishlistId(item.RelatedShoppingCartItemId);
    }
  }, []);

  const addWishlist = () => {
    request(
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${item.Id}?shoppingCartType=Wishlist&quantity=${item.OrderMinQuantity}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(data.message);
          setWishlistId(data.shopping_cart_item_id);
        } else {
          toast.show(data.message);
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  const deleteFromWishlist = () => {
    request('/api-frontend/Wishlist/UpdateWishlist', 'POST', {
      removefromcart: wishlistId,
    })
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(String(data.message));
        } else {
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

    setFavorite(!favorite);
  };

  const add = () => {
    console.log("first")
    request(
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${item.Id}?shoppingCartType=ShoppingCart&quantity=${itemCount}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          AsyncStorage.setItem('cartItemCount', String(data.total_products)),
            cartItemCount.authContext.setCartItemCount(data.total_products),
            toast.show(data.message);
        } else {
          toast.show(data.message);
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  const addToCart = count => {
    if (count < item.OrderMinQuantity) {
      setItemCount(item.OrderMinQuantity);
    }
    if (item.BasePriceUnitId == 5) {
      if (!isNaN(count) && count.toString().indexOf('.') != -1) {
        toast.show(lang[cartItemCount.state.lang].errors.invalidInput);
      } else {
        if (count > 0) add();
      }
    } else {
      if (count > 0) {
        add();
      } else {
        toast.show(lang[cartItemCount.state.lang].errors.invalidInput);
      }
    }
  };

  return (
    <View style={[styles.productItemContainer]}>
      <TouchableOpacity
        onPress={() => addToFavorite()}
        hitSlop={{top: 50, bottom: 50, left: 50, right: 150}}>
        <HeartIcon favorite={favorite} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            name: 'ProductDetails',
            params: {id: item.Id, onHomeScreen: onHomeScreen},
          });
        }}>
        <View style={styles.productItemImage}>
          <Image
            style={{
              width: item.DefaultPictureModel?.Width,
              height: item.DefaultPictureModel?.Height,
            }}
            source={{
              uri: item?.DefaultPictureModel?.FullSizeImageUrl.replace(
                'http://',
                'https://',
              ),
            }}
          />
        </View>
        <Text numberOfLines={1} style={styles.productItemName}>
          {item.Name}
        </Text>
        <Text style={styles.pruductItemCount}>
          {item.BasepriceAmount} {item.Measure.Name}{' '}
        </Text>
        {item.ProductPrice.OldPrice != null ? (
          <>
            <Text
              style={{
                color: '#000',
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                textDecorationColor: 'red',
                textAlign: 'center',
              }}>
              {item.ProductPrice.OldPrice}
            </Text>
            <Text style={styles.productItemDiscountPrice}>
              <Text>{item.ProductPrice.Price}</Text>
            </Text>
          </>
        ) : (
          <>
            <Text style={{lineHeight: 20, color: 'transparent'}}>
              {item.ProductPrice.Price}
            </Text>
            <Text style={styles.productItemPrice}>
              {item.ProductPrice.Price}
            </Text>
          </>
        )}

        <Text style={styles.productPriceByQty} > ({item.ProductPrice.StandardPrice}/{item.ProductPrice.ReferenceMeasureName}) </Text>
      </TouchableOpacity>

      <View style={styles.toCartCountButton}>
        <TouchableOpacity
          disabled={itemCount < item.OrderMinQuantity ? true : false}
          hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}
          onPress={() =>
            itemCount - item?.BasepriceAmount < item.OrderMinQuantity
              ? setItemCount(item.OrderMinQuantity)
              : setItemCount((itemCount * 10 - item?.BasepriceAmount * 10) / 10)
          }>
          <ProductMinusIcon />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              item.Measure.SystemKeyword === 'gram' ||
              item.Measure.SystemKeyword === 'piece'
                ? setItemCount(text.replace(/[^0-9]/g, ''))
                : setItemCount(text.replace(',', '.'));
            }}
            value={String(itemCount)}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
          onPress={() =>
            setItemCount((itemCount * 10 + item?.BasepriceAmount * 10) / 10)
          }>
          <ProductPlusIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
        style={styles.toCartButton}
        onPress={() => addToCart(String(itemCount))}>
        <WhiteShoppingCartIcon />
        <Text style={styles.toCartButtonText}>
          {lang[`${cartItemCount.state.lang}`].productCard.shoppingCart}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    width: '47%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A5DACF',
    paddingTop: 12,
    paddingHorizontal: 10,
    marginBottom: 19,
  },
  menuTitleForMargin: {
    marginBottom: 17,
  },
  productItemImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItemName: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 15,
    color: '#000',
  },
  pruductItemCount: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#8F8F8F',
    marginTop: 26,
  },
  productPriceByQty: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#8F8F8F',
    marginTop: 6,
  },
  productItemDiscountPrice: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: 'red',
    marginTop: 1,
    flexDirection: 'column',
    flex: 1,
  },
  productItemPrice: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#000000',
    marginTop: 1,
  },
  toCartCountButton: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#A5DACF',
    marginBottom: 14,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
  },
  toCartButton: {
    paddingVertical: 5,
    paddingHorizontal: 24,
    backgroundColor: '#53B175',
    borderRadius: 19,
    marginBottom: 14,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  toCartButtonText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    marginLeft: 8,
  },
  inputContainer: {
    height: 30,
    width: '60%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    color: '#53B175',
    borderColor: '#E2E2E2',
    position: 'relative',
  },
  input: {
    color: '#53B175',
    lineHeight: 22,
    fontSize: 16,
    borderColor: '#E2E2E2',
    textAlign: 'center',
    padding: 0,
  },
});
