import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { API_URL, FONT_BOLD, IUserProfile } from '../../utils/Types';
import CustomText from '../CustomText';

export const UserProfile = () => {
	const [userData, setUserData] = useState<IUserProfile>({} as IUserProfile);

	useFocusEffect(
		useCallback(() => {
			const getUserData = async () => {
				try {
					const api: string = process.env.SERVER_API_URL ?? API_URL;
					const token = (await AsyncStorage.getItem('token')) ?? '';

					const response = await fetch(`${api}/user/userProfile`, {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					console.log('>>> Response: ', JSON.stringify(response, null, 2));

					if (response.ok) {
						const data = await response.json();
						const validUserData: IUserProfile = data.user ?? {};
						console.log('PRO FILE: ', JSON.stringify(validUserData, null, 2));
						if (validUserData) {
							setUserData({ ...validUserData });
						}
					}
				} catch (error: any) {
					console.log('Error: ' + error);
					alert('Error: ' + error.message);
				}
			};
			getUserData();
		}, [])
	);

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileContainer}>
					<View style={styles.imageContainer}>
						{(userData.avatarLink ? [0] : false) ? (
							<Image
								src={userData.avatarLink[0]}
								resizeMode='cover'
								style={styles.imageBackground}
							/>
						) : (
							<Image
								source={require('../../assets/images/default-bg.png')}
								resizeMode='cover'
								style={styles.imageBackground}
							/>
						)}
						{(userData.avatarLink ? [1] : false) ? (
							<Image
								src={userData.avatarLink[1]}
								resizeMode='cover'
								style={styles.imageAvt}
							/>
						) : (
							<Image
								source={require('../../assets/images/default-avt.png')}
								resizeMode='cover'
								style={styles.imageAvt}
							/>
						)}
					</View>
					<CustomText
						message={userData.name}
						styles={styles.userName}
						variant={FONT_BOLD}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 20,
		overflow: 'hidden',
		backgroundColor: '#ededed',
	},
	profileContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	imageContainer: {
		width: '100%',
		height: 200,
		position: 'relative',
		overflow: 'hidden',
	},
	imageBackground: {
		width: '100%',
		height: 150,
		borderRadius: 10,
	},
	imageAvt: {
		position: 'absolute',
		bottom: 0,
		left: '50%',
		transform: [{ translateX: -50 }],
		width: 100,
		height: 100,
		overflow: 'hidden',
		borderRadius: 100,
		borderWidth: 5,
		borderColor: 'white',
	},
	userName: {
		width: '100%',
		textAlign: 'center',
		marginTop: 10,
		fontSize: 25,
		letterSpacing: 1,
	},
});

export default UserProfile;
