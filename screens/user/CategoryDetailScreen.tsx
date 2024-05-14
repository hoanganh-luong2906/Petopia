import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

interface ICategoryDetailProps {
	route: RouteProp<any, 'category-detail'>;
	navigation: NativeStackNavigationProp<any, 'category-detail'>;
}

const CategoryDetailScreen = ({ route, navigation }: ICategoryDetailProps) => {
	const data = route.params?.data ?? null;

	return (
		<View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
			<Button
				title={`Create Appointment of ${
					data?.name ?? data?.serviceName ?? 'Unknown'
				}`}
				onPress={() => navigation.navigate('register-appointment', { data })}
			/>
		</View>
	);
};

export default CategoryDetailScreen;
