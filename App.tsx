/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useCallback } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { BleManager, Device } from 'react-native-ble-plx';

import { GetPermissions } from '@src/components/permissions/GetPermissions';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const manager = new BleManager();

LogBox.ignoreLogs(['new NativeEventEmitter']);

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const checkForBTPermissions = useCallback(() => {
  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     const finalPermissions =
  //       Platform.Version >= 29
  //         ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //         : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
  //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(permissionCheckResult => {
  //       if (permissionCheckResult) {
  //         console.log(
  //           '🚀 ~ file: App.tsx:79 ~ permissionCheckResult:',
  //           permissionCheckResult,
  //         );
  //         // enableBTInDevice()
  //       } else {
  //         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
  //           nestedPermissionCheckResult => {
  //             if (nestedPermissionCheckResult) {
  //               console.log(
  //                 '🚀 ~ file: App.tsx:84 ~ nestedPermissionCheckResult:',
  //                 nestedPermissionCheckResult,
  //               );
  //               // enable
  //             } else {
  //               console.log(
  //                 '🚀 ~ file: App.tsx:83 ~ PermissionsAndroid.check ~ user refused permissions',
  //               );
  //             }
  //           },
  //         );
  //       }
  //     });
  //   } else {
  //     console.log('🚀 ~ file: App.tsx:103 ~ On iOS');
  //   }
  // }, []);

  // const isBluetoothEnabled = useCallback(async () => {
  //   try {
  //     const bluetoothState = await BluetoothSerial.isEnabled();
  //   }
  // }, []);

  useEffect(() => {
    // checkForBluetoothPermissionsUsingModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <GetPermissions arePermissionsGranted={arePermissionsGranted} setArePermissionsGranted={setArePermissionsGranted} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
