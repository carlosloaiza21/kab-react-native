import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Image } from "react-native";

const Map = ({ location, mark }) => {
	return (
		<MapView
			style={styles.map}
			region={location}
			minZoomLevel={15}
			maxZoomLevel={20}
			cameraZoomRange={11}
		>
			{mark ? (
				<Marker coordinate={location} title={location.title}>
					<Image source={require("../assets/favicon.png")} />
				</Marker>
			) : null}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});

export default Map;
