import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

interface IProps {
	navigation: NativeStackNavigationProp<any, 'customer-marketplace-product'>;
}

const MarketplaceProductScreen = (props: IProps) => {
	const { navigation } = props;

	return <View></View>;
};

const styles = StyleSheet.create({});

export default MarketplaceProductScreen;
