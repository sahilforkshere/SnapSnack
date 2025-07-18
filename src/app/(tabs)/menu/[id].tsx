import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { Product, PizzaSize } from "../../../types";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
const sized: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const [PizzaSize, setPizzaSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() == id);
  const { addItem,items } = useCart();

  function addToCart() {
    if (!product) {
      return;
    }
    addItem(product, PizzaSize);
  }

  if (!product) {
    return <Text> Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text> Select Size</Text>
      <View style={styles.sizes}>
        {sized.map((size) => (
          <Pressable
            onPress={() => {
              setPizzaSize(size);
            }}
            style={[
              styles.size,
              { backgroundColor: PizzaSize == size ? "gainsboro" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: PizzaSize == size ? "black" : "grey",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}{" "}
      </View>

      <Text style={styles.price}>Price :${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
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
    marginTop: "auto",
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
