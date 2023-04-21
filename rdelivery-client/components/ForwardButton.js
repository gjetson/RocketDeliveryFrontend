import React from "react"
import { TouchableHighlight, Image, } from "react-native"
import PropTypes from "prop-types"
import ForwardBtnStyles from "../css/ForwardBtnStyles"

export default function ForwardButton(props) {
    return (
        <TouchableHighlight onPress={props.onPress} style={ForwardBtnStyles.btnContainer}>
            <Image source={require("../assets/images/white-arrow-icon-5.png")} style={ForwardBtnStyles.btnIcon} />
        </TouchableHighlight>
    )
}

ForwardButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
}