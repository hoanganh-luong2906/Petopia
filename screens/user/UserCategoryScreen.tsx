import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TabSelector from '../../components/TabSelector';
import CategoryContent from '../../components/user/CategoryContent';
import { API_URL } from '../../utils/Constants';

interface IProcessData {
	title: string;
	data: Object[];
}

interface IProp {
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
}

const TAB_TITLE = ['Sức khỏe', 'Dịch vụ'];

const UserCategoryScreen = ({ navigation }: IProp) => {
	const [focusedTab, setFocusedTab] = useState<number>(0);
	const [healthData, setHealthData] = useState<IProcessData[]>([]);
	const [serviceData, setServiceData] = useState<IProcessData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl: string = process.env.SERVER_API_URL || API_URL;
				const token: string = (await AsyncStorage.getItem('token')) || '';

				const healthResponse = await fetch(
					`${apiUrl}/user/health-center-and-service-page`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const healthData = await healthResponse.json();

				const serviceResponse = await fetch(
					`${apiUrl}/user/service-center-and-service-page`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const serviceData = await serviceResponse.json();

				if (healthResponse.ok || serviceResponse.ok) {
					const validHealthData: IProcessData[] = [
						{
							title: 'Cơ sở',
							data: [...(healthData.serviceCenters ?? null)],
						},
						{
							title: 'Dịch vụ',
							data: [...(healthData.services ?? null)],
						},
					];

					const validServiceData: IProcessData[] = [
						{
							title: 'Cơ sở',
							data: [...(serviceData.serviceCenters ?? null)],
						},
						{
							title: 'Dịch vụ',
							data: [...(serviceData.services ?? null)],
						},
					];

					setHealthData(validHealthData);
					setServiceData(validServiceData);
				}
			} catch (error: any) {
				console.log(error);
				alert(
					'Error in Category Screen: ' + error?.message ??
						'Something went wrong!'
				);
			}
		};
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				{TAB_TITLE.map((title, index) => (
					<TabSelector
						key={index}
						totalTabs={TAB_TITLE.length}
						title={title}
						index={index}
						focusedTab={focusedTab}
						setFocusedTab={setFocusedTab}
					/>
				))}
			</View>
			<View style={styles.contentContainer}>
				<CategoryContent
					data={focusedTab === 0 ? healthData : serviceData}
					navigation={navigation}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	tabContainer: {
		width: wp(100),
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: wp(2),
	},
	contentContainer: {
		width: wp(100),
		paddingHorizontal: wp(5),
	},
});

export default UserCategoryScreen;
