import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '../../components/CustomText';
import { useRootDispatch } from '../../redux/hooks';
import { RootDispatch } from '../../redux/configStore';
import { setIsUpdateRequired } from '../../redux/ApplicationSlice';
import { logout } from '../../redux/UserSlice';
import { FONT_BOLD } from '../../utils/Types';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LandingScreen = () => {
	const { user, isLoggedIn } = useSelector((state: any) => state.user.user);
	const dispatch: RootDispatch = useRootDispatch();

	return (
		<View style={{ paddingTop: 50 }}>
			<Pressable onPress={() => dispatch(logout())}>
				<CustomText
					message='Log out'
					styles={styles.helloText}
					variant='Medium'
				/>
			</Pressable>
			<CustomText
				message={'heeloo'}
				styles={isLoggedIn ? { Color: 'blue' } : { color: 'red' }}
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

export default LandingScreen;
