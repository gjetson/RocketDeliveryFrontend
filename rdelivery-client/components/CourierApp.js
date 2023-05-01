import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    FlatList,
    Modal,
    Pressable,
} from "react-native"
import styles from "../css/MainStyles"
import CourierStyles from "../css/CourierStyles"
import { Table, Row, Rows } from "react-native-table-component"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Footer from "./Footer"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"

const tableData = {
    tableHead: ["ORDER ID", "ADDRESS", "STATUS", "VIEW"],
}
export default function CourierApp({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const courier_id = await AsyncStorage.getItem("@courier")
                console.log('courier_id: ', courier_id)
                const response = await fetch(
                    `http://localhost:3000/api/orders?type=courier&user_id=${courier_id}`
                )
                if (response.ok) {
                    const json = await response.json()
                    if (json) {
                        console.log(json)
                        setOrders(json)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        } orders
        fetchOrders()
    }, [orders.length])

    const renderProduct = ({ item }) => (
        <>
            <Text style={CourierStyles.modalText3}> {item.product_name} </Text>
            <Text style={CourierStyles.quaText}> x {item.product_quantity}</Text>
            <Text style={CourierStyles.pText}> $ {item.unit_cost} </Text>
        </>
    )

    const updateStatus = (item) => {
        if (item.status !== 'delivered') {
            if (item.status === 'pending') {
                postStatusUpdate(item.id, 'in progress')
            } else {
                postStatusUpdate(item.id, 'delivered')
            }
            setOrders([])
        }
    }

    const postStatusUpdate = async (id, status) => {
        try {
            console.log('id: ', id, ' status: ', status)
            const response = await fetch(`http://localhost:3000/api/order/${id}/status`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status
                }),
            })
            if (response && response.status === 200) {
                const json = await response.json()
                console.log("postStatusUpdate: ", json)
            } else {
                console.log("response: ", response.status)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const renderItem = ({ item }) => (
        <>
            <View style={{ flexDirection: 'row' }}>
                <br />
                <br />
                <Text style={CourierStyles.nameText}> {item.id} </Text>
                <br />
                <br />
                <Text style={CourierStyles.addressText}> {item.customer_address} </Text>
                <br />
                <br />
                {item.status === 'pending' && (
                    <Pressable
                        onPress={() => {
                            updateStatus(item)
                        }}
                    >
                        <Text style={CourierStyles.statusPendingText}> {item.status} </Text>
                    </Pressable>
                )}
                {item.status === 'in progress' && (
                    <Pressable
                        onPress={() => {
                            updateStatus(item)
                        }}
                    >
                        <Text style={CourierStyles.statusInProgressText}> {item.status} </Text>
                    </Pressable>
                )}
                {item.status === 'delivered' && (
                    <Pressable
                        onPress={() => {
                            updateStatus(item)
                        }}
                    >
                        <Text style={CourierStyles.statusDeliveredText}> {item.status} </Text>
                    </Pressable>
                )}
                <Pressable
                    style={CourierStyles.iconbutton}
                    onPress={() => {
                        setModalVisible(true)
                        setSelectedOrder(item)
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                </Pressable>
            </View>
        </>
    )

    return (
        <>
            <View style={CourierStyles.container}>
                <Text style={CourierStyles.myOrders}> MY DELIVERIES </Text>
                <br />
                <Row
                    data={tableData.tableHead}
                    style={CourierStyles.head}
                    textStyle={CourierStyles.headText}
                />
                <br />

                <FlatList
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={styles.centered}>
                            <View style={styles.modalView}>
                                <Pressable
                                    onPress={() => {
                                        setModalVisible(!modalVisible)

                                        setSelectedOrder(null)
                                    }}
                                >
                                    <Text style={CourierStyles.xButton}>x</Text>
                                </Pressable>
                                <Text style={CourierStyles.modalText}> </Text>
                                <Text style={CourierStyles.modalText}> DELIVERY DETAILS </Text>

                                <Text style={CourierStyles.modalText2}>
                                    {" "}
                                    Status: {selectedOrder && selectedOrder.status}
                                </Text>

                                <Text style={CourierStyles.modalText}> </Text>
                                <br />
                                <Text style={CourierStyles.modalText4}>
                                    {" "}
                                    Delivery Address:{selectedOrder && selectedOrder.customer_address}
                                </Text>
                                <Text style={CourierStyles.modalText4}>
                                    {" "}
                                    Restaurant: {selectedOrder && selectedOrder.restaurant_name}
                                </Text>
                                <Text style={CourierStyles.modalText4}>
                                    {" "}
                                    Order Date: {selectedOrder && selectedOrder.created_at}
                                </Text>
                                <br />
                                <Text style={CourierStyles.modalText5}> Order Details: </Text>
                                <FlatList
                                    data={selectedOrder && selectedOrder.products}
                                    renderItem={renderProduct}
                                    keyExtractor={(item) => item.product_id}
                                />
                                <br />
                                <View style={CourierStyles.line} />
                                <br />
                                <Text style={CourierStyles.totalText}>
                                    TOTAL: $ {selectedOrder && selectedOrder.total_cost}{" "}
                                </Text>
                                <br />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

            <Footer navigation={navigation} />
        </>
    )
}