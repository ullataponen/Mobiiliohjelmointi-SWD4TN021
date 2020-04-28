import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	FlatList,
} from "react-native";

export default function App() {
	const [product, setProduct] = useState("");
	const [amount, setAmount] = useState(null);
	const [data, setData] = useState([]);

	const db = SQLite.openDatabase("shoppingdb.db");

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				"create table if not exists list (id integer primary key not null, product text, amount text);"
			);
		});
		updateList();
	}, []);

	// save shopping item
	const saveItem = () => {
		db.transaction(
			(tx) => {
				tx.executeSql("insert into list (product, amount) values (?, ?);", [
					product,
					amount,
				]);
			},
			(e) => console.log("Error", e),
			updateList
		);
		setProduct("");
		setAmount();
	};

	// update list
	const updateList = () => {
		db.transaction((tx) => {
			tx.executeSql("select * from list;", [], (_, { rows }) => {
				setData(rows._array);
			});
		});
	};

	// delete item
	const deleteItem = (id) => {
		db.transaction(
			(tx) => {
				tx.executeSql("delete from list where id = ?;", [id]);
			},
			(e) => console.log("Error", e),
			updateList
		);
	};

	const listSeparator = () => {
		return <View style={styles.separator}></View>;
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				value={product}
				onChangeText={(prod) => setProduct(prod)}
				placeholder="Product"
			/>
			<TextInput
				style={styles.textInput}
				value={amount}
				onChangeText={(amt) => setAmount(amt)}
				placeholder="Amount"
			/>
			<Button onPress={saveItem} title="SAVE" />

			<Text style={styles.heading}>Shopping list</Text>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				data={data}
				renderItem={({ item }) => (
					<View style={styles.itemLine}>
						<Text style={styles.item}>{item.product}</Text>
						<Text style={styles.item}>{item.amount}</Text>
						<Text style={styles.deleteBtn} onPress={() => deleteItem(item.id)}>
							Delete
						</Text>
					</View>
				)}
				ItemSeparatorComponent={listSeparator}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 50,
	},
	heading: {
		fontSize: 20,
		fontFamily: "monospace",
		color: "limegreen",
		margin: 30,
	},
	textInput: {
		width: "60%",
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 8,
		margin: 10,
		paddingLeft: 5,
	},
	itemLine: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	item: {
		margin: 10,
	},
	deleteBtn: {
		color: "red",
		borderColor: "red",
		borderWidth: 2,
		borderRadius: 5,
		padding: 5,
		marginLeft: 10,
	},
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#eee",
	},
});
