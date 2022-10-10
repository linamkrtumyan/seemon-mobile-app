import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import ShoppingCart from '../../assets/ShoppingCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {AuthContext} from '../../App';

export default function ToCart() {

  const appContext = React.useContext(AuthContext);

  const navigation = useNavigation();
  const [totalCount, setTotalCount] = useState(0);

  const bootstrapAsync = async () => {
    try {
      setTotalCount(await AsyncStorage.getItem('cartItemCount'));
    } catch (e) {
      console.log(e, 'error');
      setTotalCount(0);
    }
  };

  console.log(appContext.state.cartItemCount,"appContext.state.cartItemCount")

  React.useEffect(() => {
    bootstrapAsync();
  }, [AsyncStorage.getItem('cartItemCount')]);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ShoppingCart')}
      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
      {appContext.state.cartItemCount == null ||
      appContext.state.cartItemCount == 0 ? null : (
        <View style={styles.itemCountContainer}>
          <Text style={{fontSize: 12, color: '#fff'}}>
            {appContext.state.cartItemCount}
          </Text>
        </View>
      )}

      <View>
        <ShoppingCart />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginRight: 20,
    position: 'relative',
  },
  itemCountContainer: {
    position: 'absolute',
    right: -5,
    top: -10,
    backgroundColor: '#F04A38',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 5,
  },
});
