import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	API_URL,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	ICenterDetail,
	ICenterServiceDetail,
	IPet,
	TEXT_LARGE,
	TEXT_PRIMARY,
} from '../../utils/Types';

interface IFormProps {
	selectedDate: Date;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
	fullName: string;
	setFullName: React.Dispatch<React.SetStateAction<string>>;
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	note: string;
	setNote: React.Dispatch<React.SetStateAction<string>>;
	isVisible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	selectedPet: number;
	setSelectedPet: React.Dispatch<React.SetStateAction<number>>;
	center: { centerData: ICenterDetail; centerServiceList: ICenterServiceDetail[] };
}

interface IDropdownOption {
	label: string;
	value: number;
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

const MAXIMUM_PREBOOKING_DATE: Date = new Date(
	new Date().getTime() + 7 * 24 * 60 * 60 * 1000
);
const SERVICE_PREFERENCES: string[] = ['Tại trung tâm', 'Tại nhà'];

const FormFirstSection = (props: IFormProps) => {
	const {
		fullName,
		setFullName,
		phoneNumber,
		setPhoneNumber,
		address,
		setAddress,
		note,
		selectedPet,
		setNote,
		isVisible,
		setVisible,
		selectedDate,
		setSelectedDate,
		setSelectedPet,
		center,
	}: IFormProps = props;

	const [selectedPetDropdown, setSelectedPetDropdown] = useState<IDropdownOption>(
		{} as IDropdownOption
	);
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [data, setData] = useState<IDropdownOption[]>([]);
	const [serviceData, setServiceData] = useState<IDropdownOption[]>([]);
	const [petData, setPetData] = useState<IPet[]>([]);
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [isDateEditted, setIsDateEditted] = useState<boolean>(false);
	const [selectedServicePreference, setSelectedServicePreference] = useState<number>(0);

	const handleChangeDate = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		const currentDate = selectedDate;
		setSelectedDate(currentDate ?? new Date());
		if (!isDateEditted) {
			setIsDateEditted(true);
		}
	};

	const showDateMode = (currentMode: any) => {
		DateTimePickerAndroid.open({
			value: selectedDate,
			onChange: handleChangeDate,
			mode: currentMode,
			display: 'spinner',
			is24Hour: false,
			minimumDate: new Date(),
			timeZoneName: 'Asia/Ho_Chi_Minh',
			timeZoneOffsetInMinutes: 0,
			maximumDate: MAXIMUM_PREBOOKING_DATE,
		});
	};

	const showDatepicker = () => {
		showDateMode('date');
	};

	const showTimepicker = () => {
		showDateMode('time');
	};

