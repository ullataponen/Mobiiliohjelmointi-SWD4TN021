import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Picker,
	Button,
} from "react-native";

export default function App() {
	const [selectedCurrency, setSelectedCurrency] = useState("");
	const [value, setValue] = useState();
	const [convertedValue, setConvertedValue] = useState("");
	const [rates, setRates] = useState([]);
	const key = Expo.Constants.manifest.extra.f_apikey;

	const currencyList = Object.keys(rates);

	useEffect(() => {
		getRates();
	}, []);

	const getRates = async () => {
		const url = "http://data.fixer.io/api/latest?access_key=" + key;

		// fetch(url)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setRates(data.rates);
		// 	})
		// 	.catch((e) => {
		// 		Alert.alert("Error fetching data, ", error);
		// 	});
		try {
			const response = await fetch(url);
			const data = await response.json();
			setRates(data.rates);
		} catch (e) {
			Alert.alert("Error fetching data, ", error);
		}
	};

	const getConversion = () => {
		let outputVal = (value / rates[selectedCurrency]).toFixed(2);
		setConvertedValue(outputVal);
	};

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: "https://source.unsplash.com/200x200/?money" }}
				style={styles.image}
			/>
			<Text style={{ fontSize: 20 }}>{convertedValue} €</Text>
			<View style={styles.interaction}>
				<TextInput
					keyboardType="numeric"
					style={styles.input}
					onChangeText={(value) => setValue(value)}
				/>
				<Picker
					style={styles.picker}
					selectedValue={selectedCurrency}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedCurrency(itemValue)
					}
				>
					{currencyList.map((c) => {
						return <Picker.Item key={c} label={c} value={c} />;
					})}
				</Picker>
			</View>
			<Button title="Convert" onPress={getConversion} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 10,
		marginBottom: 20,
	},
	interaction: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		margin: 10,
		width: "80%",
	},
	input: {
		width: "40%",
		borderWidth: 1,
		borderRadius: 50,
		borderColor: "#eee",
		paddingLeft: 10,
		backgroundColor: "#fff",
	},
	picker: {
		width: "40%",
	},
});
