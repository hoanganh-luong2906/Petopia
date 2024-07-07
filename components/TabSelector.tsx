import MaskedView from '@react-native-masked-view/masked-view';
import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import {
	COLOR_PRIMARY_900,
	COLOR_SECONDARY_200,
	COLOR_SECONDARY_LIGHTER,
	FONT_BOLD,
	TEXT_LARGE,
	TEXT_PRIMARY,
} from '../utils/Constants';
import { Dispatch, SetStateAction } from 'react';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface ITabSelector {
	totalTabs: number;
	title: string;
	index: number;
	focusedTab: number;
	setFocusedTab: Dispatch<SetStateAction<number>>;
}

const TabSelector = ({
	totalTabs,
	title,
	index,
	focusedTab,
	setFocusedTab,
}: ITabSelector) => {
	return (
		<Pressable
			style={[
				styles.tabTitleContainer,
				focusedTab === index && { backgroundColor: COLOR_SECONDARY_LIGHTER },
				{ width: `${100 / totalTabs}%` },
			]}
			onPress={() => setFocusedTab(index)}
		>
			<MaskedView
				style={styles.tabTitleDecorator}
				maskElement={
					<CustomText
						numberOfLines={1}
						message={title}
						styles={styles.tabTitle}
						variant={FONT_BOLD}
					/>
				}
			>
				<LinearGradient
					colors={
						focusedTab === index
							? [COLOR_PRIMARY_900, COLOR_SECONDARY_200]
							: ['gray', 'gray']
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.titleLinearDecorator}
				/>
			</MaskedView>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	tabTitle: {
		letterSpacing: 1,
		textAlign: 'center',
		fontSize: TEXT_PRIMARY + 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabTitleContainer: {
		height: hp(5),
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabTitleDecorator: {
		width: '100%',
		height: '60%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleLinearDecorator: {
		width: '100%',
		height: '100%',
	},
});

export default TabSelector;
