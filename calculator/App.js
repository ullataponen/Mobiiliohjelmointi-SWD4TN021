import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
	const [valueA, setValueA] = useState();
	const [valueB, setValueB] = useState();
	const [result, setResult] = useState();

	const addValues = () => {
		setResult(parseInt(valueA) + parseInt(valueB));
		return result;
	};

	const subtractValues = () => {
		setResult(valueA - valueB);
		return result;
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20 }}>Result: {result}</Text>
			<TextInput
				style={styles.inputField}
				keyboardType="numeric"
				value={valueA}
				onChangeText={v => setValueA(v)}
			/>
			<TextInput
				style={styles.inputField}
				keyboardType="numeric"
				value={valueB}
				onChangeText={v => setValueB(v)}
			/>
			<View style={styles.containerHorizontal}>
				<Button onPress={addValues} title="+" />
				<Button onPress={subtractValues} title="-" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	containerHorizontal: {
		width: 100,
		flexDirection: "row",
		justifyContent: "space-around"
	},
	inputField: {
		margin: 10,
		width: "50%",
		borderColor: "#ddd",
		borderWidth: 1
	},
	btn: {
		width: 30
	}
});
