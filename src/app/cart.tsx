import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { CartContext, useCart } from '@/providers/CartProvider'

const CartScreen = () => {
    const {items} =useCart();
  return (
    <View>
      <Text>{items.length}</Text>
    </View>
  )
}

export default CartScreen