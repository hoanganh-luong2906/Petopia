import { Image, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../CustomText';
import {
	COLOR_GRAY,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	TEXT_SECONDARY,
} from '../../utils/Constants';

const CommentContent = () => {
	return (
		<View style={styles.postCommentContent}>
			<Image
				source={require('../../assets/images/default-avt.png')}
				resizeMode='cover'
				style={styles.postCommentImg}
			/>
			<View style={styles.postUserCommentContent}>
				<View style={styles.postUserCommentWrapper}>
					<CustomText
						message={'Phuong Anh'}
						styles={styles.postUserCommentTxt}
						variant={FONT_SEMI_BOLD}
					/>
					<CustomText
						message={
							'Nhìn các bạn hạnh phúc quá trời, mê ghê. Ước gì ngày nào cũng có vài em để ôm :>'
						}
						styles={styles.postUserCommentTxt}
						variant={FONT_REGULAR}
					/>
				</View>
				<View style={styles.postCommentExtraContainer}>
					<CustomText
						message={'Thứ 7, 29-06'}
						styles={styles.postCommentExtraTxt}
						variant={FONT_REGULAR}
					/>
					<CustomText
						message={'Phản hồi'}
						styles={styles.postCommentExtraTxt}
						variant={FONT_REGULAR}
					/>
				</View>
			</View>
			<Icon name='ellipsis-horizontal' size={25} color={'gray'} />
		</View>
	);
};

const styles = StyleSheet.create({
	postCommentContent: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		marginVertical: 5,
	},
	postCommentImg: {
		width: wp(8),
		height: wp(8),
		aspectRatio: 1,
		borderRadius: 50,
		marginTop: 2,
	},
	postUserCommentContent: {
		width: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	postUserCommentWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: wp(2),
		paddingHorizontal: wp(3),
		borderRadius: 10,
		backgroundColor: COLOR_GRAY,
	},
	postUserCommentTxt: {
		fontSize: TEXT_SECONDARY,
		textAlign: 'justify',
		lineHeight: hp(2.5),
	},
	postCommentExtraContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 1,
		marginLeft: wp(5),
	},
	postCommentExtraTxt: {
		fontSize: TEXT_SECONDARY - 2,
		color: 'gray',
		marginRight: wp(5),
	},
});

export default CommentContent;
