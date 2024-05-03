import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomerCategoryScreen from '../screens/customer/CustomerCategoryScreen';
import CustomerNotificationScreen from '../screens/customer/CustomerNotificationScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';

const Tab = createBottomTabNavigator();

const CustomerNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='customer-home'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#F4A905',
			}}
		>
			<Tab.Screen
				name='customer-home'
				component={CustomerHomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='home' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='customer-category'
				component={CustomerCategoryScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='grid' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='customer-notification'
				component={CustomerNotificationScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='notifications' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='customer-profile'
				component={CustomerProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='person' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default CustomerNavigation;
