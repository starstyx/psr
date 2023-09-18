import { useContext } from 'react';
import { BluetoothStateContext } from './BluetoothStateContext';

export const useBluetoothState = () => useContext(BluetoothStateContext);
