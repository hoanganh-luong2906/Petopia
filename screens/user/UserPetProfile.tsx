import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';
import {
	API_URL,
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	FONT_BOLD,
	FONT_SEMI_BOLD,
	IAppointment,
	IPetHealthHistory,
} from '../../utils/Constants';
import CustomText from '../../components/CustomText';
import AppointmentContent from '../../components/user/AppointmentContent';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProcessPetData {
	title: number;
	data: IAppointment[];
}

interface IRequestBody {
	page: number;
	sort: string;
	petId: number;
}

interface IProps {
	route: RouteProp<any, 'customer-pet-profile'>;
	navigation: NativeStackNavigationProp<any, 'customer-pet-profile'>;
}
export const UserPetProfile = ({ route, navigation }: IProps) => {
	const [processedData, setProcessedData] = useState<IProcessPetData[]>([]);
	const [pet, setPet] = useState<IPetHealthHistory>({} as IPetHealthHistory);
	const sortCriterion = 'date';
	const petId: number = route.params?.petId ?? 0;

	useEffect(() => {
		const fetchData = async () => {
			const api: string = process.env.SERVER_API_URL ?? API_URL;
			const userToken: string = (await AsyncStorage.getItem('token')) ?? '';
			const requestBody: IRequestBody = {
				page: 0,
				sort: sortCriterion,
				petId: petId,
			};

			try {
				const response = await fetch(`${api}/user/health-history`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify(requestBody),
				});

				if (response.ok) {
					const data = await response.json();
					const validPetData: IPetHealthHistory =
						data ?? ({} as IPetHealthHistory);
					// console.log(
					// 	`PET_PROFILE ${petId}: `,
					// 	JSON.stringify(validPetData, null, 2)
					// );
					setPet(validPetData);
				}
			} catch (error: any) {
				console.log(error);
				alert('Error: ' + error.message);
			}
		};
		fetchData();
	}, [petId]);

	useFocusEffect(
		useCallback(() => {
			const convertData = () => {
				let yearSet: Set<number> = new Set<number>();
				pet.appointments.map((appointment) => {
					const year = new Date(appointment.date).getFullYear();
					yearSet.add(year);
				});
				yearSet = new Set(Array.from(yearSet).sort((a, b) => b - a));
				if (yearSet.size === 1) {
					const tmpProcessData: IProcessPetData = {
						title: Array.from(yearSet)[0],
						data: pet.appointments,
					};
					setProcessedData([tmpProcessData]);
				} else {
					const tmpProcessData: IProcessPetData[] = Array.from(yearSet).map(
						(year) => {
							let yearAppointments = pet.appointments.filter(
								(appointment) =>
									new Date(appointment.date).getFullYear() === year
							);
							yearAppointments = yearAppointments.sort(
								(a, b) =>
									new Date(b.date).getTime() -
									new Date(a.date).getTime()
							);
							return {
								title: year,
								data: yearAppointments,
							};
						}
					);
					setProcessedData(tmpProcessData);
					// console.log(JSON.stringify(tmpProcessData, null, 2));
				}
			};
			if (pet?.appointments ?? false) {
				convertData();
			}
		}, [pet])
	);

	const renderAppointment = ({
		appointment,
		index,
	}: {
		appointment: IAppointment;
		index: number;
	}) => <AppointmentContent appointment={appointment} index={index} />;

	const renderYearHeader = ({ year }: { year: number }) => (
		<View style={styles.headerContainer}>
			<MaskedView
				maskElement={
					<CustomText
						message={`${year}`}
						styles={styles.yearSectionHeader}
						variant={FONT_BOLD}
					/>
				}
				style={styles.headerLinearDecorator}
			>
				<LinearGradient
					colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.headerDecoratorContainer}
				/>
			</MaskedView>
		</View>
	);

	const handleSettingClick = () => {
		alert('This function is not yet implemented. Sitting still for upcoming');
	};

	return (
		<View style={styles.container}>
			<View style={styles.backgroundLine} />
			<View style={styles.headerTitleContainer}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name='arrow-back' size={25} />
				</Pressable>
				<CustomText
					message='Hồ sơ thú cưng'
					styles={styles.headerText}
					variant={FONT_BOLD}
				/>
				<Pressable style={styles.functionBtnWrapper} onPress={handleSettingClick}>
					<Icon name='settings-outline' size={25} color='gray' />
				</Pressable>
			</View>
			<View>
				<View style={styles.labelContainer}>
					<CustomText
						message='Thời gian'
						styles={styles.timeLabel}
						variant={FONT_SEMI_BOLD}
					/>
					<CustomText
						message='Nội dung'
						styles={styles.contentLabel}
						variant={FONT_SEMI_BOLD}
					/>
				</View>
				{(pet?.appointments ?? false) && (
					<SectionList
						showsVerticalScrollIndicator={false}
						sections={processedData}
						keyExtractor={(item, index) => `${item}` + index}
						renderItem={({ item, index }) =>
							renderAppointment({ appointment: item, index })
						}
						renderSectionHeader={({ section: { title } }) =>
							renderYearHeader({ year: title })
						}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		paddingHorizontal: wp(2),
		paddingBottom: 60,
		backgroundColor: 'white',
	},
	headerTitleContainer: {
		paddingTop: hp(4),
		position: 'relative',
		backgroundColor: 'white',
		paddingHorizontal: wp(4),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	headerText: {
		width: wp(70),
		fontSize: hp(2.5),
		textAlign: 'center',
		marginVertical: hp(1),
		color: 'lightgray',
		letterSpacing: 1,
	},
	functionBtnContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	functionBtnWrapper: {
		backgroundColor: 'white',
		padding: wp(1.8),
		borderRadius: 50,
	},
	backgroundLine: {
		position: 'absolute',
		top: 0,
		left: wp(24),
		width: wp(1),
		height: 1000,
		backgroundColor: COLOR_PRIMARY_900,
		zIndex: -1,
	},
	labelContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: hp(1.5),
	},
	timeLabel: {
		width: wp(22),
		textAlign: 'right',
		fontSize: wp(4.3),
		color: 'gray',
		marginRight: wp(1),
		paddingRight: wp(1),
	},
	contentLabel: {
		width: wp(30),
		textAlign: 'left',
		fontSize: wp(4.3),
		color: 'gray',
		paddingLeft: wp(1),
	},
	headerContainer: {
		width: '100%',
		height: 40,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	headerDecoratorContainer: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	yearSectionHeader: {
		width: '100%',
		paddingLeft: wp(16),
		fontSize: 25,
		color: 'black',
	},
	headerLinearDecorator: {
		width: '50%',
		height: '100%',
		marginRight: '50%',
	},
});

export default UserPetProfile;
