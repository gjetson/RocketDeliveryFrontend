import React, { useEffect, useState } from 'react'
import { Button, ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [login, setLogin] = useState(null)

    const getMovies = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json')
            const json = await response.json()
            setData(json.movies)
            console.log(json.movies)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    const loginPost = async () => {
        try {
            // const response = await fetch('https://reactnative.dev/movies.json')
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'erica.ger@gmail.com',
                    password: 'password1',
                }),
            })
            if (response && response.status === 200) {
                const json = await response.json()
                setLogin(json)
                console.log("login post: ", json)
            } else {
                setLogin(null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Text>
                            {item.title}, {item.releaseYear}
                        </Text>
                    )}
                />
            )}
            {/* {login == null ? (
                <Text>Wait for it....</Text>
            ) : (
                <Text>success: {login.success} user: {login.user_id} customer: {login.customer_id} courier: {login.courier_id} </Text>
            )
            } */}
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    )
}