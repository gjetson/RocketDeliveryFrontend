import React, { useLayoutEffect, useState } from "react"
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
    const [count, setCount] = useState(0)

    const onPressCategory = (item) => {
        const title = item.name
        const category = item
        navigation.navigate("RecipesList", { category, title })
    }

    const renderCategory = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,0.9)"
            onPress={() => onPressCategory(item)}
        >
            <View style={OrderStyles.categoriesItemContainer}>
                <Image
                    style={OrderStyles.categoriesPhoto}
                    source={{ uri: item.photo_url }}
                />
                <Text style={OrderStyles.categoriesName}>{item.name}</Text>
                <Text style={OrderStyles.categoriesInfo}>
                    {getNumberOfRecipes(item.id)} recipes
                </Text>
            </View>
        </TouchableHighlight>
    )

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
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <TouchableOpacity
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
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </>
    )
}