import { Image, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { FONT_SEMI_BOLD } from '../utils/Constants';
import { useState } from 'react';

interface IProps {
	serviceImg: string;
	serviceTitle: string;
	servicePrice?: number;
}

const formatCurrency = (value: number): string => {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VNĐ',
	});
	return formatter.format(value);
};

const ServiceComponent = ({ serviceImg, serviceTitle, servicePrice }: IProps) => {
	const [isImgError, setImgError] = useState<boolean>(false);
	return (
		<View style={styles.container}>
			{!isImgError ? (
				<Image src={serviceImg} resizeMode='cover' style={styles.img} onError={() => setImgError(true)}/>
			) : (
				<Image
					source={require('../../assets/images/default-avt.png')}
					resizeMode='cover'
					style={styles.img}
				/>
			)}
			<View style={styles.titleContainer}>
				<CustomText
					message={serviceTitle}
					variant={FONT_SEMI_BOLD}
					styles={{}}
					numberOfLines={2}
				/>
				{servicePrice && (
					<CustomText
						message={formatCurrency(servicePrice)}
						variant={FONT_SEMI_BOLD}
						styles={{}}
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
		height: 100,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: '10%',
		paddingVertical: '5%',
	},
	img: {
		height: 90,
		width: 90,
	},
	titleContainer: {
		width: 'auto',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
});

export default ServiceComponent;
