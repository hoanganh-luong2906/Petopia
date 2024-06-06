import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import TabSelector from '../../components/TabSelector';
import { FONT_SEMI_BOLD } from '../../utils/Constants';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const TAB_TITLE = ['Phổ biến', 'Xu hướng', 'Theo dõi'];

const UserHomeScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [data, setData] = useState<any[]>([]);

	return (
		<View style={styles.container}>
			<View style={styles.searchTabContainer}>
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
			<ScrollView>
				{data.length > 0 ? (
					<View></View>
				) : (
					<View>
						<LottieView
							source={require('../../assets/animations/no-order.json')}
							loop
							autoPlay
							style={styles.notFoundAnimation}
						/>
						<CustomText
							message='Không tìm thấy bài viết nào'
							styles={styles.notFoundText}
							variant={FONT_SEMI_BOLD}
						/>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchTabContainer: {
		width: '100%',
		backgroundColor: 'white',
		paddingHorizontal: wp(2),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '2%',
	},
	notFoundText: {
		textAlign: 'center',
		fontSize: hp(2),
		color: 'gray',
	},
	notFoundAnimation: {
		width: wp(100),
		height: hp(30),
	},
});

export default UserHomeScreen;
