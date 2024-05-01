import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Tab = createBottomTabNavigator();

const GuestNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='landing'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='landing' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default GuestNavigation;
