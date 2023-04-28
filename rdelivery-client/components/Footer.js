import * as React from "react"
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from "react-native"
import MainStyles from "../css/MainStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function Footer({ navigation }) {
    return (

        <View style={MainStyles.footer}>
            <TouchableOpacity onPress={() => { navigation.navigate('CustomerApp') }}>
                <View style={MainStyles.iconContent}>
                    <FontAwesomeIcon icon={faBurger} />
                    <Text style={MainStyles.footerText}> Restaurants </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('OrderHistory') }}>
                <View style={MainStyles.iconContent2}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <Text style={MainStyles.footerText2}> Order History</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                const app_type = await AsyncStorage.getItem("@app")
                if (app_type === 'courier') {
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