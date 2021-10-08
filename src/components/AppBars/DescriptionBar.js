import React, { useState } from 'react';
import { Appbar, Menu, Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from "react-native";
import { theme } from '../../theme';
import { logOut } from '../../redux/slices/authSlice/authSlice';


const DescriptionBar = ({
  navigation,
  title = '',
  back = false,
  headerStyles = {},
  titleStyle = {},
  previous,
  logout,
  searchRoom
}) => {


  //dispatch
  const dispatch = useDispatch()

  if (!title || back.length === 0) {
    throw new Error('Add required fields');
  } else if (typeof back !== 'boolean' || typeof title !== 'string') {
    throw new Error(
      'Pass string for title param Or pass boolean for back param',
    );
  } else {
    return (
      <Appbar.Header style={headerStyles}>
        {previous ? (
          <Appbar.BackAction onPress={() => {

            navigation.navigate('Home')

          }

          } color={theme.colors.primary} />
        ) : null}
        <Appbar.Content title={title} titleStyle={titleStyle} />

        {
          searchRoom &&
          <Appbar.Action icon="magnify" onPress={() => alert('pressed')}
            onPressOut={() => alert('pressed out')}
            color={theme.colors.primary} size={35}
            style={{
              marginRight: 10
            }}


          />
        }

        {
          logout &&
          <Appbar.Action icon="logout" onPress={() => dispatch(logOut())}
            onPressOut={() => dispatch(logOut())}
            color={theme.colors.primary} size={35}
            style={{
              marginRight: 10
            }}


          />


        }




      </Appbar.Header>
    );
  }
};

export default DescriptionBar;
