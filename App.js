import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import * as Location from "expo-location";
import SearchInput from "./components/SearchInput";
import Map from "./components/Map";

const App = () => {
	const [location, setLocation] = useState();

	const [mark, setMark] = useState();
	const clear = () => {
		setMark(null);
	};

	const getLocation = (location) => {
		setLocation(location);
		setMark(location);
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
				<SearchInput onClear={clear} onSelect={getLocation} />
			</View>
			<View style={styles.mapContainer}>
				<Map location={location} mark={mark} />
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
});

export default App;
