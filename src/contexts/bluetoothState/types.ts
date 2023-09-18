
import { Dispatch, SetStateAction } from 'react';
import type { BluetoothDevice } from 'react-native-bluetooth-classic';

export type BluetoothState = {
  arePermissionsGranted: boolean;
  setArePermissionsGranted: Dispatch<SetStateAction<boolean>>;
  pairedDevices: BluetoothDevice[] | undefined;
  setPairedDevices: Dispatch<SetStateAction<BluetoothDevice[] | undefined>>;
  connectedDevice: BluetoothDevice | undefined;
  setConnectedDevice: Dispatch<SetStateAction<BluetoothDevice | undefined>>;
};
