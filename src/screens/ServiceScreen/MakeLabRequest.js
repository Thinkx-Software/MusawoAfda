import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { TextInput, HelperText, Subheading } from "react-native-paper"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { theme } from '../../theme';
import Loading from '../../components/Indicator/Loading';
import { EmptyFieldError, numberError } from '../../helpers';
import ButtonComponent from '../../components/Button/Button';
import { getRequestLabService, requestLabatoryService, } from '../../redux/slices/userSlice/actions';
import { useDispatch } from "react-redux"
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { autoComplteStyles } from '../../constants/autocompletestyles';
const MakeLabRequest = ({ route }) => {
    const isFocused = useIsFocused()
    const { name } = route?.params

    const navigation = useNavigation()
    const { user: { userInfo } } = useSelector(({ authSlice }) => authSlice)
    const { normaluser: { requestedService } } = useSelector(({ userSlice }) => userSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        if (requestedService != null) {
            //alert('man there is')
            navigation.navigate('LabRequest')
        }
    }, [requestedService])
    //check service
    useEffect(() => {
        if (requestedService != null) {
            //alert('man there is')
            navigation.navigate('LabRequest')
        }
    }, [isFocused])
    //check service

    const ref = useRef();
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null)

    //onpress
    const onPress = (data, details = null) => {

        // console.log(`The details is ${JSON.stringify(details.geometry.location)}`)
        setAddress(data?.description)
        //alert(longitude)

    }
    //onpress
    //make a request
    const makeRquest = () => {
        const userInformation = {
            id: userInfo?.id,
            userDetails: {
                client_contact: phone,
                service_name: name,
                client_address: address

            }

        }
        //alert(JSON.stringify(userInformation))
        //dispatch update user location
        setLoading(true)
        dispatch(getRequestLabService(userInformation))


    }
    //make a request

    //add validation
    const disableMakeRequest = () => {
        if (EmptyFieldError(phone) || EmptyFieldError(address) || numberError(parseInt(phone))) {
            return true
        }
        else {
            return false
        }
    }

    //add validation
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: theme.colors.secondary }}
        >
            <View

                contentContainerStyle={{ paddingBottom: 30 }}
            >

                <Subheading
                    theme={{ colors: { text: 'gray' } }}
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingBottom: 10,
                        color: theme.colors.primary
                    }}
                >
                    Enter the details below
                </Subheading>
                {/*loading*/}
                {/*loading*/}

                {loading &&
                    <View
                        style={{ marginVertical: 20 }}

                    >
                        <Loading />
                    </View>

                }
                { /*loading */}

                {/*phone number */}
                <View style={{ marginHorizontal: 20 }}>
                    <TextInput
                        label="PHONE"
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        style={{
                            backgroundColor: theme.colors.text,
                            width: '96%',
                            alignSelf: 'center',
                            borderWidth: 0,
                            height: 60
                        }}

                        left={<TextInput.Icon name="phone-outline" color={theme.colors.placeholder} size={27} />}
                        theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 1 }}
                        mode={'flat'}
                        autoCorrect={false}
                        error={numberError(parseInt(phone))}
                        placeholder=" phone number"
                        outlineColor={theme.colors.primary}
                        underlineColor={theme.colors.disabled}
                        selectionColor={theme.colors.primary}
                        textContentType="telephoneNumber"
                        keyboardType="numeric"
                    />
                    <HelperText type="error" visible={true} style={styles.bottom}>

                        {
                            numberError(parseInt(phone))
                        }
                    </HelperText>
                </View>

                {/*phone number */}

                {/*auto complete */}

                <GooglePlacesAutocomplete
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    ref={ref}
                    styles={
                        autoComplteStyles
                    }

                    fetchDetails={true}
                    autoFocus={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    placeholder='current location'
                    onPress={onPress}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                        components: 'country:ug'

                    }}
                    textInputProps={{ placeholderTextColor: theme.colors.black }}
                    onFail={(error) => console.error(error)}
                    requestUrl={{
                        useOnPlatform: 'web', // or "all"
                        url:
                            'https://maps.googleapis.com/maps/api',
                        // or any proxy server that hits https://maps.googleapis.com/maps/api
                        headers: {
                            "Access-Control-Allow-Origin": '*'
                        },
                    }}
                />

                {/*auto complete */}

                {/*make request */}
                <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                    <ButtonComponent mode="outlined" text="Make Request" color={`${theme.colors.primary}`}
                        style={{
                            marginTop: 5,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: theme.colors.primary,

                        }}
                        contentStyle={{
                            fontSize: 8, height: 28
                        }}
                        onPress={makeRquest}
                        disabled={disableMakeRequest()}
                    />
                </View>
                {/*make request */}

            </View>


        </KeyboardAvoidingView>
    )
}

export default MakeLabRequest

const styles = StyleSheet.create({})
