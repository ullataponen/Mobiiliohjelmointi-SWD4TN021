import React, { useState, useEffect } from "react";

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Alert,
	AsyncStorage,
} from "react-native";

export default function App() {
	const [text, setText] = useState("Guess a number between 1-100");
	const [value, setValue] = useState();
	const [counter, setCounter] = useState(1);
	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * 100) + 1
	);
	const [top, setTop] = useState();

	useEffect(() => {
		fetchAsync();
	}, []);

	const fetchAsync = async () => {
		try {
			const value = await AsyncStorage.getItem("HighScore");
			setTop(JSON.parse(value));
			return jsonVal;
		} catch (error) {
			Alert.alert("Error reading data");
		}
	};

	const checkMatch = () => {
		setCounter(counter + 1);
		console.log(counter);
		if (value < randomNumber) {
			setText(`Your guess ${value} is too small`);
		} else if (value > randomNumber) {
			setText(`Your guess ${value} is too big`);
		} else if (value == randomNumber) {
			Alert.alert(
				`Correct number! You guessed the number in ${counter} guesses.`
			);
			checkIfTop(counter);
			setRandomNumber(Math.floor(Math.random() * 100) + 1);
			setCounter(1);
			setText("Guess a number between 1-100");
		}
		setValue();
	};

	const checkIfTop = async (counter) => {
		try {
			if (top === undefined || top === NaN || counter < top) {
				await AsyncStorage.setItem("HighScore", JSON.stringify(counter));
			}
		} catch (e) {
			Alert.alert("Error saving data");
		}
		try {
			let fetchValue = await AsyncStorage.getItem("HighScore");
			setTop(JSON.parse(fetchValue));
		} catch (e) {
			Alert.alert("Error reading data");
		}
	};

	return (
		<View style={styles.container}>
			<Text>{text}</Text>
			<TextInput
				keyboardType="numeric"
				style={{
					width: 100,
					borderColor: "lightgray",
					borderWidth: 1,
					margin: 10,
				}}
				onChangeText={(value) => setValue(value)}
				value={value}
			/>
			<Button title="Make a Guess" onPress={checkMatch} />
			<Text style={{ marginTop: 20 }}>
				Highscore: {top ? `${top} guesses` : "No guesses"}
			</Text>
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
});
