import React, { useState, useEffect, useRef } from "react"
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image,
    Button,
} from "react-native"
import restaurantStyles from "../css/RestaurantStyles"
// import { recipes } from "../data/data_arrays"
import Footer from "./Footer"
import { getCategoryName } from "../data/MockDataApi"
import MainStyles from "../css/MainStyles"
import SelectDropdown from "react-native-select-dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faSortDown } from "@fortawesome/free-solid-svg-icons/faSortDown"
import ForwardButton from "./ForwardButton"

export default function Restaurants({ navigation }) {

    const [restaurants, setRestaurants] = useState([])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const citiesDropdownRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            setCountries([
                { title: "Egypt", cities: [{ title: "Cairo" }, { title: "Alex" }] },
                {
                    title: "Canada",
                    cities: [{ title: "Toronto" }, { title: "Quebec City" }],
                },
            ])
        }, 1000)
    }, [])

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/restaurants')
                const json = await response.json()
                if (response && response.status === 200) {
                    setRestaurants(json)
                    console.log("fetchRestaurants: ", json)
                } else {
                    console.error(response.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchRestaurants()
    }, [])


    const random = () => {
        const i = Math.floor(Math.random() * 6) + 1
        console.log(`../assets/images/restaurants/cuisine_${i}.jpg`)
        return i
    }

    const renderRestaurants = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,0.9)"
            onPress={() => navigation.navigate("Restaurant", { item })}
        >
            <View style={MainStyles.container}>
                <Image style={restaurantStyles.photo} source={require(`../assets/images/restaurants/cuisine_${random()}.jpg`)} />
                <br />
                <Text style={restaurantStyles.title}>{item.restaurant.name}</Text>
                <Text style={restaurantStyles.category}>
                    {item.ave_rating} stars
                </Text>
                <br />
            </View>
        </TouchableHighlight>
    )

    return (
        <>
            <ForwardButton
                onPress={() => {
                    navigation.navigate("Order")
                }}
            />
            <br />
            <Text style={MainStyles.nearby}> NEARBY RESTAURANTS</Text>
            <br />
            <View style={MainStyles.dropdownsRow}>
                <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        citiesDropdownRef.current.reset()
                        setCities([])
                        setCities(selectedItem.cities)
                    }}
                    defaultButtonText={"Rating"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.title
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.title
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
                    ref={citiesDropdownRef}
                    data={cities}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    defaultButtonText={"Price"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.title
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.title
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
                    data={restaurants}
                    renderItem={renderRestaurants}
                    keyExtractor={(item) => `${item.restaurant.id}`}
                />
            </View>
            <Footer />
        </>
    )
}