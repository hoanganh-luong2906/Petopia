import ErrorBoundary from 'react-native-error-boundary';
import RootNavigation from './navigations/RootNavigation';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configStore';

export default function App() {
	return (
		<ErrorBoundary>
			<Provider store={ConfigStore}>
				<RootNavigation />
			</Provider>
		</ErrorBoundary>
	);
}
