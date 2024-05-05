import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VetHomeScreen from '../screens/partner/VetHomeScreen';

const Tab = createBottomTabNavigator();

const VetNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='vet-home'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='vet-home' component={VetHomeScreen} />
		</Tab.Navigator>
	);
};

export default VetNavigation;
