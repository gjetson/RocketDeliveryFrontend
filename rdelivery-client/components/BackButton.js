import React from "react"
import { TouchableHighlight, Image, } from "react-native"
import PropTypes from "prop-types"
import BackBtnStyles from "../css/BackBtnStyles"

export default function BackButton(props) {
    return (
        <TouchableHighlight onPress={props.onPress} style={BackBtnStyles.btnContainer}>
            <Image source={require("../assets/images/circled-left-2.png")} style={BackBtnStyles.btnIcon} />
        </TouchableHighlight>
    )
}

BackButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
}