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
	let top;

	const checkMatch = () => {
		setCounter(counter + 1);
		console.log(counter);
		if (value < randomNumber) {
			setText(`Your guess ${value} is too small`);
		} else if (value > randomNumber) {
			setText(`Your guess ${value} is too big`);
		} else {
			Alert.alert(
				`Correct number! You guessed the number in ${counter} guesses.`
			);
			checkIfTop(counter);
			top = getHighScore().then((result) => result.data);
			console.log("top,", top, typeof top);
			setRandomNumber(Math.floor(Math.random() * 100) + 1);
			setCounter(1);
			setText("Guess a number between 1-100");
		}
		setValue();
		return text;
	};

	const checkIfTop = async (counter) => {
		console.log("this is top", top, typeof top);
		if (top === undefined || top === NaN || counter < top) {
			await setHighScore(counter);
		}
	};

	setHighScore = async (val) => {
		console.log("Now sethighscore runs", val, typeof val);
		try {
			let item = await AsyncStorage.setItem("HighScore", JSON.stringify(val));
			console.log("item", item, typeof item);
			return item;
		} catch (e) {
			Alert.alert("Error saving data");
		}
	};

	getHighScore = async () => {
		try {
			const value = await AsyncStorage.getItem("HighScore");
			const jsonVal = JSON.parse(value);
			console.log("this is gethiscore", jsonVal, typeof jsonVal);
			return jsonVal;
		} catch (error) {
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
