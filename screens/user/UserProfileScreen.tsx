import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import { logout } from '../../redux/UserSlice';
import { RootDispatch } from '../../redux/configStore';
import { useRootDispatch } from '../../redux/hooks';
import {
	API_URL,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	FONT_BOLD,
	FONT_MEDIUM,
	IPet,
	IUser,
	TEXT_LARGE,
	TEXT_PRIMARY,
} from '../../utils/Constants';

const UserProfileScreen = () => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [petData, setPetData] = useState<IPet[]>([]);
	const [selectedPet, setSelectedPet] = useState<IPet>({} as IPet);
	const [isVisible, setVisible] = useState<boolean>(false);
	const [userInfor, setUserInfor] = useState<IUser | undefined>(undefined);
	const [isImgError, setImgError] = useState<boolean>(false);
	const dispatch: RootDispatch = useRootDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const userToken: string = (await AsyncStorage.getItem('token')) ?? '';

			const userLocal: IUser = JSON.parse(
				(await AsyncStorage.getItem('user')) ?? '{}'
			);
			if (userLocal?.name ?? false) {
				setUserInfor({ ...userLocal });
			}

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

	function handleLogout() {
		dispatch(logout());
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('user');
	}

	return (
		<LinearGradient
			colors={[COLOR_SECONDARY, COLOR_PRIMARY]}
			style={styles.container}
		>
			<View style={styles.functionBtnContainer}>
				<Pressable style={styles.functionBtnWrapper}>
					<Icon name='notifications-outline' size={25} color='gray' />
				</Pressable>
				<Pressable style={styles.functionBtnWrapper}>
					<Icon name='settings-outline' size={25} color='gray' />
				</Pressable>
			</View>
			<View style={styles.profileContainer}>
				{isImgError ? (
					<Image
						src={userInfor?.avatar ?? ''}
						resizeMode='cover'
						style={styles.userAvt}
					/>
				) : (
					<Image
						source={require('../../assets/images/default-avt.png')}
						resizeMode='cover'
						style={styles.userAvt}
					/>
				)}
				<CustomText
					message={userInfor?.name ?? 'Đang cập nhật'}
					variant={FONT_BOLD}
					styles={styles.userName}
				/>
				<View style={styles.navigationContainer}>
					<View style={styles.navigationContent}>
						<Pressable style={styles.navigationWrapper}>
							<View style={styles.titleWrapper}>
								<View style={styles.imageContainer}>
									<Image
										source={require('../../assets/images/user.png')}
										resizeMode='contain'
										style={styles.navigationIcon}
									/>
								</View>
								<CustomText
									message='Trang cá nhân'
									variant={FONT_MEDIUM}
									styles={styles.navigationTxt}
								/>
							</View>
							<Image
								source={require('../../assets/images/arrow.png')}
								resizeMode='contain'
								style={styles.navigationArrowIcon}
							/>
						</Pressable>
						<View style={styles.divider} />
						<Pressable style={styles.navigationWrapper}>
							<View style={styles.titleWrapper}>
								<View style={styles.imageContainer}>
									<Image
										source={require('../../assets/images/pets.png')}
										resizeMode='contain'
										style={styles.navigationIcon}
									/>
								</View>
								<CustomText
									message='Hồ sơ thú cưng'
									variant={FONT_MEDIUM}
									styles={styles.navigationTxt}
								/>
							</View>
							<Image
								source={require('../../assets/images/arrow.png')}
								resizeMode='contain'
								style={styles.navigationArrowIcon}
							/>
						</Pressable>
						<View style={styles.divider} />
						<Pressable style={styles.navigationWrapper}>
							<View style={styles.titleWrapper}>
								<View style={styles.imageContainer}>
									<Image
										source={require('../../assets/images/transaction.png')}
										resizeMode='contain'
										style={styles.navigationIcon}
									/>
								</View>
								<CustomText
									message='Lịch sử giao dịch'
									variant={FONT_MEDIUM}
									styles={styles.navigationTxt}
								/>
							</View>
							<Image
								source={require('../../assets/images/arrow.png')}
								resizeMode='contain'
								style={styles.navigationArrowIcon}
							/>
						</Pressable>
					</View>
					<Pressable style={styles.logoutBtn} onPress={handleLogout}>
						<LinearGradient
							colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={styles.logoutDecorator}
						>
							<CustomText
								message='ĐĂNG XUẤT'
								styles={styles.logoutTxt}
								variant={FONT_BOLD}
							/>
						</LinearGradient>
					</Pressable>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: hp(7),
		paddingHorizontal: wp(5),
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
		marginLeft: wp(5),
	},
	profileContainer: {
		width: '100%',
		backgroundColor: 'white',
		height: hp(75),
		marginTop: hp(6),
		borderRadius: 20,
	},
	userAvt: {
		position: 'absolute',
		top: -wp(10),
		left: wp(50),
		transform: [{ translateX: -wp(15) }],
		width: wp(20),
		height: wp(20),
		overflow: 'hidden',
		borderRadius: 100,
		borderWidth: 5,
		borderColor: 'white',
	},
	userName: {
		width: '100%',
		textAlign: 'center',
		marginTop: wp(10),
		fontSize: TEXT_LARGE + 5,
	},
	navigationContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '83.5%',
		paddingHorizontal: wp(5),
	},
	navigationContent: {
		width: '100%',
		height: hp(25),
		marginTop: hp(5),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	logoutBtn: {
		width: '100%',
		height: hp(6),
		display: 'flex',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 30,
		overflow: 'hidden',
	},
	logoutDecorator: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	logoutTxt: {
		fontSize: TEXT_LARGE,
		color: 'white',
		letterSpacing: 1,
	},
	navigationWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	},
	titleWrapper: {
		display: 'flex',
		height: hp(5),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	navigationTxt: {
		fontSize: TEXT_PRIMARY + 3,
		marginLeft: wp(3),
		height: '90%',
		textAlignVertical: 'bottom',
	},
	navigationIcon: {
		width: wp(6),
		height: wp(6),
	},
	imageContainer: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navigationArrowIcon: {
		width: wp(8),
		height: wp(5),
	},
	divider: {
		width: '100%',
		height: 1,
		backgroundColor: 'lightgray',
	},
});

export default UserProfileScreen;
