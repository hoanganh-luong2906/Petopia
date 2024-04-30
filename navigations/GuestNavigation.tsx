import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';
import HelloScreen from '../screens/HelloScreen';

const Tab = createBottomTabNavigator();

const GuestNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='hello'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='hello' component={HelloScreen} />
			<Tab.Screen name='landing' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default GuestNavigation;
