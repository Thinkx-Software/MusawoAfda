import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme'
 
 //here
  const data = [
      {
          id:"job 1",
          jobDetails:[]
      }
  ]
 //here
const AvailableJobs = () => {
    return (
        <View style={[constantstyles.container ,{backgroundColor:theme.colors.text}]}>
            <Text>am jobs</Text>
        </View>
    )
}

export default AvailableJobs

const styles = StyleSheet.create({})
