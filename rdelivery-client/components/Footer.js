import * as React from "react"
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from "react-native"
import styles from "../css/MainStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft"

export default function Footer({ navigation }) {
    return (

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => { navigation.navigate('Restaurants') }}>
                <View style={styles.iconContent}>
                    <FontAwesomeIcon icon={faBurger} />
                    <Text style={styles.footerText}> Restaurants </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('OrderHistory') }}>
                <View style={styles.iconContent2}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <Text style={styles.footerText2}> Order History</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

// example href in react-native
// import { Linking } from 'react-native';

// <Text style={{color: 'blue'}}
//       onPress={() => Linking.openURL('http://google.com')}>
//   Google
// </Text>