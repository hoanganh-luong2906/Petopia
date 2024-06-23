import { StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';

const AdminWaitingListScreen = () => {
	return (
		<View>
			<CustomText
				message='This is Admin Waiting List Page'
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

export default AdminWaitingListScreen;
