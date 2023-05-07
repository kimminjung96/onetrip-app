import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screen/Main";
import Product from "./screen/Product";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ title: "One Trip" }}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{ title: "상품상세" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
