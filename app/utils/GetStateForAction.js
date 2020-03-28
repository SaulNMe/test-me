export default function GetStateForAction (Stack) {
const prevGetStateForAction = Stack.router.getStateForAction;

Stack.router = {
	...Stack.router,
	getStateForAction(action, state) {
		if(state && action.type === 'ReplaceCurrentScreen') {
			const routes = state.routes.slice(0, state.routes.length - 1);
			routes.push(action);
			return {
				...state,
				routes,
				index: routes.length - 1,
			};
		}
		return prevGetStateForAction(action, state);
	}
}
}