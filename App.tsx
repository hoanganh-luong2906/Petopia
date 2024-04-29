import ErrorBoundary from 'react-native-error-boundary';
import RootNavigation from './navigations/RootNavigation';

export default function App() {
	return (
		<ErrorBoundary>
			<RootNavigation />
		</ErrorBoundary>
	);
}
