import { StyleSheet, View } from 'react-native';
import CustomText from '../components/CustomText';

const ErrorScreen = () => {
	return (
		<View>
			<CustomText message='This is Error Screen' styles={styles.helloText} />
		</View>
	);
};

const styles = StyleSheet.create({
	helloText: {},
});

export default ErrorScreen;
