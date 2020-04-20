import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TextInput, Button, View, Alert } from "react-native";

export default function App() {
	const [searchEntry, setSearchEntry] = useState("");
	//set Helsinki as initial location
	const [locations, setLocations] = useState([
		{
			providedLocation: {
				location: "helsinki",
			},
			locations: [
				{
					street: "",
					adminArea6: "",
					adminArea6Type: "Neighborhood",
					adminArea5: "Helsinki",
					adminArea5Type: "City",
					adminArea4: "",
					adminArea4Type: "County",
					adminArea3: "SOUTHERN FINLAND",
					adminArea3Type: "State",
					adminArea1: "FI",
					adminArea1Type: "Country",
					postalCode: "",
					geocodeQualityCode: "A5XAX",
					geocodeQuality: "CITY",
					dragPoint: false,
					sideOfStreet: "N",
					linkId: "282333804",
					unknownInput: "",
					type: "s",
					latLng: {
						lat: 60.166628,
						lng: 24.943508,
					},
					displayLatLng: {
						lat: 60.166628,
						lng: 24.943508,
					},
					mapUrl:
						"http://www.mapquestapi.com/staticmap/v5/map?key=Xtxpe3UfrXtMgNWqXCWZZqmDab9a0FrD&type=map&size=225,160&locations=60.166628,24.943508|marker-sm-50318A-1&scalebar=true&zoom=12&rand=1774725037",
				},
			],
		},
	]);
	const key = Expo.Constants.manifest.extra.map_apikey;

	const getLocation = () => {
		const url =
			"http://www.mapquestapi.com/geocoding/v1/address?key=" +
			key +
			"&location=" +
			searchEntry;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setLocations(data.results);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	return (
		<View style={styles.container}>
			<MapView
				style={{ flex: 1, width: "100%" }}
				region={{
					latitude: locations[0].locations[0].latLng.lat,
					longitude: locations[0].locations[0].latLng.lng,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
			>
				<Marker
					coordinate={{
						latitude: locations[0].locations[0].latLng.lat,
						longitude: locations[0].locations[0].latLng.lng,
					}}
					title={locations[0].providedLocation.location}
				/>
			</MapView>

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
		//	marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: "#000",
	},
});
