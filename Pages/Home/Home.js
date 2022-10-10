import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  PixelRatio,
  RefreshControl,
} from 'react-native';
import BestSellers from './components/BestSellers';
import SpecialOffers from './components/SpecialOffers';
import CategoriesSection from './components/CategoriesSection';
import SearchInput from '../../Components/Search/SearchInput';
import {useEffect, useState} from 'react';
import request from '../../request';
import Loading from '../Authentication/Loading';
import React from 'react';

export default function Home({navigation}) {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [bestsellers, setBestsellers] = useState([]);
  const [isLoadingBestsellers, setIsLoadingBestsellers] = useState(true);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [isLoadingSpecialOffers, setIsLoadingSpecialOffers] = useState(true);
  // const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [render, setRender] = useState(false);

  const windowWidth = Dimensions.get('window').width;

  var products = require('../../assets/adimage.png');
  var maskGroup = require('../../assets/Banner.jpg');
  let seemon = require('../../assets/seemonad.png');

  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;

  function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }
  const fetchCategories = () => {
    request(
      `/api-frontend/Catalog/GetCategoriesDisplayedOnHomePage?pageIndex=0&pageSize=3&storeId=0&showHidden=false`,
    )
      .then(({data, headerData}) => {
        if (data.Categories) {
          setCategories(data.Categories);
        } else {
          setCategories([]);
        }

        setIsLoadingCategories(false);
      })
      .catch(e => {
        console.log(e, 'fetch categories error');
      });
  };

  const fetchBestsellers = () => {
    request(`/api-frontend/Product/BestSellersProducts`)
      .then(({data, headerData}) => {
        setBestsellers(data.Products);
        setIsLoadingBestsellers(false);
      })
      .catch(e => {});
  };

  const fetchSpecialOffers = () => {
    request(`/api-frontend/Product/HomePageProducts`)
      .then(({data, headerData}) => {
        setSpecialOffers(data.Products);
        setIsLoadingSpecialOffers(false)
      })
      .catch(e => {});
  };

  useEffect(() => {
    fetchCategories();
    fetchBestsellers();
    fetchSpecialOffers();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategories();
      fetchBestsellers();
      fetchSpecialOffers();
    });

    return unsubscribe;
  }, [navigation]);

  const forceRender = () => {
    // setRender(prev => !prev);
    fetchCategories();
    fetchBestsellers();
    fetchSpecialOffers();
  };

  if ( isLoadingSpecialOffers && isLoadingCategories && isLoadingBestsellers) {
    return <Loading />;
  } else {
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoadingCategories}
            onRefresh={forceRender}
          />
        }
        keyboardShouldPersistTaps="handled">
        <View style={styles.wrapper}>
          <SearchInput onHome={true}>
            <View style={{paddingHorizontal: '5%'}}>
              <CategoriesSection categories={categories} />

              <View style={styles.addContainer}>
                <View style={{width: windowWidth / 2}}>
                  <Image
                    style={{
                      width: windowWidth / 2 + 55,
                      height: windowWidth / 2,
                    }}
                    source={products}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: '#A5DACF',
                      marginBottom: 3,
                    }}>
                    Պատվիրեք դուք,
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      marginBottom: 3,
                      color: '#FF0000',
                    }}>
                    Կառաքի Սիմոնը
                  </Text>
                  <View style={styles.adLogo}>
                    <View>
                      <Image source={seemon} />
                    </View>
                  </View>
                </View>
              </View>

              <SpecialOffers specialOffers={specialOffers} />

              <View style={styles.addContainer}>
                <Image
                  style={{
                    width: windowWidth - windowWidth * 0.1,
                    height: windowWidth / 2 - 11,
                    marginRight: '5%',
                  }}
                  source={maskGroup}
                />
                <Text
                  style={{
                    position: 'absolute',
                    left: '4%',
                    fontSize: normalize(10),
                    color: '#53B175',
                    top: '36%',
                  }}>
                  Կատարեք գնումներ
                </Text>
                {/* <Text
                  style={{
                    position: 'absolute',
                    left: '4%',
                    fontSize: normalize(10),
                    color: '#53B175',
                  }}>
                  Ստացեք <Text style={{color: '#F04A38'}}>10% </Text>Զեղչ
                </Text> */}
              </View>

              <BestSellers bestsellers={bestsellers} />
            </View>
          </SearchInput>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoImage: {
    position: 'absolute',
    right: 0,
    top: 9,
  },

  addContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  addText: {
    marginBottom: 3,
  },
  addTextBottom: {
    color: '#FF0000',
  },
  adLogo: {
    alignItems: 'center',
    marginTop: 40,
  },
});
