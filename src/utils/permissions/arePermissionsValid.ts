import { PermissionStatus, RESULTS } from 'react-native-permissions';

export const arePermissionsGrantedFor = (permission: string, status: Record<any, PermissionStatus>) => {
  return status[permission] === RESULTS.GRANTED;
};

export const arePermissionsGrantedOrUnavailableFor = (permission: string, status: Record<any, PermissionStatus>) => {
  return status[permission] === RESULTS.GRANTED || status[permission as unknown as string] === RESULTS.UNAVAILABLE;
};
