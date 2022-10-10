import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import SearchInput from "../../Components/Search/SearchInput";
import FavoritePruductCard from "./components/ProductCard";
import React, { useEffect, useState } from "react";
import request from "../../request";
import EmptyFavorites from "./components/EmptyFavorites";
import Loading from "../Authentication/Loading";

export default function Favorites({ navigation }) {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);

  useEffect(() => {
    if (deletedItemId != null) {
      const result = products.filter((product) => product.id != deletedItemId);
      setProducts(result);
    }
  }, [deletedItemId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchItems = async () => {
    setIsLoading(true);
    request(`/api-frontend/Wishlist/Wishlist`)
      .then(({ data, headerData }) => {
        setProducts(data.items);
        setProductCount(data.items.length);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {products.length > 0 ? (
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchItems} />
            }
            style={styles.wrapper}
          >
            <View>
              <SearchInput>
                <View style={styles.container}>
                  {products.map((product, index) => {
                    return (
                      <FavoritePruductCard
                        key={index}
                        item={product}
                        index={index}
                        productCount={productCount}
                        setProductCount={setProductCount}
                        setDeletedItemId={setDeletedItemId}
                      />
                    );
                  })}
                </View>
              </SearchInput>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <EmptyFavorites />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  container: {
    paddingHorizontal: "5%",
  },
});
