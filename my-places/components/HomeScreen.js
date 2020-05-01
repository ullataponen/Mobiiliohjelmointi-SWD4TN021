import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";

const db = SQLite.openDatabase("shoppingdb.db");

export default function HomeScreen({ navigation }) {
	const [searchEntry, setSearchEntry] = useState("");
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				"create table if not exists places (id integer primary key not null, address text);"
			);
		});
		updateList();
	}, []);

	// save search term
	const saveItem = () => {
		db.transaction(
			(tx) => {
				tx.executeSql("insert into places (address) values (?);", [
					searchEntry,
				]);
			},
			(e) => console.log("Error", e),
			updateList
		);
		setSearchEntry("");
	};

	// delete item
	const deleteItem = (id) => {
		db.transaction(
			(tx) => {
				tx.executeSql(`delete from places where id = ?;`, [id]);
			},
			(e) => console.log("Error", e),
			updateList
		);
	};

	// update list
	const updateList = () => {
		db.transaction((tx) => {
			tx.executeSql("select * from places;", [], (_, { rows }) => {
				setPlaces(rows._array);
			});
		});
	};

	return (
		<View>
			<View style={styles.input}>
				<Input
					label="Placefinder"
					placeholder="Type in address"
					value={searchEntry}
					onChangeText={(entry) => setSearchEntry(entry)}
				/>
				<Button
					title="Save"
					onPress={saveItem}
					raised
					icon={{ name: "save", color: "#fff" }}
				/>
			</View>

			<FlatList
				data={places}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						title={item.address}
						rightSubtitle="Show on map"
						onPress={() =>
							navigation.navigate("Map", { address: item.address })
						}
						onLongPress={() => deleteItem(item.id)}
						chevron
						bottomDivider
					/>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	input: {
		padding: 10,
		backgroundColor: "#f0f0f0",
	},
});
