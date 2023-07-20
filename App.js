import React, { useEffect } from 'react';
import { requestUserPermission, NotificationListener } from "./src/utils/pushNotification";
import { GetFCMToke } from './src/utils/pushNotification';
import messaging from '@react-native-firebase/messaging';
import Navigator from './src/navigation/mainNavigator';
import PushNotification from "react-native-push-notification";

const App = () => {
  useEffect(() => {
    PushNotification.createChannel(

      {

        channelId: 'pulkit', // (required)

        channelName: `notification_practice`, // (required)

        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.

        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function

        importance: 4, // (optional) default: 4. Int value of the Android notification importance

        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

      },

      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.

    );


    NotificationListener();
    requestUserPermission();
    GetFCMToke();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Assuming the notification has a "title" and a "body" property
      const { title, body } = remoteMessage.notification;

      // Show the notification in the notification bar
      PushNotification.localNotification({
        channelId: 'pulkit', // Make sure to create this channel in your AndroidManifest.xml
        title: title,
        message: body,
      });
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Navigator />
  );
};

export default App;
