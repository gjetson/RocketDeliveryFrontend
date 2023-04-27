
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Order from './components/Order'
import OrderHistory from './components/OrderHistory'
import AccountSelector from './components/AccountSelector'
import Customer from './components/Customer'
import Courier from './components/Courier'

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="AccountSelector" component={AccountSelector} options={{ title: 'Account Selector' }} />
        <Stack.Screen name="Courier" component={Courier} options={{ title: 'Courier App' }} />
        <Stack.Screen name="Customer" component={Customer} options={{ title: 'Customer App' }} />
        <Stack.Screen name="CourierAccount" component={Courier} options={{ title: 'Courier Account' }} />
        <Stack.Screen name="CustomerAccount" component={Customer} options={{ title: 'Customer Account' }} />
        <Stack.Screen name="Order" component={Order} options={{ title: 'Order' }} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ title: 'Order History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

