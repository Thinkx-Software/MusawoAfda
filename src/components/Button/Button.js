import React from "react";
import { Button } from 'react-native-paper';


const ButtonComponent = ({icon, color, text, mode, onPress, fullWidth, disabled, style})=>{
    return (
        <Button
          contentStyle = {{
              flexDirection:"row-reverse",
              width:fullWidth&&"100%"
          }}
         icon = {icon}
         mode = {mode}
         color = {color}
         uppercase={false}
         onPress = {onPress}
         disabled={disabled}
         style={style}
        >{text}</Button>
    )
}

export default ButtonComponent