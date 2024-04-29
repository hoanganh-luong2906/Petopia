import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

setJSExceptionHandler((error, isFatal) => {
	handleJSErrorForSetJSExceptionHandler(error);
}, true);

export function handleJSErrorForSetJSExceptionHandler(error: any) {
	// Show error locally on DEBUG mode
	console.log('An error happened: ', error);
	// Display error to the user
	// Bonus: you might also want to get more information from the user
	// showErrorDialogWithFeedback(error);
}

const exceptionhandler = (exceptionString: any) => {
	console.log('An error happened: ', exceptionString);
};

setNativeExceptionHandler(
	exceptionhandler,
	false // fix WIX RNN bug on Android because Android recreates the application above the crash screen
);
