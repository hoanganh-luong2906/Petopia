import { Image, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	COLOR_GRAY,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_MEDIUM,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import CustomText from '../CustomText';

const NotificationContent = () => {
	return (
		<View style={styles.container}>
			<View style={styles.notificationWrapper}>
				{[1, 2].map((item) => (
					<View style={styles.notificationContainer} key={item}>
						<Image
							source={require('../../assets/images/default-avt.png')}
							resizeMode='cover'
							style={styles.postHeaderImg}
						/>
						<View style={styles.notificationContent}>
							<CustomText
								message='Phuong Anh'
								variant={FONT_BOLD}
								styles={styles.notificationTitle}
								numberOfLines={2}
							/>
							<CustomText
								message='Phuong Anh đã thích bài viết của bạn'
								variant={FONT_MEDIUM}
								styles={styles.notificationContentTxt}
								numberOfLines={2}
							/>
							<CustomText
								message='15 phút trước'
								variant={FONT_MEDIUM}
								styles={styles.notificationHelper}
								numberOfLines={2}
							/>
						</View>
						<Image
							source={require('../../assets/images/demo-post.webp')}
							resizeMode='center'
							style={styles.postImg}
						/>
					</View>
				))}
				{[1, 2].map((item) => (
					<View
						style={[
							styles.notificationContainer,
							{ backgroundColor: COLOR_GRAY },
						]}
						key={item}
					>
						<Image
							source={require('../../assets/images/default-avt.png')}
							resizeMode='cover'
							style={styles.postHeaderImg}
						/>
						<View style={styles.notificationContent}>
							<CustomText
								message='Phuong Anh'
								variant={FONT_BOLD}
								styles={styles.notificationTitle}
								numberOfLines={2}
							/>
							<CustomText
								message='Phuong Anh đã thích bài viết của bạn'
								variant={FONT_MEDIUM}
								styles={styles.notificationContentTxt}
								numberOfLines={2}
							/>
							<CustomText
								message='15 phút trước'
								variant={FONT_MEDIUM}
								styles={styles.notificationHelper}
								numberOfLines={2}
							/>
						</View>
						<Image
							source={require('../../assets/images/demo-post.webp')}
							resizeMode='center'
							style={styles.postImg}
						/>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(5),
	},
	notificationWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	notificationContainer: {
		width: '100%',
		height: hp(14),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		backgroundColor: COLOR_SECONDARY_LIGHTER,
		marginVertical: hp(1),
		borderRadius: 10,
		paddingHorizontal: wp(3),
		paddingVertical: hp(0.5),
	},
	postHeaderImg: {
		width: wp(8),
		height: '100%',
		aspectRatio: 1,
		borderRadius: 50,
		marginTop: hp(1),
	},
	notificationContent: {
		width: wp(50),
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: hp(1),
		paddingHorizontal: wp(2),
	},
	postImg: {
		width: wp(20),
		height: '100%',
	},
	notificationTitle: {
		fontSize: TEXT_SECONDARY,
		lineHeight: TEXT_SECONDARY + 5,
	},
	notificationContentTxt: {
		fontSize: TEXT_SECONDARY,
		lineHeight: TEXT_SECONDARY + 5,
	},
	notificationHelper: {
		fontSize: TEXT_SECONDARY - 2,
		lineHeight: TEXT_SECONDARY + 5,
		color: 'gray',
	},
});

export default NotificationContent;
