import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, TextInput, Button, View, Alert } from "react-native";

function Map(props) {
	let { lat, long, locName } = props;
	if (lat && long) {
		return (
			<MapView
				style={{ flex: 1, width: "100%" }}
				region={{
					latitude: lat,
					longitude: long,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
			>
				<Marker
					coordinate={{
						latitude: lat,
						longitude: long,
					}}
					title={locName}
				/>
			</MapView>
		);
	} else {
		return <Text>Waiting for map... </Text>;
	}
}

export default function App() {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [locationName, setLocationName] = useState("");
	const [searchEntry, setSearchEntry] = useState("");
	const key = Expo.Constants.manifest.extra.map_apikey;

	useEffect(() => {
		getInitialLocation();
	}, []);

	const getInitialLocation = async () => {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("No permission to access location");
		}
		let location = await Location.getCurrentPositionAsync({});
		setLatitude(location.coords.latitude);
		setLongitude(location.coords.longitude);
	};

	const getLocation = () => {
		const url =
			"http://www.mapquestapi.com/geocoding/v1/address?key=" +
			key +
			"&location=" +
			searchEntry;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setLatitude(data.results[0].locations[0].latLng.lat);
				setLongitude(data.results[0].locations[0].latLng.lng);
				setLocationName(data.results[0].providedLocation.location);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	return (
		<View style={styles.container}>
			<Map lat={latitude} long={longitude} locName={locationName} />
			<View style={styles.inputSection}>
				<TextInput
					style={styles.input}
					placeholder="e.g. Main Street 1, New York"
					value={searchEntry}
					onChangeText={(loc) => setSearchEntry(loc)}
				/>
				<Button title="Show Location" onPress={getLocation} />
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
	inputSection: {
		width: "90%",
		padding: 20,
	},
	input: {
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: "#000",
	},
});
