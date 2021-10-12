import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/naviagtion';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import store from './src/redux/store/store';
import NetInfo from '@react-native-community/netinfo';
import { constantstyles } from './src/constants/constanstStyles';
import { theme } from './src/theme';
import ButtonComponent from './src/components/Button/Button';
import SplashScreen from 'react-native-splash-screen'


let persistor = persistStore(store)

export default function App() {

  //assume user has active connection
  const [connected, setConnected] = useState(true)

  //check net
  const checkInternet = () => {
    //alert('here')
    NetInfo.fetch().then(state => {
      //console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      //alert(state.isConnected)

      setConnected(state.isConnected)
    });

  }
  //check net
  useEffect(() => {
    checkInternet()
    SplashScreen.hide();
  }, [])
  useEffect(() => {

  }, [connected])

  //check network

  //check network

  return connected ?
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>

    </Provider> :
    <View style={[constantstyles.container, { backgroundColor: theme.colors.text, marginHorizontal: 10 }, constantstyles.centerContent]}>

      <Text>Please Enable Internet Access and Restart the App</Text>
      <ButtonComponent mode="outlined" text="RETRY" color={`${theme.colors.primary}`}
        style={{
          marginTop: 5,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.colors.primary,

        }}
        contentStyle={{
          fontSize: 8, height: 28
        }}
        onPress={checkInternet}

      />


    </View>


}


