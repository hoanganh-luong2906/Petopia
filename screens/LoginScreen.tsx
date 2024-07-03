import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import UserData from '../data/UserData.json';
import { login } from '../redux/UserSlice';
import { RootDispatch } from '../redux/configStore';
import { useRootDispatch } from '../redux/hooks';
import {
	API_URL,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	IUser,
	TEXT_LARGE,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../utils/Constants';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type NavigationProp = {
	navigation: NativeStackNavigationProp<any, 'login'>;
};

const LoginScreen = ({ navigation }: NavigationProp) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isRecentPushed, setIsRecentPushed] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const dispatch: RootDispatch = useRootDispatch();

	const handleLoginBtn = async () => {
		setIsRecentPushed(true);
		setErrorMsg('');
		try {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const loginBody: { email: string; password: string } = {
				email: email.trim(),
				password: password.trim(),
			};

			let token: string = '';
			let user: IUser = {} as IUser;

			if (api.length > 0) {
				const response = await fetch(`${api}/auth/login`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(loginBody),
				});
				if (response.status === 200) {
					const data = await response.json();
					const validUser: IUser = { ...(data?.account ?? ({} as IUser)) };
					if (validUser) {
						token = data?.account?.accessToken ?? '';
						user = validUser;
					}
				} else {
					const errorData = await response.json();
					console.log(
						'Error: ' + JSON.stringify(errorData) ?? 'No response data'
					);
					setErrorMsg(errorData?.message ?? 'Email hoặc mật khẩu không đúng');
				}
			}
			console.log('User: ' + JSON.stringify(user, null, 2));
			console.log('Token: ' + token);

			if (user && token) {
				await AsyncStorage.setItem('token', token);
				await AsyncStorage.setItem('user', JSON.stringify(user));
				dispatch(login(user));
			} else {
				setErrorMsg('Email hoặc mật khẩu không đúng');
			}
		} catch (error) {
			alert('ERROR: ' + error);
		}
		setIsRecentPushed(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.animationContainer}>
				<LottieView
					source={require('../assets/animations/phone.json')}
					autoPlay
					loop
					speed={0.5}
					style={styles.animation}
				/>
			</View>
			<LinearGradient
				style={styles.linearContainer}
				colors={['#fce8bb', '#faeed4', '#FFFFFF', '#FFFFFF']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<View style={styles.loginContainer}>
					<CustomText
						message='ĐĂNG NHẬP'
						styles={styles.title}
						variant={FONT_BOLD}
					/>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.textInput}
							placeholder='Email'
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder='Mật khẩu'
								secureTextEntry={showPassword ? false : true}
								value={password}
								onChangeText={(text) => setPassword(text)}
							/>
							{password?.length > 0 && (
								<Pressable
									style={styles.showPasswordBtn}
									onPress={() => setShowPassword(!showPassword)}
								>
									<Icon
										name={
											showPassword ? 'eye-off-sharp' : 'eye-sharp'
										}
										size={20}
										color='black'
									/>
								</Pressable>
							)}
						</View>
					</View>
					{errorMsg && (
						<CustomText
							numberOfLines={1}
							message={errorMsg}
							styles={styles.errorMsg}
							variant={FONT_SEMI_BOLD}
						/>
					)}
					<Pressable
						style={[
							styles.loginButton,
							isRecentPushed
								? { backgroundColor: 'gray' }
								: { backgroundColor: 'black' },
						]}
						onPress={handleLoginBtn}
						disabled={isRecentPushed}
					>
						<LinearGradient
							colors={
								isRecentPushed
									? ['#cfd0d1', '#cfd0d1']
									: [COLOR_PRIMARY, COLOR_SECONDARY]
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.gradientLoginDecorator}
						>
							<CustomText
								message='ĐĂNG NHẬP'
								styles={styles.loginText}
								variant={FONT_SEMI_BOLD}
							/>
						</LinearGradient>
					</Pressable>
					<View style={styles.optionalContainer}>
						<CustomText
							message='Hoặc'
							styles={styles.optionalText}
							variant={FONT_SEMI_BOLD}
						/>
						<View style={styles.divider}></View>
					</View>
					<View style={styles.optionalLoginContainer}>
						<Pressable
							style={styles.googleLoginContainer}
							onPress={() => alert('Tính năng hiện chưa khả dụng')}
						>
							<Icon name='logo-google' size={40} color='black' />
						</Pressable>
					</View>

					<View style={styles.registerContainer}>
						<CustomText
							message='Chưa có tài khoản?'
							styles={styles.registerHelpText}
							variant={FONT_REGULAR}
						/>
						<Pressable
							style={styles.registerButton}
							onPress={() => {
								navigation.push('register');
								setIsRecentPushed(true);
							}}
							disabled={isRecentPushed}
						>
							<MaskedView
								style={styles.registerDecorator}
								maskElement={
									<View style={styles.decoratorContainer}>
										<CustomText
											message='Đăng ký'
											styles={styles.registerText}
											variant={FONT_BOLD}
										/>
									</View>
								}
							>
								<LinearGradient
									colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
									start={{ x: 0, y: 0 }}
									end={{ x: 0, y: 1 }}
									style={styles.gradientDecorator}
								/>
							</MaskedView>
						</Pressable>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 'auto',
		backgroundColor: 'white',
		paddingTop: hp(3),
	},
	animationContainer: {
		flex: 0.3,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	animation: {
		width: wp(60),
		height: hp(30),
		zIndex: 2,
	},
	linearContainer: {
		flex: 0.7,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: hp(2),
		paddingHorizontal: wp(2),
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		zIndex: 10,
		overflow: 'hidden',
	},
	loginContainer: {
		flex: 1,
		width: '100%',
		paddingHorizontal: wp(3),
		height: 'auto',
	},
	title: {
		fontSize: TEXT_LARGE + 10,
		marginVertical: hp(2),
		width: '100%',
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		height: hp(16),
		display: 'flex',
		justifyContent: 'space-between',
	},
	textInput: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 50,
		fontSize: TEXT_PRIMARY,
		backgroundColor: 'white',
		overflow: 'hidden',
	},
	showPasswordBtn: {
		position: 'absolute',
		right: 20,
		top: 14,
	},
	errorMessage: {
		marginTop: hp(2.5),
		textAlign: 'left',
		paddingHorizontal: wp(5),
		fontSize: TEXT_SECONDARY,
		color: 'red',
		fontWeight: '600',
	},
	optionalContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	optionalText: {
		width: '20%',
		textAlign: 'center',
		marginVertical: hp(3.5),
		fontSize: TEXT_PRIMARY,
		color: 'gray',
		backgroundColor: 'white',
		zIndex: 1,
		letterSpacing: 1.5,
	},
	divider: {
		width: '70%',
		position: 'absolute',
		top: 40,
		borderTopWidth: 1.5,
		borderColor: 'gray',
		zIndex: 0,
	},
	loginButton: {
		height: hp(7),
		display: 'flex',
		alignItems: 'center',
		borderRadius: 50,
		marginTop: 30,
		overflow: 'hidden',
	},
	gradientLoginDecorator: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 20,
	},
	loginText: {
		color: 'white',
		letterSpacing: 1.5,
		fontSize: TEXT_LARGE,
	},
	optionalLoginContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	googleLoginContainer: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: '#FAFBEA',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	registerContainer: {
		width: '100%',
		height: hp(8.5),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: hp(6),
		transform: [{ translateX: 60 }],
	},
	registerButton: {
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 5,
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
		transform: [{ translateX: -50 }, { translateY: 0 }],
	},
	registerText: {
		color: 'black',
		letterSpacing: 1,
		fontSize: TEXT_LARGE,
	},
	registerHelpText: {
		color: 'gray',
		fontSize: TEXT_PRIMARY,
	},
	registerDecorator: {
		width: 100,
		flex: 1,
		flexDirection: 'row',
		height: '100%',
	},
	gradientDecorator: {
		width: 50,
		height: 50,
		flex: 1,
	},
	decoratorContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
	errorMsg: {
		color: 'red',
		letterSpacing: 1,
		fontSize: 16,
		marginTop: 10,
		paddingLeft: 10,
	},
});

export default LoginScreen;
