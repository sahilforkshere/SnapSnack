import { Pressable, Text,View } from "react-native";
import products from "@assets/data/products";
import { Image, StyleSheet } from "react-native";
import { Product } from "../types";
import { Link } from "expo-router";
const defaulImage='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

type ProductListItemProps={
    product: Product
}
const ProductListItem=({product}: ProductListItemProps)=>{
  return(
 <Link href={`/menu/${product.id}`} asChild>
  <Pressable style={styles.container}>
    <Image
      source={{ uri: product.image || defaulImage }}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>${product.price}</Text>
  </Pressable>
</Link>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding:10,
    borderRadius:20,
    flex:1,
    maxWidth:'50%'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color:'black'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price:{
 color :'black'
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductListItem;