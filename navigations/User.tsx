import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../screens/user/UserHomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserCategoryScreen from '../screens/user/UserCategoryScreen';
import UserNotificationScreen from '../screens/user/UserNotificationScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='user-home'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#F4A905',
			}}
		>
			<Tab.Screen
				name='user-home'
				component={UserHomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='home' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='user-category'
				component={UserCategoryScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='grid' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='user-notification'
				component={UserNotificationScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='notifications' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='user-profile'
				component={UserProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='person' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default UserNavigation;
