import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import PetPickerModal from '../../components/user/PetPickerModal';
import PetProfile from '../../components/user/PetProfile';
import UserProfile from '../../components/user/UserProfile';
import { FONT_BOLD, FONT_SEMI_BOLD, IPet } from '../../utils/Types';

const UserProfileScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [petData, setPetData] = useState<IPet[]>([]);
	const [selectedPet, setSelectedPet] = useState<IPet>({} as IPet);
	const [isVisible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? '';
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

	console.log('PET_LIST: ', JSON.stringify(petData, null, 2));
	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				<Pressable
					style={[
						styles.tabTitleContainer,
						focusedTab === 0 && { backgroundColor: '#FFFCE8' },
					]}
					onPress={() => setFocusedTab(0)}
				>
					{focusedTab === 0 ? (
						<MaskedView
							style={styles.tabTitleDecorator}
							maskElement={
								<CustomText
									message='Trang cá nhân'
									styles={styles.tabTitle}
									variant={FONT_BOLD}
								/>
							}
						>
							<LinearGradient
								colors={['#F4A905', '#FBE437']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={styles.titleLinearDecorator}
							/>
						</MaskedView>
					) : (
						<CustomText
							message='Trang cá nhân'
							styles={styles.tabTitle}
							variant={FONT_BOLD}
						/>
					)}
				</Pressable>
				<Pressable
					style={[
						styles.tabTitleContainer,
						focusedTab === 1 && { backgroundColor: '#FFFCE8' },
					]}
					onPress={() => setFocusedTab(1)}
				>
					{focusedTab === 1 ? (
						<MaskedView
							style={styles.tabTitleDecorator}
							maskElement={
								<CustomText
									message='Hồ sơ thú cưng'
									styles={styles.tabTitle}
									variant={FONT_BOLD}
								/>
							}
						>
							<LinearGradient
								colors={['#F4A905', '#FBE437']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={styles.titleLinearDecorator}
							/>
						</MaskedView>
					) : (
						<CustomText
							message='Hồ sơ thú cưng'
							styles={styles.tabTitle}
							variant={FONT_BOLD}
						/>
					)}
				</Pressable>
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
		paddingTop: '15%',
	},
	tabContainer: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '3%',
	},
	tabTitleContainer: {
		width: '45%',
		height: '100%',
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginHorizontal: '2.5%',
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabTitle: {
		color: 'gray',
		letterSpacing: 1,
		textAlign: 'center',
		fontSize: 20,
	},
	tabTitleDecorator: {
		width: '100%',
		height: '100%',
		marginTop: '5%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleLinearDecorator: {
		width: '100%',
		height: '100%',
	},
	petPickerContainer: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: '35%',
		height: 38,
		backgroundColor: 'red',
		zIndex: 100,
		marginRight: 25,
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
		fontSize: 18,
		letterSpacing: 1,
		textAlign: 'center',
		width: '70%',
		paddingLeft: 5,
	},
});

export default UserProfileScreen;
