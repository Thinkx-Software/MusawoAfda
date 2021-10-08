import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AvatarComponent from '../../components/ReusableComponents/Avatar'
import { constantstyles } from '../../constants/constanstStyles'
import { theme } from '../../theme';
import { List, Switch } from 'react-native-paper';
import { logOut } from '../../redux/slices/authSlice/authSlice'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { clearHealthWorkLocation, setSwitchLoader } from '../../redux/slices/healthWorkerSlice/healthWorkSlice'
import { activateHealthWorker, deactivateHealthWorker, getStatus } from '../../redux/slices/healthWorkerSlice/actions'
import Loading from '../../components/Indicator/Loading'
import { clientCurrentRequest } from '../../redux/slices/userSlice/actions'



const Profile = () => {



    //switch
    const { user: { isHealthWorker, userInfo, isNormalUser } } = useSelector(({ authSlice }) => authSlice)
    const { healthWorker } = useSelector(({ healthWorkerSlice }) => healthWorkerSlice)
    const navigation = useNavigation()
    const isFoccussed = useIsFocused()

    // const { user: { isNormalUser } } = useSelector(({ authSlice }) => authSlice)

    const dispatch = useDispatch()
    //alert(`The worker status is ${JSON.stringify(healthWorker?. activatedHealthWorkerInfo)}`)

    //activate
    const activate = () => {
        //alert('am activate')
        dispatch(setSwitchLoader())
        dispatch(activateHealthWorker(userInfo?.id))
    }
    //activate

    //deactivate
    const deactivate = () => {
        //alert('am deactivate')
        dispatch(setSwitchLoader())
        dispatch(deactivateHealthWorker(userInfo?.id))
    }
    //deactivate

    //status update
    useEffect(() => {
        if (isHealthWorker) {
            dispatch(getStatus(userInfo?.id))

        }
        if (isNormalUser) {
            //client request 
            dispatch(clientCurrentRequest(userInfo?.id))
            //client request
        }

    }, [isFoccussed])
    //status update
    return (
        <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>
            <View>
                {/*card1 */}

                {/*loading */}
                {healthWorker?.switchLoader &&
                    <View style={{ marginTop: 5 }}>
                        <Loading />
                    </View>

                }
                {/*loading */}
                <View >
                    <List.Item
                        title={`${userInfo?.isDoctor ? `${userInfo?.name}` : `${userInfo?.fname} ${userInfo?.lname}`}`}
                        style={{ margin: 10, elevation: 4, backgroundColor: theme.colors.text, padding: 10, borderRadius: 5 }}
                        description={userInfo?.username}
                        titleStyle={{ fontWeight: "bold", fontSize: 20 }}

                        left={props => <AvatarComponent size={50}
                            source={`https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`}
                            {...props}
                            avatarStyle={{ marginTop: 4 }}
                        />}
                        right={props => {
                            return !isNormalUser ?
                                <View {...props}>
                                    <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>{healthWorker.activatedHealthWorkerInfo ? 'Active' : 'Not Active'}</Text>
                                    <Switch value={healthWorker.activatedHealthWorkerInfo} onValueChange={healthWorker.activatedHealthWorkerInfo ? deactivate : activate}
                                        color={theme.colors.primary}
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bolder",

                                        }}
                                        disabled={healthWorker?.switchLoader}

                                    />
                                </View>
                                : null
                        }

                        }

                    />

                </View>
                {/*card1 */}

                {/*another card */}
                <List.Section>
                    <List.Subheader>Profile Actions</List.Subheader>
                    {!isNormalUser &&
                        <List.Item title="Update Location"
                            onPress={
                                () => {
                                    dispatch(clearHealthWorkLocation())
                                    navigation.navigate("UpdateLocation", {
                                        service: {
                                            name: "Update Location"
                                        }
                                    })
                                }

                            }
                            left={() => <List.Icon color={theme.colors.primary}
                                icon="map-marker-outline" />} />
                    }


                    {/* <List.Item title="Edit Profile"

                        left={() => <List.Icon color={theme.colors.primary}
                            icon="account-outline" />} /> */}

                    <List.Item
                        onPress={() => dispatch(logOut())}
                        title="Logout"
                        left={() => <List.Icon color={theme.colors.primary}
                            icon="logout"

                        />


                        }
                    />
                </List.Section>

                {/*another card */}





            </View>


        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
