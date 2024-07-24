import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, TouchableHighlight, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	COLOR_GRAY,
	COLOR_PRIMARY_200,
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_MEDIUM,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_SECONDARY,
} from '../../utils/Constants';

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-marketplace-product'>;
	route: RouteProp<any, 'customer-marketplace-product'>;
}

const formatNumber = (number: number): string => {
	const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
	return `${formattedNumber} VNĐ`;
};

const MarketplaceProductScreen = (props: IProps) => {
	const { navigation, route } = props;
	const data = route.params?.data ?? null;

	const handleContactSeller = () => {
		alert('Bạn đang được dẫn sang thông tin liên hệ');
	};

	const handleAddToFavourite = () => {
		alert('Đã thêm vào danh sách yêu thích');
	};

	const handleShareProduct = () => {
		alert('Đang chia sẻ sản phẩm');
	};

	const handleNotificationAnnounce = () => {
		alert('Đang theo dõi thông báo');
	};

	return (
		<View style={styles.container}>
			<View style={[styles.flexRowSpaceBetween, styles.headerContainer]}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name='arrow-back' size={TEXT_LARGE + 2} />
				</Pressable>
				<View style={[styles.flexRowSpaceBetween, styles.headerIconContainer]}>
					<Pressable onPress={() => navigation.goBack()}>
						<Icon name='search' color={'black'} size={TEXT_LARGE + 2} />
					</Pressable>
					<Pressable onPress={() => navigation.goBack()}>
						<Icon name='ellipsis-horizontal' size={TEXT_LARGE + 2} />
					</Pressable>
				</View>
			</View>
			<Image
				src={data?.imgLink ?? 'https://via.placeholder.com/150'}
				resizeMode='cover'
				style={styles.productImage}
			/>
			<View style={styles.productContainer}>
				<CustomText
					message={data.title ?? 'Đang cập nhật...'}
					variant={FONT_BOLD}
					styles={styles.productTitle}
				/>
				<CustomText
					message={formatNumber(data?.price ?? 0)}
					variant={FONT_MEDIUM}
					styles={styles.productPrice}
					numberOfLines={1}
				/>
				<TouchableHighlight
					onPress={handleContactSeller}
					underlayColor={COLOR_SECONDARY_LIGHTER}
					style={styles.contactButton}
				>
					<>
						<Icon
							name='call'
							size={TEXT_LARGE + 2}
							color={COLOR_PRIMARY_900}
						/>
						<CustomText
							message='Liên hệ người bán'
							variant={FONT_MEDIUM}
							styles={styles.productPrice}
							numberOfLines={1}
						/>
					</>
				</TouchableHighlight>

				<View style={styles.buttonContainer}>
					<View style={styles.buttonContent}>
						<TouchableHighlight
							underlayColor={COLOR_SECONDARY_LIGHTER}
							onPress={handleAddToFavourite}
							style={styles.functionalButton}
						>
							<Icon
								name='notifications'
								size={TEXT_LARGE + 2}
								color={'black'}
							/>
						</TouchableHighlight>
						<CustomText
							message='Thông báo'
							variant={FONT_SEMI_BOLD}
							styles={styles.buttonTitle}
						/>
					</View>
					<View style={styles.buttonContent}>
						<TouchableHighlight
							underlayColor={COLOR_SECONDARY_LIGHTER}
							onPress={handleAddToFavourite}
							style={styles.functionalButton}
						>
							<Icon name='heart' size={TEXT_LARGE + 2} color={'black'} />
						</TouchableHighlight>
						<CustomText
							message='Lưu'
							variant={FONT_SEMI_BOLD}
							styles={styles.buttonTitle}
						/>
					</View>
					<View style={styles.buttonContent}>
						<TouchableHighlight
							underlayColor={COLOR_SECONDARY_LIGHTER}
							onPress={handleAddToFavourite}
							style={styles.functionalButton}
						>
							<Icon
								name='share-social'
								size={TEXT_LARGE + 2}
								color={'black'}
							/>
						</TouchableHighlight>
						<CustomText
							message='Chia sẻ'
							variant={FONT_SEMI_BOLD}
							styles={styles.buttonTitle}
						/>
					</View>
				</View>

				<View style={styles.descriptionContainer}>
					<CustomText
						message='Mô tả'
						variant={FONT_SEMI_BOLD}
						styles={styles.descriptionTitle}
					/>
					<CustomText
						message='Ổ mèo bốn mùa thông dụng cho mèo con kiểu kín có thể tháo giặt cho mèo, giúp mèo luôn giữ ấm được cơ thể'
						variant={FONT_REGULAR}
						styles={styles.descriptionContent}
					/>
				</View>
				<View style={styles.descriptionContainer}>
					<CustomText
						message='Thông tin người bán'
						variant={FONT_SEMI_BOLD}
						styles={styles.descriptionTitle}
					/>
					<CustomText
						message='Ổ mèo bốn mùa thông dụng cho mèo con kiểu kín có thể tháo giặt cho mèo, giúp mèo luôn giữ ấm được cơ thể'
						variant={FONT_REGULAR}
						styles={styles.descriptionContent}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	flexRowSpaceBetween: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerContainer: {
		width: '100%',
		paddingHorizontal: wp(5),
		paddingBottom: hp(1.5),
		borderBottomColor: 'lightgray',
		borderBottomWidth: 1,
	},
	headerIconContainer: {
		width: wp(15),
	},
	productContainer: {
		width: '100%',
		paddingHorizontal: wp(3),
	},
	productImage: {
		width: '100%',
		height: hp(25),
	},
	productTitle: {
		fontSize: TEXT_LARGE,
		marginTop: hp(1),
		textAlign: 'justify',
	},
	productPrice: {
		fontSize: TEXT_LARGE,
	},
	contactButton: {
		width: '100%',
		height: hp(6.5),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: wp(5),
		marginVertical: hp(2),
		borderRadius: 10,
		borderColor: COLOR_PRIMARY_200,
		borderWidth: 1,
		columnGap: wp(2),
	},
	buttonContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: hp(1),
		paddingBottom: hp(2),
		borderBottomColor: COLOR_GRAY,
		borderBottomWidth: 1,
	},
	buttonContent: {
		width: wp(20),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	functionalButton: {
		width: '55%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		aspectRatio: 1,
		borderRadius: 50,
		backgroundColor: COLOR_GRAY,
	},
	buttonTitle: {
		fontSize: TEXT_SECONDARY + 1,
		paddingTop: hp(0.5),
		textAlign: 'center',
		letterSpacing: 0.5,
	},
	descriptionContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingVertical: hp(1.5),
		borderBottomColor: COLOR_GRAY,
		borderBottomWidth: 1,
	},
	descriptionTitle: {
		fontSize: TEXT_SECONDARY + 5,
		letterSpacing: 0.2,
	},
	descriptionContent: {
		width: '100%',
		fontSize: TEXT_SECONDARY + 1,
		textAlign: 'justify',
		letterSpacing: 0.2,
	},
});

export default MarketplaceProductScreen;
