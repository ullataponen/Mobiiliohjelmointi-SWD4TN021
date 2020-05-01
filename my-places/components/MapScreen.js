import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route, navigation }) {
	const { address } = route.params;
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [name, setName] = useState("");

	const mapKey = Expo.Constants.manifest.extra.map_apikey;

	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		const url =
			"http://www.mapquestapi.com/geocoding/v1/address?key=" +
			mapKey +
			"&location=" +
			address;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setLatitude(data.results[0].locations[0].latLng.lat);
				setLongitude(data.results[0].locations[0].latLng.lng);
				setName(data.results[0].providedLocation.location);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	return (
		<View style={styles.container}>
			{latitude && longitude ? (
				<MapView
					style={{ flex: 1, width: "100%" }}
					region={{
						latitude: latitude,
						longitude: longitude,
						latitudeDelta: 0.0322,
						longitudeDelta: 0.0221,
					}}
				>
					<Marker
						coordinate={{
							latitude: latitude,
							longitude: longitude,
						}}
						title={name}
					/>
				</MapView>
			) : (
				<Text>Waiting for map... </Text>
			)}
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
