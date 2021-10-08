import React from "react";
import {StyleSheet} from "react-native"
import { theme } from "../theme";
export const constantstyles = StyleSheet.create({
    container:{
        flex:1
    },
    flexStyles:{
        display:"flex",
        flexDirection:"row"
    },
    absoluteStyles:{
        position:"absolute",
        zIndex:20
    },
    resideViews:{
        alignItems: "center",
         flexDirection: "row", 
        width: "100%",
        margin:2
    },
    centerContent:{
        justifyContent:"center",
        alignItems:"center"
    },
    elevatedCard:{
        elevation:4,
        backgroundColor:theme.colors.text,
        padding:10,
        borderRadius:20,
        
    },
    
})