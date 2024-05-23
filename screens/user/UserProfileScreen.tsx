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
import { API_URL, FONT_SEMI_BOLD, IPet } from '../../utils/Types';
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
					method: 'POST',
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
			// Mock data
			// petInformation = VacineData.data.sort(
			// 	(a, b) =>
			// 		new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			// );
			// const petNames = petInformation.map((pet) => pet.petName);
			// setHistyoryData(petInformation);
			// setPetNames(petNames);
			// setSelectedPet(petInformation[0]);
		};
		fetchData();
	}, []);

	// console.log('PET_LIST: ', JSON.stringify(petData, null, 2));
	return (
		<View style={styles.container}>
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
			{focusedTab === 0 && <UserProfile />}
			{focusedTab === 1 && (
				<View style={{ width: '100%', height: '100%', position: 'relative' }}>
					<Pressable
						style={styles.petPickerContainer}
						onPress={() => {
							setVisible(true);
						}}
					>
						<LinearGradient
							colors={['#F4A905', '#FBE437']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.petPickerDecorator}
						>
							<CustomText
								numberOfLines={1}
								message={selectedPet.name ?? ''}
								variant={FONT_SEMI_BOLD}
								styles={styles.petPickerText}
							/>
							<Icon name='ellipsis-vertical' size={20} color='white' />
						</LinearGradient>
					</Pressable>
					{selectedPet?.id && <PetProfile petId={selectedPet.id ?? 0} />}
				</View>
			)}
			<PetPickerModal
				isVisible={isVisible}
				setVisible={setVisible}
				pets={petData}
				selectedPet={selectedPet}
				setSelectedPet={setSelectedPet}
			/>
		</View>
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
