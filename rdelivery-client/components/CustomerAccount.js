import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Button, TextInput, Pressable, ScrollView } from "react-native"
import CustomerAccountStyles from "../css/CustomerAccountStyles"
import Footer from "./Footer"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function CustomerAccount({ navigation }) {
    const [userId, setUserId] = useState(0)
    const [login, setLogin] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        async function fetchOrders() {
            try {
                const user_id = await AsyncStorage.getItem("@user")
                setUserId(user_id)
                console.log('user_id: ', user_id)
                const response = await fetch(`http://localhost:3000/api/account/${user_id}?type=customer`)
                if (response.ok) {
                    const json = await response.json()
                    if (json) {
                        console.log(json)
                        setLogin(json.login)
                        setEmail(json.email)
                        setPhone(json.phone)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchOrders()
    }, [])

    const postUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/account/${userId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'customer',
                    email: email,
                    phone: phone,
                }),
            })
            if (response && response.status === 200) {
                const json = await response.json()
                console.log("postOrder: ", json)
            } else {
                console.log("response: ", response.status)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ScrollView>
                <View style={CustomerAccountStyles.container}>
                    <br />
                    <br />
                    <Text style={CustomerAccountStyles.headertext}> MY ACCOUNT </Text>
                    <br />
                    <Text style={CustomerAccountStyles.loggedIn}> Logged In As: Customer</Text>
                    <br />
                    <br />
                    <Text style={CustomerAccountStyles.email}> Primary Email (Read Only) </Text>
                    <br />
                    <TextInput
                        value={login}
                        placeholder={"@Email used to login to app here"}
                        style={CustomerAccountStyles.input}
                        editable={false}
                    />
                    <Text style={CustomerAccountStyles.emailText}>
                        {" "}
                        Email used to login to the application
                    </Text>
                    <br />
                    <br />
                    <Text style={CustomerAccountStyles.email}> Customer Email: </Text>
                    <br />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"@Email used for customer account here"}
                        style={CustomerAccountStyles.input}
                    />
                    <Text style={CustomerAccountStyles.emailText}>
                        {" "}
                        Email used for your Customer account
                    </Text>
                    <br />
                    <br />
                    <Text style={CustomerAccountStyles.email}> Customer Phone: </Text>
                    <br />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={"phone number of customer 813-234-0493"}
                        style={CustomerAccountStyles.input}
                    />
                    <Text style={CustomerAccountStyles.emailText}>
                        {" "}
                        Phone number for your Customer account
                    </Text>
                    <br />
                    <br />
                    <br />
                    <Pressable
                        style={CustomerAccountStyles.updateButton}
                        onPress={() => postUpdate()}
                    >
                        <Text style={CustomerAccountStyles.textStyle}>UPDATE ACCOUNT</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </>
    )
}