import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform , TouchableOpacity} from 'react-native'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme';
import { HelperText, Subheading, TextInput } from 'react-native-paper';
import ButtonComponent from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Indicator/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyError } from '../../helpers';
import { confirmCode } from '../../redux/slices/authSlice/actions';

const Otp = () => {
    //navigation
    const navigation = useNavigation()
    const { user } = useSelector(({ authSlice }) => authSlice)
    const [code, setCode] = useState("")
    const [handleCodeError, setHandleCodeError] = useState(false)

    //dispatch
   const dispatch = useDispatch()
    //dispatch

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(user?.isLoggedIn){
            navigation.navigate("Home")
       }
       if(user?.errorMessageOtp !== null){
           setLoading(false)
           setCode('')
       }

    }, [user])

    //handleotp
    const handleOtp = () => {
        if(!code){
            setHandleCodeError(true)
        }
        else{
            setLoading(true)
            const userInfo = {
                otp:code
            }
            dispatch(confirmCode(userInfo))

            //make a request
            //make a request

        }


    }
    //handleopt
    //resend otp
    const resend = ()=>{
        //navigation.navigate("Resend")
        //alert('here')
        navigation.navigate("Auth", { screen: "Resend" })
    }
    //resend otp
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
                        marginVertical:10,
                        marginRight:10

                    },
                    constantstyles.resideViews

                ]}
            >
             Please check your email or phone number for the otp sent
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
                    user?.errorMessageOtp !== null &&
                    <View style={[constantstyles.flexStyles, { justifyContent: "center" }]}>
                        <HelperText type="error" visible={true}>
                            {`${user?.errorMessageOtp}`}
                        </HelperText>
                    </View>

                }


            </View>
            {/*error message */}
            <View style={styles.spaceTop}>
                <TextInput
                    label="code"
                    onChangeText={(text) => setCode(text)}

                    value={code}
                    style={{
                        backgroundColor: theme.colors.text,
                        color: 'red',
                        width: '96%',
                        alignSelf: 'center',
                        borderWidth: 0,
                        height: 55
                    }}
                    theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 1 }}
                    mode={'flat'}
                    autoCorrect={false}
                    error={handleCodeError && EmptyError(code, `code`)}
                    placeholder="enter code sent"
                    outlineColor={theme.colors.primary}
                    underlineColor={theme.colors.disabled}
                    selectionColor={theme.colors.primary}
                
                    onSubmitEditing={handleOtp}
                    keyboardType="numeric"
                />
                <HelperText type="error" visible={true}>
                    {handleCodeError && EmptyError(code, `code`)}
                </HelperText>
            </View>
            {/*otp */}
                                {/*resend otp */}
                                <View style={{ marginVertical: 5 }}>
                        <TouchableOpacity onPress={resend} activeOpacity={0.4}>
                            <Text
                                style={{ color: 'black', textAlign: 'center', paddingTop: 5 }}
                            >
                                Did not receive {' '}
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 17, color: "black" }}
                                >
                                    Resend?
                                </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                    {/*resend otp */}

            {/*button */}
            <View style={styles.spaceTop}>
                <ButtonComponent mode="outlined" text="confirm email" color={`${theme.colors.primary}`}
                    style={{
                        marginTop: 5,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.colors.disabled,

                    }}
                    contentStyle={{
                        fontSize: 8, height: 28
                    }}
                    onPress={handleOtp}
                />
            </View>
            {/*button */}
        </KeyboardAvoidingView>
    )
}

export default Otp

const styles = StyleSheet.create({
    spaceTop: {
        marginHorizontal: 20
    }
})
