import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Pruduct from '../../../Components/Product/Product';
import Filter from '../../../Components/Product/Filter';
import Order from '../../../Components/Product/Order';
import request from '../../../request';
import SearchInput from '../../../Components/Search/SearchInput';
import Loading from '../../Authentication/Loading';
import NoResultIcon from '../../../assets/NoResultIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Category({route}) {
  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('NameAsc');
  const [loading, setLoading] = useState(false);

  const byTag = id => {
    request(`/api-frontend/Catalog/GetProductsByTag/${id}`, 'POST', {
      price: 'string',
      specification_option_ids: [0],
      manufacturer_ids: [0],
      order_by: 0,
      view_mode: 'string',
      page_index: 0,
      page_number: 0,
      page_size: 0,
      total_items: 0,
      total_pages: 0,
      first_item: 0,
      last_item: 0,
      has_previous_page: true,
      has_next_page: true,
      custom_properties: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string',
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
    if (route.params.searchByTag) {
      byTag(route.params.tagId);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.wrapper}>
      <SearchInput searchText={route.params.name} withFilter={true}>
        <View style={{position: 'absolute', right: 55, top: 20, width: 24}}>
          <Filter
            setFruits={setFruits}
            name={route?.params?.name}
            id={route?.params?.id}
            orderBy={orderBy}
            setIsLoading={setIsLoading}
            byTag={route?.params?.searchByTag}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 15,
            width: 24,
            top: 30,
          }}>
          <Order orderBy={orderBy} setOrderBy={setOrderBy} />
        </View>

        {isLoading ? (
          <View style={{marginTop: '50%'}}>
            <Loading />
          </View>
        ) : (
          <View style={{position: 'static'}}>
            {fruits?.length > 0 ? (
              <KeyboardAwareScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingHorizontal: '6%',
                    marginTop: 20,
                  }}>
                  {/* <Text>aaa</Text> */}
                  {fruits?.map((fruit, index) => {
                    return (
                      <Pruduct
                        key={index}
                        item={fruit}
                        onHomeScreen={route.params.onHomeScreen}
                      />
                    );
                  })}
                </View>
              </KeyboardAwareScrollView>
            ) : (
              <View style={styles.noResultContainer}>
                <NoResultIcon />
                <Text style={styles.noResultText}>Տվյալներ չեն գտնվել</Text>
              </View>
            )}
          </View>
        )}
      </SearchInput>
    </ScrollView>
  );
  // }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },

  menuItemContainer: {
    marginTop: 20,
    flex: 1,
  },
  noResultContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  noResultText: {
    marginTop: 40,
  },
});
