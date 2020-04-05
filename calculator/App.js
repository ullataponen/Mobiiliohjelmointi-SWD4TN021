import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	FlatList
} from "react-native";

export default function App() {
	const [valueA, setValueA] = useState();
	const [valueB, setValueB] = useState();
	const [result, setResult] = useState("");
	const [data, setData] = useState([]);
	const [text, setText] = useState("");

	const showResult = bool => {
		if (bool) {
			setResult(addValues());
			setText(`${valueA} + ${valueB} = `);
		} else {
			setResult(subtractValues());
			setText(`${valueA} - ${valueB} = `);
		}
		setValueA();
		setValueB();
	};

	const addValues = () => {
		let res = parseInt(valueA) + parseInt(valueB);
		return res;
	};

	const subtractValues = () => {
		let res = valueA - valueB;
		return res;
	};

	useEffect(() => {
		setData([...data, { key: text + result }]);
	}, [result]);

	return (
		<View style={styles.container}>
			<Text>Result: {result}</Text>
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
				<Button onPress={() => showResult(true)} title="+" />
				<Button onPress={() => showResult(false)} title="-" />
			</View>
			<Text style={{ fontSize: 20, margin: 30 }}>History</Text>
			<FlatList
				data={data}
				renderItem={({ item }) => <Text>{item.key}</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
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
