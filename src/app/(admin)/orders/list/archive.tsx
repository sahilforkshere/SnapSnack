import { FlatList, Text } from "react-native"
import orders from "@assets/data/orders"
import OrderListItem from "@/components/OrderListItem"


export default function OrderScreem(){
    return (
        <FlatList
           data={orders}
           renderItem={({item})=> <OrderListItem order={item}/>}
        />
    )
}