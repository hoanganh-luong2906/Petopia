import { Dispatch, SetStateAction, useState } from 'react';
import {
	Alert,
	Button,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import CustomText from '../CustomText';
import { FONT_BOLD, FONT_SEMI_BOLD, IPet } from '../../utils/Types';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface IPetPickerProps {
	isVisible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	pets: IPet[];
	selectedPet: IPet;
	setSelectedPet: Dispatch<SetStateAction<IPet>>;
}

const PetPickerModal = ({
	isVisible,
	setVisible,
	pets,
	selectedPet,
	setSelectedPet,
}: IPetPickerProps) => {
	console.log('pets: ', pets);

	const PetNameDisplayComponent = ({ pet }: { pet: IPet }) => (
		<Pressable
			style={[
				styles.petPickerBtn,
				selectedPet.id === pet.id && { backgroundColor: '#FFFCE8' },
			]}
			onPress={() => {
				setSelectedPet(pet);
				setVisible(!isVisible);
			}}
		>
			{selectedPet.id === pet.id ? (
				<MaskedView
					maskElement={
						<CustomText
							message={pet?.name}
							styles={[styles.modalText, { fontSize: 22 }]}
							variant={FONT_BOLD}
						/>
					}
					style={styles.decoratorContainer}
				>
					<LinearGradient
						colors={['#F4A905', '#FBE437']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={{ width: '100%', height: '100%' }}
					/>
				</MaskedView>
			) : (
				<CustomText
					message={pet?.name}
					styles={[styles.modalText, { fontSize: 20, color: 'gray' }]}
					variant={FONT_SEMI_BOLD}
				/>
			)}
		</Pressable>
	);

	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={isVisible}
			presentationStyle='overFullScreen'
			onRequestClose={() => {
				setVisible(!isVisible);
			}}
		>
			<TouchableWithoutFeedback onPress={() => setVisible(!isVisible)}>
				<View style={styles.modalContainer}>
					<Pressable style={styles.modalView}>
						<CustomText
							message='Chọn thú cưng của bạn'
							styles={styles.modalTitle}
							variant={FONT_BOLD}
						/>
						<View style={styles.lineDivider} />
						<FlatList
							data={pets}
							renderItem={({ item }: { item: any }) => (
								<PetNameDisplayComponent pet={item} />
							)}
							keyExtractor={(pet) => `${pet?.id ?? Math.random()}`}
							style={{ width: '90%', marginTop: '5%' }}
						/>
						<View style={styles.btnContainer}>
							<Button
								title='    Đóng   '
								onPress={() => setVisible(!isVisible)}
								color='lightgray'
							/>
						</View>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalView: {
		width: '90%',
		height: '40%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		alignItems: 'center',
		overflow: 'hidden',
	},
	modalTitle: {
		fontSize: hp(2.5),
		letterSpacing: 1,
		color: 'gray',
	},
	modalText: {
		width: '100%',
		textAlign: 'center',
		letterSpacing: 1,
	},
	lineDivider: {
		borderColor: 'black',
		borderTopWidth: 1,
		opacity: 0.6,
		marginVertical: 10,
		width: '110%',
		transform: [{ translateX: -5 }],
	},
	decoratorContainer: {
		width: '100%',
		height: 30,
	},
	btnContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: '2%',
		marginBottom: 10,
	},
	petPickerBtn: {
		width: '100%',
		height: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: '1%',
	},
});

export default PetPickerModal;
