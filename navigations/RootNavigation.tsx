import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserState, initData } from '../redux/UserSlice';
import { RootDispatch } from '../redux/configStore';
import { useRootDispatch } from '../redux/hooks';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CategoryDetailScreen from '../screens/user/CategoryDetailScreen';
import RegisterAppointmentScreen from '../screens/user/RegisterAppointmentScreen';
import UserNotificationScreen from '../screens/user/UserNotificationScreen';
import UserPetProfile from '../screens/user/UserPetProfile';
import UserPostDetailScreen from '../screens/user/UserPostDetailScreen';
import UserProfile from '../screens/user/UserProfile';
import UserTransactionScreen from '../screens/user/UserTransactionScreen';
import { IUser } from '../utils/Constants';
import AdminNavigation from './AdminNavigation';
import UserNavigation from './UserNavigation';
import VetNavigation from './VetNavigation';

const Stack = createNativeStackNavigator();

const loadState = async () => {
	var state: UserState = {
		user: {
			email: '',
			name: '',
			role: '',
			avatar: '',
			status: '',
			background: '',
			address: '',
		},
		isLoggedIn: false,
		isFirstUsed: true,
	};
	try {
		var userDb = await AsyncStorage.getItem('user');
		var isFirstUsed = await AsyncStorage.getItem('isFirstUsed');
		if (isFirstUsed) {
			const usageStatus: boolean = JSON.parse(isFirstUsed);
			if (usageStatus) {
				await AsyncStorage.setItem('isFirstUsed', JSON.stringify(false));
				state.isFirstUsed = true;
			} else {
				state.isFirstUsed = false;
			}
		}
		if (userDb?.length) {
			state.user = JSON.parse(userDb) as IUser;
			state.isLoggedIn = true;
		}
	} catch (error: any) {
		console.log('Error loading user from AsyncStorage: ', error.message);
	} finally {
		return state;
	}
};

const USER_FLOW = ['GROUP_ADMIN', 'GROUP_MANAGER', 'USER'];
const MANAGER_FLOW = ['ADMIN', 'SHOP_OWNER'];
const VET_FLOW = ['SERVICE_PROVIDER', 'SERVICE_CENTER_MANAGER'];

const RootNavigation = () => {
	const { user, isLoggedIn, isFirstUsed } = useSelector((state: any) => state.user);
	const dispatch: RootDispatch = useRootDispatch();

	useEffect(() => {
		loadState().then((localState: UserState) => {
			dispatch(initData({ ...localState }));
		});
	}, []);

	return (
		<NavigationContainer>
			{!isLoggedIn ? (
				<Stack.Navigator
					initialRouteName={isFirstUsed ? 'welcome' : 'login'}
					screenOptions={{ headerShown: false }}
				>
					{isFirstUsed && (
						<Stack.Screen name='welcome' component={WelcomeScreen} />
					)}
					<Stack.Screen name='login' component={LoginScreen} />
					<Stack.Screen name='register' component={RegisterScreen} />
				</Stack.Navigator>
			) : (
				<>
					{MANAGER_FLOW.includes(user?.role?.toUpperCase() ?? '') && (
						<Stack.Navigator
							initialRouteName='manager-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='manager-navigation'
								component={AdminNavigation}
							/>
						</Stack.Navigator>
					)}
					{VET_FLOW.includes(user?.role?.toUpperCase() ?? '') && (
						<Stack.Navigator
							initialRouteName='vet-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='vet-navigation'
								component={VetNavigation}
							/>
						</Stack.Navigator>
					)}
					{USER_FLOW.includes(user?.role?.toUpperCase() ?? '') && (
						<Stack.Navigator
							initialRouteName='customer-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='customer-navigation'
								component={UserNavigation}
							/>
							<Stack.Screen
								name='customer-post-detail'
								component={UserPostDetailScreen}
							/>
							<Stack.Screen
								name='category-detail'
								component={CategoryDetailScreen}
							/>
							<Stack.Screen
								name='register-appointment'
								component={RegisterAppointmentScreen}
							/>
							<Stack.Screen
								name='customer-profile'
								component={UserProfile}
							/>
							<Stack.Screen
								name='customer-notification'
								component={UserNotificationScreen}
							/>
							<Stack.Screen
								name='customer-transaction'
								component={UserTransactionScreen}
							/>
							<Stack.Screen
								name='customer-pet-profile'
								component={UserPetProfile}
							/>
						</Stack.Navigator>
					)}
				</>
			)}
		</NavigationContainer>
	);
};

export default RootNavigation;
