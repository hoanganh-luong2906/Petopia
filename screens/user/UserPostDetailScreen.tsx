import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import PostContent from '../../components/user/PostContent';
import {
	COLOR_GRAY,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import CommentContent from '../../components/user/CommentContent';
import { useState } from 'react';

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-profile-detail'>;
}

const UserPostDetailScreen = ({ navigation }: IProps) => {
	const [comment, setComment] = useState<string>('');
	const [isUserTyping, setIsUserTyping] = useState<boolean>(false);

	const handleSendComment = () => {
		setIsUserTyping(false);
		alert('Comment sent');
		setComment('');
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name='arrow-back' size={25} style={{ marginBottom: hp(1) }} />
				</Pressable>
				<CustomText
					message={'Bài viết của Phuong Anh'}
					styles={styles.headerText}
					variant={FONT_SEMI_BOLD}
				/>
			</View>
			<View style={styles.postContainer}>
				<View style={styles.postContent}>
					<PostContent />
				</View>
				{!isUserTyping && (
					<View style={[styles.postContent, { height: hp(48) }]}>
						<CustomText
							message={'Xem tất cả bình luận'}
							styles={styles.postCommentAllTxt}
							variant={FONT_SEMI_BOLD}
						/>
						<View style={styles.postCommentContainer}>
							<CommentContent />
							<View style={{ width: wp(80) }}>
								<CommentContent />
							</View>
						</View>
					</View>
				)}
				<View
					style={[
						styles.postNewCommentContainer,
						isUserTyping && {
							height: hp(55),
							paddingBottom:
								hp(49.5) - 1.8 * hp(Math.floor(comment.length / 27)),
						},
					]}
				>
					<Image
						source={require('../../assets/images/default-avt.png')}
						resizeMode='cover'
						style={styles.postCommentImg}
					/>
					<View>
						<TextInput
							style={[
								styles.postNewCommentInput,
								comment.length > 29 && {
									height:
										hp(5) + 1.8 * hp(Math.floor(comment.length / 27)),
									borderRadius: 15,
								},
							]}
							placeholder='Viết bình luận...'
							value={comment}
							multiline={true}
							numberOfLines={4}
							textBreakStrategy='simple'
							onChangeText={(text) => {
								setComment(text);
							}}
							onFocus={() => {
								setIsUserTyping(true);
							}}
							onBlur={() => {
								setIsUserTyping(false);
							}}
							onKeyPress={() => {
								setIsUserTyping(true);
							}}
						/>
						<Icon
							name='send'
							size={hp(3)}
							color={'gray'}
							style={styles.postNewCommentIcon}
							onPress={handleSendComment}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
	},
	headerContainer: {
		// flex: 1,
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(2),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	headerText: {
		width: wp(85),
		fontSize: TEXT_LARGE - 2,
		textAlign: 'center',
		marginBottom: hp(1),
		color: 'lightgray',
		letterSpacing: 1,
	},
	postContainer: {
		width: wp(100),
		marginTop: hp(1),
		rowGap: 2,
	},
	postContent: {
		width: '100%',
		height: hp(37),
		// flex: 3,
		backgroundColor: 'white',
	},
	postCommentAllTxt: {
		width: wp(100),
		textAlign: 'left',
		paddingLeft: wp(5),
		fontSize: TEXT_SECONDARY,
		color: 'gray',
		marginVertical: hp(1),
	},
	postCommentContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		paddingHorizontal: wp(5),
	},
	postNewCommentContainer: {
		marginTop: 1,
		backgroundColor: 'white',
		height: hp(10),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: wp(5),
		paddingTop: '3%',
		paddingBottom: '7%',
	},
	postCommentImg: {
		width: wp(8),
		height: wp(8),
		aspectRatio: 1,
		borderRadius: 50,
		marginTop: 2,
	},
	postNewCommentInput: {
		width: wp(80),
		backgroundColor: COLOR_GRAY,
		height: '100%',
		borderRadius: 50,
		paddingLeft: wp(5),
		paddingRight: wp(15),
		paddingHorizontal: wp(1),
		overflow: 'hidden',
		fontSize: TEXT_SECONDARY,
	},
	postNewCommentIcon: {
		position: 'absolute',
		right: wp(5),
		bottom: hp(1),
	},
});

export default UserPostDetailScreen;
