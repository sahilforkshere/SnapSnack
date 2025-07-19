import ProductListItem from "@/components/ProductListItem";
import { ActivityIndicator } from "react-native";
import { useProductList } from "@/api/products";

import { FlatList, Text, View } from "react-native";
import products from "@assets/data/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to Fetch Products</Text>;
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
