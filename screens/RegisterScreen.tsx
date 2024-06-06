import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomText from '../components/CustomText';
import {
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
} from '../utils/Constants';
import { useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type NavigationProps = {
	navigation: NativeStackNavigationProp<any, 'register'>;
};

const RegisterScreen = ({ navigation }: NavigationProps) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isRecentPushed, setIsRecentPushed] = useState(false);

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
							style={styles.textInput}
							placeholder='Tên người dùng'
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Email'
							value={email}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Số điện thoại'
							value={phone}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Mật khẩu'
							value={password}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Xác nhận mật khẩu'
							value={passwordConfirm}
							onChangeText={(text) => setUsername(text)}
						/>
					</View>
					<Pressable
						style={[
							styles.registerButton,
							isRecentPushed
								? { backgroundColor: 'gray' }
								: { backgroundColor: 'black' },
						]}
						onPress={() => {}}
						disabled={isRecentPushed}
					>
						<LinearGradient
							colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
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
							onPress={() => navigation.goBack()}
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
		fontSize: hp(3.8),
		width: '100%',
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		height: hp(40),
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	textInput: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 50,
		fontSize: 17,
		backgroundColor: 'white',
	},
	registerButton: {
		height: 60,
		display: 'flex',
		alignItems: 'center',
		borderRadius: 50,
		marginTop: 30,
		overflow: 'hidden',
	},
	registerBtnText: {
		color: 'white',
		letterSpacing: 1.5,
		fontSize: 22,
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
		marginTop: 20,
		transform: [{ translateX: 60 }],
	},
	loginButton: {
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 5,
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
		transform: [{ translateX: -50 }, { translateY: -2 }],
	},
	loginAskText: {
		color: 'black',
		letterSpacing: 1,
		fontSize: 18,
	},
	loginHelpText: {
		color: 'gray',
		fontSize: 17,
	},
	loginDecorator: {
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
});

export default RegisterScreen;
