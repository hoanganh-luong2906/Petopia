import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import { FONT_SEMI_BOLD } from '../../utils/Constants';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-profile-detail'>;
}

const UserPostDetailScreen = ({ navigation }: IProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name='arrow-back' size={25} />
				</Pressable>
				<CustomText
					message={'Thông tin cá nhân'}
					styles={styles.headerText}
					variant={FONT_SEMI_BOLD}
				/>
			</View>
			<CustomText
				message='User Post Detail Screen'
				variant={FONT_SEMI_BOLD}
				styles={{}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: 'white',
		paddingTop: hp(4.5),
	},
	headerContainer: {
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(4),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	headerText: {
		width: wp(70),
		fontSize: hp(2.5),
		textAlign: 'center',
		marginVertical: hp(1),
		color: 'lightgray',
		letterSpacing: 1,
	},
});

export default UserPostDetailScreen;
