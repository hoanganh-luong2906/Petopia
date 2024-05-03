import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import CustomText from '../CustomText';
import { FONT_REGULAR, FONT_SEMI_BOLD, IAppointment, IPet } from '../../utils/Types';
import { useEffect, useState } from 'react';

export const PetProfile = ({ pet }: { pet: IPet }) => {
	return (
		<View style={styles.container}>
			<View style={styles.backgroundLine} />
			<ScrollView showsVerticalScrollIndicator={false}>
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
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		paddingHorizontal: 15,
	},
	backgroundLine: {
		position: 'absolute',
		top: 0,
		left: '25%',
		width: 4,
		height: 1000,
		backgroundColor: '#F4A905',
		zIndex: -1,
	},
	labelContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	timeLabel: {
		width: '18%',
		textAlign: 'center',
		fontSize: 16,
		color: 'gray',
	},
	contentLabel: {
		width: '80%',
		textAlign: 'center',
		fontSize: 16,
		color: 'gray',
	},
});

export default PetProfile;
