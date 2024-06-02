import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/CustomText';
import PetPickerModal from '../../components/user/PetPickerModal';
import { FONT_BOLD, IPet } from '../../utils/Types';

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
	selectedPet: IPet;
	setSelectedPet: React.Dispatch<React.SetStateAction<IPet>>;
	petData: IPet[];
}

const MAXIMUM_PREBOOKING_DATE: Date = new Date(
	new Date().getTime() + 7 * 24 * 60 * 60 * 1000
);

const FormFirstSection = (props: IFormProps) => {
	const {
		fullName,
		setFullName,
		phoneNumber,
		setPhoneNumber,
		address,
		setAddress,
		note,
		setNote,
		isVisible,
		setVisible,
		selectedDate,
		setSelectedDate,
		selectedPet,
		setSelectedPet,
		petData,
	}: IFormProps = props;

	const handleChangeDate = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		const currentDate = selectedDate;
		setSelectedDate(currentDate ?? new Date());
	};

	const showDateMode = (currentMode: any) => {
		DateTimePickerAndroid.open({
			value: selectedDate,
			onChange: handleChangeDate,
			mode: currentMode,
			display: 'default',
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

	return (
		<View>
			<View style={styles.formContainer}>
				<CustomText
					message={'Thông tin cá nhân'}
					styles={styles.formHeaderText}
					variant={FONT_BOLD}
				/>
				<View style={styles.informationContainer}>
					<View style={styles.informationContent}>
						<CustomText
							message='Họ và tên'
							variant={FONT_BOLD}
							styles={styles.informationLabel}
						/>
						<TextInput
							value={fullName}
							onChangeText={(text) => setFullName(text)}
							placeholder='Họ và tên'
							numberOfLines={1}
							style={styles.informationInput}
						/>
					</View>
					<View style={styles.informationContent}>
						<CustomText
							message='Số điện thoại'
							variant={FONT_BOLD}
							styles={styles.informationLabel}
						/>
						<TextInput
							placeholder='Số điện thoại'
							value={phoneNumber}
							onChangeText={(text) => setPhoneNumber(text)}
							numberOfLines={1}
							style={styles.informationInput}
						/>
					</View>
				</View>
				<View>
					<CustomText
						message='Địa chỉ'
						variant={FONT_BOLD}
						styles={styles.informationLabel}
					/>
					<TextInput
						placeholder='Địa chỉ'
						value={JSON.stringify(selectedDate)}
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
					<Pressable
						onPress={() => {
							setVisible(true);
						}}
						style={styles.petPickerBtn}
					>
						<CustomText
							message='Chọn thú cưng'
							variant={FONT_BOLD}
							styles={{}}
						/>
					</Pressable>
				</View>
				<View style={styles.informationContainer}>
					<View>
						<CustomText
							message='Ngày hẹn'
							variant={FONT_BOLD}
							styles={styles.informationLabel}
						/>
						<Pressable onPress={showDatepicker} style={styles.petPickerBtn}>
							<CustomText
								message='Chọn ngày hẹn'
								variant={FONT_BOLD}
								styles={{}}
							/>
						</Pressable>
					</View>
					<View>
						<CustomText
							message='Giờ hẹn'
							variant={FONT_BOLD}
							styles={styles.informationLabel}
						/>
						<Pressable onPress={showTimepicker} style={styles.petPickerBtn}>
							<CustomText
								message='Chọn giờ hẹn'
								variant={FONT_BOLD}
								styles={{}}
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
			<PetPickerModal
				isVisible={isVisible}
				setVisible={setVisible}
				pets={petData}
				selectedPet={selectedPet}
				setSelectedPet={setSelectedPet}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		width: wp(90),
		height: 'auto',
		marginHorizontal: wp(5),
		marginVertical: hp(5),
		backgroundColor: 'white',
		borderRadius: 10,
		padding: wp(5),
		paddingTop: wp(4),
		rowGap: hp(2),
	},
	formHeaderText: {
		fontSize: hp(2.5),
		textAlign: 'center',
	},
	informationContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	informationContent: {
		width: '48%',
		fontSize: hp(1.5),
	},
	informationLabel: {
		fontSize: hp(1.8),
		marginBottom: hp(0.5),
		marginLeft: wp(0.5),
	},
	informationInput: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		height: hp(4.5),
		paddingHorizontal: wp(2),
		paddingVertical: 0,
		alignContent: 'center',
	},
	petPickerBtn: {
		width: wp(35),
		backgroundColor: 'lightgray',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: wp(2),
		borderRadius: 5,
	},
	noteInput: {
		height: hp(20),
		width: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		paddingHorizontal: wp(2),
		paddingVertical: 10,
		textAlignVertical: 'top',
	},
});

export default FormFirstSection;
