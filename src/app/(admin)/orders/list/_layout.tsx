import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderLsitNavigator() {
  return(
  <SafeAreaView style={{flex:1,backgroundColor:'white'}} edges={['top']}>
    <TopTabs >
        <TopTabs.Screen name="index" options={{
 title :'Index'
        }}/>
        <TopTabs.Screen name="archive" options={{
 title :'Archive'
        }}/>
    </TopTabs>
  </SafeAreaView>)
}
