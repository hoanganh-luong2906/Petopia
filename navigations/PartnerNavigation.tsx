import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PartnerHomeScreen from '../screens/partner/PartnerHomeScreen';

const Tab = createBottomTabNavigator();

const PartnerNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='partner-home'
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
		>
			<Tab.Screen name='partner-home' component={PartnerHomeScreen} />
		</Tab.Navigator>
	);
};

export default PartnerNavigation;
