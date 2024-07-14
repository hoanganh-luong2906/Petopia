import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
	COLOR_PRIMARY_900,
	FONT_SEMI_BOLD,
	TEXT_PRIMARY,
	TEXT_SECONDARY,
} from '../utils/Constants';
import CustomText from './CustomText';

interface IProps {
	serviceImg?: string;
	serviceTitle: string;
	servicePrice?: number;
	serviceTitleLines?: number;
}

const formatCurrency = (value: number): string => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
};

const ServiceComponent = ({
	serviceImg,
	serviceTitle,
	servicePrice,
	serviceTitleLines,
}: IProps) => {
	const [isImgError, setImgError] = useState<boolean>(serviceImg ? false : true);
	return (
		<View style={styles.container}>
			{!isImgError ? (
				<Image
					src={serviceImg}
					resizeMode='cover'
					style={styles.img}
					onError={() => setImgError(true)}
				/>
			) : (
				<Image
					source={require('../assets/images/service-default-img.png')}
					resizeMode='cover'
					style={styles.img}
				/>
			)}
			<View
				style={[
					styles.titleContainer,
					servicePrice
						? { justifyContent: 'space-between' }
						: { justifyContent: 'center' },
				]}
			>
				<CustomText
					message={serviceTitle}
					variant={FONT_SEMI_BOLD}
					styles={[
						styles.titleTxt,
						servicePrice
							? { fontSize: TEXT_SECONDARY }
							: { fontSize: TEXT_PRIMARY },
					]}
					numberOfLines={serviceTitleLines ?? 2}
				/>
				{servicePrice && (
					<CustomText
						message={formatCurrency(servicePrice ?? 0)}
						variant={FONT_SEMI_BOLD}
						styles={styles.priceTxt}
						numberOfLines={2}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: '3%',
		paddingVertical: '3%',
		backgroundColor: 'white',
		overflow: 'hidden',
	},
	img: {
		width: '20%',
		height: '100%',
		marginRight: '3%',
		borderRadius: 10,
	},
	titleContainer: {
		width: '75%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		overflow: 'hidden',
	},
	titleTxt: {
		textAlignVertical: 'bottom',
		lineHeight: hp(2.4),
		overflow: 'visible',
	},
	priceTxt: {
		lineHeight: hp(2.4),
		fontSize: TEXT_PRIMARY,
		color: COLOR_PRIMARY_900,
	},
});

export default ServiceComponent;
