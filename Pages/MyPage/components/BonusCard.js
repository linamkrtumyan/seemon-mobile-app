import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import request from '../../../request';
import BonusCardIcon from '../../../assets/BonusCardIcon';
import Loading from '../../Authentication/Loading';

export default function BonusCard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBonusCardInfo = async () => {
    request('/api-frontend/Customer/RewardPointsInfo')
      .then(({data, headerData}) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(e => console.log(e, 'get fetchBonusCardInfo error'));
  };

  useEffect(() => {
    fetchBonusCardInfo();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.cardName}>Բոնուս Քարտ</Text>
          <Text style={styles.cardNumber}>{data.RewardPointsCode}</Text>
        </View>

        <Text style={styles.fullname}>
          {data.FirstName} {data.LastName}
        </Text>
        <View style={styles.logo}>
          <BonusCardIcon />
        </View>
      </View>

      <Text style={styles.title}>Կուտակած միավորներ</Text>

      <View style={styles.pointContainer}>
        <Text style={styles.point}>{data.AllRewardPoints}</Text>
      </View>
      <View style={styles.line} />

      <Text style={styles.exchangeRate}>{data.ExchangeRate}</Text>
      <Text style={styles.info}>*{data.MinOrderTotalText}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#a5dacf',
    borderRadius: 12,
    marginHorizontal: '5%',
    height: Dimensions.get('window').height / 4,
    position: 'relative',
    marginTop: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  container: {
    position: 'absolute',
    top: 26,
    left: 26,
  },
  cardName: {
    fontSize: Dimensions.get('window').width / 20,
    letterSpacing: 0.6,
  },
  cardNumber: {
    fontSize: Dimensions.get('window').width / 20,
    letterSpacing: 0.6,
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 23,
  },
  fullname: {
    position: 'absolute',
    bottom: 21,
    left: 26,
    fontSize: Dimensions.get('window').width / 20,
    color: '#fff',
    letterSpacing: 0.6,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19.5,
    letterSpacing: -0.24,
    marginTop: 39,
    marginBottom: 24,
    color: '#000',
  },
  pointContainer: {
    borderRadius: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 3,
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  point: {
    position: 'absolute',

    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    top: Dimensions.get('window').width / 4 - 15,
    right: 0,
    textAlign: 'center',
    lineHeight: 35,
    color: '#F04A38',
    fontSize: 34,
  },
  line: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: '90%',
    height: 1,
    marginVertical: 28,
    marginLeft: '5%',
  },
  exchangeRate: {
    marginLeft: '5%',
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  info: {
    marginLeft: '5%',
    color: '#000',
  },
});
