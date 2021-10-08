import React, { useState, useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet, Pressable
} from 'react-native';
import { HelperText, Subheading, TextInput } from 'react-native-paper';
import { confirmPasswordError, emailError, EmptyError, passwordError, numberError, EmptyFieldError } from '../../helpers';
import { theme } from '../../theme';
import ButtonComponent from '../../components/Button/Button';
import Loading from '../../components/Indicator/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice/actions';
import { constantstyles } from '../../constants/constanstStyles';
import DateField from 'react-native-datefield';
import moment from "moment"
import { useIsFocused } from '@react-navigation/core';
import { clearRegisterError } from '../../redux/slices/authSlice/authSlice';





const Register = ({ navigation }) => {

  const isFocussed = useIsFocused()

  const { user } = useSelector(({ authSlice }) => authSlice)

  //useEffect
  useEffect(() => {
    if (user?.errorMessageRegister != null || user?.registerSuccess != null) {
      setLoading(false)
    }
    if (user?.registerSuccess != null) {
      //alert('here');
      setUserName('')
      setConfirmPassword('')
      setPassword('')
      setDateOfBirth('')
      setName('')
      navigation.navigate('Otp')

    }

  }, [user])
  //useEffect

  useEffect(() => {
    if (user?.registerSuccess != null) {
      navigation.navigate('Otp')
    }

  }, [isFocussed])



  //dispatch
  const dispatch = useDispatch()
  //dispatch


  //input fields
  const [name, setName] = useState('')

  const [password, setPassword] = useState("");
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [dateofBirth, setDateOfBirth] = useState("");
  const [username, setUserName] = useState('');
  const [isEmail, setIsEmail] = useState(true)


  //select date

  //select date

  const [loading, setLoading] = useState(false);


  //phone area
  const moveToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" })
  }

  //password icons
  const [passwordType, setPasswordType] = useState(true)
  const [confirmPasswordType, setConfirmPasswordType] = useState(true)

  //handle username error
  const [handleNameError, sethandleNameError] = useState(false)
  const [handlelastNameError, setHandlelastNameError] = useState(false)



  //handleRegister
  const onRegister = () => {

    const userInfo = {
      fname: name,
      lname: lastName,
      username,
      password,
      dob: dateofBirth,
      c_password: confirmPassword
    }
    setLoading(true)

    dispatch(registerUser(userInfo))

  }

  //disable
  const disableButton = () => {
    if (EmptyFieldError(name) || EmptyFieldError(username) || EmptyFieldError(lastName) || EmptyFieldError(password)
      || EmptyFieldError(confirmPassword)
      || EmptyFieldError(dateofBirth) || isEmail ? emailError(username) : numberError(parseInt(username))
    ) {
      return true
    }


    else {
      return false;
    }

  }
  //disbale

  //checks if email or phone
  const checkPhoneorEmail = (firstChar) => {
    if (firstChar <= '9' && firstChar >= '0') {

      setIsEmail(false)
    }
    else {

      setIsEmail(true)
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
            borderTopRightRadius: theme.roundness,
            borderTopLeftRadius: theme.roundness,
            paddingTop: '10%',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{ paddingBottom: 200 }}
        >

          {loading &&
            <View
              style={[constantstyles.absoluteStyles, {
                top: theme.dimensions.height / 1.5,
                left: theme.dimensions.width / 2.4
              }]}
            >
              <Loading />
            </View>

          }
          { /*loading */}




          <View style={[{ marginHorizontal: 10, marginTop: 2, justifyContent: "center", marginBottom: 10 }]}>
            <Text
              style={{
                alignSelf: "center",
                color: theme.colors.primary,
                fontSize: 28,
                fontWeight: "900"
              }}
            >Create An Account</Text>
          </View>


          {/**first name */}
          <View style={styles.spaceTop}>
            <TextInput
              label="FIRST NAME"
              onChangeText={(text) => {
                if (user?.errorMessageRegister != null) {
                  dispatch(clearRegisterError())
                }
                setName(text)
              }}

              value={name}
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
              error={handleNameError && EmptyError(name, `first name`)}
              placeholder="enter first name"
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}

              textContentType="name"

            />
            <HelperText type="error" visible={true}>
              {handleNameError && EmptyError(name, `name`)}
            </HelperText>
          </View>

          {/*first name */}

          {/*second name */}

          <View style={styles.spaceTop}>
            <TextInput
              label="LAST NAME"
              onChangeText={(text) => {
                if (user?.errorMessageRegister != null) {
                  dispatch(clearRegisterError())
                }

                setlastName(text)
              }}

              value={lastName}
              style={{
                backgroundColor: theme.colors.text,
                color: 'red',
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
              error={handlelastNameError && EmptyError(lastName, `last name`)}
              placeholder="enter last name"
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}
              textContentType="name"
            />
            <HelperText type="error" visible={true}>
              {handlelastNameError && EmptyError(address, `address`)}
            </HelperText>
          </View>
          {/*second name */}

          {/*username */}
          <View style={styles.spaceTop}>
            <TextInput
              label="USER NAME"
              onChangeText={(text) => {

                checkPhoneorEmail(text.charAt(0))
                if (user?.errorMessageRegister != null) {
                  dispatch(clearRegisterError())
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
              error={isEmail ? emailError(username) : numberError(parseInt(username))}
              placeholder="enter email or phone number"
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}
              textContentType="name"
              keyboardType={isEmail ? 'default' : "numeric"}
            />
            <HelperText type="error" visible={true}>
              {isEmail ? emailError(username) : numberError(parseInt(username))}
            </HelperText>
          </View>
          {/*username */}


          {/*date of birth */}


          <View style={[styles.spaceTop]}>
            <Text style={{ color: theme.colors.placeholder, marginLeft: 30, fontWeight: "500", fontSize: 18 }}>BIRTH DAY</Text>
            <DateField
              styleInput={styles.inputBorder}
              labelDate="DD"
              labelMonth="MM"
              labelYear="YYYY"
              onSubmit={(value) => setDateOfBirth(moment(value).format("DD/MM/YYYY"))}
              placeholderTextColor={theme.colors.placeholder}
              maximumDate={new Date()}
            />

          </View>


          {/*date of birth */}




          {/*password */}
          <View style={[styles.spaceTop]}>
            <TextInput
              label="PASSWORD"
              onChangeText={(text) => {
                if (user?.errorMessageRegister != null) {
                  dispatch(clearRegisterError())
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
                borderBottomWidth: 0,
                height: 55,
                borderColor: theme.colors.disabled
              }}
              right={

                <TextInput.Icon
                  name={passwordType ? "eye-off-outline" : "eye"}
                  style={{ marginRight: 15, padding: 5 }}
                  color={theme.colors.placeholder}
                  size={27}
                  onPress={() => setPasswordType(!passwordType)}
                />
              }

              theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 2 }}
              mode={'flat'}
              autoCorrect={false}
              error={passwordError(password)}
              placeholder="enter password"
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}

            />
            <HelperText type="error" visible={true}>
              {passwordError(password)}
            </HelperText>
          </View>
          {/*password */}
          {/*confirm password */}
          <View style={[styles.spaceTop]}>
            <TextInput
              label="CONFIRM PASSWORD"
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={confirmPasswordType}
              value={confirmPassword}
              style={{
                backgroundColor: theme.colors.text,
                color: 'red',
                width: '96%',
                alignSelf: 'center',
                borderBottomWidth: 0,
                height: 55,
                borderColor: theme.colors.disabled
              }}
              right={
                <TextInput.Icon
                  name={confirmPasswordType ? "eye-off-outline" : "eye"}
                  style={{ marginRight: 15 }}
                  color={theme.colors.placeholder}
                  onPress={() => setConfirmPasswordType(!confirmPasswordType)}
                  size={27} />}

              theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 2 }}
              mode={'flat'}
              autoCorrect={false}
              error={confirmPasswordError(password, confirmPassword)}
              placeholder="confirm password"
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}

            />
            <HelperText type="error" visible={true}>
              {confirmPasswordError(password, confirmPassword)}
            </HelperText>
          </View>
          {/*confirm password */}

          <View
            style={{ padding: 5, width: '100%', alignSelf: 'center' }}
          >
            {/*button */}

            <ButtonComponent mode="outlined" text="CONTINUE" color={`${theme.colors.primary}`}
              style={{
                marginTop: 5,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
                marginHorizontal: 10

              }}
              contentStyle={{
                fontSize: 8, height: 25
              }}
              disabled={disableButton()}
              onPress={onRegister}
            />
            {/*button */}

            {/*error message */}
            <View style={[{ marginHorizontal: 10, marginTop: 2, justifyContent: "center", marginBottom: 10, marginTop: 10 }]}>
              {
                user?.errorMessageRegister !== null &&

                <View style={[constantstyles.flexStyles, {
                  justifyContent: "center", backgroundColor: "red", borderRadius: 10, padding: 5,
                }]}>
                  <Text style={{ color: theme.colors.text }}>
                    {`${user?.errorMessageRegister}`}</Text>
                </View>




              }

              {/*sucess message */}
              {
                user?.registerSuccess != null &&
                <View style={[constantstyles.resideViews,
                {
                  backgroundColor: "green", borderRadius: 20, padding: 5
                }
                ]}>
                  <Text style={{ color: theme.colors.text }}>
                    {`A code has been sent to your username`}</Text>
                </View>
              }

              {/*success message */}


            </View>
            {/*error message */}
            <TouchableOpacity onPress={moveToLogin} activeOpacity={0.4}>
              <Text
                style={{ color: 'black', textAlign: 'center', paddingTop: 40 }}
              >
                Already have and Account?{' '}
                <Text
                  style={{ fontWeight: 'bold', fontSize: 17, color: 'black' }}
                >
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  spaceTop: {
    marginHorizontal: 30
  },
  top: {
    marginBottom: 10
  },
  inputBorder: {
    width: '30%',
    borderColor: '#cacaca',
    borderBottomWidth: 1,
    marginBottom: 20,
    height: 55,
    color: theme.colors.black
  }
})