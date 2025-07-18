import { View, Text } from "react-native";
import React from "react";
import { useContext } from "react";
import { CartContext, useCart } from "@/providers/CartProvider";
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items,total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{marginTop:20,fontSize:20,fontWeight:'500'}}> Total : {total}</Text>
      <Button text="Checkout" />
    </View>
  );
};

export default CartScreen;
