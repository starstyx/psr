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

import { BleManager, Device } from 'react-native-ble-plx';

import { BluetoothStateProvider } from '@src/contexts/bluetoothState';
import { One } from '@src/components/demoScreen/One';

export const manager = new BleManager();

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = (): JSX.Element => {

  return (
    <BluetoothStateProvider>
      <One />
    </BluetoothStateProvider>
  );
};

export default App;
