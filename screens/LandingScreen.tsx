import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '../components/CustomText';
import { useAppDispatch } from '../redux/hooks';
import { AppDispatch } from '../redux/configStore';
import { setIsUpdateRequired } from '../redux/ApplicationSlice';

const LandingScreen = () => {
	const appState = useSelector((state: any) => state.application.isUpdateRequired);
	const dispatch: AppDispatch = useAppDispatch();

	function handleStateChange() {
		dispatch(setIsUpdateRequired(!appState));
	}

	return (
		<View>
			<CustomText message='This is Landing Page' styles={styles.helloText} variant='Medium' />
			<Pressable onPress={handleStateChange}>
				<CustomText message='Change the state' styles={styles.button} variant='SemiBold' />
			</Pressable>
			<CustomText
				message={JSON.stringify(appState)}
				styles={styles.highlightText}
				variant='Bold'
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	helloText: {
		fontSize: 30,
		textAlign: 'center',
	},
	button: {
		letterSpacing: 1,
	},
	highlightText: {
		fontSize: 30,
		color: 'red',
	},
});

export default LandingScreen;
