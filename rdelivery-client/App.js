import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/HomeScreen'
import Login from './components/Login'
import Restaurants from './components/Restaurants'
import Order from './components/Order'
import OrderHistory from './components/OrderHistory'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Stack = createNativeStackNavigator()

// const [user, setUser] = useState('')

// const saveValueFunction = () => {
//   if (user) {
//     AsyncStorage.setItem('@user', user)
//     setUser('')
//     console.log('user id saved: ', AsyncStorage.getItem('@user'))
//   } else {
//     console.log('user not set')
//   }
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Restaurants" component={Restaurants} options={{ title: 'Restaurants' }} />
        <Stack.Screen name="Order" component={Order} options={{ title: 'Order' }} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ title: 'Order History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
