import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import PruductCard from './components/ProductCard';
import React, {useState, useEffect} from 'react';
import request from '../../request';
import {AuthContext} from '../../App';
import SearchInput from '../../Components/Search/SearchInput';
import Loading from '../Authentication/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyShoppingCart from './components/EmptyShoppingCart';
import lang from '../../lang.json';

export default function ShoppingCart({navigation}) {
  const cartItemCount = React.useContext(AuthContext);

  const appContext = React.useContext(AuthContext);

  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(
    cartItemCount.state.cartItemCount,
  );

  const fetchItems = async () => {
    request(`/api-frontend/ShoppingCart/Cart`)
      .then(({data, headerData}) => {
        setShoppingCartProducts(data.items);
        setTotalPrice(data.all_amount);
        setIsLoading(false);
      })
      .catch(e => {});
  };

  const removeAllItems = async () => {
    request(`/api-frontend/ShoppingCart/RemoveCartItems`, 'DELETE')
      .then(({data, headerData}) => {
        if (data.success) {
          cartItemCount.authContext.setCartItemCount(data.total_products);
          // AsyncStorage.setItem('cartItemCount', data.total_products.toString());
          AsyncStorage.removeItem('cartItemCount')
        }
      })
      .catch(e => {
        console.log(e, 'errorik');
      });
  };

  useEffect(() => {
    fetchItems();
  }, [cartItemCount.state.cartItemCount]);

  if (isLoading) return <Loading />;
  if (shoppingCartProducts.length === 0) return <EmptyShoppingCart />;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchItems} />
        }
        style={styles.container}>
        <SearchInput>
          {shoppingCartProducts?.map((product, index) => {
            return (
              <View style={styles.menuItemContainer} key={index}>
                <PruductCard item={product} setTotalPrice={setTotalPrice} />
              </View>
            );
          })}
        </SearchInput>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate({
              name: appContext.state.userToken == null ? 'Login' : 'Checkout',
              params: {products: shoppingCartProducts},
            })
          }>
          <Text style={styles.nextButtonText}>
            {lang[appContext.state.lang].button.continue}
          </Text>
          <Text style={styles.totalPrice}>
            {lang[appContext.state.lang].shoppingCartPage.price} {totalPrice}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emptyButton} onPress={removeAllItems}>
          <Text style={styles.emptyButtonText}>
            {lang[appContext.state.lang].button.emptyTheCart}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  actionsContainer: {
    paddingHorizontal: '5%',
    backgroundColor: 'transparent',
  },
  nextButton: {
    width: '100%',
    padding: 4,
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
  emptyButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#8F8F8F',
  },
  emptyButtonText: {
    color: '#8F8F8F',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  totalPrice: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 13,
  },
  menuItemContainer: {
    paddingHorizontal: '5%',
  },
});
