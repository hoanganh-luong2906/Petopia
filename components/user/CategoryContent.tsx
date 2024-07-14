import MaskedView from '@react-native-masked-view/masked-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Pressable, SectionList, StyleSheet, View } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	FONT_BOLD,
	FONT_SEMI_BOLD,
	IService,
	IServiceCenter,
	TEXT_PRIMARY,
} from '../../utils/Constants';
import CustomText from '../CustomText';
import ServiceComponent from '../ServiceComponent';

interface ICategoryContentProperties {
	data: { title: string; data: Object[] }[];
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
}

const renderCategoryHeader = ({ title }: { title: string }) => (
	<View style={styles.headerContainer}>
		<MaskedView
			style={styles.headerDecorator}
			maskElement={
				<CustomText
					message={title}
					styles={styles.headerText}
					variant={FONT_BOLD}
				/>
			}
		>
			<LinearGradient
				colors={[COLOR_PRIMARY_900, COLOR_SECONDARY_200]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={{ width: '100%', height: '100%' }}
			/>
		</MaskedView>
		<CustomText
			message='Xem tất cả'
			styles={styles.helperHeaderText}
			variant={FONT_SEMI_BOLD}
		/>
	</View>
);

const CategoryContent = ({ data, navigation }: ICategoryContentProperties) => {
	const [isImgError, setImgError] = useState<boolean>(false);

	const renderItem = ({
		item,
		index,
	}: {
		item: IService | IServiceCenter;
		index: number;
	}) => (
		<View key={index}>
			{!('serviceName' in item) ? (
				<Pressable
					style={styles.centerContainer}
					onPress={() =>
						navigation.navigate('category-detail', {
							data: item,
							isService: 'serviceName' in item,
						})
					}
				>
					<Image
						source={require('../../assets/images/shop-bg.png')}
						resizeMode='cover'
						style={styles.centerImg}
					/>
					<CustomText
						message={(item as IServiceCenter).name}
						styles={styles.centerNameTxt}
						variant={FONT_SEMI_BOLD}
						numberOfLines={1}
					/>
				</Pressable>
			) : (
				<Pressable
					onPress={() =>
						navigation.navigate('category-detail', {
							data: item,
							isService: 'serviceName' in item,
						})
					}
				>
					<View style={styles.serviceContainer}>
						<ServiceComponent
							serviceTitle={(item as IService).serviceName}
							serviceImg={undefined}
							// servicePrice={100000}
						/>
					</View>
				</Pressable>
			)}
		</View>
	);

	return (
		<View>
			<SectionList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				sections={data}
				keyExtractor={(item, index) => `${item}` + index}
				renderSectionHeader={({ section: { title } }) =>
					renderCategoryHeader({ title })
				}
				renderItem={({ item, index }: { item: any; index: number }) =>
					renderItem({ item, index })
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerDecorator: {
		width: wp(50),
		height: hp(5),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	headerText: {
		fontSize: hp(3.5),
	},
	helperHeaderText: {
		fontSize: hp(2),
		color: 'gray',
		height: '100%',
		textAlignVertical: 'bottom',
	},
	serviceContainer: {
		width: '98%',
		height: hp(10),
		marginVertical: hp(1),
		marginHorizontal: '1%',
		borderRadius: 10,
		overflow: 'hidden',
		elevation: 2,
	},
	centerContainer: {
		width: wp(30),
		height: wp(30),
		padding: '2%',
		margin: 5,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		elevation: 3,
		overflow: 'hidden',
		backgroundColor: 'white',
	},
	centerImg: {
		width: '100%',
		height: '70%',
		borderRadius: 8,
	},
	centerNameTxt: {
		fontSize: TEXT_PRIMARY,
		letterSpacing: 0.6,
	},
});

export default CategoryContent;
