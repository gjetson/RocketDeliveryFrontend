import React, { useEffect, useState } from "react"
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
import { categories } from "../data/data_arrays"
import { getNumberOfRecipes } from "../data/MockDataApi"
import MenuImage from "./MenuImage"
import Footer from "./Footer"
import BackButton from "./BackButton"
import ForwardButton from "./ForwardButton"

export default function Order({ route, navigation }) {
    const { item, customer_id, user_id, courier_id } = route.params
    console.log(item, customer_id, user_id, courier_id)
    const [modalVisible, setModalVisible] = useState(false)
    // const [count, setCount] = useState(0)
    const [products, setProducts] = useState([])

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
            {/* <BackButton
          onPress={() => {
            navigation.navigate('Restaurant');
          }}
        /> */}
            <ForwardButton
                onPress={() => {
                    navigation.navigate("History")
                }}
            />
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
                                <Text style={MainStyles.modalText3}> TOTAL: </Text>
                                <Pressable
                                    style={MainStyles.buttonClose}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={MainStyles.textStyle2}>CONFIRM ORDER</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={MainStyles.button}
                        onPress={() => setModalVisible(true)}>
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
            <Footer />
        </>
    )
}