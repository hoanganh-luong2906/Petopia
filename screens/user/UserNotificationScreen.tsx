import { StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import { FONT_BOLD } from '../../utils/Constants';
import { useState } from 'react';
import TabSelector from '../../components/TabSelector';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const TAB_TITLE = ['Tất cả', 'Hoạt động', 'Lịch hẹn'];

const UserNotificationScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: hp(1),
	},
	title: {
		fontSize: 25,
		textAlign: 'center',
		marginBottom: '2%',
	},
	tabContainer: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '4%',
	},
});

export default UserNotificationScreen;
