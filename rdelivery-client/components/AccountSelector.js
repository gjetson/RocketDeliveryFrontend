import * as React from "react"
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from "react-native"
import AccountStyles from "../css/AccountStyles"
import MainStyles from "../css/MainStyles"
import ForwardButton from "./ForwardButton"

export default function AccountSelector({ navigation }) {
    return (
        <>
            <ForwardButton
                onPress={() => {
                    navigation.navigate("Courier")
                }}
            />
            <View style={AccountStyles.container}>

                <Image
                    style={MainStyles.logo}
                    source={require("../assets/images/AppLogoV2.png")}
                />
                <br />
                <br />
                <br />
                <Text style={AccountStyles.accountText}> Select Account Type</Text>
                <TouchableOpacity
                    style={AccountStyles.customerPhoto}
                    onPress={() => { navigation.navigate("Restaurants") }}>
                    <Image
                        style={AccountStyles.customer}
                        source={require("../assets/images/customer.jpg")}
                    />
                </TouchableOpacity>
                <br />
                <TouchableOpacity
                    style={AccountStyles.courierPhoto}
                    onPress={() => { navigation.navigate("Courier") }} >
                    <Image
                        style={AccountStyles.customer}
                        source={require("../assets/images/courier.jpg")}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}