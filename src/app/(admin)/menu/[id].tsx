import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { Product, PizzaSize } from "../../../types";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
const sized: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const router=useRouter()
  const [PizzaSize, setPizzaSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() == id);
  const { addItem,items } = useCart();

  function addToCart() {
    if (!product) {
      return;
    }
    addItem(product, PizzaSize);
    router.push('/cart')
  }

  if (!product) {
    return <Text> Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
 
   

      <Text style={styles.price}>Price :${product.price}</Text>

    </View>
  );
};

export default ProductDetailScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",

  },
  sizes: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
