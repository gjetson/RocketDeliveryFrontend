import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from "react-native"
import MainStyles from "../css/MainStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function Footer({ navigation }) {
    const [appType, setAppType] = useState("")

    useEffect(() => {
        async function fetchAppType() {
            try {
                const app_type = await AsyncStorage.getItem("@app")
                setAppType(app_type)
            } catch (error) {
                console.error(error)
            }
        }
        fetchAppType()
    }, [])


    return (

        <View style={MainStyles.footer}>
            {appType === 'customer' && (
                <TouchableOpacity onPress={() => { navigation.navigate('CustomerApp') }}>
                    <View style={MainStyles.iconContent}>
                        <FontAwesomeIcon icon={faBurger} />
                        <Text style={MainStyles.footerText}> Restaurants </Text>
                    </View>
                </TouchableOpacity>
            )}
            {appType === 'courier' && (
                <TouchableOpacity onPress={() => { navigation.navigate('CourierApp') }}>
                    <View style={MainStyles.iconContent2}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        <Text style={MainStyles.footerText2}> Order History</Text>
                    </View>
                </TouchableOpacity>
            )}
            {appType === 'customer' && (
                <TouchableOpacity onPress={() => { navigation.navigate('OrderHistory') }}>
                    <View style={MainStyles.iconContent2}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        <Text style={MainStyles.footerText2}> Order History</Text>
                    </View>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={async () => {
                if (appType === 'courier') {
                    navigation.navigate('CourierAccount')
                } else {
                    navigation.navigate('CustomerAccount')
                }
            }}>
                <View style={MainStyles.iconContent3}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <Text style={MainStyles.footerText2}>Account</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}