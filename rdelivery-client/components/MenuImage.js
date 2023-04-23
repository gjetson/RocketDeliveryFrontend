import React from "react"
import { TouchableOpacity, Image } from "react-native"
import PropTypes from "prop-types"
import MenuImageStyles from "../css/MenuImageStyles"

export default function MenuImage(props) {
    return (
        <TouchableOpacity style={MenuImageStyles.headerButtonContainer} onPress={props.onPress}>
            <Image
                style={MenuImageStyles.headerButtonImage}
                source={require("../assets/images/RestaurantMenu.jpg")}
            />
        </TouchableOpacity>
    )
}

MenuImage.propTypes = {
    onPress: PropTypes.func,
}