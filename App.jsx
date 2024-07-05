/* eslint-disable prettier/prettier */
import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import StackNavigationContainer from './Components/StackNavigationContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex:1,
        height: '100%',
        width: '100%',
      }}>
        <RootSiblingParent>
          <StackNavigationContainer />
        </RootSiblingParent>

      </GestureHandlerRootView>

  );
};

export default App;


