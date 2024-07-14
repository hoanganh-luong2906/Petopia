import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import UserCategoryScreen from '../screens/user/UserCategoryScreen';
import UserHomeScreen from '../screens/user/UserHomeScreen';
import UserMarketPlaceScreen from '../screens/user/UserMarketPlaceScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import { COLOR_PRIMARY_900 } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const UserNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='user-home'
			screenOptions={{
				headerShown: false,
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
				name='user-marketplace'
				component={UserMarketPlaceScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Icon name='storefront' color={color} size={size} />
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
