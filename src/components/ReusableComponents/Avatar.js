import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Avatar} from "react-native-paper"

const AvatarComponent = ({size, source, avatarStyle}) => {
    return (
       <Avatar.Image size={size} source={{uri:source}} style={avatarStyle}/>
    )
}

export default AvatarComponent


