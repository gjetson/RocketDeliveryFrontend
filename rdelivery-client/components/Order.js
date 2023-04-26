import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight,
    Button,
    TouchableOpacity,
    Modal,
    Alert,
    Pressable,

} from "react-native"
import MainStyles from "../css/MainStyles"
import OrderStyles from "../css/OrderStyles"
import Footer from "./Footer"

export default function Order({ route, navigation }) {
    const { item } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [products, setProducts] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products?restaurant=${item.restaurant.id}`)
                const json = await response.json()
                if (response && response.status === 200) {
                    const updated = json.map((item) => {
                        item.count = 0
                        return item
                    })
                    console.log("fetchProducts: ", updated)
                    setProducts(updated)
                } else {
                    console.error(response.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchProducts()
    }, [])

    const onPressCategory = (item) => {
        const title = item.name
        const category = item
        navigation.navigate("RecipesList", { category, title })
    }

    const handleIncrement = (product_id) => {
        console.log('handleIncrement: ', product_id)
        const updated = products.map((product) => {
            if (product.id === product_id) {
                product.count += 1
                console.log('count: ', product.count)
            }
            return product
        })
        setProducts(updated)
    }

    const handleDecrement = (product_id) => {
        console.log('handleDecrement: ', product_id)
        const updated = products.map((product) => {
            if (product.id === product_id && product.count > 0) {
                console.log('count: ', product.count)
                product.count -= 1
            }
            return product
        })
        setProducts(updated)
    }

    const calculateOrderTotal = () => {
        let total = 0
        products.forEach((product) => {
            if (product.count > 0) {
                const subTotal = product.count * product.cost
                total += subTotal
            }
        })
        if (total > 0) {
            setOrderTotal(total)
            setModalVisible(true)
        }
    }

    const postOrder = async () => {
        try {
            console.log("retaurant: ", item.restaurant.id, ", customer: ", customer_id)
            const productsOrder = []
            products.forEach((product) => {
                if (product.count > 0) {
                    console.log('quantity: ', product.count)
                    productsOrder.push({
                        "id": product.id,
                        "quantity": product.count
                    })
                }
            })
            console.log("productsOrder: ", productsOrder)
            const customer_id = await AsyncStorage.getItem("@customer")
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: item.restaurant.id,
                    customer_id: customer_id,
                    products: productsOrder
                }),
            })
            if (response && response.status === 201) {
                const json = await response.json()
                console.log("postOrder: ", json)
                reset()
            } else {

                console.log("response: ", response.status)
            }
        } catch (error) {
            console.error(error)
        }
        setModalVisible(!modalVisible)
    }

    const reset = () => {
        setOrderTotal(0)
        products.forEach((product) => {
            product.count = 0
        })
    }

    const renderOrderSummary = ({ item }) => {
        if (item.count > 0) {

            return (<Text>{item.name}      {item.cost}  X  {item.count}</Text>)
        }
    }

    const getCount = (product_id) => {
        console.log('getCount: ', product_id)
        let result = 0
        products.forEach((product) => {
            if (product.id === product_id) {
                console.log('return count: ', product.count)
                result = product.count
            }
        })
        return result
    }

    const renderCategory = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,0.9)"
            onPress={() => onPressCategory(item)}
        >
            <View style={OrderStyles.categoriesItemContainer}>
                <Image
                    style={OrderStyles.categoriesPhoto}
                    source={{ uri: getSource(item) }}
                />
                <View style={{ flex: 0.5 }}>
                    <Text>{item.name}</Text>
                    <Text>
                        cost: {item.cost}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Button
                        title="-"
                        onPress={() => { handleDecrement(item.id) }}
                    />
                    <Text>      {getCount(item.id)}      </Text>
                    <Button
                        title="+"
                        onPress={() => { handleIncrement(item.id) }}
                    />
                </View>
            </View>
        </TouchableHighlight>
    )

    const getSource = (item) => {
        if (item.description == null) {
            return 'https://png.pngtree.com/png-clipart/20210609/ourmid/pngtree-burger-fast-food-neon-light-effect-png-image_3423331.jpg'
        }
        return item.description
    }

    return (
        <>
            <br />
            <Text style={MainStyles.nearby}> RESTAURANT MENU</Text>
            <br />
            <Text style={OrderStyles.restaurantName}> {item.restaurant.name}</Text>
            <Text style={OrderStyles.menuitemz}>Price: {item.restaurant.price_range}</Text>
            <Text style={OrderStyles.menuitemz}>Rating: {item.ave_rating}</Text>
            <View>

                {/*///// start of create order MODAL HERE ////////*/}
                <View style={MainStyles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.')
                            setModalVisible(!modalVisible)
                        }}>
                        <View style={MainStyles.centeredView}>
                            <View style={MainStyles.modalView}>
                                <Text style={MainStyles.modalText}>Order Confirmation</Text>
                                <Text style={MainStyles.modalText2}>Order Summary</Text>
                                <FlatList
                                    data={products}
                                    renderItem={renderOrderSummary}
                                    keyExtractor={(item) => `${item.id}`}
                                />
                                <Text style={MainStyles.modalText3}> TOTAL: {orderTotal}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable
                                        style={MainStyles.buttonClose}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={MainStyles.textStyle2}>Back</Text>
                                    </Pressable>
                                    <Text>      </Text>
                                    <Pressable
                                        style={MainStyles.buttonClose}
                                        onPress={() => postOrder()}>
                                        <Text style={MainStyles.textStyle2}>Confirm</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={MainStyles.button}
                        onPress={() => calculateOrderTotal()}>
                        <Text style={MainStyles.textStyle}>Create Order</Text>
                    </Pressable>
                </View>
                {/*  //// END OF MODAL ////////// */}
                <View>
                    <FlatList
                        data={products}
                        renderItem={renderCategory}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    {/* <TouchableOpacity
                        onPress={() => setCount((prevCount) => prevCount - 1)}
                        style={OrderStyles.fab1}
                    >
                        <Text style={OrderStyles.fabIcon1}> - </Text>
                    </TouchableOpacity>
                    <p style={OrderStyles.count}> {count}</p>
                    <TouchableOpacity
                        onPress={() => setCount((prevCount) => prevCount + 1)}
                        style={OrderStyles.fab2}
                    >
                        <Text style={OrderStyles.fabIcon2}>+</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <Footer navigation={navigation} />
        </>
    )
}