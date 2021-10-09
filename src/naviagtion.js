import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/HomeScreen/Home';
import AppBar from './components/AppBars/AppBar';
import Auth from './screens/AuthScreen/Auth';
import { useSelector } from 'react-redux';
import Profile from './screens/ProfileScreen/Profile';
import DescriptionBar from './components/AppBars/DescriptionBar';
import { theme } from './theme';
import SelectedService from './screens/ServiceScreen/SelectedService';
import NearestHealthWorker from './screens/ServiceScreen/NearestHealthWorker';
import Update from './screens/UpdateScreen/UpdateLocation';
import RatingAndReview from './screens/RatingAndReview/RatingAndReview';
import LaboratoryServices from './screens/ServiceScreen/LaboratoryServices';
import LabRequest from './screens/ServiceScreen/LabRequest';
import MakeLabRequest from './screens/ServiceScreen/MakeLabRequest';
import RateLabRequest from './screens/RatingAndReview/RateLabRequest';


const Stack = createNativeStackNavigator();



const Navigation = () => {
  //get user
  const { user: { isLoggedIn, userInfo } } = useSelector(({ authSlice }) => authSlice)
  //run
  const { normaluser } = useSelector(({ userSlice }) => userSlice)
  return isLoggedIn ? (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName="Home"

      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: (props) => <AppBar {...props}
              title={`Hi ${userInfo?.isDoctor ? `${userInfo?.name}` : `${userInfo?.fname} ${userInfo?.lname}`}`}
              subTitle="How are you doing"
              elevate
            />
          }}
        />


        {/*profile screen */}
        <Stack.Screen name="Profile"
          component={Profile}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props} logout
              title={`Profile`}
              back={true}
              previous
              titleStyle={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50,  }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*profile screen */}

        {/*selected service */}
        <Stack.Screen name="SelectedService"
          component={SelectedService}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`${route?.params?.service?.name}`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50, }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*selected service */}

        {/*nearest worker */}
        <Stack.Screen name="NearestWorker"
          component={NearestHealthWorker}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Nearest HealthWorker`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50,}}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/**nearest worker */}

        {/*update worker */}
        <Stack.Screen name="UpdateLocation"
          component={Update}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Update Location`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50 }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*update worker */}

        {/*rater */}
        <Stack.Screen name="Rating"
          component={RatingAndReview}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Ratings and Review`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50}}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*rater */}

        {/*lab services */}
        <Stack.Screen name="LabServices"
          component={LaboratoryServices}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Laboratory Servives`}
              back={true}
              previous
              titleStyle={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50 }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*lab services */}

        {/*lab request */}
        <Stack.Screen name="LabRequest"
          component={LabRequest}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Laboratory Request`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50  }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*lab request */}

        {/*make labrequest */}
        <Stack.Screen name="MakeLabRequest"
          component={MakeLabRequest}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`${route?.params?.name}`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50  }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*make lab request */}

        {/*rate lab service */}
        <Stack.Screen name="RateLabService"
          component={RateLabRequest}
          options={({ route }) => ({
            header: (props) => <DescriptionBar {...props}
              title={`Ratings and Review`}
              back={true}
              previous
              titleStyle={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginRight: 50 }}
              headerStyles={{ backgroundColor: theme.colors.text, elevation: 0 }}
            />
          })}
        />
        {/*rate lab service */}


      </Stack.Navigator>
    </NavigationContainer>
  ) :
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        headerMode="screen"
      >
        {
          /*auth */
        }
        <Stack.Screen name="Auth"
          component={Auth}
          options={{
            headerShown: false
          }}
        />
        {/*auth */}

      </Stack.Navigator>
    </NavigationContainer>
}

export default Navigation

const styles = StyleSheet.create({})
