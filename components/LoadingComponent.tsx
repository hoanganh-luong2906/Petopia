import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const LoadingComponent = () => {
	return (
		<View style={styles.container}>
			<View style={styles.loadingBackdrop} />
			<LottieView
				source={require('../assets/animations/loading.json')}
				loop
				autoPlay
				style={styles.loader}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: wp(100),
		height: hp(100),
		position: 'absolute',
		top: 0,
		left: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	loadingBackdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		opacity: 0.9,
	},
	loader: {
		width: wp(40),
		height: wp(40),
		zIndex: 1,
	},
});

export default LoadingComponent;
