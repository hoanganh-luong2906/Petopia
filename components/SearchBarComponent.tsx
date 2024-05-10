import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootDispatch } from '../redux/configStore';
import { useRootDispatch } from '../redux/hooks';
import { logout } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

const SearchBarComponent = ({ props }: { props?: BottomTabHeaderProps }) => {
	const dispatch: RootDispatch = useRootDispatch();
	const [searchText, setSearchText] = useState<string>('');

	function handleLogout() {
		dispatch(logout());
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('user');
	}

	return (
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
				<MaskedView
					style={styles.btnDecorator}
					maskElement={<Icon name='qr-code' size={25} color={'black'} />}
				>
					<LinearGradient
						colors={['#F4A905', '#FBE437']}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={{ width: '100%', height: '100%' }}
					/>
				</MaskedView>
			</Pressable>
			<Pressable style={styles.btnContainer} onPress={handleLogout}>
				<View style={{ transform: [{ translateX: 2 }] }}>
					<Icon name='log-out-outline' size={25} color={'gray'} />
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: '10%',
		paddingHorizontal: 10,
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
		bottom: '33%',
		left: 15,
		width: 25,
		height: 25,
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
	btnDecorator: {
		width: 25,
		height: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SearchBarComponent;
