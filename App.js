import React, { useEffect } from 'react';
import {Alert} from 'react-native';
import {requestUserPermission, NotificationListner} from "./src/utils/pushNotification"
import { GetFCMToke } from './src/utils/pushNotification';
import messaging from '@react-native-firebase/messaging';
import Navigator from './src/navigation/mainNavigator';

const App = () => {
  useEffect(() => {
    NotificationListner();
    requestUserPermission();
    GetFCMToke();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Assuming the notification has a "title" and a "body" property
      const { title, body, request } = remoteMessage.notification;

      // Show the notification content in an Alert
      Alert.alert(title, body, request);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);



  return (
    <Navigator/>
  );
};

export default App;


