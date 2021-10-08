import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { AirbnbRating } from "react-native-elements"
import { constantstyles } from '../../constants/constanstStyles';
import { completeLabRequest } from '../../redux/slices/userSlice/actions';
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from '../../components/Button/Button';
import { theme } from '../../theme';
import { Subheading } from 'react-native-paper';
import Loading from '../../components/Indicator/Loading';


const RateLabRequest = () => {
    const {
        normaluser: {  requestedService },
    } = useSelector(({ userSlice }) => userSlice);
    const dispatch = useDispatch()
    const [review, setReview] = useState('Good')
    const [rating, setRating] = useState(3)
    const [loading, setLoading] = useState(false)
    const completeRequest = () => {
        setLoading(true)

        //here
        //setRating(rating.toString())
        //here
        const rateAndReviewInfo = {
            client_review: review,
            rating,
            id: requestedService?.id
        }
        //console.log(rating , review)

        dispatch(completeLabRequest(rateAndReviewInfo))

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
                    {`${requestedService.service_name? requestedService.service_name : "Service Rated"}`}
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

export default RateLabRequest

const styles = StyleSheet.create({})
