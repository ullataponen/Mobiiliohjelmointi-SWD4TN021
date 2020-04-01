import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
	const [text, setText] = useState("Guess a number between 1-100");
	const [value, setValue] = useState();
	const [counter, setCounter] = useState(1);
	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * 100) + 1
	);

	const checkMatch = () => {
		setCounter(counter + 1);
		if (value < randomNumber) {
			setText(`Your guess ${value} is smaller than the number`);
		} else if (value > randomNumber) {
			setText(`Your guess ${value} is bigger than the number`);
		} else {
			Alert.alert(
				`Correct number! You guessed the number in ${counter} guesses.`
			);
			setRandomNumber(Math.floor(Math.random() * 100) + 1);
			setCounter(1);
			setText("Guess a number between 1-100");
		}
		setValue();
		return text;
	};

	return (
		<View style={styles.container}>
			<Text>{text}</Text>
			<TextInput
				style={{
					width: 100,
					borderColor: "lightgray",
					borderWidth: 1,
					margin: 10
				}}
				onChangeText={value => setValue(value)}
				value={value}
			/>
			<Button title="Make a Guess" onPress={checkMatch} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
