import { useRef, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import * as Location from "expo-location";

const App = () => {
	const [location, setLocation] = useState();
	const textInput = useRef(null);
	const [mark, setMark] = useState();

	const clear = () => {
		textInput.current.clear();
		textInput.current.blur();
		setMark(null);
	};

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let loc = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
				latitudeDelta: 0,
				longitudeDelta: 0,
			});
		})();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.searchBar}>
				<GooglePlacesAutocomplete
					renderLeftButton={() => (
						<Ionicons
							name="search"
							size={32}
							color="black"
							style={{ paddingTop: 10 }}
						/>
					)}
					renderRightButton={() => (
						<Ionicons
							name="close"
							size={32}
							color="black"
							style={{ paddingTop: 10 }}
							onPress={clear}
						/>
					)}
					ref={textInput}
					keepResultsAfterBlur={false}
					placeholder="Search"
					debounce={500}
					minLength={3}
					fetchDetails
					onPress={(data, details = null) => {
						setLocation({
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
							latitudeDelta: 0,
							longitudeDelta: 0,
						});
						setMark({
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						});
					}}
					styles={{
						textInput: {
							fontSize: 18,
							backgroundColor: "#ebedf0",
						},
						textInputContainer: {
							width: "100%",
							borderWidth: 1,
							paddingHorizontal: 5,

							backgroundColor: "#ebedf0",
							borderRadius: 10,
						},

						listView: {
							height: "100%",
						},
					}}
					onFail={(err) => {
						console.log(err);
					}}
					query={{
						key: "AIzaSyAhGa2tiIPIXxpx0P1fsmyt6E-ILMMs4lY",
						language: "mx",
					}}
				/>
			</View>
			<View style={styles.mapContainer}>
				<MapView
					style={styles.map}
					region={location}
					minZoomLevel={15}
					maxZoomLevel={20}
					cameraZoomRange={11}
				>
					{mark ? (
						<Marker coordinate={mark}>
							<Image source={require("./assets/favicon.png")} />
						</Marker>
					) : (
						""
					)}
				</MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	searchBar: {
		flexDirection: "row",
		width: "100%",
		paddingTop: 50,
		paddingHorizontal: 10,
		alignItems: "center",
	},

	map: {
		width: "100%",
		height: "100%",
	},
});

export default App;
