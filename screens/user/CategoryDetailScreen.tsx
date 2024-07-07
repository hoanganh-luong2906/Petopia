import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { useCallback, useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	SectionList,
	StyleSheet,
	View,
} from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { default as ICon, default as Icon } from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	API_URL,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	ICenterDetail,
	ICenterServiceDetail,
} from '../../utils/Constants';

interface ICategoryDetailProps {
	route: RouteProp<any, 'category-detail'>;
	navigation: NativeStackNavigationProp<any, 'category-detail'>;
}

interface IServiceList {
	title: string;
	data: ICenterServiceDetail[];
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

const renderItem = (item: ICenterServiceDetail) => {
	return (
		<View style={styles.servicesContainer}>
			<Icon
				name='chevron-forward-circle'
				size={hp(2)}
				color={'gray'}
				style={{ marginTop: 3 }}
			/>
			<CustomText
				numberOfLines={2}
				message={item.name}
				styles={[styles.servicesTxt]}
				variant={FONT_REGULAR}
			/>
		</View>
	);
};

const renderSectionHeader = (title: string) => {
	return (
		<View
			style={[styles.descriptionCategoryContainer, { backgroundColor: '#fffdf0' }]}
		>
			<CustomText
				message={title}
				styles={styles.servicesHeader}
				variant={FONT_BOLD}
			/>
		</View>
	);
};

const CategoryDetailScreen = ({ route, navigation }: ICategoryDetailProps) => {
	const data = route.params?.data ?? null;
	const isService = route.params?.isService ?? null;
	const [centerData, setCenterData] = useState<ICenterDetail>({} as ICenterDetail);
	const [centerServiceList, setCenterServiceList] = useState<ICenterServiceDetail[]>(
		[] as ICenterServiceDetail[]
	);
	const [serviceProccessList, setServiceProcessList] = useState<IServiceList[]>(
		[] as IServiceList[]
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
							serviceDataObj.serviceList ?? ([] as ICenterServiceDetail[]);
						setCenterServiceList(validServiceData);
					} else {
						console.log('Service Response Error: ' + serviceResponse.status);
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
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			const processData = () => {
				let categories: Set<string> = new Set<string>();
				let serviceList: IServiceList[] = [];
				centerServiceList.map((service: ICenterServiceDetail) => {
					categories.add(service.type);
				});
				categories.forEach((category: string) => {
					let services: ICenterServiceDetail[] = centerServiceList.filter(
						(service: ICenterServiceDetail) => service.type === category
					);
					serviceList.push({ title: category, data: services });
				});
				setServiceProcessList(serviceList);
				console.log('Service List: ', JSON.stringify(serviceList, null, 2));
			};

			if ((centerData?.name ?? false) && centerServiceList.length > 0) {
				processData();
			}
		}, [centerData, centerServiceList])
	);

	// console.log('Service List: ', JSON.stringify(serviceProccessList, null, 2));

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.bookingContainer}
				onPress={() =>
					navigation.navigate('register-appointment', {
						data: { centerData, centerServiceList, centerId: data?.id ?? 0 },
					})
				}
			>
				<LottieView
					source={require('../../assets/animations/booking-service.json')}
					autoPlay
					loop
					style={styles.bookingBtn}
				/>
			</Pressable>
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()} style={styles.goBackBtn}>
					<ICon name='arrow-back' size={25} />
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
						<SectionList
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							sections={serviceProccessList}
							renderItem={({ item }: { item: ICenterServiceDetail }) =>
								renderItem(item)
							}
							renderSectionHeader={({ section: { title } }) =>
								renderSectionHeader(title)
							}
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
	bookingContainer: {
		position: 'absolute',
		bottom: hp(3),
		right: wp(2),
		width: wp(25),
		height: wp(25),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	bookingBtn: {
		width: '100%',
		height: '100%',
	},
	headerContainer: {
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(5),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: hp(2.5),
		textAlign: 'center',
		marginVertical: hp(1),
	},
	goBackBtn: {
		position: 'absolute',
		left: wp(5),
		bottom: hp(1.5),
	},
	contentContainer: {
		height: hp(100),
		paddingHorizontal: wp(4),
		paddingTop: hp(2),
		marginBottom: hp(3),
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
	servicesContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		paddingVertical: hp(0.5),
		paddingHorizontal: wp(5),
	},
	servicesTxt: {
		fontSize: hp(2.1),
		lineHeight: hp(3),
		textAlign: 'justify',
		paddingLeft: wp(2),
	},
	servicesHeader: {
		fontSize: hp(2.5),
		lineHeight: hp(3.5),
		textAlign: 'left',
		color: 'gray',
	},
});

export default CategoryDetailScreen;
