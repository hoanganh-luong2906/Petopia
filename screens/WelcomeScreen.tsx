import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../components/CustomText';
import { FONT_BOLD } from '../utils/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = {
	navigation: NativeStackNavigationProp<any, 'welcome'>;
};

const WelcomeScreen = ({ navigation }: NavigationProp) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setIsVisible(true), 1000);

		// Cleanup function to clear the timeout when the component unmounts
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
		position: 'absolute',
		top: 0,
		left: -600,
		width: '400%',
		height: '100%',
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
		left: -180,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -1,
	},
	componentContainer: {
		width: 280,
		height: 280,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		transform: [{ rotate: '45deg' }],
		marginBottom: 60,
	},
	components: {
		width: 130,
		height: 130,
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 20,
		paddingRight: 20,
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
		fontSize: 23,
		marginVertical: 30,
	},
	button: {
		backgroundColor: '#F4A905',
		paddingVertical: 10,
		paddingHorizontal: 35,
		borderRadius: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		overflow: 'hidden',
		elevation: 2,
		marginTop: 30,
		zIndex: 2,
	},
	buttonText: {
		fontSize: 25,
		color: 'white',
		transform: [{ translateY: 2 }],
		letterSpacing: 1,
	},
	buttonEffect: {
		position: 'absolute',
		top: -50,
		left: -600,
		width: '400%',
		height: '500%',
		transform: [{ rotate: '-90deg' }],
	},
});

export default WelcomeScreen;
