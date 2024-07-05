import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomText from '../components/CustomText';
import {
	API_URL,
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_PRIMARY,
} from '../utils/Constants';
import { useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProps = {
	navigation: NativeStackNavigationProp<any, 'register'>;
};

interface IRegisterBody {
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}

const RegisterScreen = ({ navigation }: NavigationProps) => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [isRecentPushed, setIsRecentPushed] = useState<boolean>(false);
	const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
	const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

	const handleValidatePasswordConfirm = (confirmedPassword: string) => {
		setPasswordConfirm(confirmedPassword);
		if (password === confirmedPassword) {
			setIsPasswordMatch(true);
			return;
		}
		setIsPasswordMatch(false);
	};

	const handleValidatingPhone = (phoneNumber: string) => {
		setPhone(phoneNumber);
		const phoneNumberRegex = /^0\d{9}$/;
		const isValidPhoneNumber = phoneNumberRegex.test(phoneNumber);
		setIsValidPhoneNumber(isValidPhoneNumber);
	};

	const handleValidatingEmail = (email: string) => {
		setEmail(email);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValidEmail = emailRegex.test(email);
		setIsValidEmail(isValidEmail);
	};

	const isFormValid = (): boolean => {
		return (
			isPasswordMatch &&
			isValidPhoneNumber &&
			isValidEmail &&
			password.length > 7 &&
			username.length > 0
		);
	};

	const handleFormSubmit = async () => {
		const body: IRegisterBody = {
			name: username,
			email,
			phoneNumber: phone,
			password,
			confirmPassword: passwordConfirm,
		};
		const api: string = process.env.API_URL ?? API_URL;
		const response = await fetch(`${api}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		if (data?.status === '200') {
			alert('Đăng ký thành công');
			navigation.navigate('login');
		} else {
			alert(data?.message ?? 'Đăng ký thất bại');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.animationContainer}>
				<LottieView
					source={require('../assets/animations/register-banner.json')}
					autoPlay
					loop
					speed={0.5}
					style={styles.animation}
				/>
			</View>
			<LinearGradient
				style={styles.linearContainer}
				colors={['#fce8bb', '#faeed4', '#FFFFFF']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<View style={styles.registerContainer}>
					<CustomText
						message='ĐĂNG KÝ'
						styles={styles.title}
						variant={FONT_BOLD}
					/>
					<View style={styles.inputContainer}>
						<TextInput
							style={[styles.textInput, !username && styles.errorTxtInput]}
							placeholder='Tên người dùng'
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={[
								styles.textInput,
								!isValidEmail && styles.errorTxtInput,
							]}
							placeholder='Email'
							value={email}
							onChangeText={(text) => handleValidatingEmail(text)}
						/>
						<TextInput
							style={[
								styles.textInput,
								!isValidPhoneNumber && styles.errorTxtInput,
							]}
							placeholder='Số điện thoại'
							value={phone}
							onChangeText={(text) => handleValidatingPhone(text)}
						/>
						<View>
							<TextInput
								style={[
									styles.textInput,
									!(password.length > 7) && styles.errorTxtInput,
								]}
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
						<TextInput
							style={[
								styles.textInput,
								!isPasswordMatch && styles.errorTxtInput,
							]}
							placeholder='Xác nhận mật khẩu'
							value={passwordConfirm}
							secureTextEntry={true}
							onChangeText={(text) => {
								handleValidatePasswordConfirm(text);
							}}
						/>
					</View>
					<Pressable
						style={styles.registerButton}
						onPress={handleFormSubmit}
						disabled={isRecentPushed || !isFormValid()}
					>
						<LinearGradient
							colors={
								isRecentPushed || !isFormValid()
									? ['#cfd0d1', '#cfd0d1']
									: [COLOR_PRIMARY_900, COLOR_SECONDARY_200]
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.gradientRegisterDecorator}
						>
							<CustomText
								message='ĐĂNG KÝ'
								styles={styles.registerBtnText}
								variant={FONT_SEMI_BOLD}
							/>
						</LinearGradient>
					</Pressable>
					<View style={styles.loginContainer}>
						<CustomText
							message='Đã có tài khoản?'
							styles={styles.loginHelpText}
							variant={FONT_REGULAR}
						/>
						<Pressable
							style={styles.loginButton}
							onPress={() => {
								navigation.goBack();
								setIsRecentPushed(true);
							}}
							disabled={isRecentPushed}
						>
							<MaskedView
								style={styles.loginDecorator}
								maskElement={
									<View style={styles.decoratorContainer}>
										<CustomText
											message='Đăng nhập'
											styles={styles.loginAskText}
											variant={FONT_BOLD}
										/>
									</View>
								}
							>
								<LinearGradient
									colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
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
		zIndex: 1,
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
		paddingHorizontal: wp(2),
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		zIndex: 10,
		overflow: 'hidden',
	},
	registerContainer: {
		width: '100%',
		paddingHorizontal: wp(2),
		height: 'auto',
		overflow: 'scroll',
	},
	title: {
		fontSize: TEXT_LARGE + 10,
		width: '100%',
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		height: hp(42),
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	textInput: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 50,
		fontSize: TEXT_PRIMARY,
		backgroundColor: 'white',
	},
	showPasswordBtn: {
		position: 'absolute',
		right: 20,
		top: 14,
	},
	registerButton: {
		height: hp(7),
		display: 'flex',
		alignItems: 'center',
		borderRadius: 50,
		marginTop: hp(2),
		overflow: 'hidden',
	},
	registerBtnText: {
		color: 'white',
		letterSpacing: 1.5,
		fontSize: TEXT_LARGE,
	},
	gradientRegisterDecorator: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 20,
	},
	loginContainer: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: hp(3),
		transform: [{ translateX: 60 }],
	},
	loginButton: {
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 5,
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
		transform: [{ translateX: -50 }, { translateY: 0 }],
	},
	loginAskText: {
		color: 'black',
		letterSpacing: 1,
		fontSize: TEXT_LARGE,
	},
	loginHelpText: {
		color: 'gray',
		fontSize: TEXT_PRIMARY,
	},
	loginDecorator: {
		width: 120,
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
	errorTxtInput: {
		borderColor: 'red',
		borderWidth: 1,
	},
});

export default RegisterScreen;
