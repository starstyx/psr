/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Platform, View, Button } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';

import { arePermissionsGrantedFor, arePermissionsGrantedOrUnavailableFor } from '@src/utils/permissions/arePermissionsValid';

type Props = {
  arePermissionsGranted: boolean;
  setArePermissionsGranted: Dispatch<SetStateAction<boolean>>
};

export const GetPermissions = ({ arePermissionsGranted, setArePermissionsGranted }: Props): JSX.Element => {
  const checkForBluetoothPermissionsUsingModule = useCallback(async () => {
    try {
       const status = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        // ...(Platform.OS === 'android' && Platform.Version <= 30) ? [
        //   // PERMISSIONS.ANDROID.BLUETOOTH,
        //   // PERMISSIONS.ANDROID.BLUETOOTH_ADMIN,
        // ] : [],
      ]);
      console.log('🚀 ~ file: App.tsx:91 ~ checkForBluetoothPermissionsUsingModule ~ status:', status);
      if (
        arePermissionsGrantedFor(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, status) &&
        arePermissionsGrantedOrUnavailableFor(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, status) &&
        arePermissionsGrantedOrUnavailableFor(PERMISSIONS.ANDROID.BLUETOOTH_SCAN, status) &&
        arePermissionsGrantedOrUnavailableFor(PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE, status)
      ) {
        console.log('🚀 ~ file: App.tsx:102 ~ got permissions:');
        setArePermissionsGranted(true);
      } else {
        console.log('🚀 ~ file: App.tsx:102 ~ did not permissions:');
      }
    } catch (error) {
      setArePermissionsGranted(false);
      console.error('Error requesting Bluetooth permission:', error);
    }
  }, [setArePermissionsGranted]);

  return (
    <View>
      <Button title={arePermissionsGranted ? 'Received Permissions' : 'Get Permissions'} onPress={checkForBluetoothPermissionsUsingModule}/>
    </View>
  );
};
