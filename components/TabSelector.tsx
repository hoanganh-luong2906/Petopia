import MaskedView from '@react-native-masked-view/masked-view';
import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_BOLD } from '../utils/Types';
import { Dispatch, SetStateAction } from 'react';

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
				focusedTab === index && { backgroundColor: '#FFFCE8' },
				{ width: `${100 / totalTabs}%` },
			]}
			onPress={() => setFocusedTab(index)}
		>
			{focusedTab === index ? (
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
						colors={['#F4A905', '#FBE437']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.titleLinearDecorator}
					/>
				</MaskedView>
			) : (
				<CustomText
					numberOfLines={1}
					message={title}
					styles={styles.tabTitle}
					variant={FONT_BOLD}
				/>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	tabTitle: {
		color: 'gray',
		letterSpacing: 1,
		textAlign: 'center',
		fontSize: 20,
	},
	tabTitleContainer: {
		height: '100%',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabTitleDecorator: {
		width: '100%',
		height: '100%',
		marginTop: '5%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleLinearDecorator: {
		width: '100%',
		height: '100%',
	},
});

export default TabSelector;
