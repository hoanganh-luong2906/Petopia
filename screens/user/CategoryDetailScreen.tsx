import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import {
	Image,
	PermissionsAndroid,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ICon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	API_URL,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	ICenterDetail,
	ICenterServiceDetail,
} from '../../utils/Types';

interface ICategoryDetailProps {
	route: RouteProp<any, 'category-detail'>;
	navigation: NativeStackNavigationProp<any, 'category-detail'>;
}

function formatPhoneNumber(phoneNumber: string): string {
	const formattedNumber = phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
	return formattedNumber;
}

async function isValidImageUrl(url: string): Promise<boolean> {
	const response = await fetch(url, { method: 'HEAD' });
	if (!response.ok) {
		return false;
	}
	const contentType = response.headers.get('Content-Type');
	return contentType?.startsWith('image/') ?? false;
}

const CategoryDetailScreen = ({ route, navigation }: ICategoryDetailProps) => {
	const data = route.params?.data ?? null;
	const isService = route.params?.isService ?? null;
	const [centerData, setCenterData] = useState<ICenterDetail>({} as ICenterDetail);
	const [centerServiceList, setCenterServiceList] = useState<ICenterServiceDetail[]>(
		[]
	);
	const [isImageError, setImageError] = useState<boolean>(false);

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const apiUrl: string = process.env.SERVER_API_URL ?? API_URL;
				const userToken: string = (await AsyncStorage.getItem('token')) ?? '';
				const requestBody: { centerId: number } = { centerId: data?.id ?? 0 };

				try {
					const centerResponse = await fetch(
						`${apiUrl}/user/service-center-detail`,
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer ${userToken}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(requestBody),
						}
					);
					if (centerResponse.ok) {
						const centerDataObj = await centerResponse.json();
						const validCenterData: ICenterDetail =
							{ ...centerDataObj } ?? ({} as ICenterDetail);
						setCenterData(validCenterData);
					}

					const serviceResponse = await fetch(`${apiUrl}/user/service-list`, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${userToken}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(requestBody),
					});
					if (serviceResponse.ok) {
						const serviceDataObj = await serviceResponse.json();
						const validServiceData: ICenterServiceDetail[] =
							{ ...serviceDataObj.serviceList } ??
							([] as ICenterServiceDetail[]);
						setCenterServiceList(validServiceData);
					}
					try {
						const isValidImage = await isValidImageUrl(centerData.imgLink);
						setImageError(isValidImage);
					} catch (error: any) {
						console.log('Invalid URL: ' + error);
						setImageError(true);
					}
				} catch (error: any) {
					console.log('Error: ' + error);
					alert('Error: ' + error.message);
				}
			};
			fetchData();
			console.log('Center: ', JSON.stringify(centerData, null, 2));
			console.log('Service: ', JSON.stringify(centerServiceList, null, 2));
		}, [])
	);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()} style={styles.goBackBtn}>
					<ICon name='arrow-back' size={30} />
				</Pressable>
				<CustomText
					message={`${isService ? 'Thông tin dịch vụ' : 'Thông tin trung tâm'}`}
					styles={styles.headerText}
					variant={FONT_BOLD}
				/>
			</View>
			<ScrollView>
				<View style={styles.contentContainer}>
					{isImageError ? (
						<Image
							source={require('../../assets/images/shop-bg.png')}
							resizeMode='contain'
							onError={() => setImageError(true)}
							style={styles.bgImage}
						/>
					) : (
						<Image
							src={centerData.imgLink}
							resizeMode='cover'
							onError={() => setImageError(true)}
							style={styles.bgImage}
						/>
					)}
					<CustomText
						message={centerData?.name ?? 'Đang cập nhật'}
						styles={styles.nameTitle}
						variant={FONT_BOLD}
					/>
					<View style={styles.descriptionContainer}>
						<CustomText
							message='Thông tin chi tiết'
							styles={styles.headerText}
							variant={FONT_SEMI_BOLD}
						/>
						<CustomText
							message={centerData?.description ?? 'Đang cập nhật'}
							styles={[
								styles.descriptionCategoryContent,
								{ paddingHorizontal: wp(5) },
							]}
							variant={FONT_REGULAR}
						/>
						<View
							style={[
								styles.descriptionCategoryContainer,
								{ backgroundColor: '#fffdf0' },
							]}
						>
							<CustomText
								message='Tên trung tâm:'
								styles={styles.descriptionCategoryHeading}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message={centerData?.name ?? 'Đang cập nhật'}
								styles={[
									styles.descriptionCategoryContent,
									styles.specificContent,
								]}
								variant={FONT_REGULAR}
							/>
						</View>
						<View
							style={[
								styles.descriptionCategoryContainer,
								{ backgroundColor: '#f7f7f7' },
							]}
						>
							<CustomText
								message='Địa chỉ:'
								styles={styles.descriptionCategoryHeading}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message={centerData?.address ?? 'Đang cập nhật'}
								styles={[
									styles.descriptionCategoryContent,
									styles.specificContent,
								]}
								variant={FONT_REGULAR}
							/>
						</View>
						<View
							style={[
								styles.descriptionCategoryContainer,
								{ backgroundColor: '#fffdf0' },
							]}
						>
							<CustomText
								message='Số điện thoại:'
								styles={styles.descriptionCategoryHeading}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message={
									centerData?.phone
										? formatPhoneNumber(centerData.phone)
										: 'Đang cập nhật'
								}
								styles={[
									styles.descriptionCategoryContent,
									styles.specificContent,
								]}
								variant={FONT_REGULAR}
							/>
						</View>
						<View
							style={[
								styles.descriptionCategoryContainer,
								{ backgroundColor: '#f7f7f7' },
							]}
						>
							<CustomText
								message='Website:'
								styles={styles.descriptionCategoryHeading}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								numberOfLines={1}
								message={centerData.website}
								styles={[
									styles.descriptionCategoryContent,
									styles.specificContent,
								]}
								variant={FONT_REGULAR}
							/>
						</View>
					</View>
					<View style={styles.descriptionContainer}>
						<CustomText
							message='Danh sách dịch vụ'
							styles={styles.headerText}
							variant={FONT_SEMI_BOLD}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		paddingTop: hp(6),
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(5),
		paddingBottom: hp(1),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: hp(2.5),
		textAlign: 'center',
	},
	goBackBtn: {
		position: 'absolute',
		left: wp(5),
		bottom: hp(1.5),
	},
	contentContainer: {
		paddingHorizontal: wp(4),
		paddingTop: hp(2),
	},
	bgImage: {
		width: '100%',
		height: hp(20),
		borderRadius: 10,
		backgroundColor: 'white',
	},
	nameTitle: {
		fontSize: hp(3.5),
		textAlign: 'center',
	},
	descriptionContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: hp(2),
		marginVertical: hp(1),
	},
	descriptionCategoryContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingTop: hp(1),
		paddingHorizontal: wp(5),
	},
	descriptionCategoryHeading: {
		fontSize: hp(2),
		lineHeight: hp(3.5),
		textAlign: 'left',
		color: 'gray',
	},
	descriptionCategoryContent: {
		fontSize: hp(2),
		lineHeight: hp(3),
		textAlign: 'justify',
	},
	specificContent: {
		paddingLeft: wp(3),
		width: wp(65),
		paddingVertical: hp(0.5),
	},
});

export default CategoryDetailScreen;
