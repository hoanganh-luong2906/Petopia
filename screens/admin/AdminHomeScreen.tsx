import { ScrollView, StyleSheet, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/CustomText';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	FONT_SEMI_BOLD,
	TEXT_LARGE,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../../utils/Constants';

const formatNumber = (number: number): string => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const lineChartData = {
	labels: [
		'T.1',
		'T.2',
		'T.3',
		'T.4',
		'T.5',
		'T.6',
		'T.7',
		'T.8',
		'T.9',
		'T.10',
		'T.11',
		'T.12',
	],
	datasets: [
		{
			data: [
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
			],
		},
	],
};

const pieChartData = [
	{
		name: 'Vacxin thú cưng',
		population: Math.floor(Math.random() * 100),
		color: '#FFE941',
		legendFontColor: '#7F7F7F',
		legendFontSize: TEXT_SECONDARY,
	},
	{
		name: 'Vệ sinh thú cưng',
		population: Math.floor(Math.random() * 100),
		color: '#F4A905',
		legendFontColor: '#7F7F7F',
		legendFontSize: TEXT_SECONDARY,
	},
	{
		name: 'Đồ ăn cho thú cưng',
		population: Math.floor(Math.random() * 100),
		color: '#8CFF91',
		legendFontColor: '#7F7F7F',
		legendFontSize: TEXT_SECONDARY,
	},
	{
		name: 'Dịch vụ khác',
		population: Math.floor(Math.random() * 100),
		color: '#FF0F0F',
		legendFontColor: '#7F7F7F',
		legendFontSize: TEXT_SECONDARY,
	},
	{
		name: 'Chưa phân loại',
		population: Math.floor(Math.random() * 100),
		color: '#CCCDCC',
		legendFontColor: '#7F7F7F',
		legendFontSize: TEXT_SECONDARY,
	},
];

const AdminHomeScreen = () => {
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CustomText
					message='Tổng quan'
					styles={styles.titleText}
					variant={FONT_BOLD}
				/>
				<View style={styles.summaryContainer}>
					<View style={styles.summaryContent}>
						<CustomText
							message='Người theo dõi'
							styles={styles.summaryTitle}
							variant={FONT_BOLD}
						/>
						<View style={styles.numberContainer}>
							<CustomText
								message={formatNumber(
									Math.floor(Math.random() * 1000000)
								)}
								styles={styles.numberPrimary}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message='-10%'
								styles={{}}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
					</View>
					<View style={styles.summaryContent}>
						<CustomText
							message='Người theo dõi'
							styles={styles.summaryTitle}
							variant={FONT_BOLD}
						/>
						<View style={styles.numberContainer}>
							<CustomText
								message={formatNumber(
									Math.floor(Math.random() * 1000000)
								)}
								styles={styles.numberPrimary}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message='-10%'
								styles={{}}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
					</View>
					<View style={styles.summaryContent}>
						<CustomText
							message='Người theo dõi'
							styles={styles.summaryTitle}
							variant={FONT_BOLD}
						/>
						<View style={styles.numberContainer}>
							<CustomText
								message={formatNumber(
									Math.floor(Math.random() * 1000000)
								)}
								styles={styles.numberPrimary}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message='-10%'
								styles={{}}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
					</View>
					<View style={styles.summaryContent}>
						<CustomText
							message='Người theo dõi'
							styles={styles.summaryTitle}
							variant={FONT_BOLD}
						/>
						<View style={styles.numberContainer}>
							<CustomText
								message={formatNumber(
									Math.floor(Math.random() * 1000000)
								)}
								styles={styles.numberPrimary}
								variant={FONT_SEMI_BOLD}
							/>
							<CustomText
								message='-10%'
								styles={{}}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
					</View>
				</View>
				<View style={styles.lineChartContainer}>
					<CustomText
						message='Biểu đồ doanh thu'
						styles={styles.chartTitle}
						variant={FONT_SEMI_BOLD}
					/>
					<LineChart
						data={lineChartData}
						width={wp(93)}
						height={hp(25)}
						yAxisLabel={'đ'}
						withVerticalLines={false}
						chartConfig={{
							backgroundGradientFrom: COLOR_SECONDARY_200,
							backgroundGradientTo: COLOR_SECONDARY_LIGHTER,
							backgroundGradientFromOpacity: 0,
							backgroundGradientToOpacity: 0,
							decimalPlaces: 0, // optional, defaults to 2dp
							color: (opacity = 1) => COLOR_PRIMARY_900,
							style: {
								borderRadius: 10,
							},
						}}
						bezier
						style={styles.lineChart}
					/>
				</View>
				<View style={styles.pieChartContainer}>
					<CustomText
						message='Biểu đồ phân loại doanh thu'
						styles={styles.chartTitle}
						variant={FONT_SEMI_BOLD}
					/>
					<PieChart
						data={pieChartData}
						width={wp(150)}
						height={hp(20)}
						chartConfig={{
							backgroundGradientFrom: COLOR_SECONDARY_200,
							backgroundGradientTo: COLOR_SECONDARY_LIGHTER,
							backgroundGradientFromOpacity: 0,
							backgroundGradientToOpacity: 0,
							width: wp(60),
							color: (opacity = 1) => COLOR_PRIMARY_900,
						}}
						accessor='population'
						backgroundColor='transparent'
						paddingLeft='0'
						center={[wp(32), hp(1)]}
						style={styles.pieChart}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: hp(7),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: TEXT_LARGE + 5,
		paddingHorizontal: wp(5),
	},
	summaryContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		paddingHorizontal: wp(1.5),
	},
	summaryContent: {
		width: wp(45),
		backgroundColor: 'white',
		marginHorizontal: wp(1),
		marginVertical: hp(1),
		paddingHorizontal: wp(3),
		paddingVertical: hp(1),
		borderRadius: 10,
	},
	summaryTitle: {
		fontSize: TEXT_PRIMARY,
		color: 'gray',
	},
	numberContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: hp(1),
		paddingRight: wp(2),
	},
	numberPrimary: {
		fontSize: TEXT_LARGE,
		color: 'black',
		fontWeight: 'bold',
	},
	lineChartContainer: {
		width: wp(93),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginHorizontal: wp(3.5),
		borderRadius: 10,
		paddingTop: hp(1),
		marginTop: hp(1),
	},
	chartTitle: {
		fontSize: TEXT_PRIMARY,
		color: 'gray',
	},
	lineChart: {
		marginVertical: hp(2),
		borderRadius: 10,
		transform: [{ translateX: -wp(3) }],
	},
	pieChartContainer: {
		width: wp(93),
		height: hp(25),
		backgroundColor: 'white',
		marginHorizontal: wp(3.5),
		display: 'flex',
		alignItems: 'center',
		marginTop: hp(2),
		paddingTop: hp(1),
		borderRadius: 10,
	},
	pieChart: {
		overflow: 'visible',
		borderRadius: 10,
		position: 'absolute',
		top: hp(3.5),
		left: -wp(7),
		transform: [{ translateX: -wp(42) }],
	},
});

export default AdminHomeScreen;
