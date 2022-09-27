//environment.js
import { GOOGLE_CLOUD_VISION_API_KEY } from '../../secret';
import Constants from 'expo-constants';
const { version } = Constants.manifest;

var environments = {
  staging: {
    GOOGLE_CLOUD_VISION_API_KEY,
  },
  production: {
    // Warning: This file still gets included in your native binary and  is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  },
};
function getReleaseChannel() {
  let releaseChannel = Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
