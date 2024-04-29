import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const GuestNavigation = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='landing' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default GuestNavigation;
