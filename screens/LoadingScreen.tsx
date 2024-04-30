import { StyleSheet, View } from 'react-native';
import CustomText from '../components/CustomText';

const LoadingScreen = () => {
	return (
		<View>
			<CustomText message='This is Error Screen' styles={styles.helloText} variant='Bold' />
		</View>
	);
};

const styles = StyleSheet.create({
	helloText: {},
});

export default LoadingScreen;
