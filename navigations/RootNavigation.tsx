import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserState, initData } from '../redux/UserSlice';
import { RootDispatch } from '../redux/configStore';
import { useRootDispatch } from '../redux/hooks';
import { IUser } from '../utils/Types';
import AdminNavigation from './AdminNavigation';
import CustomerNavigation from './CustomerNavigation';
import GuestNavigation from './GuestNavigation';
import PartnerNavigation from './PartnerNavigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const loadState = async () => {
	const state: UserState = {
		user: {
			username: '',
			email: '',
			name: '',
			role: '',
		},
		isLoggedIn: false,
	};
	try {
		let userDb = await AsyncStorage.getItem('user');
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

const RootNavigation = () => {
	const { user, isLoggedIn } = useSelector((state: any) => state.user);
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
					initialRouteName='welcome'
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name='guest-navigation' component={GuestNavigation} />
					<Stack.Screen name='welcome' component={WelcomeScreen} />
					<Stack.Screen name='login' component={LoginScreen} />
					<Stack.Screen name='register' component={RegisterScreen} />
				</Stack.Navigator>
			) : (
				<>
					{(user?.role?.toLowerCase() ?? '') === 'admin' && (
						<Stack.Navigator
							initialRouteName='admin-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='admin-navigation'
								component={AdminNavigation}
							/>
						</Stack.Navigator>
					)}
					{(user?.role?.toLowerCase() ?? '') === 'partner' && (
						<Stack.Navigator
							initialRouteName='partner-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='partner-navigation'
								component={PartnerNavigation}
							/>
						</Stack.Navigator>
					)}
					{(user?.role?.toLowerCase() ?? '') === 'customer' && (
						<Stack.Navigator
							initialRouteName='customer-navigation'
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name='customer-navigation'
								component={CustomerNavigation}
							/>
						</Stack.Navigator>
					)}
				</>
			)}
		</NavigationContainer>
	);
};

export default RootNavigation;
