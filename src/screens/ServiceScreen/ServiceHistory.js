import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesignIcon, Evil, IonIcon, MaterialCommunityIcon } from '../../components/Icons/Icons'
import { constantstyles } from '../../constants/constanstStyles'
import { doctorHistory } from '../../redux/slices/healthWorkerSlice/actions'
import { clientHistory, clientLatestRequestStatus } from '../../redux/slices/userSlice/actions'
import { theme } from '../../theme';
import { FAB } from 'react-native-elements';

const ServiceHistory = () => {
    //get user
    const { user: { isNormalUser, isHealthWorker, userInfo } } = useSelector(({ authSlice }) => authSlice)
    const { normaluser } = useSelector(({ userSlice }) => userSlice)
    const { healthWorker } = useSelector(({ healthWorkerSlice }) => healthWorkerSlice)
    const dispatch = useDispatch()
    const isfoccused = useIsFocused()
    const navigation = useNavigation()
    useEffect(() => {
        if (isHealthWorker) {

            dispatch(doctorHistory(userInfo?.id))
        }
        if (isNormalUser) {

            dispatch(clientHistory(userInfo?.id))
        }
    }, [isfoccused])

    //update
    useEffect(() => { }, [normaluser?.historyInfo])
    //update


    const onGoingRequest = () => {
        //check request
        dispatch(clientLatestRequestStatus(userInfo.id))
        navigation.navigate("NearestWorker", { role: normaluser?.healthworkerRole })

        //check request
    }
        //show request
        const labRequest = ()=>{
            navigation.navigate('LabRequest')
        }
        //show request

    return (
        <View style={[constantstyles.container, { backgroundColor: theme.colors.text }]}>

            {
                normaluser?.historyInfo !== null ?
                    <View>
                        {/*ongoing request */}

                        {
                            normaluser?.getDoctorInfo !== null &&
                            <View style={[constantstyles.absoluteStyles, { marginHorizontal: 20, bottom: 10, left: theme.dimensions.width / 5 }]}>
                                <View>
                                    {/*book more */}

                                    <FAB title="OnGoingRequest"
                                        visible={true}
                                        color={theme.colors.primary}
                                        onPress={onGoingRequest}
                                        visible={normaluser?.getDoctorInfo != null}
                                        size="small"

                                    />

                                </View>




                            </View>
                        }

                        <View>
                            <FAB title="LabRequest"
                                visible={normaluser?.requestedService != null}
                                color={theme.colors.primary}
                                onPress={labRequest}



                            />
                        </View>



                        {/*ongoing request */}
                        <FlatList
                            data={normaluser.historyInfo}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponentStyle={{
                                marginVertical: 20
                            }}
                            ListHeaderComponent={
                                <View style={[constantstyles.elevatedCard, constantstyles.centerContent, { marginHorizontal: 10, marginTop: 10 }]}>
                                    <Text style={{ color: theme.colors.primary, fontSize: 17 }}>Recent Requests</Text>
                                </View>
                            }
                            keyExtractor={(item, index) => String(index)}
                            contentContainerStyle={{ marginVertical: 15, marginHorizontal: 2 }}
                            showsVerticalScrollIndicator={false}

                            renderItem={({ item, index }) => {

                                return (

                                    <Pressable key={index} styles={[styles.pressableStyles]}>
                                        <Card style={styles.cardStyle} elevation={2}>


                                            {/*cardcontent */}
                                            <Card.Content>
                                                <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                                    <Title>{`${item?.name}`}</Title>


                                                </View>

                                                <Paragraph style={styles.paragraphStyle}>
                                                    <MaterialCommunityIcon name="email-outline" size={20} color={theme.colors.primary} />
                                                    <Text style={styles.wordStyles}>
                                                        {item?.email}
                                                    </Text>

                                                </Paragraph>


                                                {/*addresss */}
                                                <Paragraph style={styles.paragraphStyle}>
                                                    <Evil name="location" size={25} color={theme.colors.primary} />
                                                    <Text style={styles.wordStyles}>
                                                        {item?.address}
                                                    </Text>

                                                </Paragraph>
                                                {/*address */}

                                                {/*work needed */}
                                                <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                                    {/*worker */}
                                                    <Paragraph style={styles.paragraphStyle}>
                                                        <IonIcon name="person-outline" size={22} color={theme.colors.primary} />
                                                        <Text style={styles.wordStyles}>
                                                            {`${item?.role} `}
                                                        </Text>

                                                    </Paragraph>
                                                    {/*worker */}




                                                </View>
                                                {/*work neede */}

                                                {/*request  */}
                                                <Paragraph style={styles.paragraphStyle}>
                                                    <Text style={styles.wordStyles}>
                                                        Request Status :
                                                        {
                                                            `${item?.requestStatus}`
                                                        }


                                                    </Text>

                                                </Paragraph>
                                                {/*request */}

                                            </Card.Content>
                                            {/*card content */}


                                        </Card>
                                    </Pressable>)
                            }}
                        />
                    </View>
                    : healthWorker.healthWorkHistory !== null ?
                        <View>
                            {/*flatlist */}
                            <FlatList
                                data={healthWorker.healthWorkHistory}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponentStyle={{
                                    marginVertical: 20
                                }}
                                ListHeaderComponent={
                                    <View style={[constantstyles.elevatedCard, constantstyles.centerContent, { marginHorizontal: 10, marginTop: 10 }]}>
                                        <Text style={{ color: theme.colors.primary, fontSize: 17 }}>Recent Requests</Text>
                                    </View>
                                }
                                keyExtractor={(item, index) => String(index)}
                                contentContainerStyle={{ marginVertical: 15, marginHorizontal: 2 }}
                                showsVerticalScrollIndicator={false}

                                renderItem={({ item, index }) => {

                                    return (

                                        <Pressable key={index} styles={[styles.pressableStyles]}>
                                            <Card style={styles.cardStyle} elevation={2}>


                                                {/*cardcontent */}
                                                <Card.Content>
                                                    <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                                        <Title>{`${item?.fname} ${' '}  ${item.lname}`}</Title>


                                                    </View>
                                                    {/*phone */}
                                                    <Paragraph style={styles.paragraphStyle}>
                                                        <AntDesignIcon name="phone" size={20} color={theme.colors.primary} />
                                                        <Text style={styles.wordStyles}>
                                                            {item?.phone}
                                                        </Text>

                                                    </Paragraph>
                                                    {/*phone */}
                                                    <Paragraph style={styles.paragraphStyle}>
                                                        <MaterialCommunityIcon name="email-outline" size={20} color={theme.colors.primary} />
                                                        <Text style={styles.wordStyles}>
                                                            {item?.email}
                                                        </Text>

                                                    </Paragraph>


                                                    {/*addresss */}
                                                    <Paragraph style={styles.paragraphStyle}>
                                                        <Evil name="location" size={25} color={theme.colors.primary} />
                                                        <Text style={styles.wordStyles}>
                                                            {item?.address}
                                                        </Text>

                                                    </Paragraph>
                                                    {/*address */}

                                                    {/*work needed */}
                                                    <View style={[constantstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                                        {/*worker */}
                                                        <Paragraph style={styles.paragraphStyle}>
                                                            <IonIcon name="person-outline" size={22} color={theme.colors.primary} />
                                                            <Text style={styles.wordStyles}>
                                                                {`${item?.health_worker} `}
                                                            </Text>

                                                        </Paragraph>
                                                        {/*worker */}




                                                    </View>
                                                    {/*work neede */}

                                                    {/*request  */}
                                                    <Paragraph style={styles.paragraphStyle}>
                                                        <Text style={styles.wordStyles}>
                                                            Request Status :
                                                            {
                                                                `${item?.requestStatus}`
                                                            }


                                                        </Text>

                                                    </Paragraph>
                                                    {/*request */}

                                                </Card.Content>
                                                {/*card content */}


                                            </Card>
                                        </Pressable>)
                                }}
                            />
                            {/*flatlist */}
                        </View>
                        : null
            }

        </View>
    )
}

export default ServiceHistory

const styles = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 5,
        padding: 10,
        borderColor: theme.colors.primary,
        borderWidth: 0

    },
    pressableStyles: {
        marginVertical: 10
    },
    paragraphStyle: {
        paddingVertical: 5

    },
    wordStyles: { fontSize: 14, marginLeft: 20 },
    buttonStyle: {
        borderColor: StyleSheet.hairlineWidth,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttonStyle1: {

        borderLeftWidth: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20

    }

})
