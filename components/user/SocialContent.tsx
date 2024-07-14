import MaskedView from '@react-native-masked-view/masked-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	FONT_MEDIUM,
	FONT_SEMI_BOLD,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../../utils/Constants';

const formatNumber = (number: number): string => {
	if (number >= 1000) {
		const formattedNumber = Math.floor(number / 1000);
		const suffix = number % 1000 >= 100 ? 'K+' : 'K';
		return formattedNumber.toString() + suffix;
	}
	return number.toString();
};

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
	data: any[];
}

const SocialContent = ({ navigation, data }: IProps) => {
	const handlePostPress = () => {
		navigation.navigate('customer-post-detail');
	};

	return (
		<View style={styles.homePageContainer}>
			{data.length > 0 ? (
				<>
					{/* Already intergrated in PostContent */}
					<Pressable style={styles.postContainer} onPress={handlePostPress}>
						<View style={styles.postHeaderContainer}>
							<View style={styles.innerContainer}>
								<Image
									source={require('../../assets/images/default-avt.png')}
									resizeMode='cover'
									style={styles.postHeaderImg}
								/>
								<CustomText
									message='Phuong Anh'
									numberOfLines={1}
									variant={FONT_SEMI_BOLD}
									styles={styles.postHeaderName}
								/>
							</View>
							<CustomText
								message='1 giờ trước'
								numberOfLines={1}
								variant={FONT_MEDIUM}
								styles={styles.postHeaderTime}
							/>
						</View>
						<View style={styles.postBodyContainer}>
							<Image
								source={require('../../assets/images/demo-post.webp')}
								resizeMode='cover'
								style={styles.postBodyImg}
							/>
						</View>
						<View style={styles.postFooterContainer}>
							<View style={styles.innerContainer}>
								<View style={styles.innerContainer}>
									<MaskedView
										maskElement={
											<Icon
												name='heart-outline'
												size={wp(6)}
												color='white'
											/>
										}
									>
										<LinearGradient
											colors={[
												COLOR_PRIMARY_900,
												COLOR_SECONDARY_200,
											]}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 0 }}
											style={{ width: wp(6), height: wp(6) }}
										/>
									</MaskedView>
									<CustomText
										message={formatNumber(
											Math.floor(Math.random() * 10000)
										)}
										numberOfLines={1}
										variant={FONT_SEMI_BOLD}
										styles={styles.postFooterTxt}
									/>
								</View>
								<View style={styles.innerContainer}>
									<MaskedView
										maskElement={
											<Icon
												name='chatbubble-ellipses-outline'
												size={wp(6)}
												color='white'
											/>
										}
									>
										<LinearGradient
											colors={[
												COLOR_PRIMARY_900,
												COLOR_SECONDARY_200,
											]}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 0 }}
											style={{ width: wp(6), height: wp(6) }}
										/>
									</MaskedView>
									<CustomText
										message={formatNumber(
											Math.floor(Math.random() * 10000)
										)}
										numberOfLines={1}
										variant={FONT_SEMI_BOLD}
										styles={styles.postFooterTxt}
									/>
								</View>
							</View>
							<MaskedView
								maskElement={
									<Icon
										name='bookmark-outline'
										size={wp(6)}
										color='white'
									/>
								}
							>
								<LinearGradient
									colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={{ width: wp(6), height: wp(6) }}
								/>
							</MaskedView>
						</View>
					</Pressable>
					<Pressable style={styles.postContainer} onPress={handlePostPress}>
						<View style={styles.postHeaderContainer}>
							<View style={styles.innerContainer}>
								<Image
									source={require('../../assets/images/default-avt.png')}
									resizeMode='cover'
									style={styles.postHeaderImg}
								/>
								<CustomText
									message='Phuong Anh'
									numberOfLines={1}
									variant={FONT_SEMI_BOLD}
									styles={styles.postHeaderName}
								/>
							</View>
							<CustomText
								message='1 giờ trước'
								numberOfLines={1}
								variant={FONT_MEDIUM}
								styles={styles.postHeaderTime}
							/>
						</View>
						<View style={styles.postBodyContainer}>
							<Image
								source={require('../../assets/images/welcome-comp1.jpg')}
								resizeMode='cover'
								style={styles.postBodyImg}
							/>
						</View>
						<View style={styles.postFooterContainer}>
							<View style={styles.innerContainer}>
								<View style={styles.innerContainer}>
									<MaskedView
										maskElement={
											<Icon
												name='heart'
												size={wp(6)}
												color='white'
											/>
										}
									>
										<LinearGradient
											colors={['#DC1C13', '#EA4C46']}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 0 }}
											style={{ width: wp(6), height: wp(6) }}
										/>
									</MaskedView>
									<CustomText
										message={formatNumber(
											Math.floor(Math.random() * 1000)
										)}
										numberOfLines={1}
										variant={FONT_SEMI_BOLD}
										styles={styles.postFooterTxt}
									/>
								</View>
								<View style={styles.innerContainer}>
									<MaskedView
										maskElement={
											<Icon
												name='chatbubble-ellipses-outline'
												size={wp(6)}
												color='white'
											/>
										}
									>
										<LinearGradient
											colors={[
												COLOR_PRIMARY_900,
												COLOR_SECONDARY_200,
											]}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 0 }}
											style={{ width: wp(6), height: wp(6) }}
										/>
									</MaskedView>
									<CustomText
										message={formatNumber(
											Math.floor(Math.random() * 1000)
										)}
										numberOfLines={1}
										variant={FONT_SEMI_BOLD}
										styles={styles.postFooterTxt}
									/>
								</View>
							</View>
							<MaskedView
								maskElement={
									<Icon name='bookmark' size={wp(6)} color='white' />
								}
							>
								<LinearGradient
									colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={{ width: wp(6), height: wp(6) }}
								/>
							</MaskedView>
						</View>
					</Pressable>
				</>
			) : (
				<View>
					<LottieView
						source={require('../../assets/animations/no-order.json')}
						loop
						autoPlay
						style={styles.notFoundAnimation}
					/>
					<CustomText
						message='Không tìm thấy bài viết nào'
						styles={styles.notFoundText}
						variant={FONT_SEMI_BOLD}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	homePageContainer: {
		width: wp(100),
		paddingHorizontal: wp(2),
		paddingVertical: hp(1),
	},
	postContainer: {
		width: '100%',
		height: hp(38),
		backgroundColor: 'white',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden',
		marginBottom: hp(1),
	},
	postHeaderContainer: {
		width: '100%',
		height: '15%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: '3%',
		paddingVertical: '1%',
	},
	innerContainer: {
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
	},
	postHeaderImg: {
		width: wp(8),
		height: '100%',
		aspectRatio: 1,
		borderRadius: 50,
		borderColor: 'white',
		borderWidth: 2,
	},
	postHeaderName: {
		height: '100%',
		textAlignVertical: 'center',
		fontSize: TEXT_PRIMARY,
		marginLeft: wp(2),
		letterSpacing: 0.5,
	},
	postHeaderTime: {
		height: '100%',
		textAlignVertical: 'center',
		fontSize: TEXT_SECONDARY,
		color: 'gray',
		marginBottom: wp(0.5),
	},
	postBodyContainer: {
		width: '100%',
		height: '70%',
	},
	postBodyImg: {
		width: '100%',
		height: '100%',
	},
	postFooterContainer: {
		width: '100%',
		height: '15%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: wp(4),
	},
	postFooterTxt: {
		height: '100%',
		width: wp(10),
		maxWidth: wp(20),
		color: 'gray',
		textAlignVertical: 'center',
		fontSize: TEXT_PRIMARY,
		marginLeft: wp(1),
	},
	notFoundText: {
		textAlign: 'center',
		fontSize: hp(2),
		color: 'gray',
	},
	notFoundAnimation: {
		width: wp(100),
		height: hp(25),
	},
});

export default SocialContent;
