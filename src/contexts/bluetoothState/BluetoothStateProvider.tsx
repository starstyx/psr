import React, { useState, useMemo } from 'react';
import { BluetoothStateContext } from './BluetoothStateContext';

import type { BluetoothDevice } from 'react-native-bluetooth-classic';

type Props = {
  children: JSX.Element;
};

export const BluetoothStateProvider = ({ children }: Props) => {
  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[] | undefined>();
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | undefined>();

  const value = useMemo(() => ({
    arePermissionsGranted,
    setArePermissionsGranted,
    pairedDevices,
    setPairedDevices,
    connectedDevice,
    setConnectedDevice,
  }), [arePermissionsGranted, connectedDevice, pairedDevices]);

  return (
    <BluetoothStateContext.Provider value={value}>
      {children}
    </BluetoothStateContext.Provider>
  );
};
