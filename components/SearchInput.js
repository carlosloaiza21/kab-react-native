import { useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchInput = ({ onClear, onSelect }) => {
	const textInput = useRef(null);

	const clear = () => {
		textInput.current.clear();
		textInput.current.blur();
		onClear();
	};

	const setLocation = (location) => {
		onSelect(location);
	};

	return (
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
					title: details.name,
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
	);
};

export default SearchInput;
