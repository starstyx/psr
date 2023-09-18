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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { BleManager, Device } from 'react-native-ble-plx';
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

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
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[] | undefined>();
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | undefined>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    BluetoothClassic.onBluetoothDisabled((event) => {
      console.log("🚀 ~ file: App.tsx:87 ~ BluetoothClassic.onBluetoothDisabled ~ event:", event);
      setConnectedDevice(undefined);
    });

    BluetoothClassic.onBluetoothEnabled((event) => {
      console.log("🚀 ~ file: App.tsx:87 ~ BluetoothClassic.onBluetoothEnabled ~ event:", event);
    });

    BluetoothClassic.onError(err => {
      console.log("🚀 ~ file: App.tsx:90 ~ useEffect ~ err:", err);
    });

    // BluetoothClassic.onDeviceRead()
  }, []);

  // useEffect(() => {
  //   if (connectedDevice) {
  //     console.log("🚀 ~ file: App.tsx:98 ~ useEffect ~ connectedDevice:", connectedDevice);
  //     connectedDevice.onDataReceived(({ data, timestamp, eventType }) => {
  //       console.log("🚀 ~ connectedDevice?.onDataReceived ~ data:", timestamp, data, eventType);
  //     });
  //   }
  // }, [connectedDevice]);

  const listenToRead = useCallback(async () => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (connectedDevice) {
      timeoutId = setInterval(async () => {
        const readData = await connectedDevice.read();
        console.log("🚀 ~ readData:", readData);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [connectedDevice]);

  const getPairedDevices = useCallback(async () => {
    try {
      const pairedBtDevices = await BluetoothClassic.getBondedDevices();
      console.log("🚀 ~ file: App.tsx:90 ~ getPairedDevices ~ pairedDevices:", pairedBtDevices);
      setPairedDevices(pairedBtDevices);
    } catch (e) {
      console.log("🚀 ~ file: App.tsx:93 ~ getPairedDevices ~ e:", e)
    }
  }, [setPairedDevices]);

  const attemptConnectingToDevice = useCallback(async (device: BluetoothDevice) => {
    const isAlreadyConnectedToDevice = await device.isConnected();
    let isConnectionSuccessful = false;

    if (isAlreadyConnectedToDevice) {
      console.log("🚀 ~ file: App.tsx:107 ~ attemptConnectingToDevice ~ isAlreadyConnectedToDevice:", isAlreadyConnectedToDevice);
      return;
    }
    try {
      isConnectionSuccessful = await device.connect();
      console.log("🚀 ~ file: App.tsx:114 ~ attemptConnectingToDevice ~ isConnectionSuccessful:", isConnectionSuccessful);
      console.log("🚀 ~ file: App.tsx:144 ~ attemptConnectingToDevice ~ device:", device);
      if (isConnectionSuccessful) {
        setConnectedDevice(device);
        device.onDataReceived(receivedData => {
          console.log("🚀 ~ file: App.tsx:148 ~ attemptConnectingToDevice ~ receivedData:", receivedData);
        });
      }
    } catch (e) {
      console.log("🚀 ~ file: App.tsx:108 ~ attemptConnectingToDevice ~ e:", e);
    }
  }, [setConnectedDevice]);

  const disconnectFromDevice = useCallback(async (device: BluetoothDevice) => {
    const isAlreadyConnectedToDevice = await device.isConnected();
    let isDisconnectionSuccessful = false;

    if (!isAlreadyConnectedToDevice) {
      return;
    }
    try {
      isDisconnectionSuccessful = await device.disconnect();
      console.log("🚀 ~ file: App.tsx:132 ~ disconnectFromDevice ~ isDisconnectionSuccessful:", isDisconnectionSuccessful);
      if (isDisconnectionSuccessful) {
        setConnectedDevice(undefined);
      }
    } catch (e) {
      console.log("🚀 ~ file: App.tsx:134 ~ disconnectFromDevice ~ e:", e);
    }
  }, [setConnectedDevice]);

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <View style={backgroundStyle}>
        <GetPermissions arePermissionsGranted={arePermissionsGranted} setArePermissionsGranted={setArePermissionsGranted} />

        <Button title="Show paired devices" onPress={getPairedDevices} />

        {pairedDevices?.length && !connectedDevice
          ? (
            <FlatList
              data={pairedDevices}
              keyExtractor={pairedDevice => pairedDevice.id}
              renderItem={({ item, ...rest }) => (
                <TouchableOpacity onPress={() => attemptConnectingToDevice(item)} style={styles.discoveredDeviceItem}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )
          : <View>
              <Text>
                {connectedDevice
                  ? ''
                  : 'No paired devices found! Try pairing and searching for them'
                }
              </Text>
            </View>
        }

        {connectedDevice
          ? (
            <View>
              <Text>Connected to {connectedDevice.name}</Text>
              <Button title="Disconnect" onPress={() => disconnectFromDevice(connectedDevice)} />
              <Button title="Keep reading data (debug)" onPress={() => listenToRead()} />
            </View>
            )
          : null
        }

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  discoveredDeviceItem: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
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
});

export default App;
