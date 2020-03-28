import { Notifications } from 'expo';

let listener = null;

function registerNotificationHandler ( handleNotification ) {
	if (listener) return;
	listener = Notifications.addListener(handleNotification);
}


export default { registerNotificationHandler }
export { registerNotificationHandler };
