import styles from "../css/MainStyles"
import React, { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    Button,
    TextInput,
    Text,
    View,
    Image,
} from "react-native"

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fail, setFail] = useState(false)
    const [noID, setNoID] = useState(false)

    const loginPost = async () => {
        try {
            if (email !== '' || password !== '') {
                console.log("email: ", email, ", password: ", password)
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                })
                const json = await response.json()
                if (response && response.status === 200) {
                    setEmail('')
                    setPassword('')
                    setFail(false)
                    setNoID(false)
                    console.log("login: ", json)
                    await AsyncStorage.setItem('@user', json.user_id)
                    await AsyncStorage.setItem('@customer', json.customer_id)
                    await AsyncStorage.setItem('@courier', json.courier_id)
                    if (json.customer_id > 0 && json.courier_id > 0) {
                        navigation.navigate('AccountSelector')
                    } else if (json.customer_id > 0) {
                        navigation.navigate('Restaurants')
                    } else if (json.courier_id > 0) {
                        navigation.navigate('Courier')
                    } else {
                        // throw new Error(`User must have a courier or customer ID. user_id: ${json.user_id}`)
                        setNoID(true)
                    }
                } else {
                    setEmail('')
                    setPassword('')
                    setFail(true)
                    console.log("login: ", json)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/AppLogoV2.png")}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.welcomeText2} >Login to begin</Text>
                <br />
                <br />
                <Text style={styles.emailText}> Email </Text>
                <br />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={"Enter your primary email here"}
                    style={styles.input}
                />
                <br />
                <Text style={styles.passText}> Password </Text>
                <br />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={"Password"}
                    style={styles.input}
                    secureTextEntry
                />

                {noID ? (
                    <div>
                        <br />
                        <Text>User must have a courier or customer ID. Contact Admin to have one assigned.</Text>
                        <br />
                        <br />
                        <br />
                    </div>

                ) : (
                    <br />
                )}

                {fail ? (
                    <div>
                        <br />
                        <Text>Failed to login. Please try again.</Text>
                        <br />
                        <br />
                        <br />
                    </div>

                ) : (
                    <br />
                )}
                <Button
                    title={"Login"}
                    style={styles.input}
                    color="#DA583B"
                    onPress={() => loginPost()}
                />
            </View>
        </>
    )
}