import { Tabs } from "expo-router";
import { theme } from "../theme";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorCerulean,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarStyle: {
          backgroundColor: theme.colorWhite,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping list",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "My idea",
          tabBarIcon: ({ color, size }) => (
            <Feather name="feather" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
