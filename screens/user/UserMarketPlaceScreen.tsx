import { StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import { FONT_SEMI_BOLD } from '../../utils/Constants';

const UserMarketPlaceScreen = () => {
	return (
		<View>
			<CustomText
				message='User Market Place Screen'
				variant={FONT_SEMI_BOLD}
				styles={{}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default UserMarketPlaceScreen;
