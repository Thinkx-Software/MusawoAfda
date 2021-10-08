import React, { useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { constantstyles } from '../../constants/constanstStyles';
import { theme } from '../../theme';
import { Card, Title, Paragraph } from 'react-native-paper';
import ButtonComponent from '../../components/Button/Button';
import Loading from '../../components/Indicator/Loading';
import { useNavigation } from '@react-navigation/core';

const LaboratoryServices = () => {
  const navigation = useNavigation()
  const { normaluser: { labServices } } = useSelector(({ userSlice }) => userSlice)

  const dispatch = useDispatch()
  useEffect(() => {

  }, [labServices])



  return (
    <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>


      {
        labServices == null ?
          <View
            style={{ margin: 10 }}
          >
            <Loading />
          </View> :
          <FlatList
            data={labServices}
            keyExtractor={item => String(item?.id)}
            contentContainerStyle={{ marginVertical: 15, marginHorizontal: 2 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponentStyle={{
              marginVertical: 20
            }}
            ListHeaderComponent={
              <View style={[constantstyles.elevatedCard, constantstyles.centerContent, { marginHorizontal: 10, marginTop: 10 }]}>
                <Text style={{ color: theme.colors.primary, fontSize: 17 }}>Available Services</Text>
              </View>
            }

            renderItem={({ item, index }) => (
              <Pressable key={item.id} styles={[styles.pressableStyles]}>
                <Card style={styles.cardStyle} elevation={2}>


                  {/*cardcontent */}
                  <Card.Content>
                    <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                      <Title>{`${item?.name.length < 22 ? item.name : item.name.substring(0, 20)}`}</Title>
                      {/*accept*/}



                      <ButtonComponent mode="outlined" text="Request" color={`${theme.colors.primary}`} style={{
                        marginTop: 2,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: theme.colors.primary,
                        height: 40

                      }}
                        contentStyle={{
                          fontSize: 5, height: 35
                        }}
                        onPress={() => {
                          navigation.navigate('MakeLabRequest', { name: item?.name })
                        }}
                      />





                      {/*accept */}



                    </View>
                    {/*amount */}
                    <Paragraph style={{ marginLeft: 5 }}>

                      <Text>
                        <Text style={{ fontWeight: "bold", marginLeft: 4, fontSize: 17 }}>
                          Total Price {' '}
                        </Text>
                        {`shs ${item?.price} (cash)`}
                      </Text>

                    </Paragraph>
                    {/*amount */}

                  </Card.Content>
                  {/*card content */}


                </Card>
              </Pressable>)}
          />



      }

    </View>
  )
}
export default LaboratoryServices;

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 5,
    padding: 10,
    borderColor: theme.colors.primary,
    borderWidth: 0

  },
  pressableStyles: {
    marginVertical: 10
  },
  paragraphStyle: {
    paddingVertical: 5

  },
  wordStyles: { fontSize: 14, marginLeft: 20 },
  buttonStyle: {
    borderColor: StyleSheet.hairlineWidth,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  buttonStyle1: {

    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20

  }

})