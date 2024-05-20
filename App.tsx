import ErrorBoundary from 'react-native-error-boundary';
import RootNavigation from './navigations/RootNavigation';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configStore';
import { StatusBar } from 'react-native';

export default function App() {
	StatusBar.setTranslucent(true);
	StatusBar.setBackgroundColor('transparent');

	return (
		<ErrorBoundary>
			<Provider store={ConfigStore}>
				<RootNavigation />
			</Provider>
		</ErrorBoundary>
	);
}
