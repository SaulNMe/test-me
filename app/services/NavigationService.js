import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

function navigate(routeName, params) {
 	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}
function push(routeName, params) {
 	_navigator.dispatch(
		StackActions.push({
			routeName,
			params,
		})
	);
}

function goBack(routename){
	const backAction = NavigationActions.back({
		key: routename
	})
	_navigator.dispatch(backAction);
}

function pop(n) {
 	_navigator.dispatch(StackActions.pop({n}));
}

// add other navigation functions that you need and export them

export default {
	navigate,
	push,
	pop,
	setTopLevelNavigator,
	goBack
};
