import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { EmptyError, emailError, passwordError } from "../../helpers"
import { HelperText, Subheading, TextInput } from 'react-native-paper';
import ReusableButton from '../../components/Button/authButton';
import { constantstyles } from '../../constants/constanstStyles';
import { theme } from '../../theme';
import ButtonComponent from '../../components/Button/Button';
import Axios from "axios";
import Loading from '../../components/Indicator/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resendCode } from '../../redux/slices/authSlice/actions';
import { useNavigation } from '@react-navigation/native';


const Resend = () => {
    //navigation
   const navigation =  useNavigation()
    const { user } = useSelector(({ authSlice }) => authSlice)

    //dispatch
    const dispatch = useDispatch()
    //dispatch

    //useEffect
    useEffect(() => {
        if(user?.resentCodeMessage !== null){
             navigation.navigate("Otp")
        }
        if(user?.errorResendCode !== null){
            setLoading(false)
        }

    }, [user])
    //useEffect
    const [username, setUserName] = useState('')


    //handle username error
    const [handleUserNameError, sethandleUserNameError] = useState(false)
    const [loading, setLoading] = useState(false)
    //loginUser
    const userLogin = () => {
        if (!username) {
            sethandleUserNameError(true)
        }
        
        else {
            //loading
            setLoading(true)
            //loading
            //register user
            const userInfo = {
                username,
            
            }
            dispatch(resendCode(userInfo))


            // setPassword('')
            // setUserName('')


            //register user
        }


    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: theme.colors.secondary }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{
                        backgroundColor: theme.colors.text,
                        borderTopRightRadius: theme.roundness,
                        borderTopLeftRadius: theme.roundness,
                        paddingTop: '5%',
                    }}
                    keyboardShouldPersistTaps={'always'}
                    contentContainerStyle={{ paddingBottom: 30 }}
                >

                    <Subheading
                        theme={{ colors: { text: 'gray' } }}
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            paddingBottom: 10,
                            color: theme.colors.text
                        }}
                    >
                        Welcome Back
                    </Subheading>
                    {/*loading*/}

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
                            user?.errorResendCode !== null &&
                            <View style={[constantstyles.flexStyles, { justifyContent: "center" }]}>
                                <HelperText type="error" visible={true}>
                                    {`${user?.errorResendCode}`}
                                </HelperText>
                            </View>

                        }


                    </View>
                    {/*error message */}


                    <View style={{ marginTop: 10 }}>

                        <View>
                        </View>


                    </View>
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
                            error={handleUserNameError&&  EmptyError(username, `username`)}
                            placeholder="enter email or phone number"
                            outlineColor={theme.colors.primary}
                            underlineColor={theme.colors.disabled}
                            selectionColor={theme.colors.primary}
                            textContentType="name"
                        />
                        <HelperText type="error" visible={true}>
                            {handleUserNameError&&  EmptyError(username, `username`)}
                        </HelperText>
                    </View>
                    {/*username */}
 


                    <View
                        style={{ padding: 10, top: 20, width: '100%', alignSelf: 'center', marginTop: -20 }}
                    >

                        <ButtonComponent mode="outlined" text="Resend" color={`${theme.colors.primary}`}
                            style={{
                                marginTop: 5,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: theme.colors.disabled,

                            }}
                            contentStyle={{
                                fontSize: 8, height: 28
                            }}
                            onPress={userLogin}
                        />

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default Resend;
const styles = StyleSheet.create({
    spaceTop: {
        marginHorizontal: 20
    }
})