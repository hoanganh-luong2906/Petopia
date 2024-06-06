import {
	Pressable,
	SectionList,
	SectionListComponent,
	StyleSheet,
	View,
} from 'react-native';
import CustomText from '../CustomText';
import {
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	FONT_BOLD,
	FONT_SEMI_BOLD,
	IService,
	IServiceCenter,
} from '../../utils/Constants';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
				colors={[COLOR_PRIMARY, COLOR_SECONDARY]}
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
	const renderItem = ({
		item,
		index,
	}: {
		item: IService | IServiceCenter;
		index: number;
	}) => (
		<View key={index}>
			<Pressable
				onPress={() =>
					navigation.navigate('category-detail', {
						data: item,
						isService: 'serviceName' in item,
					})
				}
			>
				<CustomText
					message={
						'serviceName' in item
							? (item as IService).serviceName
							: (item as IServiceCenter).name
					}
					styles={{}}
					variant={FONT_BOLD}
				/>
			</Pressable>
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
});

export default CategoryContent;
