import { StyleSheet, View } from 'react-native';
import CustomText from '../components/CustomText';

const HelloScreen = () => {
	return (
		<View>
			<CustomText
				message='This is Landing Page'
				styles={styles.helloText}
				variant='Medium'
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	helloText: {
		fontSize: 30,
		textAlign: 'center',
	},
});

export default HelloScreen;
