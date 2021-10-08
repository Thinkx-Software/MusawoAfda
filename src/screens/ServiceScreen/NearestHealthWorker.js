import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { constantstyles } from '../../constants/constanstStyles';
import { theme } from '../../theme';
import { Card, Title, Paragraph } from 'react-native-paper';
import ButtonComponent from '../../components/Button/Button';
import {
    Evil,
    IonIcon,
    MaterialCommunityIcon,
} from '../../components/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import {
    clearDoctorInfo,
    clearLoaction,
} from '../../redux/slices/userSlice/userSlice';
import { cancelDoctor } from '../../redux/slices/userSlice/actions';
// import Call API
import call from 'react-native-phone-call';

const NearestHealthWorker = ({ route }) => {
    const { role } = route?.params;
    const {
        normaluser: { getDoctorInfo, noDoctorAvailable },
    } = useSelector(({ userSlice }) => userSlice);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //cancel request
    const cancelRequest = () => {
        //alert(getDoctorInfo.request.id)
        const ids = {
            requestId: getDoctorInfo.request.id,
            doctor: getDoctorInfo.doctor,
        };
        dispatch(cancelDoctor(ids));
        navigation.navigate('Home');
        dispatch(clearDoctorInfo());
        dispatch(clearLoaction());
    };
    //cancel request

    //rating
    const onConfirm = () => {
        navigation.navigate('Rating', { name: getDoctorInfo?.doctor?.name });
    };
    //rating

    //make phone call
    const onMakeCall = (value) => {
        const args = {
            number: value,
            prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    };
    //make phone call

    return (
        <ScrollView
            style={[
                constantstyles.container,
                { backgroundColor: theme.colors.text },
            ]}
        >
            {noDoctorAvailable !== null ? (
                <View style={[constantstyles.centerContent, { elevation: 5 }]}>
                    <View>
                        <View>
                            <Text>Oops No {role} available</Text>
                        </View>
                        <View>
                            <ButtonComponent
                                mode="outlined"
                                text="Back Home"
                                color={`${theme.colors.primary}`}
                                style={{
                                    marginTop: 5,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: theme.colors.primary,
                                    height: 35,
                                }}
                                contentStyle={{
                                    fontSize: 8,
                                    height: 28,
                                }}
                                onPress={() => {
                                    dispatch(clearDoctorInfo());
                                    dispatch(clearLoaction());
                                    navigation.navigate('Home');
                                }}
                            />
                        </View>
                    </View>
                </View>
            ) : (
                <View>
                    <Pressable styles={[styles.pressableStyles]}>
                        <Card style={styles.cardStyle} elevation={2}>
                            {/*cardcontent */}
                            <Card.Content>
                                <View
                                    style={[
                                        constantstyles.flexStyles,
                                        {
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        },
                                    ]}
                                >
                                    <Title>{`${getDoctorInfo?.doctor?.name}`}</Title>
                                    {/*accept*/}
                                </View>
                                {/*phone */}
                                <Paragraph
                                    style={[
                                        styles.paragraphStyle,
                                        { marginTop: 10 },
                                    ]}
                                >
                                    {/* <AntDesignIcon name="phone" size={20} color={theme.colors.primary} />
                                        <Text style={styles.wordStyles}>
                                            {getDoctorInfo?.doctor?.phone}
                                        </Text> */}
                                    <ButtonComponent
                                        mode="outlined"
                                        text="Call"
                                        color={`${theme.colors.primary}`}
                                        style={{
                                            marginTop: 10,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: theme.colors.primary,
                                            height: 40,
                                            width: 120,
                                        }}
                                        contentStyle={{
                                            flexDirection: 'row-reverse',
                                            width: 120,
                                            marginTop: 4,
                                        }}
                                        onPress={() =>
                                            onMakeCall(
                                                getDoctorInfo?.doctor?.phone
                                            )
                                        }
                                        fullWidth
                                        icon="phone-outgoing"
                                    />
                                </Paragraph>
                                {/*phone */}
                                <Paragraph style={styles.paragraphStyle}>
                                    <MaterialCommunityIcon
                                        name="email-outline"
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={styles.wordStyles}>
                                        {getDoctorInfo?.doctor?.email}
                                    </Text>
                                </Paragraph>

                                {/*addresss */}
                                <Paragraph style={styles.paragraphStyle}>
                                    <Evil
                                        name="location"
                                        size={25}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={styles.wordStyles}>
                                        {getDoctorInfo?.doctor?.address}
                                    </Text>
                                </Paragraph>
                                {/*address */}

                                {/*work needed */}
                                <View
                                    style={[
                                        constantstyles.flexStyles,
                                        {
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        },
                                    ]}
                                >
                                    {/*worker */}
                                    <Paragraph style={styles.paragraphStyle}>
                                        <IonIcon
                                            name="person-outline"
                                            size={22}
                                            color={theme.colors.primary}
                                        />
                                        <Text style={styles.wordStyles}>
                                            {`${getDoctorInfo?.doctor.role} (Available)`}
                                        </Text>
                                    </Paragraph>
                                    {/*worker */}
                                    {getDoctorInfo?.request?.status ==
                                        'pending' && (
                                        <ButtonComponent
                                            mode="flat"
                                            text="Cancel"
                                            color={`${theme.colors.error}`}
                                            style={{
                                                marginTop: 2,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: theme.colors.error,
                                                height: 40,
                                            }}
                                            contentStyle={{
                                                fontSize: 8,
                                                height: 35,
                                            }}
                                            onPress={cancelRequest}
                                        />
                                    )}

                                    {/*accepted */}
                                    {getDoctorInfo?.request?.status ==
                                        'accepted' && (
                                        <ButtonComponent
                                            mode="flat"
                                            text="Confirm"
                                            color={`${theme.colors.primary}`}
                                            style={{
                                                marginTop: 2,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor:
                                                    theme.colors.primary,
                                                height: 40,
                                            }}
                                            contentStyle={{
                                                fontSize: 8,
                                                height: 35,
                                            }}
                                            onPress={onConfirm}
                                        />
                                    )}
                                    {/*accepted */}
                                </View>
                                {/*work neede */}

                                {/*amount */}
                                <Paragraph style={{ marginLeft: 5 }}>
                                    <Text>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                marginLeft: 4,
                                                fontSize: 17,
                                            }}
                                        >
                                            Total Fee{' '}
                                        </Text>
                                        {`shs ${getDoctorInfo?.doctor?.charges} (cash)`}
                                    </Text>
                                </Paragraph>
                                {/*amount */}

                                {/*request  */}
                                <Paragraph style={styles.paragraphStyle}>
                                    <Text style={styles.wordStyles}>
                                        <Text style={{ color: 'green' }}>
                                            Request Status :{' '}
                                            {getDoctorInfo?.request?.status ==
                                            'pending' ? (
                                                <Text>
                                                    {
                                                        getDoctorInfo?.request
                                                            ?.status
                                                    }
                                                </Text>
                                            ) : (
                                                <Text>
                                                    {`${getDoctorInfo?.request?.status} Doctor is on the way please confirm upon reaching`}
                                                </Text>
                                            )}
                                        </Text>
                                    </Text>
                                </Paragraph>
                                {/*request */}
                            </Card.Content>
                            {/*card content */}
                        </Card>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default NearestHealthWorker;

const styles = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 10,
        marginVertical: 4,
        borderRadius: 10,
    },
    pressableStyles: {
        marginVertical: 10,
        padding: 5,
    },
    wordStyles: { fontSize: 14, marginLeft: 20 },
    paragraphStyle: {
        color: theme.colors.placeholder,
        padding: 3,
    },
    buttonStyle: {
        borderColor: StyleSheet.hairlineWidth,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    buttonStyle1: {
        borderLeftWidth: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
});
