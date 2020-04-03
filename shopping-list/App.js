import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	FlatList
} from "react-native";

export default function App() {
	const [text, setText] = useState("");
	const [data, setData] = useState([]);

	const addToList = () => {
		setData([...data, { key: text }]);
		setText("");
	};

	const clearList = () => {
		setData([]);
		setText("");
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={{
					width: "60%",
					borderWidth: 1,
					borderColor: "#999",
					borderRadius: 8,
					marginTop: 100,
					marginBottom: 30
				}}
				value={text}
				onChangeText={text => setText(text)}
				placeholder="Add items to your shopping list"
			/>
			<View
				style={{
					flexDirection: "row",
					width: "50%",
					justifyContent: "space-between"
				}}
			>
				<Button onPress={addToList} title="Add to list" />
				<Button onPress={clearList} title="Clear" />
			</View>

			<Text style={styles.heading}>Shopping list</Text>
			<FlatList
				data={data}
				renderItem={({ item }) => <Text>{item.key}</Text>}
			/>
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
	heading: {
		fontSize: 20,
		color: "salmon",
		margin: 30
	}
});
