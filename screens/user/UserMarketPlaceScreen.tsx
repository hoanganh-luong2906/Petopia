import {
	Image,
	ScrollView,
	SectionList,
	StyleSheet,
	TouchableHighlight,
	View,
} from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../components/CustomText';
import {
	COLOR_GRAY,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	ISectionListData,
	TEXT_LARGE,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IData {
	id: number;
	title: string;
	price: number;
	imgLink: string;
}

const sampleData: ISectionListData<IData>[] = [
	{
		title: 'Lựa chọn hôm nay',
		data: [
			{
				id: 1,
				title: 'Ổ mèo mới 100%',
				price: 1000000,
				imgLink:
					'https://img.lazcdn.com/g/ff/kf/Sdd5be278bf7946b1abebeda3e36dbf8cZ.jpg_720x720q80.jpg',
			},
			{
				id: 2,
				title: 'Vòng cổ chó mèo đa dạng mẫu mã đủ dạng thể loại',
				price: 500000,
				imgLink:
					'https://cutepetshop.vn/wp-content/uploads/2023/03/images-upload-woo2F7717669ff29b715ab8f8fdd24d6a08a9.jpg',
			},
			{
				id: 3,
				title: 'Chén mèo nhỏ xinh nhiều màu sắc mẫu mã mới 100%',
				price: 200000,
				imgLink:
					'https://product.hstatic.net/1000217401/product/upload_4164bf51dd5c4b55a2fbdd2ddb092c85.jpg',
			},
		],
	},
	{
		title: 'Nhà bán chuyên nghiệp',
		data: [
			{
				id: 1,
				title: 'Ổ mèo mới 100%',
				price: 1000000,
				imgLink:
					'https://img.lazcdn.com/g/ff/kf/Sdd5be278bf7946b1abebeda3e36dbf8cZ.jpg_720x720q80.jpg',
			},
			{
				id: 2,
				title: 'Vòng cổ chó mèo đa dạng mẫu mã đủ dạng thể loại',
				price: 500000,
				imgLink:
					'https://cutepetshop.vn/wp-content/uploads/2023/03/images-upload-woo2F7717669ff29b715ab8f8fdd24d6a08a9.jpg',
			},
			{
				id: 3,
				title: 'Chén mèo nhỏ xinh nhiều màu sắc mẫu mã mới 100%',
				price: 200000,
				imgLink:
					'https://product.hstatic.net/1000217401/product/upload_4164bf51dd5c4b55a2fbdd2ddb092c85.jpg',
			},
		],
	},
];

const formatNumber = (number: number): string => {
	const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
	return `${formattedNumber} VNĐ`;
};

interface IProps {
	navigation: NativeStackNavigationProp<any, 'user-marketplace'>;
}
const UserMarketPlaceScreen = ({ navigation }: IProps) => {
	const handleSellProfileClick = () => {
		alert("You've clicked your selling profile!");
	};

	const handleSearchClick = () => {
		alert("You've clicked search button!");
	};

	const handleProductClick = () => {
		navigation.navigate('customer-marketplace-product');
	};

	const handleCreateProductClick = () => {
		alert("You've clicked create product button!");
	};

	const handleOpenCategoryClick = () => {
		alert("You've clicked open category button!");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<View style={[styles.flexRowSpaceBetween, styles.headerContainer]}>
					<CustomText
						message='Marketplace'
						variant={FONT_BOLD}
						styles={styles.headerTxt}
					/>
					<View style={[styles.flexRowSpaceBetween, styles.headerIcon]}>
						<TouchableHighlight
							underlayColor='rgba(237, 231, 225, 0.5)'
							onPress={handleSellProfileClick}
							style={{ borderRadius: 50 }}
						>
							<Icon name='user' color={'black'} size={TEXT_LARGE + 5} />
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor='rgba(237, 231, 225, 0.5)'
							onPress={handleSearchClick}
						>
							<Icon name='search' color={'black'} size={TEXT_LARGE + 2} />
						</TouchableHighlight>
					</View>
				</View>
				<View style={[styles.flexRowSpaceBetween, { paddingHorizontal: wp(4) }]}>
					<TouchableHighlight
						underlayColor='rgba(237, 231, 225, 0.5)'
						onPress={handleCreateProductClick}
						style={{ borderRadius: 50 }}
					>
						<View style={[styles.flexRowCenter, styles.buttonContainer]}>
							<Icon name='edit' color={'black'} size={TEXT_LARGE + 2} />
							<CustomText
								message='Bán'
								variant={FONT_SEMI_BOLD}
								styles={styles.buttonTxt}
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor='rgba(237, 231, 225, 0.5)'
						onPress={handleOpenCategoryClick}
					>
						<View style={[styles.flexRowCenter, styles.buttonContainer]}>
							<Icon name='list' color={'black'} size={TEXT_LARGE} />
							<CustomText
								message='Danh mục'
								variant={FONT_SEMI_BOLD}
								styles={styles.buttonTxt}
							/>
						</View>
					</TouchableHighlight>
				</View>
				{sampleData.map((data, index) => (
					<View
						key={`${data.title}${index}`}
						style={styles.productCategoryContainer}
					>
						<CustomText
							message={data.title}
							variant={FONT_BOLD}
							styles={styles.productCategoryTitle}
						/>
						<View style={styles.productContainer}>
							{data.data.map((product, index) => (
								<TouchableHighlight
									onPress={handleProductClick}
									underlayColor='rgba(237, 231, 225, 0.5)'
									key={`${product.title}${index}`}
								>
									<View style={styles.productContent}>
										<Image
											src={product.imgLink}
											style={styles.productImg}
											resizeMode='cover'
										/>
										<View>
											<CustomText
												message={formatNumber(product.price)}
												variant={FONT_SEMI_BOLD}
												styles={styles.productPrice}
												numberOfLines={1}
											/>
											<CustomText
												message={product.title}
												variant={FONT_REGULAR}
												styles={styles.productTitle}
												numberOfLines={1}
											/>
										</View>
									</View>
								</TouchableHighlight>
							))}
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		rowGap: hp(1),
		paddingBottom: hp(3),
	},
	flexRowSpaceBetween: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	flexRowCenter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		paddingHorizontal: wp(4),
		alignItems: 'baseline',
	},
	headerTxt: {
		fontSize: TEXT_LARGE + 5,
		color: 'black',
	},
	headerIcon: {
		width: wp(15),
	},
	buttonContainer: {
		minWidth: wp(42),
		columnGap: 5,
		backgroundColor: COLOR_GRAY,
		borderRadius: 50,
		paddingVertical: hp(0.6),
	},
	buttonTxt: {
		fontSize: TEXT_LARGE,
		color: 'black',
	},
	productCategoryContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	productCategoryTitle: {
		fontSize: TEXT_PRIMARY + 2,
		marginLeft: wp(3),
	},
	productContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		paddingHorizontal: wp(3),
		columnGap: wp(4),
	},
	productContent: {
		width: wp(45),
		height: hp(20),
		marginVertical: hp(1),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	productImg: {
		width: '100%',
		height: '70%',
		borderRadius: 5,
	},
	productTitle: {
		fontSize: TEXT_SECONDARY,
		lineHeight: TEXT_SECONDARY + 8,
	},
	productPrice: {
		fontSize: TEXT_SECONDARY,
		lineHeight: TEXT_SECONDARY + 8,
	},
});

export default UserMarketPlaceScreen;
