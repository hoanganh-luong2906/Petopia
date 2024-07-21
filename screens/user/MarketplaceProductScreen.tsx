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
	COLOR_PRIMARY_200,
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_MEDIUM,
	TEXT_LARGE,
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
		paddingBottom: hp(1),
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
		height: hp(6),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: wp(5),
		marginVertical: hp(2),
		borderRadius: 5,
		borderColor: COLOR_PRIMARY_200,
		borderWidth: 1,
		columnGap: wp(2),
	},
});

export default MarketplaceProductScreen;
