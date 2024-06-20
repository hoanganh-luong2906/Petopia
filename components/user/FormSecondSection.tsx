import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
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
	COLOR_GRAY,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	COLOR_THIRDARY,
	FONT_BOLD,
	FONT_REGULAR,
	FONT_SEMI_BOLD,
	ICenterDetail,
	ICenterServiceDetail,
	IPet,
	IUser,
	TEXT_LARGE,
	TEXT_PRIMARY,
} from '../../utils/Constants';
import { IBookingResponse } from '../../screens/user/RegisterAppointmentScreen';

interface IFormProps {
	setVisibleIndex: React.Dispatch<React.SetStateAction<number>>;
	registeredData: IBookingResponse;
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

const FormSecondSection = (props: IFormProps) => {
	const { setVisibleIndex, registeredData } = props;

	return (
		<LinearGradient
			colors={[COLOR_THIRDARY, COLOR_THIRDARY]}
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
					<View style={styles.formContent}></View>
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
					<Pressable style={styles.functionBtn} onPress={() => {}}>
						<LinearGradient
							colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
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
		marginHorizontal: wp(3),
		marginVertical: hp(2),
		backgroundColor: 'white',
		borderRadius: 10,
		padding: wp(3.5),
		paddingVertical: wp(4),
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
		borderRadius: 20,
		paddingHorizontal: wp(4),
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
