import MaskedView from '@react-native-masked-view/masked-view';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootDispatch } from '../redux/configStore';
import { useRootDispatch } from '../redux/hooks';
import { COLOR_GRAY, COLOR_PRIMARY_900, COLOR_SECONDARY_200 } from '../utils/Constants';

const SearchBarComponent = ({ props }: { props?: BottomTabHeaderProps }) => {
	const [searchText, setSearchText] = useState<string>('');

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
						colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
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
						colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={{ width: '100%', height: '100%' }}
					/>
				</MaskedView>
			</Pressable>
			<Pressable style={styles.btnContainer}>
				<View style={{ transform: [{ translateX: 0 }] }}>
					<Icon name='notifications-outline' size={25} color={'gray'} />
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
		paddingTop: hp(4),
		paddingHorizontal: wp(2),
	},
	searchContent: {
		position: 'relative',
		width: '70%',
	},
	searchInput: {
		width: '100%',
		backgroundColor: COLOR_GRAY,
		marginVertical: hp(1.5),
		paddingVertical: hp(1),
		paddingRight: wp(10),
		paddingLeft: wp(12),
		borderRadius: 30,
		overflow: 'hidden',
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
		bottom: '32%',
		right: '5%',
	},
	btnContainer: {
		backgroundColor: COLOR_GRAY,
		padding: wp(2.5),
		borderRadius: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnDecorator: {
		width: hp(3),
		height: hp(3),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SearchBarComponent;
