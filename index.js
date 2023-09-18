/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
// import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent(appName, () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: appName,
            },
          },
        ],
      },
    },
  });
});
