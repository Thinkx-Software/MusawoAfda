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
import { EmptyError, emailError, passwordError, numberError } from "../../helpers"
import { HelperText, Subheading, TextInput } from 'react-native-paper';
import { constantstyles } from '../../constants/constanstStyles';
import { theme } from '../../theme';
import ButtonComponent from '../../components/Button/Button';
import Loading from '../../components/Indicator/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice/actions';
import { useNavigation } from '@react-navigation/native';
import { clearEmailDetails, clearForgotOtp, clearLoginErrror, clearRegisterError, clearRegisterSucess, clearUpdatePassword } from '../../redux/slices/authSlice/authSlice';


const Login = () => {
    //navigation
    const navigation = useNavigation()
    const { user } = useSelector(({ authSlice }) => authSlice)

    //dispatch
    const dispatch = useDispatch()
    //dispatch

    //useEffect
    useEffect(() => {
        if (user?.isLoggedIn) {
            navigation.navigate("Home")
        }
        if (user?.errorMessageLogin !== null) {
            setLoading(false)
        }

    }, [user])
    //useEffect

    const [password, setPassword] = useState("")


    const moveToRegister = () => {
        dispatch(clearRegisterError())
        dispatch(clearRegisterSucess())
        navigation.navigate("Auth", { screen: "Register" })
    }

    const moveToSendEmail = () => {
        dispatch(clearEmailDetails())
        dispatch(clearForgotOtp())
        dispatch(clearUpdatePassword())
        navigation.navigate("Auth", { screen: "SendEmail" })
        //navigation.navigate("Auth", { screen: "ForgotPasswordOtp" })
        //navigation.navigate("Auth", { screen: "NewPassword" })

    }

    //password text type
    const [passwordType, setPasswordType] = useState(true)

    //handle username error
    const [handleUserNameError, sethandleUserNameError] = useState(false)
    const [handlePasswordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState("")


    //loginUser
    const userLogin = () => {
        if (!username && !password) {
            sethandleUserNameError(true)
            setPasswordError(true)
        }
        else if (!password) {
            setPasswordError(true)
        }
        else if (!username) {
            sethandleUserNameError(true)

        }
        else {
            //loading
            setLoading(true)
            //loading
            //register user
            const userInfo = {
                username,
                password
            }
            dispatch(loginUser(userInfo))

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
                            color: theme.colors.primary
                        }}
                    >
                        Welcome Back
                    </Subheading>
                    {/*loading*/}

                    {
                        loading &&
                        <View
                        >
                            <Loading />
                        </View>

                    }
                    { /*loading */}

                    {/*error message */}
                    <View style={[{ marginHorizontal: 10, marginTop: 2, justifyContent: "center", marginBottom: 10, marginTop: 10 }]}>
                        {
                            user?.errorMessageLogin !== null &&
                            <View style={[constantstyles.flexStyles, { justifyContent: "center" }]}>
                                <HelperText type="error" visible={true}>
                                    {`${user?.errorMessageLogin}`}
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


                                if (user?.errorMessageLogin !== null) {
                                    dispatch(clearLoginErrror())
                                }
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


                    {/*password*/}
                    <View style={[styles.spaceTop]}>
                        <TextInput
                            label="password"
                            onChangeText={(text) => {
                                if (user?.errorMessageLogin !== null) {
                                    dispatch(clearLoginErrror())
                                }
                                setPassword(text)
                            }}
                            secureTextEntry={passwordType}
                            value={password}
                            style={{
                                backgroundColor: theme.colors.text,
                                color: 'red',
                                width: '96%',
                                alignSelf: 'center',
                                borderWidth: 0,
                                height: 55
                            }}
                            right={
                                <TextInput.Icon
                                    name={passwordType ? "eye-off-outline" : "eye"}
                                    style={{ marginRight: 15 }}
                                    color={theme.colors.placeholder}
                                    onPress={() => setPasswordType(!passwordType)}
                                    size={27} />}
                            theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 0 }}
                            mode={'flat'}
                            autoCorrect={false}
                            error={handlePasswordError && EmptyError(password, `password`)}
                            placeholder="enter password"
                            outlineColor={theme.colors.primary}
                            underlineColor={theme.colors.disabled}
                            selectionColor={theme.colors.primary}

                            onSubmitEditing={userLogin}

                        />
                        <HelperText type="error" visible={true}>
                            {handlePasswordError && EmptyError(password, `password`)}
                        </HelperText>

                    </View>


                    {/*password */}

                    {/*forgot password */}
                    <View style={{ marginVertical: 5 }}>
                        <TouchableOpacity onPress={moveToSendEmail} activeOpacity={0.4}>
                            <Text
                                style={{ color: 'black', textAlign: 'center', paddingTop: 5 }}
                            >
                                Forgot {' '}
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 17, color: "black" }}
                                >
                                    Password?
                                </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                    {/*forgot password */}

                    <View
                        style={{ padding: 10, top: 20, width: '100%', alignSelf: 'center', marginTop: -20 }}
                    >

                        <ButtonComponent mode="outlined" text="Login" color={`${theme.colors.primary}`}
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
                        <TouchableOpacity onPress={moveToRegister} activeOpacity={0.4}>
                            <Text
                                style={{ color: 'black', textAlign: 'center', paddingTop: 40 }}
                            >
                                Have no account?{' '}
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}
                                >
                                    SignUp
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default Login;
const styles = StyleSheet.create({
    spaceTop: {
        marginHorizontal: 25
    }
})