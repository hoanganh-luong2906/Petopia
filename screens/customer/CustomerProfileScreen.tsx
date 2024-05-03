import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import { FONT_BOLD, IPet } from '../../utils/Types';
import { useEffect, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import UserProfile from '../../components/user/UserProfile';
import PetProfile from '../../components/user/PetProfile';
import VacineData from '../../data/VaccineHistoryData.json';

const CustomerProfileScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [historyData, setHistyoryData] = useState<IPet[]>([]);
	const [petNames, setPetNames] = useState<string[]>([]);
	const [selectedPet, setSelectedPet] = useState<IPet>();

	useEffect(() => {
		const fetchData = async () => {
			const petInformation: IPet[] = VacineData.data.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
			const petNames = petInformation.map((pet) => pet.petName);
			setHistyoryData(petInformation);
			setPetNames(petNames);
			setSelectedPet(petInformation[0]);
		};
		fetchData();
	}, []);

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
				<View>
					<PetProfile />
				</View>
			)}
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
});

export default CustomerProfileScreen;
