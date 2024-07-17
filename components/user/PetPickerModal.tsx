import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Dispatch, SetStateAction } from 'react';
import {
	Button,
	FlatList,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_SEMI_BOLD,
	IPet,
} from '../../utils/Constants';
import CustomText from '../CustomText';
import Modal from 'react-native-modal';

interface IPetPickerProps {
	isVisible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	pets: IPet[];
	selectedPet: number;
	setSelectedPet: Dispatch<SetStateAction<number>>;
}

const PetPickerModal = (props: IPetPickerProps) => {
	const { isVisible, setVisible, pets, selectedPet, setSelectedPet } = props;

	const PetNameDisplayComponent = ({ pet }: { pet: IPet }) => (
		<Pressable
			style={[
				styles.petPickerBtn,
				selectedPet === pet.id && { backgroundColor: COLOR_SECONDARY_LIGHTER },
			]}
			onPress={() => {
				setSelectedPet(pet.id);
				setVisible(!isVisible);
			}}
		>
			{selectedPet === pet.id ? (
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
						colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
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
			isVisible={isVisible}
			useNativeDriverForBackdrop
			presentationStyle='overFullScreen'
			onBackdropPress={() => setVisible(!isVisible)}
			onSwipeComplete={() => setVisible(!isVisible)}
			swipeDirection={'down'}
			propagateSwipe={true}
			style={{
				justifyContent: 'flex-end',
				margin: 0,
			}}
		>
			<View style={styles.modalView}>
				<View style={styles.modalHolder} />
				<FlatList
					data={pets}
					renderItem={({ item }: { item: any }) => (
						<PetNameDisplayComponent pet={item} />
					)}
					keyExtractor={(pet) => `${pet?.id ?? Math.random()}`}
					style={{ width: '90%', marginTop: '5%' }}
				/>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	modalView: {
		width: '100%',
		backgroundColor: 'white',
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
		padding: 10,
		paddingBottom: 20,
		alignItems: 'center',
		overflow: 'hidden',
	},
	modalHolder: {
		width: '15%',
		height: 6,
		backgroundColor: 'lightgray',
		borderRadius: 15,
		marginVertical: 5,
	},
	modalText: {
		width: '100%',
		textAlign: 'center',
		letterSpacing: 1,
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
