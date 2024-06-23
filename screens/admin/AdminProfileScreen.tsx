import { StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';

const AdminProfileScreen = () => {
	return (
		<View>
			<CustomText
				message='This is Admin Home Page'
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

export default AdminProfileScreen;
