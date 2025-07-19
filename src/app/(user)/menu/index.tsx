import ProductListItem from "@/components/ProductListItem";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import products from "@assets/data/products";
import { useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/api/products";

export default function MenuScreen() {

    const {data:products,error,isLoading}=useProductList();

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return <Text>Failed to Fetch Products</Text>
  }
  // // useEffect(()=>{
  // // const fetchProducts=async () => {
  // //   const {data,error}= await supabase.from('products').select("*")
  // //    console.log(data);
  // // }
  // // fetchProducts();
 
  
  // },[])
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
