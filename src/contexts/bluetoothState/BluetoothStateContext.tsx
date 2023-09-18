import { createContext } from 'react';

import type { BluetoothState } from './types';

const BluetoothStateContext = createContext<BluetoothState>({} as BluetoothState);

BluetoothStateContext.displayName = 'BluetoothStateContext';

export { BluetoothStateContext };
