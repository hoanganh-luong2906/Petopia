import { ScrollView, StyleSheet, View } from 'react-native';
import CustomText from '../CustomText';
import { FONT_REGULAR } from '../../utils/Types';

export const UserProfile = () => {
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileContainer}>
					<CustomText
						message='This is User Profile'
						styles={{}}
						variant={FONT_REGULAR}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 20,
		overflow: 'hidden',
		backgroundColor: '#ededed',
	},
	profileContainer: {},
});

export default UserProfile;
