import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FeedScreen } from "../screens/FeedScreen.js";
import { SearchScreen } from "../screens/SearchScreen.js";
import { ProfileScreen } from "../screens/ProfileScreen.js";
import { NotificationsScreen } from "../screens/NotificationsScreen.js";
import { MessagesScreen } from "../screens/MessagesScreen.js";
import { colors, fontSize } from "../theme/index.js";
import type { RootStackParamList, MainTabParamList } from "../types/index.js";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<string, [string, string]> = {
  Feed: ["🏠", "🏡"], Search: ["🔍", "🔎"], Create: ["➕", "✚"],
  Activity: ["❤️", "💗"], MyProfile: ["👤", "👤"],
};

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
          {focused ? tabIcons[route.name]?.[1] : tabIcons[route.name]?.[0]}
        </Text>
      ),
    })}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create" component={FeedScreen} />
      <Tab.Screen name="Activity" component={NotificationsScreen} />
      <Tab.Screen name="MyProfile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: "Profile" }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerTitle: "Notifications" }} />
        <Stack.Screen name="Messages" component={MessagesScreen} options={{ headerTitle: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, height: 85, paddingBottom: 25 },
});
