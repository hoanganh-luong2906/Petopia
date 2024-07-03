import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import TabSelector from '../../components/TabSelector';
import PetPickerModal from '../../components/user/PetPickerModal';
import PetProfile from '../../components/user/PetProfile';
import UserProfile from '../../components/user/UserProfile';
import {
	API_URL,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	FONT_SEMI_BOLD,
	IPet,
} from '../../utils/Constants';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const TAB_TITLE = ['Trang cá nhân', 'Hồ sơ thú cưng'];

const UserProfileScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [petData, setPetData] = useState<IPet[]>([]);
	const [selectedPet, setSelectedPet] = useState<IPet>({} as IPet);
	const [isVisible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const userToken: string = (await AsyncStorage.getItem('token')) ?? '';

			try {
				const response = await fetch(`${api}/user/pet-list`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					const validPetData: IPet[] = data.petList ?? ([] as IPet[]);
					if (validPetData.length > 0) {
						setPetData(validPetData);
						setSelectedPet(validPetData[0]);
					}
				}
			} catch (error: any) {
				console.log('Error: ' + error);
				alert('Error: ' + error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<LinearGradient
			colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
			style={styles.container}
		>
			<View></View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: hp(5),
	},
	tabContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '3%',
		paddingHorizontal: wp(2),
	},
	petPickerContainer: {
		position: 'absolute',
		top: 5,
		right: 0,
		width: '35%',
		height: hp(5),
		backgroundColor: 'red',
		zIndex: 100,
		marginRight: wp(6),
		borderRadius: 30,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 5,
	},
	petPickerDecorator: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: 2,
	},
	petPickerText: {
		color: 'white',
		fontSize: hp(2.5),
		letterSpacing: 1,
		textAlign: 'center',
		width: '70%',
		paddingLeft: 5,
	},
});

export default UserProfileScreen;
