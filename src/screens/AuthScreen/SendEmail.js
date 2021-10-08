import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme';
import { HelperText, Subheading, TextInput } from 'react-native-paper';
import ButtonComponent from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Indicator/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyError } from '../../helpers';
import { sendEmail } from '../../redux/slices/authSlice/actions';
import { clearEmailDetails } from '../../redux/slices/authSlice/authSlice';


const SendForgotPasswordEmail = () => {
    //navigation
    const navigation = useNavigation()
    const { user } = useSelector(({ authSlice }) => authSlice)
    const [handleUserNameError, setHandleUserNameError] = useState(false)
    const [username, setUserName] = useState("")

    //dispatch
    const dispatch = useDispatch()
    //dispatch

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.emailSuccess) {
            setLoading(false)
            navigation.navigate("Auth", { screen: "ForgotPasswordOtp" })
        }
        if (user?.emailFailure) {
            setLoading(false)
        }

    }, [user])

    //handleotp
    const onSendEmail = () => {
        if (!username) {
            setHandleUserNameError(true)
        }
        else {
            setLoading(true)

            dispatch(sendEmail(username))
        }
    }
    //handleopt


    const moveToLogin = () => {
        navigation.navigate("Auth", { screen: "Login" })
    }
    return (
        <KeyboardAvoidingView
            style={[constantstyles.container]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Subheading
                theme={{ colors: { text: 'gray' } }}
                style={[
                    {
                        textAlign: 'center',
                        fontSize: 20,
                        paddingBottom: 10,
                        color: "green",
                        marginVertical: 10,
                        marginRight: 10

                    },
                    constantstyles.resideViews

                ]}
            >
                Please enter your username
            </Subheading>

            {/*otp */}


            {loading &&
                <View
                >
                    <Loading />
                </View>

            }
            { /*loading */}

            {/*error message */}
            <View style={[{ marginHorizontal: 10, marginTop: 2, justifyContent: "center", marginBottom: 10, marginTop: 10 }]}>
                {
                    user?.emailFailure !== null &&
                    <View style={[constantstyles.flexStyles, { justifyContent: "center" }]}>
                        <HelperText type="error" visible={true}>
                            {`Invalid username`}
                        </HelperText>
                    </View>

                }


            </View>
            {/*error message */}


            {/*username */}
            <View style={styles.spaceTop}>
                <TextInput
                    label="USER NAME"
                    onChangeText={(text) => {

                        setUserName(text)
                    }}

                    value={username}
                    style={{
                        backgroundColor: theme.colors.text,
                        width: '96%',
                        alignSelf: 'center',
                        borderBottomWidth: 0,
                        height: 55,
                        borderColor: theme.colors.disabled
                    }}
                    left={<TextInput.Icon name="account-outline" color={theme.colors.placeholder} size={27} />}
                    theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 2 }}
                    mode={'flat'}
                    autoCorrect={false}
                    error={handleUserNameError && EmptyError(username, `username`)}
                    placeholder="enter email or phone number"
                    outlineColor={theme.colors.primary}
                    underlineColor={theme.colors.disabled}
                    selectionColor={theme.colors.primary}
                    textContentType="name"
                />
                <HelperText type="error" visible={true}>
                    {handleUserNameError && EmptyError(username, `username`)}
                </HelperText>
            </View>
            {/*username */}



            {/*button */}
            <View style={styles.spaceTop}>
                <ButtonComponent mode="outlined" text="send" color={`${theme.colors.primary}`}
                    style={{
                        marginTop: 5,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.colors.disabled,

                    }}
                    contentStyle={{
                        fontSize: 8, height: 28
                    }}
                    onPress={onSendEmail}
                />
            </View>
            {/*button */}

            <TouchableOpacity onPress={moveToLogin} activeOpacity={0.4}>
                <Text
                    style={{ color: 'black', textAlign: 'center', paddingTop: 40 }}
                >
                    Back To?{' '}
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}
                    >
                        Login
                    </Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default SendForgotPasswordEmail

const styles = StyleSheet.create({
    spaceTop: {
        marginHorizontal: 20
    }
})
