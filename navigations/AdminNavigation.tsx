import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AdminWaitingListScreen from '../screens/admin/AdminWaitingListScreen';
import AdminNotificationScreen from '../screens/admin/AdminNotificationScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';
import { COLOR_PRIMARY } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const AdminNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='admin-dashboard'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLOR_PRIMARY,
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
				component={AdminWaitingListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='calendar-number' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='admin-notification'
				component={AdminNotificationScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='notifications' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='admin-profile'
				component={AdminProfileScreen}
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
