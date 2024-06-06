import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { API_URL, FONT_BOLD, IUserProfile } from '../../utils/Constants';
import CustomText from '../CustomText';

async function isValidImageUrl(url: string): Promise<boolean> {
	if (!(url.length === 0)) return false;
	const response = await fetch(url, { method: 'HEAD' });
	if (!response.ok) {
		return false;
	}
	const contentType = response.headers.get('Content-Type');
	return contentType?.startsWith('image/') ?? false;
}

export const UserProfile = () => {
	const [userData, setUserData] = useState<IUserProfile>({} as IUserProfile);
	const [isImageError, setImageError] = useState<boolean>(false);
	const [isBackgroundError, setBackgroundError] = useState<boolean>(false);

	useFocusEffect(
		useCallback(() => {
			const getUserData = async () => {
				try {
					const api: string = process.env.SERVER_API_URL ?? API_URL;
					const token = (await AsyncStorage.getItem('token')) ?? '';

					const response = await fetch(`${api}/user/user-profile`, {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					console.log('>>> Response: ', JSON.stringify(response, null, 2));

					if (response.ok) {
						const data = (await response.json()) ?? {};
						const validUserData: IUserProfile =
							{ ...data } ?? ({} as IUserProfile);
						// console.log('PROFILE: ', JSON.stringify(validUserData, null, 2));
						if (validUserData) {
							setUserData({ ...validUserData });
							try {
								const isValidImage = await isValidImageUrl(
									validUserData?.images ? validUserData.images[0] : ''
								);
								setImageError(isValidImage);
							} catch (error: any) {
								// console.log('Invalid URL: ' + error);
								setImageError(true);
							}

							try {
								const isValidImage = await isValidImageUrl(
									validUserData?.images ? validUserData.images[1] : ''
								);
								setBackgroundError(isValidImage);
							} catch (error: any) {
								// console.log('Invalid URL: ' + error);
								setBackgroundError(true);
							}
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
				{(userData?.name ?? false) && (
					<View style={styles.profileContainer}>
						<View style={styles.imageContainer}>
							{!isBackgroundError ? (
								<Image
									src={userData?.images[0] ?? ''}
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
							{!isImageError ? (
								<Image
									src={userData?.images[1] ?? ''}
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
							message={userData?.name ?? 'Đang cập nhật'}
							styles={styles.userName}
							variant={FONT_BOLD}
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
