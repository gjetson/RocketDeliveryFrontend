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
import MainStyles from "../css/MainStyles"
import CourierStyles from "../css/CourierStyles"
import { Table, Row, Rows } from "react-native-table-component"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Footer from "./Footer"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"

const tableData = {
    tableHead: ["ORDER ID", "ADDRESS", "STATUS", "VIEW"],
}
export default function Courier({ route, navigation }) {

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
        }
        fetchOrders()
    }, [])

    const productItem = ({ item }) => (
        <>
            <Text style={CourierStyles.modalText3}> {item.product_name} </Text>
            <Text style={CourierStyles.quantityText}> x1 </Text>
            <Text style={CourierStyles.priceText}> $ price </Text>
        </>
    )

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
                <Text style={CourierStyles.statusText}> {item.status} </Text>
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
                <br />
                <br />
                <Text style={CourierStyles.headertext}> MY DELIVERIES </Text>
                <br />
                <Row
                    data={tableData.tableHead}
                    style={CourierStyles.head}
                    textStyle={CourierStyles.headText}
                />

                <FlatList
                    style={CourierStyles.orderhistroyList}
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

                <View style={MainStyles.centeredView}>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={MainStyles.centered}>
                            <View style={MainStyles.modalView}>
                                <Pressable
                                    style={CourierStyles.buttonClosed}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        setSelectedOrder(null)
                                    }}
                                >
                                    <Text style={CourierStyles.xButton}>x</Text>
                                </Pressable>
                                <Text style={CourierStyles.modalText}> </Text>
                                <Text style={CourierStyles.modalText}>
                                    {" "}
                                    Name: {selectedOrder && selectedOrder.customer_name}
                                </Text>
                                <Text style={CourierStyles.modalText2}>
                                    Order Date: {selectedOrder && selectedOrder.created_at}
                                </Text>
                                <Text style={CourierStyles.modalText2}>
                                    {" "}
                                    Status: {selectedOrder && selectedOrder.status}
                                </Text>
                                <Text style={CourierStyles.modalText2}>
                                    {" "}
                                    Courier ID: {selectedOrder && selectedOrder.courier_id}
                                </Text>
                                <Text style={CourierStyles.modalText}> </Text>
                                <br />
                                <FlatList
                                    style={CourierStyles.orderhistroyList}
                                    data={orders.products}
                                    renderItem={productItem}
                                    keyExtractor={(item) => item.product_id}
                                />
                                <br />
                                <View style={CourierStyles.line} />
                                <br />
                                <Text style={CourierStyles.totalText}>TOTAL: $ {selectedOrder && selectedOrder.total_cost} </Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            <Footer navigation={navigation} />
        </>
    )
}