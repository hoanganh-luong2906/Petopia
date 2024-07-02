import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import { RootDispatch } from '../../redux/configStore';
import { useRootDispatch } from '../../redux/hooks';
import { logout } from '../../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VetProfileScreen = () => {
	const dispatch: RootDispatch = useRootDispatch();

	function handleLogout() {
		dispatch(logout());
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('user');
	}

	return (
		<View>
			<CustomText
				message='This is Admin Home Page'
				styles={styles.helloText}
				variant='Medium'
			/>
			<Pressable onPress={handleLogout}>
				<CustomText message='Logout' styles={styles.helloText} variant='Medium' />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	helloText: {
		fontSize: 30,
		textAlign: 'center',
	},
});

export default VetProfileScreen;
