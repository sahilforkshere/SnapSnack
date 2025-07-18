import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text,View } from "react-native";
import { FlatList } from "react-native";


export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();

  const order=orders.find((o)=>o.id.toString()==id)

  if (!order) {
   return  <Text>Not Found Any Order</Text>
  }
  return (
    <View style={{padding:10,gap:20}}>
       <Stack.Screen options={{title:`Order #${id}`}}/>
    <OrderListItem order={order}/>
    <FlatList data={order.order_items} renderItem={({item})=><OrderItemListItem item={item}/>} contentContainerStyle={{gap:10}}/>
    </View>
  );
}
