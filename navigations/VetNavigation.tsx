import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VetHomeScreen from '../screens/partner/VetHomeScreen';
import VetWaitingListScreen from '../screens/partner/VetWaitingListScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VetServiceManagementScreen from '../screens/partner/VetServiceManagementScreen';
import VetProfileScreen from '../screens/partner/VetProfileScreen';
import { COLOR_PRIMARY_900 } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const VetNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='vet-home'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLOR_PRIMARY_900,
			}}
		>
			<Tab.Screen
				name='vet-home'
				component={VetHomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='stats-chart' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='vet-waiting-list'
				component={VetWaitingListScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='calendar-number' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='vet-notification'
				component={VetServiceManagementScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name='grid' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='vet-profile'
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

export default VetNavigation;
