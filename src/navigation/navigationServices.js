//

//  NavigationService.js:

//  BoilerPlate

//

//  Created by Retrocube on 10/4/2019, 9:35:30 AM.

//  Copyright © 2019 Retrocube. All rights reserved.

//

import React from 'react';
import {StackActions} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const navigatorRef = React.createRef();
const isNavigatorReady = React.createRef();
const lastAction = React.createRef();

const onNavigatorReady = () => {
  isNavigatorReady.current = true;

  if (lastAction.current) {
    const {routeName, params} = lastAction.current;

    navigate(routeName, params);

    lastAction.current = null;
  }
};

const navigate = (routeName, params = {}) => {
  if (isNavigatorReady.current && navigatorRef.current) {
    navigatorRef.current.navigate(routeName, params);
  } else {
    lastAction.current = {routeName, params};
  }
};

const push = (routeName, params = {}) =>
  navigatorRef.current?.dispatch(StackActions.push(routeName, params));

const pop = (count = 1) =>
  navigatorRef.current?.dispatch(StackActions.pop(count));

const popToTop = () => navigatorRef.current?.dispatch(StackActions.popToTop());

const reset = () =>
  navigatorRef.current?.reset({
    index: 0,

    routes: [{name: 'AuthStack'}],
  });

const openDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.openDrawer());

const closeDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.closeDrawer());

const toggleDrawer = () =>
  navigatorRef.current?.dispatch(DrawerActions.toggleDrawer());

export {
  navigatorRef,
  navigate,
  push,
  pop,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  popToTop,
  reset,
  onNavigatorReady,
};
