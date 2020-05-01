import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { Header, Input, Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
				tx.executeSql(`delete from list where id = ?;`, [id]);
			},
			(e) => console.log("Error", e),
			updateList
		);
	};

	return (
		<View style={styles.container}>
			<Header
				centerComponent={{ text: "SHOPPING LIST", style: { color: "#fff" } }}
			/>
			<View style={styles.textInput}>
				<Input
					label="Product"
					value={product}
					onChangeText={(prod) => setProduct(prod)}
					placeholder="e.g. Milk"
				/>
				<Input
					label="Amount"
					value={amount}
					onChangeText={(amt) => setAmount(amt)}
					placeholder="e.g. 1 l"
				/>
			</View>
			<View style={styles.button}>
				<Button
					onPress={saveItem}
					title="SAVE"
					buttonStyle={{
						backgroundColor: "teal",
					}}
					raised
					icon={{ name: "save", color: "#fff" }}
				/>
			</View>
			<View style={styles.listItem}>
				<FlatList
					keyExtractor={(item) => item.id.toString()}
					data={data}
					renderItem={({ item }) => (
						<ListItem
							title={item.product}
							subtitle={item.amount}
							rightIcon={{ name: "delete" }}
							chevron
							onPress={() => deleteItem(item.id)}
							bottomDivider
						/>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textInput: {
		width: "100%",
		marginTop: 20,
	},
	button: {
		width: "80%",
		marginBottom: 20,
	},
	listItem: {
		flex: 1,
		width: "100%",
	},
});
