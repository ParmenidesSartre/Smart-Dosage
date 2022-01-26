import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import React, { useState, useEffect } from 'react'
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'

import LottieView from 'lottie-react-native'
import Home from './src/Home'

const App = () => {
  const [timepassed, setTimePassed] = useState(false)
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  })

  useEffect(() => {
    setTimeout(() => {
      setTimePassed(true)
    }, 5000)
  })

  if (!timepassed) {
    return (
      <View style={styles.container}>
        <LottieView
          ref={(animation) => {
            animation = animation
          }}
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#fff',
          }}
          source={require('./assets/water.json')}
          autoPlay
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    )
  } else {
    return <Home />
  }
}

export default () => {
  return <App />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Quicksand_700Bold',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Quicksand_400Regular',
  },
})
