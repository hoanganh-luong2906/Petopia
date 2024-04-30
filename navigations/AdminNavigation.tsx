import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';

const Tab = createBottomTabNavigator();

const AdminNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='admin-home'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='admin-home' component={AdminHomeScreen} />
		</Tab.Navigator>
	);
};

export default AdminNavigation;
