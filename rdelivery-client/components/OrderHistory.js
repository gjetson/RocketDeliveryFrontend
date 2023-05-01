import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Modal,
    Pressable,
} from "react-native"
import { Table, Row, Rows } from "react-native-table-component"
import OrderHistoryStyles from "../css/OrderHistoryStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"
import MainStyles from "../css/MainStyles"
import Footer from "./Footer"
import { useRoute } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const tableData = {
    tableHead: ["ORDER", "STATUS", "VIEW"],
}

const OrderHistory = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const customer_id = await AsyncStorage.getItem("@customer")
                console.log('customer_id: ', customer_id)
                const response = await fetch(
                    `http://localhost:3000/api/orders?type=customer&user_id=${customer_id}`
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
        }
        fetchOrders()
    }, [])

    const renderProduct = ({ item }) => (
        <>
            <Text style={OrderHistoryStyles.modalText3}>
                {" "}
                {item.product_name}{" "}
            </Text>
            <Text style={OrderHistoryStyles.quantityText}> x {item.product_quantity}</Text>
            <Text style={OrderHistoryStyles.priceText}> $ {item.unit_cost} </Text>
        </>
    )

    const renderOrder = ({ item }) => (
        <>
            <View>
                <Text style={OrderHistoryStyles.nameText}>
                    {item.restaurant_name}
                </Text>
                <br />
                <br />
                <Text style={OrderHistoryStyles.statusText}> {item.status} </Text>
            </View>
            <View>
                <Pressable
                    style={OrderHistoryStyles.iconbutton}
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
            <View style={OrderHistoryStyles.container}>
                <Text style={OrderHistoryStyles.myOrders}> MY ORDERS </Text>
                <br />
                <Row
                    data={tableData.tableHead}
                    style={OrderHistoryStyles.head}
                    textStyle={OrderHistoryStyles.headText}
                />
                <br />

                <FlatList
                    style={OrderHistoryStyles.orderHistoryList}
                    data={orders}
                    renderItem={renderOrder}
                    keyExtractor={(item) => item.id}
                />

                <View style={MainStyles.centeredView}>
                    <Modal
                        // animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                            setSelectedOrder(null)
                        }}
                    >
                        <View style={MainStyles.centered}>
                            <View style={MainStyles.modalView}>
                                <Pressable
                                    style={OrderHistoryStyles.buttonClosed}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        setSelectedOrder(null)
                                    }}
                                >
                                    <Text style={OrderHistoryStyles.xButton}>X</Text>
                                </Pressable>
                                <Text style={OrderHistoryStyles.modalText}> </Text>
                                <Text style={OrderHistoryStyles.modalText}>
                                    Name: {selectedOrder && selectedOrder.customer_name}
                                </Text>
                                <Text style={OrderHistoryStyles.modalText2}>
                                    Order Date: {selectedOrder && selectedOrder.created_at}
                                </Text>
                                <Text style={OrderHistoryStyles.modalText2}>
                                    Status: {selectedOrder && selectedOrder.status}
                                </Text>
                                <Text style={OrderHistoryStyles.modalText2}>
                                    {selectedOrder && selectedOrder.courier_id && 'Courier ID:'} {selectedOrder && selectedOrder.courier_id}
                                </Text>
                                <Text style={OrderHistoryStyles.modalText}> </Text>
                                <br />
                                <FlatList
                                    style={OrderHistoryStyles.orderHistoryList}
                                    data={selectedOrder && selectedOrder.products}
                                    renderItem={renderProduct}
                                    keyExtractor={(item) => item.product_id}
                                />
                                <br />
                                <View style={OrderHistoryStyles.line} />
                                <br />
                                <Text style={OrderHistoryStyles.totalText}>TOTAL: $ {selectedOrder && selectedOrder.total_cost} </Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            <Footer navigation={navigation} />
        </>
    )
}

export default OrderHistory