import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '../../components/CustomText';
import { logout } from '../../redux/UserSlice';
import { RootDispatch } from '../../redux/configStore';
import { useRootDispatch } from '../../redux/hooks';
import { FONT_BOLD } from '../../utils/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerHomeScreen = () => {
	const { isLoggedIn } = useSelector((state: any) => state.user);
	const dispatch: RootDispatch = useRootDispatch();

	return (
		<View style={{ paddingTop: 50 }}>
			<Pressable
				onPress={() => {
					dispatch(logout());
					AsyncStorage.removeItem('token');
					AsyncStorage.removeItem('user');
				}}
			>
				<CustomText
					message='Log out'
					styles={styles.helloText}
					variant='Medium'
				/>
			</Pressable>
			<CustomText
				message={'heeloo'}
				styles={isLoggedIn ? { color: 'blue' } : { color: 'red' }}
				variant={FONT_BOLD}
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

export default CustomerHomeScreen;
