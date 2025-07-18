import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { CartContext, useCart } from '@/providers/CartProvider'
import { FlatList } from 'react-native'
import CartListItem from '@/components/CartListItem'

const CartScreen = () => {
    const {items} =useCart();
  return (
    <View>
   <FlatList data={items} renderItem={({item})=><CartListItem cartItem={item}/>}
   contentContainerStyle={{padding:10,gap:10}}
   />
    </View>
  )
}

export default CartScreen