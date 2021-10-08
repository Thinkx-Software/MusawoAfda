import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { clearCancelRequest, clearDoctorInfo, clearLoaction, setHealthWorkerRole, updateLocation } from '../../redux/slices/userSlice/userSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { EmptyFieldError, numberError } from '../../helpers';
import { TextInput, HelperText, Subheading } from "react-native-paper"
import { getdoctor, updateUserLocation } from '../../redux/slices/userSlice/actions';
import Loading from '../../components/Indicator/Loading';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import ButtonComponent from '../../components/Button/Button';
import { autoComplteStyles } from '../../constants/autocompletestyles';


const SelectedService = ({ route }) => {
    const isFocussed = useIsFocused()
    //useIsFocused()
    const { service } = route?.params

    //run 
    useEffect(() => {
        dispatch(clearDoctorInfo())
        dispatch(clearLoaction())
        dispatch(clearCancelRequest())
        dispatch(setHealthWorkerRole(service?.role))
    }, [])
    //run
    const { normaluser } = useSelector(({ userSlice }) => userSlice)
    const { user: { userInfo } } = useSelector(({ authSlice }) => authSlice)

    const navigation = useNavigation()
    //alert(userInfo?.id)
    const ref = useRef();

    useEffect(() => {
        if (normaluser?.currentLocation != null) {

        }

        //navigate the user
        if (normaluser?.getDoctorInfo != null) {
            navigation.navigate("NearestWorker", { role: service?.role })
        }
        if (normaluser?.noDoctorAvailable != null) {
            navigation.navigate("NearestWorker", { role: service?.role })
        }
        //navigate the user

    }, [normaluser])
    //on focus screen
    useEffect(() => {
        //navigate the user
        if (normaluser?.getDoctorInfo != null) {
            navigation.navigate("NearestWorker", { role: service?.role })
        }
    }, [isFocussed])
    //on focus screen

    //created useeffect
    useEffect(() => {
        if (normaluser.updatedLocationSuccessMessage !== null) {
            dispatch(getdoctor(userInfo?.id))
        }

    }, [normaluser.updatedLocationSuccessMessage])
    //created useeffect

    //state
    const [phone, setPhone] = useState(null)
    const [loading, setLoading] = useState(false)




    const dispatch = useDispatch()
    //details and location

    const [address, setAddress] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null)

    const onPress = (data, details = null) => {
        dispatch(updateLocation({
            coordinates: details?.geometry?.location,
            place: data?.description
        }))
        // console.log(`The details is ${JSON.stringify(details.geometry.location)}`)
        setAddress(data?.description)
        setLatitude(details.geometry.location.lat)
        setLongitude(details.geometry.location.lng)
        //alert(longitude)

    }

    //make a request
    const makeRquest = () => {
        const userInformation = {
            id: userInfo?.id,
            userDetails: {
                phone,
                health_worker: service.role,
                longitude,
                latitude,
                address

            }

        }
        //alert(JSON.stringify(userInformation))
        //dispatch update user location
        setLoading(true)
        dispatch(updateUserLocation(userInformation))
        dispatch(getdoctor(userInfo?.id))

    }
    //make a request

    //add validation
    const disableMakeRequest = () => {
        if (EmptyFieldError(phone) || EmptyFieldError(address) || EmptyFieldError(longitude) ||
            EmptyFieldError(latitude) || numberError(parseInt(phone))) {
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
                        placeholder="patient phone number"
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
                {/*places example */}

                {/*places example */}

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
                    placeholder={`patients\` current location`}
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

export default SelectedService

const styles = StyleSheet.create({})
