import { StyleSheet } from "react-native"

const CourierStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // marginTop: 30,
        // justifyContent: "center",
        // backgroundColor: "#fff",
    },
    headertext: {
        fontFamily: "Oswald",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 20,
    },
    head: {
        height: 44,
        backgroundColor: "#222126",
    },
    headText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    iconbutton: {
        marginLeft: 100,
        marginTop: 20,
    },
    xButton: {
        color: "gray",
        fontSize: 25,
    },
    modalText: {
        color: "#DA583B",
        fontFamily: "Oswald",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        backgroundColor: "#222126",
    },
    modalText2: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
        backgroundColor: "#222126",
    },
    modalText4: {
        fontSize: 16,
    },
    myOrders: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Oswald",
    },
    modalText5: {
        fontSize: 18,
        fontFamily: "Oswald",
        fontWeight: "bold",
    },
    line: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    totalText: {
        fontWeight: "bold",
        marginLeft: 450,
        fontSize: 15,
    },
    quantityText: {
        marginLeft: 250,
        marginTop: -15,
    },
    quaText: {
        marginLeft: 250,
        marginTop: -15,
    },
    priceText: {
        marginLeft: 320,
        marginTop: -18,
    },
    pText: {
        marginLeft: 320,
        marginTop: -18,
    },
    nameText: {
        marginTop: 20,
        marginLeft: 45,
    },
    statusText: {
        marginLeft: 400,
        marginTop: -51,
    },
    addressText: {
        marginLeft: 75,
        marginTop: 20,
    },
    statusPendingText: {
        backgroundColor: "red",
        width: 60,
        marginLeft: 75,
        marginTop: 20,
    },
    statusInProgressText: {
        backgroundColor: "orange",
        width: 80,
        marginLeft: 75,
        marginTop: 20,
    },
    statusDeliveredText: {
        backgroundColor: "green",
        width: 65,
        marginLeft: 75,
        marginTop: 20,
    },
})

export default CourierStyles