import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuestNavigation from './GuestNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='guest-route'>
				<Stack.Screen name='guest-route' component={GuestNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigation;
