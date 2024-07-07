import ErrorBoundary from 'react-native-error-boundary';
import RootNavigation from './navigations/RootNavigation';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configStore';
import { SafeAreaViewBase, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
	StatusBar.setTranslucent(true);
	StatusBar.setBackgroundColor('transparent');

	return (
		<ErrorBoundary>
			<Provider store={ConfigStore}>
				<SafeAreaView style={{ flex: 1 }}>
					<RootNavigation />
				</SafeAreaView>
			</Provider>
		</ErrorBoundary>
	);
}
