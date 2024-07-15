import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import TabSelector from '../../components/TabSelector';
import { FONT_BOLD, TEXT_LARGE, TEXT_PRIMARY } from '../../utils/Constants';
import AllNotificationContent from '../../components/user/AllNotificationContent';
import ActivityNotificationContent from '../../components/user/ActivityNotifcationContent';
import AppointmentNotificationContent from '../../components/user/AppointmentNotificationContent';

const TAB_TITLE = ['Tất cả', 'Hoạt động', 'Lịch hẹn'];

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
}

const UserNotificationScreen = ({ navigation }: IProps) => {
	const [focusedTab, setFocusedTab] = useState<number>(0);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Pressable
					onPress={() => navigation.goBack()}
					style={styles.goBackButton}
				>
					<Icon name='arrow-back' size={25} />
				</Pressable>
				<CustomText
					message='Thông báo'
					styles={styles.title}
					variant={FONT_BOLD}
				/>
				<View style={styles.tabContainer}>
					{TAB_TITLE.map((title, index) => (
						<TabSelector
							key={index}
							totalTabs={TAB_TITLE.length}
							title={title}
							index={index}
							focusedTab={focusedTab}
							setFocusedTab={setFocusedTab}
						/>
					))}
				</View>
			</View>
			{focusedTab === 0 && <AllNotificationContent />}
			{focusedTab === 1 && <ActivityNotificationContent />}
			{focusedTab === 2 && <AppointmentNotificationContent />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	goBackButton: {
		position: 'absolute',
		top: hp(0.5),
		left: wp(5),
		zIndex: 1,
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: hp(1),
	},
	title: {
		fontSize: TEXT_LARGE,
		textAlign: 'center',
		marginBottom: '2%',
		textAlignVertical: 'bottom',
	},
	tabContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '3%',
	},
});

export default UserNotificationScreen;
