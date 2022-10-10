import {StyleSheet, Text, View, ImageBackground, TextInput} from 'react-native';
import React from 'react';


export default function AddedProductCard({item, onHomeScreen = false}) { 
  console.log(item,"****")

  return (
    <>
      <View style={[styles.productItemContainer]}>
        <View style={styles.productInfoContainer}>
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
                source={{uri: item.picture.full_size_image_url.replace("http://", "https://")}}
              />
            </View>
          </View>
          <View>
            <Text style={styles.productItemName}>{item.product_name}</Text>
            <Text style={{color: '#000'}}>
              Բոնուս {item.will_earn_reward_points} միավոր
            </Text>
            <Text style={{color: '#000'}}>{item.product_price.price}</Text>
            <Text style={styles.productPriceByQty} > ({item.product_price.standard_price}/{item.product_price.reference_measure_name}) </Text>

          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.countContainer}>
            <TextInput
              placeholderTextColor="#8F8F8F"
              editable={false}
              selectTextOnFocus={false}
              style={styles.countInput}
              value={String(item.quantity)}
            />
            <Text style={{color: "#8F8F8F", textAlign: "center", fontSize: 12 }} >{item.measure.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    width: '100%',
    marginVertical: 28,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 72,
    height: 60,

    marginHorizontal: 9,
    marginTop: 16,
    paddingBottom: 14,
    position: 'relative',
  },
  actionsContainer: {
    flexDirection: 'column',

    justifyContent: 'space-between',
  },
  countContainer: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent:"center"
  },
  countInput: {
    width: 34,
    height: 27,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#53B175',
    color: '#53B175',
    textAlign: 'center',
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
