import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme.web";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Redirect from "expo-router";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
   const {isAdmin  }=useAuth();
  
    if (!isAdmin) {
      return <Redirect href={'/'}/>
    }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor:'gainsboro',
        
     
        tabBarStyle:{
          backgroundColor:Colors.light.tint
        }
      }}
    >
      <Tabs.Screen name="index" options={{href:null}}/>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color}  />,
        }}
      />
    </Tabs>
  );
}
