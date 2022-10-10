import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import HeartIcon from '../../assets/HeartIcon';
import request from '../../request';
import {useToast} from 'react-native-toast-notifications';
import HTMLView from 'react-native-htmlview';
import Product from '../../Components/Product/Product';
import Loading from '../Authentication/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App';
import lang from '../../lang.json';

const window = Dimensions.get('window');

export default function ProductDetails({navigation, route}) {
  const appContext = React.useContext(AuthContext);
  const scrollRef = useRef();
  const toast = useToast();
  var plus = require('../../assets/plus.png');
  var minus = require('../../assets/minus.png');
  const [details, setDetails] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlistId, setWishlistId] = useState(null);

  const fetchData = async () => {
    request(
      `/api-frontend/Product/GetProductDetails/${route.params?.id}?updateCartItemId=0`,
    )
      .then(({data, headerData}) => {
        setDetails(data);
        setFavorite(data.exist_in_wishlist);
        setSliderImages(
          Array.from(
            data.picture_models.map(a =>
              a.full_size_image_url.replace('http://', 'https://'),
            ),
          ),
        );
        setItemCount(data.order_min_quantity);
        if (data.related_shopping_cart_item_id != null) {
          setWishlistId(data.related_shopping_cart_item_id);
        }

        setIsLoading(false);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };
  const fetchRelatedProducts = async () => {
    request(
      `/api-frontend/Product/RelatedProducts?productId=${route.params?.id}&pageIndex=0&pageSize=2&getOnlyTotalCount=false`,
    )
      .then(({data, headerData}) => {
        setRelatedProducts(data.Products);
      })
      .catch(e => {});
  };

  useEffect(() => {
    if (route.params?.id > 0) {
      fetchData();
      fetchRelatedProducts();
    }
    scrollRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: true,
    });
  }, [route.params?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: true,
    });
  }, []);

  const onPress = () => {};

  const addWishlist = async () => {
    request(
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${details.id}?shoppingCartType=Wishlist&quantity=${itemCount}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(data.message);
          setWishlistId(data.shopping_cart_item_id);
        } else {
          toast.show(String(`${data?.errors[0]}`));
        }
      })
      .catch(e => {
        console.log(e, 'add wishlist error');
      });
  };

  const deleteFromWishlist = () => {
    request('/api-frontend/Wishlist/UpdateWishlist', 'POST', {
      removefromcart: details.related_shopping_cart_item_id ?? wishlistId,
    })
      .then(({data, headerData}) => {
        if (data.success) {
          toast.show(data.message);
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

  const add = async () => {
    request(
      `/api-frontend/ShoppingCart/AddProductToCartFromCatalog/${route.params?.id}?shoppingCartType=ShoppingCart&quantity=${itemCount}`,
      'POST',
    )
      .then(({data, headerData}) => {
        if (data.success) {
          AsyncStorage.setItem('cartItemCount', String(data.total_products)),
            appContext.authContext.setCartItemCount(data.total_products),
            toast.show(data.message);
        } else {
          toast.show(String(`${data?.errors[0]}`));
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  const addToCart = () => {
    if (details.base_price_unit_id === 5) {
      if (!isNaN(itemCount) && itemCount.toString().indexOf('.') != -1) {
        toast.show(lang[appContext.state.lang].errors.invalidInput);
      } else {
        if (itemCount > 0) add();
      }
    } else {
      if (itemCount > 0) {
        add();
      } else {
        toast.show(lang[appContext.state.lang].errors.invalidInput);
      }
    }
  };

  const toSearch = id => {
    navigation.navigate({
      name: 'Category',
      params: {
        searchByTag: true,
        tagId: id,
      },
    });
  };

  if (isLoading && details.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
        ref={scrollRef}>
        <SliderBox
          images={sliderImages}
          sliderBoxHeight={window.height / 3}
          dotColor="#F04A38"
          inactiveDotColor="#8F8F8F"
          paginationBoxVerticalPadding={8}
          imageLoadingColor="#F04A38"
          ImageComponentStyle={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        />
        <View style={styles.wrapper}>
          <View style={styles.nameContainer}>
            <Text onPress={onPress} style={styles.title}>
              {details.name}
              {details.short_description ? (
                <Text> ({details?.short_description})</Text>
              ) : null}
            </Text>

            <TouchableOpacity
              onPress={() => addToFavorite()}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
              <HeartIcon favorite={favorite} />
            </TouchableOpacity>
          </View>
          <Text style={styles.count}>
            {details.baseprice_amount} {details?.measure?.name}
          </Text>

          <View style={styles.priceContainer}>
            <Text
              style={
                details.product_price?.price_with_discount
                  ? styles.discountPriceLine
                  : styles.price
              }>
              {details?.product_price?.price}
            </Text>
            <View style={styles.toCartCountButton}>
              <TouchableOpacity
                disabled={itemCount < details.order_min_quantity ? true : false}
                hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}
                onPress={() =>
                  itemCount - details?.baseprice_amount <
                  details.order_min_quantity
                    ? setItemCount(details.order_min_quantity)
                    : setItemCount(
                        (itemCount * 10 - details.baseprice_amount * 10) / 10,
                      )
                }>
                <Image source={minus} />
              </TouchableOpacity>

              <View>
                <TextInput
                placeholderTextColor="#8F8F8F"
                style={styles.toCartCount}
                onChangeText={text => {
                  details.measure.system_keyword === 'gram' ||
                  details.measure.system_keyword === 'piece'
                    ? setItemCount(text.replace(/[^0-9]/g, ''))
                    : setItemCount(text.replace(',', '.'));
                }}
                value={String(itemCount)}
                keyboardType="decimal-pad"
              />
                <Text style={{color: '#8F8F8F', textAlign: "center", fontSize: 12}}>
            {details.measure.name}
          </Text>
              </View>

              

              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 20, right: 30}}
                onPress={() =>
                  setItemCount(
                    (itemCount * 10 + details?.baseprice_amount * 10) / 10,
                  )
                }>
                <Image source={plus} />
              </TouchableOpacity>
            </View>
          </View>
        
          {details.product_price?.price_with_discount ? (
            <Text style={styles.discountPrice}>
              {lang[appContext.state.lang].productDetails.discount}՝{' '}
              <Text>{details.product_price.price_with_discount}</Text>
            </Text>
          ) : null}

          <Text style={styles.productPriceByQty}>
            {' '}
            ({details.product_price.standard_price}/
            {details.product_price.reference_measure_name}){' '}
          </Text>
          {details?.product_manufacturers.length > 0 ? (
            <Text style={styles.manufacture}>
              {lang[appContext.state.lang].productDetails.manufacturer}:{' '}
              {details?.product_manufacturers?.map((manufacturer, index) => {
                return (
                  <Text key={index} style={styles.manufactureCountry}>
                    {manufacturer.name}
                  </Text>
                );
              })}
            </Text>
          ) : null}

          <View style={styles.tagsContainer}>
            {details?.product_tags?.map((tag, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => toSearch(tag.id)}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>{tag.name} </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {details.full_description ? (
            <>
              <View style={styles.line} />
              <Text style={styles.subtitle}>
                {lang[appContext.state.lang].productDetails.description}
              </Text>
              <HTMLView value={details.full_description} stylesheet={styles} />
            </>
          ) : null}

          {relatedProducts.length > 0 ? (
            <>
              <View style={styles.line} />
              <Text style={styles.secondaryTitle}>
                {lang[appContext.state.lang].productDetails.similarProducts}
              </Text>
              <View style={[styles.productItemsContainer]}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  {relatedProducts?.map((relatedProduct, index) => {
                    return (
                      <Product
                        item={relatedProduct}
                        onHomeScreen={route.params.onHomeScreen}
                      />
                    );
                  })}
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.loginScreenButton} onPress={addToCart}>
        <Text style={styles.loginText}>
          {lang[appContext.state.lang].button.addToCart}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 44,
    height: '100%',
  },
  wrapper: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 21,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.24,
    width: '80%',
    color: '#000',
  },

  count: {
    marginTop: 12,
    color: '#8F8F8F',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 27,
    color: '#000',
  },
  discountPriceLine: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 27,
    color: '#000',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#F04A38',
  },

  toCartCountButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 28,
  },
  toCartCount: {
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#53B175',
    height: 28,
    width: 80,
    marginHorizontal: 16,
    color: '#53B175',
    padding: 0,
  },
  discountPrice: {
    color: '#F04A38',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 1,
  },
  manufacture: {
    color: '#8F8F8F',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.24,
    marginTop: 16,
  },
  manufactureCountry: {
    color: '#000',
    paddingLeft: 4,
    marginTop: 16,
    marginRight: 5,
  },

  tagsContainer: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 32,
  },

  filterItem: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8F8F8F',
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  filterText: {
    fontSize: 12,
    lineHeight: 15,
    paddingHorizontal: 6,
    paddingVertical: 4,
    textAlign: 'center',
    color: '#8F8F8F',
  },
  line: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  subtitle: {
    marginVertical: 24,
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  p: {
    color: '#8F8F8F',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.24,
    marginBottom: 24,
  },
  secondaryTitle: {
    color: '#000000',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.24,
    marginTop: 34,
    marginBottom: 16,
  },
  productItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loginScreenButton: {
    width: '90%',
    padding: 14,
    backgroundColor: '#F04A38',
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: '5%',
  },
  loginText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
  productPriceByQty: {
    // textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.24,
    color: '#8F8F8F',
    marginTop: 6,
  },
});
