import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	API_URL,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	IUserProfile,
	TEXT_PRIMARY,
} from '../../utils/Constants';
import LoadingComponent from '../../components/LoadingComponent';

async function isValidImageUrl(url: string): Promise<boolean> {
	if (!(url.length === 0)) return false;
	const response = await fetch(url, { method: 'HEAD' });
	if (!response.ok) {
		return false;
	}
	const contentType = response.headers.get('Content-Type');
	return contentType?.startsWith('image/') ?? false;
}

export const UserProfile = ({ navigation }: any) => {
	const [userData, setUserData] = useState<IUserProfile>({} as IUserProfile);
	const [isImageError, setImageError] = useState<boolean>(false);
	const [isBackgroundError, setBackgroundError] = useState<boolean>(false);
	const [isLoading, setLoadingStatus] = useState<boolean>(true);

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
					setLoadingStatus(false);
				} catch (error: any) {
					console.log('Error: ' + error);
					alert('Error: ' + error.message);
				}
			};
			getUserData();
		}, [])
	);

	const handleSettingClick = () => {
		alert('This function is not yet implemented. Sitting still for upcoming');
	};

	return (
		<View style={styles.container}>
			{isLoading && <LoadingComponent />}
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name='arrow-back' size={25} />
				</Pressable>
				<CustomText
					message={userData?.name ?? 'Thông tin cá nhân'}
					styles={styles.headerText}
					variant={FONT_SEMI_BOLD}
				/>
				<Pressable style={styles.functionBtnWrapper} onPress={handleSettingClick}>
					<Icon name='settings-outline' size={25} color='gray' />
				</Pressable>
			</View>
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
						<View style={styles.subTitleContainer}>
							<CustomText
								message={'Việt Nam'}
								variant={FONT_REGULAR}
								styles={styles.subTitleTxt}
							/>
							<CustomText
								message={`${Math.floor(Math.random() * 100)} theo dõi`}
								variant={FONT_REGULAR}
								styles={styles.subTitleTxt}
							/>
							<CustomText
								message={`${Math.floor(
									Math.random() * 100
								)} đang theo dõi`}
								variant={FONT_REGULAR}
								styles={styles.subTitleTxt}
							/>
						</View>
						<View style={styles.postContainer}>
							<View>
								<LottieView
									source={require('../../assets/animations/no-order.json')}
									loop
									autoPlay
									style={styles.notFoundAnimation}
								/>
								<CustomText
									message='Bạn chưa đăng tải bài viết nào'
									styles={styles.notFoundText}
									variant={FONT_SEMI_BOLD}
								/>
							</View>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: 'white',
	},
	headerContainer: {
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(4),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	headerText: {
		width: wp(70),
		fontSize: hp(2.5),
		textAlign: 'center',
		marginVertical: hp(1),
		color: 'lightgray',
		letterSpacing: 1,
	},
	functionBtnContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	functionBtnWrapper: {
		backgroundColor: 'white',
		padding: wp(1.8),
		borderRadius: 50,
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
		fontSize: 25,
		letterSpacing: 1,
		lineHeight: hp(4.5),
	},
	postContainer: {
		width: wp(95),
		height: hp(90),
		marginTop: hp(1),
		borderTopColor: 'lightgray',
		borderTopWidth: 2,
	},
	subTitleContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	subTitleTxt: {
		color: 'gray',
		fontSize: TEXT_PRIMARY,
	},
	notFoundText: {
		textAlign: 'center',
		fontSize: TEXT_PRIMARY,
		color: 'gray',
	},
	notFoundAnimation: {
		width: wp(100),
		height: hp(25),
	},
});

export default UserProfile;
