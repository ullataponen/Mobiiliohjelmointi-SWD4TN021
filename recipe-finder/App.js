import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	Image,
	View,
	FlatList,
	Linking,
	TextInput,
	Button,
	Alert,
} from "react-native";

export default function App() {
	const [ingredient, setIngredient] = useState("");
	const [recipes, setRecipes] = useState([]);

	const getRecipes = () => {
		const url = "http://www.recipepuppy.com/api/?q=" + ingredient;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setRecipes(data.results);
			})
			.catch((e) => {
				Alert.alert("Error", e);
			});
	};

	const separator = () => {
		return (
			<View
				style={{
					height: 2,
					width: "100%",
					backgroundColor: "teal",
					margin: 10,
				}}
			></View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={{ margin: "5%" }}
				keyExtractor={(item) => item.href}
				renderItem={({ item }) => {
					if (item.thumbnail === "" || !item.thumbnail) {
						return (
							<View
								style={{
									flex: 1,
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Image
									source={{ uri: "http://www.recipepuppy.com/img/logonew.png" }}
									style={{ width: 125, height: 48 }}
									onError={(e) => console.log("Error", e)}
								/>
								<Text
									style={styles.link}
									onPress={() => Linking.openURL(item.href)}
								>
									{item.title}
								</Text>
							</View>
						);
					} else {
						return (
							<View
								style={{
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Image
									source={{ uri: item.thumbnail }}
									style={{ width: 100, height: 100 }}
									onError={(e) => console.log("Error", e)}
								/>
								<Text
									style={styles.link}
									onPress={() => Linking.openURL(item.href)}
								>
									{item.title}
								</Text>
							</View>
						);
					}
				}}
				data={recipes}
				ItemSeparatorComponent={separator}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={ingredient}
					placeholder="Ingredient, e.g. 'tomato'"
					onChangeText={(ingr) => setIngredient(ingr)}
				/>
				<Button title="Find recipes" onPress={getRecipes} />
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
		backgroundColor: "lightblue",
	},
	link: {
		color: "blue",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		width: "50%",
		padding: 5,
		margin: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#eee",
		backgroundColor: "#fff",
	},
});
