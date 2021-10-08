import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Loading from '../../components/Indicator/Loading';
import { useNavigation } from '@react-navigation/native';
import { updateHealthWorker } from '../../redux/slices/healthWorkerSlice/healthWorkSlice';
import { updateHealthWorkerLocation } from '../../redux/slices/healthWorkerSlice/actions';
import { constantstyles } from '../../constants/constanstStyles';
import { EmptyFieldError } from '../../helpers';
import ButtonComponent from '../../components/Button/Button';
import { autoComplteStyles } from '../../constants/autocompletestyles';


const Update = ({ route }) => {
    const { user: { userInfo } } = useSelector(({ authSlice }) => authSlice)

    const { healthWorker } = useSelector(({ healthWorkerSlice }) => healthWorkerSlice)
    const navigation = useNavigation()

    useEffect(() => {
        if (healthWorker?.updatedLocationSuccessMessage !== null) {
            setLoading(false)
            setTimeout(() => {
                navigation.navigate('Home')
            }, 3000)
        }
        return () => { }
    }, [healthWorker])

    const ref = useRef();
    const [loading, setLoading] = useState(false)

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null)
    const [address, setAddress] = useState(null);


    const dispatch = useDispatch()

    const onPress = (data, details = null) => {
        dispatch(updateHealthWorker({
            coordinates: details?.geometry?.location,
            place: data?.description
        }))
        setAddress(data?.description)
        setLatitude(details.geometry.location.lat)
        setLongitude(details.geometry.location.lng)


    }
    //updatelocation
    const onUpdateLocation = () => {
        const userInformation = {
            id: userInfo?.id,
            userDetails: {
                longitude,
                latitude,
                address

            }
        }

        setLoading(true)
        //console.log(`The infomation is ${JSON.stringify(userInformation)}`)

        dispatch(updateHealthWorkerLocation(userInformation))

    }
    //update location

    //disable
    const disableMakeRequest = () => {
        if (EmptyFieldError(address) || EmptyFieldError(longitude) ||
            EmptyFieldError(latitude)) {
            return true
        }
        else {
            return false
        }
    }
    //disable
    //alert(`The worker status is ${JSON.stringify(healthWorker?. activatedHealthWorkerInfo)}`)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: theme.colors.secondary }}
        >
            <View

                contentContainerStyle={{ paddingBottom: 30 }}
            >

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
                    placeholder='enter current location'
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

            </View>

            {/*update message */}
            {/*sucess message */}
            {
                healthWorker?.updatedLocationSuccessMessage !== null &&
                <View style={[constantstyles.centerContent,
                {
                    backgroundColor: "green", borderRadius: 5, padding: 5,
                    marginVertical: 20,
                    marginRight: 20,
                    marginLeft: 10
                }
                ]}>
                    <Text style={{ color: theme.colors.text }}>
                        {`Location Updated `}</Text>
                </View>
            }

            {/*success message */}
            {/*update message */}

            {/*make request */}
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                <ButtonComponent mode="outlined" text="Update Location" color={`${theme.colors.primary}`}
                    style={{
                        marginTop: 5,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.colors.primary,

                    }}
                    contentStyle={{
                        fontSize: 8, height: 28
                    }}
                    onPress={onUpdateLocation}
                    disabled={disableMakeRequest()}
                />
            </View>
            {/*make request */}


        </KeyboardAvoidingView>
    )
}

export default Update

const styles = StyleSheet.create({})
