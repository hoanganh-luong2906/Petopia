import { useFonts } from 'expo-font';
import { Text } from 'react-native';

const VARIANT_WEIGHT: string[] = ['Regular', 'Medium', 'SemiBold', 'Bold'];

const CustomText = ({
	styles,
	message,
	variant,
	numberOfLines,
}: {
	styles: any;
	message: string;
	variant: (typeof VARIANT_WEIGHT)[number];
	numberOfLines?: number;
}) => {
	const [loadedFont] = useFonts({
		'Baloo 2 Regular': require('../assets/fonts/Baloo 2 Regular.ttf'),
		'Baloo 2 Medium': require('../assets/fonts/Baloo 2 Medium.ttf'),
		'Baloo 2 SemiBold': require('../assets/fonts/Baloo 2 SemiBold.ttf'),
		'Baloo 2 Bold': require('../assets/fonts/Baloo 2 Bold.ttf'),
	});

	return (
		<>
			{loadedFont && (
				<Text
					numberOfLines={numberOfLines}
					style={[styles, { fontFamily: `Baloo 2 ${variant ?? 'Regular'}` }]}
				>
					{message}
				</Text>
			)}
		</>
	);
};

export default CustomText;
