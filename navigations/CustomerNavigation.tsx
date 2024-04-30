import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const CustomerNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='customer-home'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='customer-home' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default CustomerNavigation;
