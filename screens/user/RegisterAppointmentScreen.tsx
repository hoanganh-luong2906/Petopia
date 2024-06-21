import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
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
	IUserProfile,
} from '../../utils/Constants';
import FormFirstSection from '../../components/user/FormFirstSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormSecondSection from '../../components/user/FormSecondSection';

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
	onSite: boolean;
	phone: string;
	dateTime: string;
	serviceId: number[];
}

interface IFormParams {
	centerData: ICenterDetail;
	centerServiceList: ICenterServiceDetail[];
	centerId: number;
}

interface IService {
	id: number;
	name: string;
}

interface ISubstitute {
	name: string;
	phone: string;
}

export interface IBookingResponse {
	petName: string;
	status: string;
	date: string;
	location: string;
	services: IService[];
	type: string;
	extraInformation: string;
	substitute: ISubstitute[];
	fee: number;
}

const RegisterAppointmentScreen = ({ route, navigation }: IRegisterAppointmentProps) => {
	const data: IFormParams = route.params?.data ?? null;
	const [visibleIndex, setVisibleIndex] = useState<number>(0);
	const [selectedPet, setSelectedPet] = useState<number>(0);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [fullName, setFullName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [services, setServices] = useState<number[]>([]);
	const [onSite, setOnsite] = useState<boolean>(true);
	const [haveSubstitute, setSubstitute] = useState<boolean>(false);
	const [registerResponse, setRegisterResponse] = useState<
		IBookingResponse | undefined
	>(undefined);

	useEffect(() => {
		const fetchUserData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const token = (await AsyncStorage.getItem('token')) ?? '';

			const response = await fetch(`${api}/user/user-profile`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = (await response.json()) ?? {};
				const validUserData: IUserProfile = { ...data } ?? undefined;
				if (validUserData) {
					setFullName(validUserData.name);
					setPhoneNumber(validUserData.phone);
				}
			}
		};
		fetchUserData();
	}, []);

	const handleSubmitForm = async () => {
		const api: string = process.env.REACT_API_URL ?? API_URL;
		const token: string = (await AsyncStorage.getItem('token')) ?? '';
		const requestBody: IFormBody = {
			petId: selectedPet,
			centerId: data.centerId,
			substituteName: fullName,
			substitutePhone: phoneNumber,
			extraInformation: note,
			onSite: onSite,
			phone: phoneNumber,
			dateTime: selectedDate.toISOString(),
			serviceId: services,
		};

		const response = await fetch(`${api}/user/service-appointment-creation`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (response.ok) {
			const data = (await response.json()) ?? {};
			const validResponseData: IBookingResponse =
				{ ...data.appointment } ?? undefined;
			if (validResponseData) {
				setRegisterResponse(validResponseData);
				setVisibleIndex(visibleIndex + 1);
			}
		}
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
			{visibleIndex === 0 && (
				<FormFirstSection
					fullName={fullName}
					setFullName={setFullName}
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					note={note}
					setNote={setNote}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					selectedPet={selectedPet}
					setSelectedPet={setSelectedPet}
					center={data}
					handleSubmit={handleSubmitForm}
					setServices={setServices}
					onSite={onSite}
					setOnsite={setOnsite}
					haveSubstitute={haveSubstitute}
					setSubstitute={setSubstitute}
					navigation={navigation}
				/>
			)}
			{visibleIndex === 1 && registerResponse && (
				<FormSecondSection
					setVisibleIndex={setVisibleIndex}
					registeredData={registerResponse ?? undefined}
					onSite={onSite}
				/>
			)}
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
