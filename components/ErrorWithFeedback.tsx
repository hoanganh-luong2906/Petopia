// export function showErrorDialogWithFeedback(error: Error, sentryId: string) {
// 	Navigation.showOverlay({
// 		component: {
// 			name: 'ErrorDialogWithFeedbackScreen',
// 			passProps: {
// 				error,
// 				onDialogSubmit: (userFeedbackInputText: string) => {
// 					let name = '';
// 					let email = '';
// 					let comments = userFeedbackInputText ? userFeedbackInputText : '';
// 					const user = auth().currentUser;
// 					if (user) {
// 						name = user.displayName ? user.displayName : '';
// 						email = user.email ? user.email : '';
// 					}
// 					// Send the user feedback to Sentry https://docs.sentry.io/platforms/react-native/enriching-events/user-feedback/
// 					const userFeedback: UserFeedback = {
// 						event_id: sentryId,
// 						name,
// 						email,
// 						comments,
// 					};
// 				},
// 			},
// 			options: {
// 				overlay: {
// 					interceptTouchOutside: false, //if true it will block touches outside the overlay
// 				},
// 				layout: {
// 					componentBackgroundColor: 'transparent',
// 				},
// 			},
// 		},
// 	});
// }
