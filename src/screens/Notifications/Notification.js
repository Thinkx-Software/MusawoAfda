import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { theme } from "../../theme"
import { constantstyles } from "../../constants/constanstStyles"

const Notification = () => {
    return (
        <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>
            <Pressable style={[styles.pressableStyles, constantstyles.resideViews]}>
                {/*time */}
                <View style={[constantstyles.absoluteStyles, { top: 3, right: 5 }]}>
                    <Text style={{ color: theme.colors.placeholder, fontSize: 9, marginBottom: 3 }}>

                        22/08/2021

                    </Text>
                </View>
                {/*time */}
                <View>
                    <Text>There are no notifications yet </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    pressableStyles: {
        backgroundColor: theme.colors.text,
        elevation: 3,
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 0,
        borderRadius: 10
    },

})
