import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';

const Tab = createBottomTabNavigator();

const CustomerNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='customer-home'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='customer-home' component={CustomerHomeScreen} />
		</Tab.Navigator>
	);
};

export default CustomerNavigation;
