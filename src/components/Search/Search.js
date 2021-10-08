import React, { useState } from "react";
import { Searchbar } from 'react-native-paper';
import { Text, View, } from "react-native";
import { theme } from "../../theme";
const SearchComponent = ({ searchStyles, icon, iconPressed, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    
  }

  return (
    <View>

        <Searchbar
          placeholder={placeholder}
          style={searchStyles}
          onChangeText={onChangeSearch}
          inputStyle={{color:theme.colors.black}}
          icon={icon}
          onIconPress={iconPressed}
          iconColor={theme.colors.secondary}
          autoCorrect={true}
          autoCapitalize="none"
          theme={{fonts:{thin:'Open Sans' }, colors:{primary:theme.colors.black}}}

        />

    
    </View>
  )
}


export default SearchComponent;