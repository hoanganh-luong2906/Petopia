import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '../components/CustomText';
import { useRootDispatch } from '../redux/hooks';
import { RootDispatch } from '../redux/configStore';
import { setIsUpdateRequired } from '../redux/ApplicationSlice';

const LandingScreen = () => {
	const appState = useSelector((state: any) => state.application.isUpdateRequired);
	const dispatch: RootDispatch = useRootDispatch();

	function handleStateChange() {
		dispatch(setIsUpdateRequired(!appState));
	}

	return (
		<View>
			<CustomText message='This is Landing Page' styles={styles.helloText} variant='Medium' />
		</View>
	);
};

const styles = StyleSheet.create({
	helloText: {
		fontSize: 30,
		textAlign: 'center',
	},
});

export default LandingScreen;
