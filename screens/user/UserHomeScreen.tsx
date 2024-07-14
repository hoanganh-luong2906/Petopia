import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBarComponent from '../../components/SearchBarComponent';
import TabSelector from '../../components/TabSelector';
import FollowingContent from '../../components/user/FollowingContent';
import SocialContent from '../../components/user/SocialContent';
import TrendingContent from '../../components/user/TrendingContent';

const TAB_TITLE = ['Phổ biến', 'Xu hướng', 'Theo dõi'];

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
}

const UserHomeScreen = ({ navigation }: IProps) => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [data, setData] = useState<any[]>(['had data']);

	return (
		<View style={styles.container}>
			<SearchBarComponent navigation={navigation} />
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
			{focusedTab === 0 && <SocialContent navigation={navigation} data={data} />}
			{focusedTab === 1 && <TrendingContent navigation={navigation} data={data} />}
			{focusedTab === 2 && <FollowingContent navigation={navigation} data={data} />}
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
});

export default UserHomeScreen;
