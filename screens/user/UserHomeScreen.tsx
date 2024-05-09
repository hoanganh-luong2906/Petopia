import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabSelector from '../../components/TabSelector';
import { logout } from '../../redux/UserSlice';
import { RootDispatch } from '../../redux/configStore';
import { useRootDispatch } from '../../redux/hooks';
import LottieView from 'lottie-react-native';
import CustomText from '../../components/CustomText';
import { FONT_SEMI_BOLD } from '../../utils/Types';

const TAB_TITLE = ['Phổ biến', 'Xu hướng', 'Theo dõi'];

const UserHomeScreen = () => {
	const dispatch: RootDispatch = useRootDispatch();
	const [searchText, setSearchText] = useState<string>('');
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [data, setData] = useState<any[]>([]);

	function handleLogout() {
		dispatch(logout());
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('user');
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchTabContainer}>
				<View style={styles.searchContainer}>
					<View style={styles.searchContent}>
						<TextInput
							placeholder='Search'
							numberOfLines={1}
							value={searchText}
							onChangeText={(text: string) => setSearchText(text)}
							style={styles.searchInput}
						/>
						<MaskedView
							style={styles.searchDecorator}
							maskElement={<Icon name='search' size={25} color={'black'} />}
						>
							<LinearGradient
								colors={['#F4A905', '#FBE437']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{ width: '100%', height: '100%' }}
							/>
						</MaskedView>
						{searchText.length > 0 && (
							<Pressable
								style={styles.clearSearchBtn}
								onPress={() => setSearchText('')}
							>
								<Icon
									name='close'
									size={22}
									color={'gray'}
									// style={{ transform: [{ translateX: 10 }] }}
								/>
							</Pressable>
						)}
					</View>
					<Pressable style={styles.btnContainer}>
						<Icon name='qr-code' size={25} color={'gray'} />
					</Pressable>
					<Pressable style={styles.btnContainer} onPress={handleLogout}>
						<Icon name='log-out-outline' size={25} color={'gray'} />
					</Pressable>
				</View>
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
							style={{ width: '100%', height: 300 }}
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
		paddingTop: 50,
		flex: 1,
	},
	searchTabContainer: {
		width: '100%',
		backgroundColor: 'white',
		paddingHorizontal: 10,
	},
	searchContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	searchContent: {
		position: 'relative',
		width: '70%',
	},
	searchInput: {
		width: '100%',
		backgroundColor: '#F3F5F7',
		marginVertical: 15,
		paddingVertical: 10,
		paddingRight: 30,
		paddingLeft: 50,
		borderRadius: 30,
	},
	searchDecorator: {
		position: 'absolute',
		bottom: 2,
		left: 15,
		width: 50,
		height: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	clearSearchBtn: {
		position: 'absolute',
		bottom: '35%',
		left: '60%',
	},
	btnContainer: {
		backgroundColor: '#F3F5F7',
		padding: 10,
		borderRadius: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabContainer: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '4%',
	},
	notFoundText: { textAlign: 'center', fontSize: 20, color: 'gray' },
});

export default UserHomeScreen;
