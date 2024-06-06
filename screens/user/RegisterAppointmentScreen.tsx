import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {
	API_URL,
	FONT_BOLD,
	ICenterDetail,
	ICenterServiceDetail,
	IPet,
} from '../../utils/Constants';
import FormFirstSection from '../../components/user/FormFirstSection';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IRegisterAppointmentProps {
	route: RouteProp<any, 'register-appointment'>;
	navigation: NativeStackNavigationProp<any, 'register-appointment'>;
}

interface IFormBody {
	petId: number;
	centerId: number;
	substituteName?: string;
	substitutePhone?: string;
	extraInformation: string;
	servicePlace: string;
	phone: string;
	dateTime: string;
	serviceId: number[];
}

interface IFormParams {
	centerData: ICenterDetail;
	centerServiceList: ICenterServiceDetail[];
	centerId: number;
}

const RegisterAppointmentScreen = ({ route, navigation }: IRegisterAppointmentProps) => {
	const data: IFormParams = route.params?.data ?? null;
	const [isVisible, setVisible] = useState<boolean>(false);
	const [selectedPet, setSelectedPet] = useState<number>(0);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [fullName, setFullName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [services, setServices] = useState<number[]>([]);

	const handleSubmitForm = async () => {
		const api: string = process.env.REACT_API_URL ?? API_URL;
		const token: string = (await AsyncStorage.getItem('token')) ?? '';
		const requestBody: IFormBody = {
			petId: selectedPet,
			centerId: data.centerId,
			substituteName: fullName,
			substitutePhone: phoneNumber,
			extraInformation: note,
			servicePlace: data.centerData.address,
			phone: phoneNumber,
			dateTime: selectedDate.toISOString(),
			serviceId: services,
		};
		console.log(JSON.stringify(requestBody, null, 2));
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Pressable onPress={() => navigation.goBack()} style={styles.goBackBtn}>
					<Icon name='arrow-back' size={25} />
				</Pressable>
				<CustomText
					message={'Đăng ký lịch hẹn'}
					styles={styles.headerText}
					variant={FONT_BOLD}
				/>
			</View>
			<FormFirstSection
				fullName={fullName}
				phoneNumber={phoneNumber}
				address={address}
				note={note}
				isVisible={isVisible}
				selectedDate={selectedDate}
				selectedPet={selectedPet}
				setFullName={setFullName}
				setPhoneNumber={setPhoneNumber}
				setAddress={setAddress}
				setNote={setNote}
				setVisible={setVisible}
				setSelectedDate={setSelectedDate}
				setSelectedPet={setSelectedPet}
				center={data}
				handleSubmit={handleSubmitForm}
				setServices={setServices}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		paddingTop: hp(5),
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
		bottom: hp(2),
	},
});

export default RegisterAppointmentScreen;
