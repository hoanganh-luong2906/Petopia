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
	ITimeSlot,
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
	slotId: number;
	phone: string;
	date: string;
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

const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

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
	const [centerValidSlots, setCenterValidSlots] = useState<ITimeSlot[]>([]);
	const [selectedSlot, setSelectedSlot] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const token = (await AsyncStorage.getItem('token')) ?? '';
			const centerBody = {
				centerId: data.centerId,
			};

			const response = await fetch(`${api}/user/user-profile`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const centerSlotData = await fetch(`${api}/user/time-slot/get`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(centerBody),
			});

			if (response.ok) {
				const data = (await response.json()) ?? {};
				const validUserData: IUserProfile = { ...data } ?? undefined;
				if (validUserData) {
					setFullName(validUserData.name);
					setPhoneNumber(validUserData.phone);
				}
			}

			if (centerSlotData.ok) {
				const slotData = await centerSlotData.json();
				const validSlotData: ITimeSlot[] = [...slotData.timeSlots] ?? [];
				if (validSlotData.length > 0) {
					setCenterValidSlots(validSlotData);
					setSelectedSlot(validSlotData[0].id);
				}
			}
		};
		fetchData();
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
			slotId: selectedSlot,
			phone: phoneNumber,
			date: formatDate(selectedDate),
			serviceId: services,
		};
		console.log(JSON.stringify(requestBody, null, 2));

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
					centerValidSlots={centerValidSlots}
					selectedSlot={selectedSlot}
					setSelectedSlot={setSelectedSlot}
				/>
			)}
			{visibleIndex === 1 && registerResponse && (
				<FormSecondSection
					setVisibleIndex={setVisibleIndex}
					registeredData={registerResponse ?? undefined}
					onSite={onSite}
					navigation={navigation}
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
