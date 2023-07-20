import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstScreen from '../screens/firstScreen';
import SecondScreen from '../screens/secondScreen';
import messaging from '@react-native-firebase/messaging';
import {navigate, navigatorRef, onNavigatorReady} from './navigationServices';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [loading, setLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //   setInitialRoute('notificationScreen');
    //   navigate('notificationScreen', {data: remoteMessage.data});
      navigate('notificationScreen');
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //   setInitialRoute('notificationScreen');
        //   navigate('notificationScreen', {data: remoteMessage.data});
          navigate('notificationScreen');
        }
        setLoading(false);
      });

      messaging().onMessage(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        //   setInitialRoute('notificationScreen');
      //   navigate('notificationScreen', {data: remoteMessage.data});
        navigate('notificationScreen');
      });

  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer ref={navigatorRef} onReady={onNavigatorReady}>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={FirstScreen} options={{}} />
        <Stack.Screen name="notificationScreen" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