	const renderItem = (item: IDropdownOption) => {
		return (
			<View style={styles.item}>
				<CustomText
					message={item.label}
					styles={styles.selectedTextStyle}
					variant={FONT_SEMI_BOLD}
				/>
				<Icon name='close-circle-outline' size={TEXT_PRIMARY} color='black' />
			</View>
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const userToken: string = (await AsyncStorage.getItem('token')) ?? '';

			try {
				const response = await fetch(`${api}/user/pet-list`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					const validPetData: IPet[] = data.petList ?? ([] as IPet[]);
					if (validPetData.length > 0) {
						setPetData(validPetData);
						console.log(JSON.stringify(validPetData, null, 2));
					}
				}
			} catch (error: any) {
				console.log('Error: ' + error);
				alert('Error: ' + error.message);
			}
		};
		fetchData();
	}, []);

	useFocusEffect(
		useCallback(() => {
			if (petData.length > 0) {
				const tempData = petData.map((pet, index) => ({
					label: pet.name,
					value: pet.id,
				}));
				setData(tempData);
			}
			if (center?.centerServiceList?.length > 0) {
				const tempData = center.centerServiceList.map((service, index) => ({
					label: service.serviceName,
					value: service.id,
				}));
				setServiceData(tempData);
			}
		}, [petData, center])
	);

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.formContainer}>
					<CustomText
						message={'Thông tin cá nhân'}
						styles={styles.formHeaderText}
						variant={FONT_BOLD}
					/>
					<View style={styles.formContent}>
						<View>
							<CustomText
								message='Họ và tên'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<TextInput
								value={fullName}
								onChangeText={(text) => setFullName(text)}
								placeholder='VD: Lương Hoàng Anh'
								numberOfLines={1}
								style={styles.informationInput}
							/>
						</View>
						<View>
							<CustomText
								message='Số điện thoại'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<TextInput
								placeholder='VD: 0222.333.444'
								value={phoneNumber}
								onChangeText={(text) => setPhoneNumber(text)}
								numberOfLines={1}
								style={styles.informationInput}
							/>
						</View>
						<View>
							<CustomText
								message='Địa chỉ'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<TextInput
								placeholder='Địa chỉ'
								value={address}
								onChangeText={(text) => setAddress(text)}
								numberOfLines={1}
								style={styles.informationInput}
							/>
						</View>
						<View>
							<CustomText
								message='Thú cưng'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<Dropdown
								style={[
									styles.informationInput,
									isFocus && { borderWidth: 2 },
									selectedPet === 0 && { opacity: 0.7 },
								]}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								data={data}
								search
								maxHeight={300}
								labelField='label'
								valueField='value'
								placeholderStyle={styles.regularTxt}
								placeholder={!isFocus ? 'Chọn thú cưng' : '...'}
								searchPlaceholder='Tìm kiếm...'
								value={selectedPetDropdown}
								onFocus={() => setIsFocus(true)}
								onBlur={() => setIsFocus(false)}
								onChange={(item: IDropdownOption) => {
									setSelectedPetDropdown(
										item ?? ({} as IDropdownOption)
									);
									setSelectedPet(item.value ?? 0);
									setIsFocus(false);
								}}
							/>
						</View>
						<View>
							<CustomText
								message='Loại dịch vụ sử dụng'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<View style={styles.serviceReferenceContainer}>
								{SERVICE_PREFERENCES.map((service, index) => (
									<Pressable
										key={index}
										onPress={() =>
											setSelectedServicePreference(index)
										}
										style={styles.serviceReferenceContent}
									>
										<Icon
											name={
												selectedServicePreference === index
													? 'radio-button-on'
													: 'radio-button-off'
											}
											size={TEXT_PRIMARY}
											color={'black'}
										/>
										<CustomText
											message={service}
											variant={
												selectedServicePreference === index
													? FONT_SEMI_BOLD
													: FONT_REGULAR
											}
											styles={styles.serviceReferenceTxt}
										/>
									</Pressable>
								))}
							</View>
						</View>
						<View>
							<CustomText
								message='Dịch vụ'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<MultiSelect
								style={styles.informationInput}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								data={serviceData}
								labelField='label'
								valueField='value'
								placeholder='Chọn dịch vụ'
								placeholderStyle={styles.regularTxt}
								value={selectedServices}
								search
								searchPlaceholder='Tìm kiếm...'
								onChange={(item) => {
									setSelectedServices(item);
								}}
								// renderItem={renderItem}
								renderSelectedItem={(item, unSelect) => (
									<TouchableOpacity
										onPress={() => unSelect && unSelect(item)}
									>
										<View style={styles.selectedStyle}>
											<CustomText
												message={item.label}
												styles={styles.textSelectedStyle}
												variant={FONT_REGULAR}
											/>
											<Icon
												name='close-circle-outline'
												size={TEXT_PRIMARY}
												color='black'
											/>
										</View>
									</TouchableOpacity>
								)}
							/>
						</View>
						<View style={styles.dateContainer}>
							<View>
								<CustomText
									message='Ngày hẹn'
									variant={FONT_BOLD}
									styles={styles.informationLabel}
								/>
								<Pressable
									onPress={showDatepicker}
									style={[styles.informationInput, styles.petPickerBtn]}
								>
									<CustomText
										message={
											isDateEditted
												? formatVietnameseDate(selectedDate)
												: 'Chọn ngày'
										}
										variant={FONT_SEMI_BOLD}
										styles={styles.petPickerTxt}
									/>
									<Icon
										name='chevron-down-outline'
										size={TEXT_PRIMARY}
										color='black'
									/>
								</Pressable>
							</View>
							<View>
								<CustomText
									message='Giờ hẹn'
									variant={FONT_BOLD}
									styles={styles.informationLabel}
								/>
								<Pressable
									onPress={showTimepicker}
									style={[styles.informationInput, styles.petPickerBtn]}
								>
									<CustomText
										message={
											isDateEditted
												? formatTime(selectedDate)
												: 'Chọn giờ'
										}
										variant={FONT_SEMI_BOLD}
										styles={styles.petPickerTxt}
									/>
									<Icon
										name='chevron-down-outline'
										size={TEXT_PRIMARY}
										color='black'
									/>
								</Pressable>
							</View>
						</View>
						<View>
							<CustomText
								message='Ghi chú'
								variant={FONT_BOLD}
								styles={styles.informationLabel}
							/>
							<TextInput
								value={note}
								onChangeText={(text) => setNote(text)}
								placeholder='Ghi chú'
								numberOfLines={4}
								multiline={true}
								style={styles.noteInput}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
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
	scrollContainer: {
		width: '100%',
		height: '100%',
	},
	formContainer: {
		flex: 1,
		width: wp(95),
		height: 'auto',
		marginHorizontal: wp(3),
		marginVertical: hp(5),
		backgroundColor: 'white',
		borderRadius: 10,
		padding: wp(3.5),
		paddingVertical: wp(4),
		rowGap: hp(2),
		elevation: 5,
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
	dateContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	informationContent: {
		width: '48%',
	},
	informationLabel: {
		fontSize: TEXT_PRIMARY,
		letterSpacing: 0.5,
		marginBottom: hp(0.5),
		marginLeft: wp(4),
		color: 'gray',
	},
	informationInput: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 50,
		paddingRight: wp(2),
		fontFamily: 'Baloo 2 Regular',
		paddingLeft: wp(5),
		paddingVertical: hp(1.3),
		fontSize: TEXT_PRIMARY,
		alignContent: 'center',
	},
	petPickerBtn: {
		width: wp(42),
		paddingLeft: wp(3),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	petPickerTxt: {
		fontSize: TEXT_PRIMARY,
		letterSpacing: 1,
	},
	noteInput: {
		height: hp(15),
		width: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		fontSize: TEXT_PRIMARY,
		borderRadius: 5,
		paddingHorizontal: wp(2),
		paddingVertical: 10,
		textAlignVertical: 'top',
	},
	selectedTextStyle: {
		fontSize: TEXT_PRIMARY,
		fontFamily: 'Baloo 2 Regular',
	},
	inputSearchStyle: {
		height: hp(5),
		fontSize: TEXT_PRIMARY,
		fontFamily: 'Baloo 2 Regular',
	},
	regularTxt: {
		fontFamily: 'Baloo 2 Regular',
		fontSize: TEXT_PRIMARY,
	},
	item: {
		padding: 17,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	selectedStyle: {
		minWidth: '46%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: 'white',
		shadowColor: '#000',
		marginTop: 8,
		marginRight: wp(2),
		paddingHorizontal: 12,
		paddingVertical: 8,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	textSelectedStyle: {
		marginRight: 5,
		fontSize: 16,
	},
	serviceReferenceContainer: {
		width: '100%',
		paddingHorizontal: wp(4),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	serviceReferenceContent: {
		width: '50%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	serviceReferenceTxt: {
		fontSize: TEXT_PRIMARY,
		marginLeft: wp(2),
	},
});

export default FormFirstSection;
