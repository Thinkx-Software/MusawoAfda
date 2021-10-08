import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme';
import { AirbnbRating } from "react-native-elements"
import ButtonComponent from '../../components/Button/Button';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clientCompleteRequest } from '../../redux/slices/userSlice/actions';
import { clearCompleteRequestInfo, clearDoctorInfo, clearLoaction } from '../../redux/slices/userSlice/userSlice';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Indicator/Loading';

const RatingAndReview = () => {
    const { normaluser: { getDoctorInfo, completRequestInfo } } = useSelector(({ userSlice }) => userSlice)
    const dispatch = useDispatch()
    const [review, setReview] = useState('Good')
    const [rating, setRating] = useState(3)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()



    const completeRequest = () => {
        setLoading(true)

        //here
        //setRating(rating.toString())
        //here
        const rateAndReviewInfo = {
            client_review: review,
            rating,
            id: getDoctorInfo.request.id
        }
        //console.log(rating , review)

        dispatch(clientCompleteRequest(rateAndReviewInfo))

    }

    const getReview = (number) => {
        //setRating
        setRating(number)
        //setRating
        switch (number) {
            case 1:
                return 'Bad'
            case 2:
                return 'Fair'
            case 3:
                return "Good"
            case 4:
                return 'Very Good'
            case 5:
                return "Excellent"
            default:
                return "Good"
        }
    }
    //useEffect
    useEffect(() => {
        if (completRequestInfo !== null) {
            dispatch(clearDoctorInfo())
            dispatch(clearLoaction())
            dispatch(clearCompleteRequestInfo())
            setLoading(false)
            setTimeout(() => {
                navigation.navigate('Home')
            }, 3000)
        }
    }, [completRequestInfo])
    //useEffect
    return (
        <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>

            <View>
                <Subheading
                    theme={{ colors: { text: 'gray' } }}
                    style={{
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingBottom: 10,
                        color: theme.colors.primary
                    }}
                >
                    {`${getDoctorInfo?.doctor?.name?getDoctorInfo?.doctor?.name:"Doctor Rated"}`}
                </Subheading>
            </View>

            {/*loading*/}

            {loading &&
                <View
                    style={{ marginVertical: 20 }}

                >
                    <Loading />
                </View>

            }
            { /*loading */}

            {/*rating */}
            <View>
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "Fair", "Good", "Very Good", "Excellent"]}
                    defaultRating={3}
                    size={20}
                    onFinishRating={(number) => setReview(getReview(number))}
                    showRating
                />

            </View>


            {/*rating */}
            {/*sucess message */}
            {
                completRequestInfo !== null &&
                <View style={[constantstyles.centerContent,
                {
                    backgroundColor: "green", borderRadius: 5, padding: 5,
                    marginVertical: 20,
                    marginRight: 20,
                    marginLeft: 10
                }
                ]}>
                    <Text style={{ color: theme.colors.text }}>
                        {`Thanks for the feedback `}</Text>
                </View>
            }

            {/*success message */}

            {/*make request */}
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>

                <ButtonComponent mode="outlined" text="Submit" color={`${theme.colors.primary}`}
                    style={{
                        marginTop: 5,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.colors.primary,

                    }}
                    contentStyle={{
                        fontSize: 8, height: 28
                    }}
                    onPress={completeRequest}

                />
            </View>
            {/*make request */}
        </View>
    )
}

export default RatingAndReview

const styles = StyleSheet.create({})
