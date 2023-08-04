import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItens: 'center',
            justifyContent: 'center',
        }
    }
)