import { Pressable, SectionList, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	IAppointment,
	ISectionListData,
	TEXT_LARGE,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../../utils/Constants';
import CustomText from '../CustomText';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AppointmentContent from './AppointmentContent';
import { useState } from 'react';
import PetPickerModal from './PetPickerModal';
import LottieView from 'lottie-react-native';

// const sampleData:

const AppointmentNotificationContent = () => {
	const [isLoading, setLoadingStatus] = useState<boolean>(true);
	const [processedData, setProcessedData] = useState<ISectionListData[]>([]);

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

	return (
		<View style={styles.container}>
			<View style={styles.dateContainer}>
				{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((item, index) => (
					<View
						style={[
							styles.dateInWeekContainer,
							new Date().getDate() === index + 15 && {
								backgroundColor: COLOR_SECONDARY_LIGHTER,
							},
						]}
						key={index}
					>
						<MaskedView
							maskElement={
								<View style={styles.dateDecoratorWrapper}>
									<CustomText
										message={item}
										variant={FONT_REGULAR}
										styles={styles.dateInWeekTxt}
										numberOfLines={1}
									/>
									<CustomText
										message={`${index + 15}`}
										variant={FONT_BOLD}
										styles={styles.dateTxt}
										numberOfLines={1}
									/>
								</View>
							}
							style={{ width: '100%', height: '75%' }}
						>
							<LinearGradient
								colors={
									new Date().getDate() === index + 15
										? [COLOR_PRIMARY_900, COLOR_SECONDARY_200]
										: ['black', 'black']
								}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{ width: '80%', height: '100%' }}
							/>
						</MaskedView>
					</View>
				))}
			</View>

			{true ? (
				<>
					<View style={styles.backgroundLine} />

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
						{true && (
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
				</>
			) : (
				<View style={styles.notFoundContainer}>
					<LottieView
						source={require('../../assets/animations/not-found-pet.json')}
						autoPlay
						loop
						style={styles.notFoundAnimation}
					/>
					<CustomText
						message='Bạn chưa có thú cưng nào'
						styles={styles.notFoundText}
						variant={FONT_SEMI_BOLD}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(3),
	},
	dateContainer: {
		width: '100%',
		height: hp(8),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: 'white',
		paddingBottom: hp(1),
	},
	dateInWeekContainer: {
		width: wp(11),
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 5,
	},
	dateInWeekTxt: {
		fontSize: TEXT_SECONDARY,
		lineHeight: TEXT_SECONDARY + 4,
		textAlignVertical: 'bottom',
		transform: [{ translateY: hp(0.5) }],
	},
	dateTxt: {
		fontSize: TEXT_LARGE,
		lineHeight: TEXT_LARGE + 3,
		textAlignVertical: 'bottom',
		transform: [{ translateY: hp(0.5) }],
	},
	dateDecoratorWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
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
		width: wp(21),
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
	notFoundContainer: {
		width: '100%',
		height: '40%',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	notFoundAnimation: {
		width: wp(40),
		height: wp(40),
	},
	notFoundText: {
		textAlign: 'center',
		fontSize: TEXT_PRIMARY,
		color: 'gray',
	},
});

export default AppointmentNotificationContent;
