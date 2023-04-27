import React, { useState, useEffect, useRef } from "react"
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image,
    Button,
} from "react-native"
import CustomerStyles from "../css/CustomerStyles"
import Footer from "./Footer"
import MainStyles from "../css/MainStyles"
import SelectDropdown from "react-native-select-dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faSortDown } from "@fortawesome/free-solid-svg-icons/faSortDown"

export default function Customer({ navigation }) {
    const [restaurants, setRestaurants] = useState([])
    const [ratings, setRatings] = useState([])
    const [prices, setPrices] = useState([])
    const [selectedRating, setSelectedRating] = useState(-1)
    const [selectedPrice, setSelectedPrice] = useState(-1)

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/restaurants')
                const json = await response.json()
                if (response && response.status === 200) {
                    setRestaurants(json)
                    console.log("fetchRestaurants: ", json)
                    const ratingsArr = json.map((item) => {
                        return { rating: item.ave_rating }
                    })
                    setRatings(flterDuplicateRatings(ratingsArr))
                    const pricesArr = json.map((item) => {
                        return { price: item.restaurant.price_range }
                    })
                    setPrices(flterDuplicatePrices(pricesArr))
                } else {
                    console.error(response.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchRestaurants()
    }, [])

    const flterDuplicateRatings = (arr) => {
        return arr.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.rating === value.rating
            ))
        )
    }

    const flterDuplicatePrices = (arr) => {
        return arr.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.price === value.price
            ))
        )
    }

    const getDisplayRestaurants = () => {
        let display = filterRestaurantsByRating(restaurants)
        display = filterRestaurantsByPrice(display)
        console.log("display: ", display)
        return display
    }

    const filterRestaurantsByRating = (arr) => {
        console.log('rating: ', selectedRating)
        if (selectedRating < 0) {
            return arr
        } else {
            return arr.filter((item) => {
                if (item.ave_rating === selectedRating.rating) {
                    return item
                }
            })
        }
    }

    const filterRestaurantsByPrice = (arr) => {
        console.log('price: ', selectedPrice)
        if (selectedPrice < 0) {
            return arr
        } else {
            return arr.filter((item) => {
                if (item.restaurant.price_range === selectedPrice.price) {
                    return item
                }
            })
        }
    }

    const random = () => {
        const i = Math.floor(Math.random() * 6) + 1
        // console.log(`../assets/images/restaurants/cuisine_${i}.jpg`)
        return i
    }

    const renderRestaurants = ({ item }) => {
        return (
            <TouchableHighlight
                underlayColor="rgba(73,182,77,0.9)"
                onPress={() => navigation.navigate("Order", { item })}
            >
                <View style={MainStyles.container}>
                    <Image style={CustomerStyles.photo} source={require(`../assets/images/restaurants/cuisine_${random()}.jpg`)} />
                    <br />
                    <Text style={CustomerStyles.title}>{item.restaurant.name}</Text>
                    <Text style={CustomerStyles.category}>
                        {item.ave_rating} stars
                    </Text>
                    <br />
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <>
            <Text style={MainStyles.nearby}> NEARBY RESTAURANTS</Text>
            <br />
            <View style={MainStyles.dropdownsRow}>
                <SelectDropdown
                    data={ratings}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        // loadDisplayRestaurantsByRating(selectedItem.rating)
                        setSelectedRating(selectedItem)
                    }}
                    defaultButtonText={"Rating"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.rating
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.rating
                    }}
                    buttonStyle={MainStyles.dropdown1BtnStyle}
                    buttonTextStyle={MainStyles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                        return (
                            <FontAwesomeIcon
                                icon={faSortDown}
                                color={'#FFFFFF'} />

                        )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={MainStyles.dropdown1DropdownStyle}
                    rowStyle={MainStyles.dropdown1RowStyle}
                    rowTextStyle={MainStyles.dropdown1RowTxtStyle}
                />
                <View style={MainStyles.divider} />
                <SelectDropdown
                    data={prices}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        // loadDisplayRestaurantsByPrice(selectedItem.price)
                        setSelectedPrice(selectedItem)
                    }}
                    defaultButtonText={"Price"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.price
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.price
                    }}
                    buttonStyle={MainStyles.dropdown2BtnStyle}
                    buttonTextStyle={MainStyles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                        return (
                            <FontAwesomeIcon
                                icon={faSortDown}
                                color={'#FFFFFF'} />
                        )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={MainStyles.dropdown2DropdownStyle}
                />
            </View>
            <br />
            <View style={MainStyles.container}>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={getDisplayRestaurants()}
                    renderItem={renderRestaurants}
                    keyExtractor={(item) => `${item.restaurant.id}`}
                />
            </View>
            <Footer navigation={navigation} />
        </>
    )
}