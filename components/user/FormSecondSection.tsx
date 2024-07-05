import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import { IBookingResponse } from '../../screens/user/RegisterAppointmentScreen';
import {
	COLOR_GRAY,
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IFormProps {
	setVisibleIndex: React.Dispatch<React.SetStateAction<number>>;
	registeredData: IBookingResponse | undefined;
	onSite: boolean;
	navigation: NativeStackNavigationProp<any, 'register-appointment'>;
}

const formatVietnameseDate = (date: Date): string => {
	const daysOfWeek = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
	const dayOfWeek = daysOfWeek[date.getDay()];
	const formattedDate = `${dayOfWeek}, ${date.getDate().toString().padStart(2, '0')}/${(
		date.getMonth() + 1
	)
		.toString()
		.padStart(2, '0')}/${date.getFullYear()}`;
	return formattedDate;
};

const formatTime = (date: Date): string => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes.toString().padStart(2, '0');
	return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes} ${ampm}`;
};

const formatPhoneNumber = (phoneNumber: string): string => {
	const formattedPhoneNumber = phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
	return formattedPhoneNumber;
};

const formatCurrency = (number: number): string => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const FormSecondSection = (props: IFormProps) => {
	const { setVisibleIndex, registeredData, onSite, navigation } = props;

	useEffect(() => {
		if (!registeredData) {
			setVisibleIndex((prev) => prev - 1);
			alert('Đã có lỗi xảy ra!');
		}
	}, []);

	const handleCheckoutClick = () => {
		alert('Thanh toán thành công!');
		navigation.goBack();
	};

	return (
		<LinearGradient
			colors={[COLOR_SECONDARY_LIGHTER, COLOR_SECONDARY_LIGHTER]}
			start={[0, 0]}
			end={[0, 1]}
			style={styles.container}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.formContainer}>
					<CustomText
						message={'Xác nhận thông tin'}
						styles={styles.formHeaderText}
						variant={FONT_BOLD}
					/>
					<View style={styles.formContent}>
						<View style={styles.textContainer}>
							<CustomText
								message='Họ và tên : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={
									registeredData?.substitute[0].name ?? 'Đang cập nhật'
								}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.textContainer}>
							<CustomText
								message='Số điện thoại : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={
									registeredData?.substitute[0].phone
										? formatPhoneNumber(
												registeredData?.substitute[0].phone
										  )
										: 'Đang cập nhật'
								}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View>
							<CustomText
								message={`Địa chỉ ${
									onSite ? '(Trung tâm)' : '(Tại nhà)'
								} : `}
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={registeredData?.location ?? 'Đang cập nhật'}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.textContainer}>
							<CustomText
								message='Thú cưng : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={registeredData?.petName ?? 'Đang cập nhật'}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.textContainer}>
							<CustomText
								message='Ngày hẹn : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={`${formatVietnameseDate(
									new Date(registeredData?.date ?? new Date())
								)} - ${formatTime(
									new Date(registeredData?.date ?? new Date())
								)}`}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.textContainer}>
							<CustomText
								message='Danh mục : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={registeredData?.type ?? 'Đang cập nhật'}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View>
							<CustomText
								message='Dịch vụ sử dụng : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							{registeredData?.services.map((service, index) => (
								<View
									key={index}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-start',
										columnGap: wp(2),
										paddingLeft: wp(2),
									}}
								>
									<Icon name='ellipse' size={TEXT_SECONDARY - 5} />
									<CustomText
										key={index}
										message={service.name}
										styles={styles.textContent}
										variant={FONT_SEMI_BOLD}
									/>
								</View>
							))}
						</View>
						<View>
							<CustomText
								message='Ghi chú thêm : '
								styles={styles.textLabel}
								variant={FONT_REGULAR}
							/>
							<CustomText
								message={
									registeredData?.extraInformation ?? 'Đang cập nhật'
								}
								styles={styles.textContent}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.divider} />
						<View>
							<View style={styles.priceContainer}>
								<CustomText
									message='Phí dịch vụ : '
									styles={styles.priceLabel}
									variant={FONT_REGULAR}
								/>
								<CustomText
									message={`${formatCurrency(
										registeredData?.fee ?? 0
									)} VNĐ`}
									styles={styles.priceValue}
									variant={FONT_SEMI_BOLD}
								/>
							</View>
							<View style={styles.priceContainer}>
								<CustomText
									message='Phí nền tảng : '
									styles={styles.priceLabel}
									variant={FONT_REGULAR}
								/>
								<CustomText
									message={`${formatCurrency(
										((registeredData?.fee ?? 0) * 10) / 100
									)} VNĐ`}
									styles={styles.priceValue}
									variant={FONT_SEMI_BOLD}
								/>
							</View>
							<View style={styles.priceContainer}>
								<CustomText
									message='Thành tiền : '
									styles={styles.priceLabel}
									variant={FONT_REGULAR}
								/>
								<MaskedView
									style={styles.priceDecorator}
									maskElement={
										<CustomText
											message={`${formatCurrency(
												((registeredData?.fee ?? 0) * 10) / 100 +
													(registeredData?.fee ?? 0)
											)} VNĐ`}
											styles={[
												styles.priceValue,
												{ fontSize: TEXT_PRIMARY + 10 },
											]}
											variant={FONT_BOLD}
										/>
									}
								>
									<LinearGradient
										colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
										start={[0, 1]}
										end={[0, 0]}
										style={{ width: '100%', height: '100%' }}
									/>
								</MaskedView>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.btnContainer}>
					<Pressable
						style={styles.functionBtn}
						onPress={() => setVisibleIndex((prev) => prev - 1)}
					>
						<LinearGradient
							colors={[COLOR_GRAY, COLOR_GRAY]}
							start={[0, 0]}
							end={[1, 0]}
							style={styles.btnDecorator}
						>
							<CustomText
								message='Quay lại'
								styles={styles.btnText}
								variant={FONT_BOLD}
							/>
						</LinearGradient>
					</Pressable>
					<Pressable style={styles.functionBtn} onPress={handleCheckoutClick}>
						<LinearGradient
							colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
							start={[0, 0]}
							end={[1, 0]}
							style={styles.btnDecorator}
						>
							<CustomText
								message='Thanh toán'
								styles={[styles.btnText, { color: 'white' }]}
								variant={FONT_BOLD}
							/>
						</LinearGradient>
					</Pressable>
				</View>
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: wp(100),
		height: hp(100),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	formContainer: {
		flex: 1,
		width: wp(95),
		height: 'auto',
		marginHorizontal: wp(2.5),
		marginVertical: hp(2),
		backgroundColor: 'white',
		borderRadius: 10,
		padding: wp(3.5),
		paddingTop: hp(2),
		paddingBottom: hp(5),
		rowGap: hp(2),
		elevation: 2,
		overflow: 'hidden',
	},
	formHeaderText: {
		fontSize: TEXT_LARGE,
		textAlign: 'center',
	},
	formContent: {
		flex: 1,
		width: '100%',
		rowGap: hp(2),
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	textLabel: {
		fontSize: TEXT_PRIMARY,
		color: 'gray',
	},
	textContent: {
		fontSize: TEXT_PRIMARY,
		letterSpacing: 0.5,
	},
	divider: {
		width: '100%',
		height: 2,
		borderTopColor: 'gray',
		borderTopWidth: 1,
		borderStyle: 'dashed',
	},
	priceContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	},
	priceLabel: {
		fontSize: TEXT_PRIMARY,
		color: 'black',
	},
	priceValue: {
		fontSize: TEXT_PRIMARY + 5,
		color: 'black',
		letterSpacing: 1,
	},
	priceDecorator: {
		width: wp(43),
		height: hp(3.5),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		transform: [{ translateX: wp(2.5) }],
	},
	btnContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: wp(3),
		marginBottom: hp(2),
	},
	functionBtn: {
		width: wp(30),
		height: hp(5),
		overflow: 'hidden',
		borderRadius: 50,
		marginLeft: wp(2),
	},
	btnDecorator: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		fontSize: TEXT_PRIMARY,
	},
});

export default FormSecondSection;
