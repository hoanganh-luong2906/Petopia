import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomText from '../components/CustomText';
import { COLOR_PRIMARY_900, FONT_BOLD, TEXT_LARGE } from '../utils/Constants';

type NavigationProp = {
	navigation: NativeStackNavigationProp<any, 'welcome'>;
};

const WelcomeScreen = ({ navigation }: NavigationProp) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsVisible(true), 1000);
		return () => clearTimeout(timeoutId);
	}, []);

	function handleNavigate() {
		navigation.navigate('login');
	}

	return (
		<View style={styles.container}>
			<LottieView
				source={require('../assets/animations/welcome-transition.json')}
				autoPlay
				loop={false}
				style={styles.transition}
			/>
			{isVisible && (
				<View style={styles.mainComponent}>
					<Image
						source={require('../assets/images/welcome-bg.jpg')}
						resizeMode='contain'
						style={styles.background}
					/>
					<View style={styles.componentContainer}>
						<View style={styles.components}>
							<Image
								source={require('../assets/images/logo.png')}
								resizeMode='contain'
								style={styles.imageLogoComponents}
							/>
						</View>
						<View style={styles.components}>
							<Image
								source={require('../assets/images/welcome-comp1.jpg')}
								resizeMode='contain'
								style={styles.imageComponents}
							/>
						</View>
						<View style={styles.components}>
							<Image
								source={require('../assets/images/welcome-comp2.png')}
								resizeMode='contain'
								style={styles.imageComponents}
							/>
						</View>
						<View style={styles.components}>
							<Image
								source={require('../assets/images/welcome-comp3.jpg')}
								resizeMode='contain'
								style={styles.imageComponents}
							/>
						</View>
					</View>
					<CustomText
						message='KẾT NỐI CỘNG ĐỒNG THÚ CƯNG'
						styles={styles.slogan}
						variant={FONT_BOLD}
					/>
					<Pressable style={styles.button} onPress={handleNavigate}>
						<LottieView
							source={require('../assets/animations/button-shine.json')}
							autoPlay
							loop
							style={styles.buttonEffect}
						/>
						<CustomText
							message='BẮT ĐẦU'
							styles={styles.buttonText}
							variant={FONT_BOLD}
						/>
					</Pressable>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	transition: {
		flex: 2,
		position: 'absolute',
		top: 0,
		left: 0,
		transform: [{ translateX: -wp(145) }],
		width: '400%',
		height: hp(106),
		zIndex: 1,
	},
	mainComponent: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: -wp(15),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -1,
	},
	componentContainer: {
		width: hp(35),
		height: wp(68),
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		gap: hp(1.5),
		transform: [{ rotate: '45deg' }],
		marginBottom: hp(10),
	},
	components: {
		width: wp(32),
		height: wp(32),
		paddingTop: wp(1.5),
		paddingLeft: wp(1.5),
		paddingBottom: wp(4),
		paddingRight: wp(4),
		backgroundColor: 'white',
		borderRadius: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		elevation: 10,
	},
	imageLogoComponents: {
		width: '100%',
		height: '100%',
		transform: [{ rotate: '-45deg' }],
	},
	imageComponents: {
		width: '180%',
		height: '180%',
		transform: [{ rotate: '-45deg' }],
	},
	slogan: {
		width: '100%',
		textAlign: 'center',
		color: 'white',
		fontSize: TEXT_LARGE,
		marginVertical: hp(2),
	},
	button: {
		backgroundColor: COLOR_PRIMARY_900,
		paddingVertical: hp(1.5),
		paddingHorizontal: wp(8),
		borderRadius: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		overflow: 'hidden',
		elevation: 2,
		marginVertical: hp(4),
		zIndex: 2,
	},
	buttonText: {
		fontSize: TEXT_LARGE,
		color: 'white',
		transform: [{ translateY: 2 }],
		letterSpacing: 1,
	},
	buttonEffect: {
		position: 'absolute',
		top: -50,
		left: -wp(190),
		width: '500%',
		height: '500%',
		transform: [{ rotate: '-90deg' }],
	},
});

export default WelcomeScreen;
