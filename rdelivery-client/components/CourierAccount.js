import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Button, TextInput, Pressable, ScrollView } from "react-native"
import CourierAccountStyles from "../css/CourierAccountStyles"
import Footer from "./Footer"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function CourierAccount({ navigation }) {
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
                const response = await fetch(`http://localhost:3000/api/account/${user_id}?type=courier`)
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
                    type: 'courier',
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
                <View style={CourierAccountStyles.container}>
                    <br />
                    <br />
                    <Text style={CourierAccountStyles.headertext}> MY ACCOUNT </Text>
                    <br />
                    <Text style={CourierAccountStyles.loggedIn}> Logged In As: Courier</Text>
                    <br />
                    <br />
                    <Text style={CourierAccountStyles.email}> Primary Email (Read Only) </Text>
                    <br />
                    <TextInput
                        value={login}
                        placeholder={"@Email used to login to app here"}
                        style={CourierAccountStyles.input}
                        editable={false}
                    />
                    <Text style={CourierAccountStyles.emailText}>
                        {" "}
                        Email used to login to the application
                    </Text>
                    <br />
                    <br />
                    <Text style={CourierAccountStyles.email}> Courier Email: </Text>
                    <br />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"@Email used for courier account here"}
                        style={CourierAccountStyles.input}
                    />
                    <Text style={CourierAccountStyles.emailText}>
                        {" "}
                        Email used for your Courier account
                    </Text>
                    <br />
                    <br />
                    <Text style={CourierAccountStyles.email}> Courier Phone: </Text>
                    <br />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder={"phone number of courier 813-234-0493"}
                        style={CourierAccountStyles.input}
                    />
                    <Text style={CourierAccountStyles.emailText}>
                        {" "}
                        Phone number for your Courier account
                    </Text>
                    <br />
                    <br />
                    <br />
                    <Pressable
                        style={CourierAccountStyles.updateButton}
                        onPress={() => postUpdate()}
                    >
                        <Text style={CourierAccountStyles.textStyle}>UPDATE ACCOUNT</Text>
                    </Pressable>

                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </>
    )
}