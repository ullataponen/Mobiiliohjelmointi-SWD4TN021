import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import MapScreen from "./components/MapScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="My Places" component={HomeScreen} />
				<Stack.Screen name="Map" component={MapScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
