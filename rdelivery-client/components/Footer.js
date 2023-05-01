import React, { useState, useEffect } from "react"
import { Text, View, Pressable, Image, Button, TouchableOpacity } from "react-native"
import styles from "../css/MainStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"


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
        <View style={styles.containerFooter}>
            <View style={styles.footer}>
                {/* <View style={styles.iconContent}> */}
                {appType === 'customer' && (
                    <Pressable
                        onPress={() => {
                            navigation.navigate("CustomerApp")
                        }}
                    >
                        <FontAwesomeIcon style={styles.burgerIcon} icon={faBurger} />
                        <br />
                        <br />
                        <Text style={styles.footerText}> Restaurants </Text>
                    </Pressable>
                )}

                {appType === 'courier' && (
                    <Pressable
                        onPress={() => {
                            navigation.navigate("CourierApp")
                        }}
                    >
                        <FontAwesomeIcon style={styles.clockIcon} icon={faClockRotateLeft} />
                        <br />
                        <Text style={styles.footerText3}>Deliveries</Text>
                    </Pressable>
                )}

                {appType === 'customer' && (
                    <Pressable
                        onPress={() => {
                            navigation.navigate("OrderHistory")
                        }}
                    >
                        <FontAwesomeIcon style={styles.clockIcon} icon={faClockRotateLeft} />
                        <br />
                        <Text style={styles.footerText3}>Order History</Text>
                    </Pressable>
                )}


                <TouchableOpacity onPress={async () => {
                    if (appType === 'courier') {
                        navigation.navigate('CourierAccount')
                    } else {
                        navigation.navigate('CustomerAccount')
                    }
                }}>
                    <View style={styles.iconContent3}>
                        <FontAwesomeIcon icon={faUser} />
                        {/* <Text style={styles.footerText2}>Account</Text> */}
                    </View>
                    <Text style={styles.footerText2}>Account</Text>
                </TouchableOpacity>

            </View>
        </View>
    )


    // return (

    //     <View style={MainStyles.footer}>
    //         {appType === 'customer' && (
    //             <TouchableOpacity onPress={() => { navigation.navigate('CustomerApp') }}>
    //                 <View style={MainStyles}>
    //                     <FontAwesomeIcon icon={faBurger} />
    //                     <Text style={MainStyles.footerText}> Restaurants </Text>
    //                 </View>
    //             </TouchableOpacity>
    //         )}
    //         {appType === 'courier' && (
    //             <TouchableOpacity onPress={() => { navigation.navigate('CourierApp') }}>
    //                 <View style={MainStyles.iconContent2}>
    //                     <FontAwesomeIcon icon={faClockRotateLeft} />
    //                     <Text style={MainStyles.footerText2}>Deliveries</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         )}
    //         {appType === 'customer' && (
    //             <TouchableOpacity onPress={() => { navigation.navigate('OrderHistory') }}>
    //                 <View style={MainStyles.iconContent2}>
    //                     <FontAwesomeIcon icon={faClockRotateLeft} />
    //                     <Text style={MainStyles.footerText2}> Order History</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         )}
    //         <TouchableOpacity onPress={async () => {
    //             if (appType === 'courier') {
    //                 navigation.navigate('CourierAccount')
    //             } else {
    //                 navigation.navigate('CustomerAccount')
    //             }
    //         }}>
    //             <View style={MainStyles.iconContent3}>
    //                 <FontAwesomeIcon icon={faClockRotateLeft} />
    //                 <Text style={MainStyles.footerText2}>Account</Text>
    //             </View>
    //         </TouchableOpacity>
    //     </View >
    // )
}