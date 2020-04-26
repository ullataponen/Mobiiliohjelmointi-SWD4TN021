import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, TextInput, Button, View, Alert } from "react-native";

function Map(props) {
	let { lat, long, restaurants } = props;
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
				{restaurants.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.geometry.location.lat,
							longitude: marker.geometry.location.lng,
						}}
						title={marker.name}
						description={marker.vicinity}
					/>
				))}
			</MapView>
		);
	} else {
		return <Text>Waiting for map... </Text>;
	}
}

export default function App() {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [searchEntry, setSearchEntry] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const mapKey = Expo.Constants.manifest.extra.map_apikey;
	const placesKey = Expo.Constants.manifest.extra.places_apikey;

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
			mapKey +
			"&location=" +
			searchEntry;
		let lat;
		let lng;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				lat = data.results[0].locations[0].latLng.lat;
				lng = data.results[0].locations[0].latLng.lng;
				setLatitude(lat);
				setLongitude(lng);
				getRestaurants(lat, lng);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	const getRestaurants = (lat, long) => {
		const restaurantUrl =
			"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
			lat +
			"," +
			long +
			"&radius=1500&type=restaurant&keyword=cruise&key=" +
			placesKey;

		fetch(restaurantUrl)
			.then((res) => res.json())
			.then((data) => {
				setRestaurants(data.results);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
		return restaurants;
	};

	return (
		<View style={styles.container}>
			<Map lat={latitude} long={longitude} restaurants={restaurants} />
			<View style={styles.inputSection}>
				<TextInput
					style={styles.input}
					placeholder="e.g. Mikonkatu 10, Helsinki"
					value={searchEntry}
					onChangeText={(loc) => setSearchEntry(loc)}
				/>
				<Button title="Show Restaurants" onPress={getLocation} />
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
