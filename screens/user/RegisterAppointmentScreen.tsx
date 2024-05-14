import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

interface IRegisterAppointmentProps {
	route: RouteProp<any, 'register-appointment'>;
	navigation: NativeStackNavigationProp<any, 'register-appointment'>;
}

const RegisterAppointmentScreen = ({ route, navigation }: IRegisterAppointmentProps) => {
	const data = route.params?.data ?? null;

	return (
		<View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
			<Text>This is register appointment screen</Text>
		</View>
	);
};

export default RegisterAppointmentScreen;
