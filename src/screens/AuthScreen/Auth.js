import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./Login";
import { theme } from "../../theme"
import Register from "./Register";
import AuthBar from "../../components/AppBars/AuthBar";
import Otp from "./Otp";
import Resend from "./Resend";
import SendForgotPasswordEmail from "./SendEmail";
import ForgotOtpPassword from "./ForgotPassswordOtp";
import ResetPasword from "./UpdatePassword";
const Stack = createNativeStackNavigator();
const Auth = () => {

  return (

    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Login`}

            titleStyle={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, alignSelf: "center", }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}
      />
      {/*otp */}
      <Stack.Screen name="Otp"
        component={Otp}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Confirm Username`}
            back={true}
            previous
            titleStyle={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, alignSelf: "center", }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}

      />
      {/*otp */}

      {/*resend email */}
      <Stack.Screen name="Resend"
        component={Resend}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Resend Otp`}
            previous
            back={true}
            titleStyle={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}

      />

      {/*resend email */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            previous
            title="Register"
            back={true}
            previous
            titleStyle={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}
      />
      {/*sendemail */}
      <Stack.Screen
        name="SendEmail"
        component={SendForgotPasswordEmail}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Forgot Password`}
            back={true}
            previous
            titleStyle={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}
      />
      {/*send email */}

      {/*password otp */}
      <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotOtpPassword}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Enter OTP`}
            back={true}
            previous
            titleStyle={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}
      />
      {/*password otp */}

      {/*new password */}
      <Stack.Screen
        name="NewPassword"
        component={ResetPasword}
        options={({ route }) => ({
          header: (props) => <AuthBar {...props}
            title={`Reset Password`}
            previous
            back={true}
            titleStyle={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary }}
            headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
          />
        })}
      />
      {/*new password */}


    </Stack.Navigator>

  )
}
export default Auth;