import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../screens/user/UserHomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserCategoryScreen from '../screens/user/UserCategoryScreen';
import UserNotificationScreen from '../screens/user/UserNotificationScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import SearchBarComponent from '../components/SearchBarComponent';
import { COLOR_PRIMARY_900 } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='user-home'
			screenOptions={{
				header: (props) => <SearchBarComponent />,
				// headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLOR_PRIMARY_900,
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
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Icon name='notifications' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='user-profile'
				component={UserProfileScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Icon name='person' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default UserNavigation;
