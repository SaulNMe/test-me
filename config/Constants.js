import {
	DEV_API_HOST,
} from 'react-native-dotenv';

import Constants from 'expo-constants';

const getChannelConfigs = (releaseChannel = '') => {
	if (releaseChannel && releaseChannel.indexOf('prod') !== -1) {
		return {
			API_HOST: DEV_API_HOST,
		};
	} else {
		return {
			API_HOST: DEV_API_HOST,
		}
	}
};

const ChannelConfig = Object.freeze(getChannelConfigs(Constants.manifest.releaseChannel));

export default ChannelConfig;

