import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	FONT_BOLD,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import CustomText from '../CustomText';
import SocialContent from './SocialContent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
	data: any[];
}

const TrendingContent = ({ navigation, data }: IProps) => {
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.categoryWrapper}>
					<View style={styles.categoryContentContainer}>
						<CustomText
							message='Bảng tin thú cưng'
							variant={FONT_BOLD}
							styles={styles.categoryContentTitle}
							numberOfLines={1}
						/>
						<CustomText
							message='Xem thêm'
							variant={FONT_BOLD}
							styles={styles.categoryContentHelperText}
							numberOfLines={1}
						/>
					</View>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<View style={styles.categoryContentWrapper} key={item}>
								<Image
									source={require('../../assets/images/demo-post.webp')}
									resizeMode='cover'
									style={styles.categoryContentImg}
								/>
								<CustomText
									message='Tui đã hỏi một chuyên gia rằng tại sao con mèo của tui lại ghét phụ nữ và trẻ nhỏ'
									variant={FONT_SEMI_BOLD}
									styles={styles.categoryContentHeader}
									numberOfLines={2}
								/>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={styles.categoryWrapper}>
					<View style={styles.knowledgeContentContainer}>
						<CustomText
							message='Kiến thức bổ ích'
							variant={FONT_BOLD}
							styles={styles.knowledgeContentTitle}
							numberOfLines={1}
						/>
						<CustomText
							message='Xem thêm'
							variant={FONT_BOLD}
							styles={styles.knowledgeContentHelperText}
							numberOfLines={1}
						/>
					</View>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<View style={styles.knowledgeContentWrapper} key={item}>
								<Image
									source={require('../../assets/images/demo-post.webp')}
									resizeMode='cover'
									style={styles.knowledgeContentImg}
								/>
								<CustomText
									message='Nghiên cứu cho thấy chó là người bạn thân nhất của loài người'
									variant={FONT_SEMI_BOLD}
									styles={styles.knowledgeContentHeader}
									numberOfLines={2}
								/>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={styles.categoryWrapper}>
					<View style={styles.categoryContentContainer}>
						<CustomText
							message='Bảng tin thú cưng'
							variant={FONT_BOLD}
							styles={styles.categoryContentTitle}
							numberOfLines={1}
						/>
						<CustomText
							message='Xem thêm'
							variant={FONT_BOLD}
							styles={styles.categoryContentHelperText}
							numberOfLines={1}
						/>
					</View>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<View style={styles.categoryContentWrapper} key={item}>
								<Image
									source={require('../../assets/images/demo-post.webp')}
									resizeMode='cover'
									style={styles.categoryContentImg}
								/>
								<CustomText
									message='Tui đã hỏi một chuyên gia rằng tại sao con mèo của tui lại ghét phụ nữ và trẻ nhỏ'
									variant={FONT_SEMI_BOLD}
									styles={styles.categoryContentHeader}
									numberOfLines={2}
								/>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={styles.categoryWrapper}>
					<View style={styles.knowledgeContentContainer}>
						<CustomText
							message='Kiến thức bổ ích'
							variant={FONT_BOLD}
							styles={styles.knowledgeContentTitle}
							numberOfLines={1}
						/>
						<CustomText
							message='Xem thêm'
							variant={FONT_BOLD}
							styles={styles.knowledgeContentHelperText}
							numberOfLines={1}
						/>
					</View>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<View style={styles.knowledgeContentWrapper} key={item}>
								<Image
									source={require('../../assets/images/demo-post.webp')}
									resizeMode='cover'
									style={styles.knowledgeContentImg}
								/>
								<CustomText
									message='Nghiên cứu cho thấy chó là người bạn thân nhất của loài người'
									variant={FONT_SEMI_BOLD}
									styles={styles.knowledgeContentHeader}
									numberOfLines={2}
								/>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		paddingHorizontal: wp(5),
	},
	categoryWrapper: {
		width: '100%',
		overflow: 'hidden',
		marginVertical: hp(1),
	},
	categoryContentContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	categoryContentWrapper: {
		width: wp(60),
		marginTop: hp(0.5),
		marginRight: wp(3),
	},
	categoryContentTitle: {
		fontSize: TEXT_LARGE,
	},
	categoryContentImg: {
		width: '100%',
		height: hp(15),
		borderRadius: 10,
	},
	categoryContentHelperText: {
		fontSize: hp(2),
		color: 'gray',
		height: '100%',
		textAlignVertical: 'center',
	},
	categoryContentHeader: {
		textAlign: 'left',
		fontSize: TEXT_SECONDARY,
		lineHeight: hp(2.5),
		marginTop: hp(1),
		color: 'gray',
		paddingHorizontal: wp(1),
	},
	knowledgeContentContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	knowledgeContentWrapper: {
		width: wp(50),
		marginTop: hp(0.5),
		marginRight: wp(5),
	},
	knowledgeContentTitle: {
		fontSize: TEXT_LARGE,
	},
	knowledgeContentImg: {
		width: '100%',
		height: hp(20),
		borderRadius: 10,
	},
	knowledgeContentHelperText: {
		fontSize: hp(2),
		color: 'gray',
		height: '100%',
		textAlignVertical: 'center',
	},
	knowledgeContentHeader: {
		textAlign: 'left',
		fontSize: TEXT_SECONDARY,
		lineHeight: hp(2.5),
		marginTop: hp(1),
		color: 'gray',
		paddingHorizontal: wp(1),
	},
});

export default TrendingContent;
