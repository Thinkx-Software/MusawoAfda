import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from '../../components/Button/Button';
// import Call API
import call from 'react-native-phone-call';
import { cancelLabRequest } from '../../redux/slices/userSlice/actions';
import { useNavigation } from '@react-navigation/core';
import Loading from '../../components/Indicator/Loading';


const LabRequest = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { normaluser: { requestedService } } = useSelector(({ userSlice }) => userSlice)
    //alert(requestedService?.id)

    const [loading, setLoading] = useState(false)
    //make phone call
    const onMakeCall = () => {
        navigation.navigate('RateLabService')
    }
    //make phone call

    //cancel lab request
    const onCancelRequest = () => {
        setLoading(true)
        dispatch(cancelLabRequest(requestedService?.id))

        setTimeout(() => {
            navigation.navigate('Home')
        }, 5000)
        setLoading(false)

    }
    //cancel lab request

    useEffect(() => {
        if (requestedService == null) {
            navigation.navigate('Home')
            setLoading(false)
        }
    }, [requestedService])
    return (
        <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>

            <View>
                {
                    loading &&
                    <View style={{ margin: 10 }}
                    >
                        <Loading />
                    </View>
                }
                <Pressable styles={[styles.pressableStyles]}>
                    <Card style={styles.cardStyle} elevation={2}>


                        {/*cardcontent */}
                        <Card.Content>
                            <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                <Title>{`${requestedService?.service_name}`}</Title>
                                {/*accept*/}

                                {/*rate */}
                                {
                                    requestedService?.status != 'pending' && (
                                        <ButtonComponent mode="outlined" text="Rate " color={`${theme.colors.primary}`} style={{
                                            marginTop: 5,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: theme.colors.primary,
                                            height: 35

                                        }}
                                            contentStyle={{
                                                fontSize: 8, height: 28
                                            }}
                                            onPress={() => onMakeCall()}
                                        />

                                    )
                                }

                                {/*rate */}



                            </View>

                            {/*amount */}
                            <Paragraph style={{ marginLeft: 5 }}>

                                <Text>
                                    <Text style={{ fontWeight: "bold", marginLeft: 4, fontSize: 17 }}>
                                        Total Fee {' '}
                                    </Text>
                                    {`shs ${requestedService?.price} (cash)`}
                                </Text>

                            </Paragraph>
                            {/*amount */}

                            <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                {/*status */}

                                <Paragraph style={{ marginLeft: 5 }}>

                                    <Text>
                                        Status {' '}
                                        <Text style={{ fontWeight: "bold", marginLeft: 4, fontSize: 17, color: "green" }}>
                                            {` ${requestedService?.status}`}
                                        </Text>

                                    </Text>

                                </Paragraph>
                                {/*status */}

                                {
                                    requestedService?.status == 'pending' ?
                                        <ButtonComponent mode="outlined" text="Cancel" color={`${theme.colors.error}`} style={{
                                            marginTop: 5,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: theme.colors.error,
                                            height: 35

                                        }}
                                            contentStyle={{
                                                fontSize: 8, height: 28
                                            }}
                                            // onPress={() => onMakeCall()}
                                            onPress={onCancelRequest}
                                        /> :
                                        <ButtonComponent mode="outlined" text="Confirm" color={`${theme.colors.primary}`} style={{
                                            marginTop: 5,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: theme.colors.primary,
                                            height: 35

                                        }}
                                            contentStyle={{
                                                fontSize: 8, height: 28
                                            }}
                                            onPress={onCancelRequest}
                                        />

                                }

                            </View>

                        </Card.Content>
                        {/*card content */}


                    </Card>
                </Pressable>
            </View>


            {/*request */}
            {/*request */}
        </View>
    )
}

export default LabRequest

const styles = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 10,
        marginVertical: 4,
        borderRadius: 10

    },
    pressableStyles: {
        marginVertical: 10,
        padding: 5
    },
    wordStyles: { fontSize: 14, marginLeft: 20 },
    paragraphStyle: {
        color: theme.colors.placeholder,
        padding: 3

    },
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
