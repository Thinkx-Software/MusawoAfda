import React from "react";
import { Appbar, Badge } from 'react-native-paper';
import { theme } from "../../theme";
import { View, StyleSheet, Pressable } from "react-native";
import AvatarComponent from "../ReusableComponents/Avatar";

import { useDispatch, useSelector } from "react-redux";


const AppBar = ({ navigation, previous, title, elevate, subTitle }) => {


  const dispatch = useDispatch()


  return (
    <Appbar.Header
      dark={true}
      style={{
        backgroundColor: `${theme.colors.secondary}`,
        width: "100%",
        elevation: elevate ? 0 : 5

      }} >

      {previous ?

        <Appbar.BackAction onPress={()=>{
         
          navigation.navigate('Home')
        }} color={`${theme.colors.secondary}`} />
        : null}

      <Appbar.Content
        title={title}
        titleStyle={styles.titleStyle}
        subtitle={subTitle}
        subtitleStyle={styles.subtitleStyle}
      />

      <Pressable style={styles.avatartStyles}
        onPress={() => navigation.navigate("Profile")}
      >

        <AvatarComponent size={40}

          source="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
      </Pressable>

    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  appHeaderStyle: {
    backgroundColor: `${theme.colors.primary}`,
    width: "100%",
  },

  titleStyle: {
    marginTop: -10,
    color: `${theme.colors.primary}`
  },
  subtitleStyle: {
    color: `${theme.colors.placeholder}`
  },
  avatartStyles: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    height: 40,
    borderRadius: 10
  }
})
export default AppBar