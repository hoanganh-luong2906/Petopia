import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VetWaitingListScreen from '../screens/partner/VetWaitingListScreen';
import VetServiceManagementScreen from '../screens/partner/VetServiceManagementScreen';
import VetProfileScreen from '../screens/partner/VetProfileScreen';
import { COLOR_PRIMARY_900 } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const AdminNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='admin-dashboard'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLOR_PRIMARY_900,
			}}
		>
			<Tab.Screen
				name='admin-dashboard'
				component={AdminHomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='stats-chart' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='admin-waiting-list'
				component={VetWaitingListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='calendar-number' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='admin-notification'
				component={VetServiceManagementScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='notifications' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='admin-profile'
				component={VetProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='person' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AdminNavigation;
