import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { constantstyles } from '../../constants/constanstStyles';
import { theme } from '../../theme';
import { Card, Title, Paragraph } from 'react-native-paper';
import ButtonComponent from '../Button/Button';
import { Evil, IonIcon, MaterialCommunityIcon } from '../Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    acceptRequest,
    cancelRequest,
    completeRequest,
} from '../../redux/slices/healthWorkerSlice/actions';
import Loading from '../Indicator/Loading';
// import Call API
import call from 'react-native-phone-call';

const HealthWorkerFlatList = ({ request }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { healthWorker } = useSelector(
        ({ healthWorkerSlice }) => healthWorkerSlice
    );

    //cancel request
    const onCancelRequest = (item) => {
        //alert(item)
        dispatch(cancelRequest(item));
    };
    //cancel request
    //accept request
    const onAcceptRequest = (item) => {
        setLoading(true);
        dispatch(acceptRequest(item));
    };
    //accept requesst

    //check request

    useEffect(() => {
        if (healthWorker.acceptRequestInfo !== null) {
            setLoading(false);
        }
        if (healthWorker.completeRequest !== null) {
            setLoading(false);
        }
    }, [healthWorker.acceptRequestInfo, healthWorker.completeRequest]);

    //check request

    //complete request
    const oncompleteRequest = (item) => {
        setLoading(true);
        dispatch(completeRequest(item));
    };
    //complete request

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
        <View>
            {/*loading*/}

            {loading && (
                <View style={{ marginVertical:20, marginHorizontal:10 }}>
                    <Loading />
                </View>
            )}
            {/*loading */}
            <FlatList
                data={request}
                keyExtractor={(item) => String(item.client.id)}
                contentContainerStyle={{
                    marginVertical: 15,
                    marginHorizontal: 2,
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={{
                    marginVertical: 20,
                }}
                ListHeaderComponent={
                    <View
                        style={[
                            constantstyles.elevatedCard,
                            constantstyles.centerContent,
                            { marginHorizontal: 10, marginTop: 10 },
                        ]}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                                fontSize: 17,
                            }}
                        >
                            Current Request
                        </Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <Pressable key={item.id} styles={[styles.pressableStyles]}>
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
                                    <Title>{`${item?.client?.fname} ${item?.client?.lname}`}</Title>
                                    {/*accept*/}

                                    {item?.request?.status == 'pending' ? (
                                        <ButtonComponent
                                            mode="outlined"
                                            text="Accept"
                                            color={`${theme.colors.primary}`}
                                            style={{
                                                marginTop: 5,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor:
                                                    theme.colors.primary,
                                                height: 35,
                                            }}
                                            contentStyle={{
                                                fontSize: 8,
                                                height: 28,
                                            }}
                                            onPress={() =>
                                                onAcceptRequest(item)
                                            }
                                        />
                                    ) : null}

                                    {/*accept */}

                                    {/*finish request */}

                                    {item?.request?.status == 'accepted' && (
                                        <ButtonComponent
                                            mode="outlined"
                                            text="Complete"
                                            color={`${theme.colors.primary}`}
                                            style={{
                                                marginTop: 5,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor:
                                                    theme.colors.primary,
                                                height: 35,
                                            }}
                                            contentStyle={{
                                                fontSize: 8,
                                                height: 28,
                                            }}
                                            onPress={() =>
                                                oncompleteRequest(
                                                    item
                                                )
                                            }
                                        />
                                    )}
                                    {/*finish request */}
                                </View>
                                {/*phone */}
                                <Paragraph style={styles.paragraphStyle}>
                                    {/* <AntDesignIcon name="phone" size={20} color={theme.colors.primary} />
                                    <Text style={styles.wordStyles}>
                                        {item?.client.phone}
                                    </Text> */}
                                    <ButtonComponent
                                        mode="outlined"
                                        text="Call"
                                        color={`${theme.colors.primary}`}
                                        style={{
                                            marginTop: 5,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: theme.colors.primary,
                                            height: 35,
                                            width: 150,
                                        }}
                                        contentStyle={{
                                            flexDirection: 'row-reverse',
                                            width: 150,
                                        }}
                                        onPress={() =>
                                            onMakeCall(item?.client?.phone)
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
                                        {item?.client?.email}
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
                                        {item?.client?.address}
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
                                            {`${item?.client?.health_worker} (needed)`}
                                        </Text>
                                    </Paragraph>
                                    {/*worker */}

                                    {item?.request?.status == 'pending' ? (
                                        <ButtonComponent
                                            mode="flat"
                                            text="Cancel"
                                            color={`${theme.colors.error}`}
                                            style={{
                                                marginTop: 5,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: theme.colors.error,
                                                height: 35,
                                            }}
                                            contentStyle={{
                                                fontSize: 8,
                                                height: 28,
                                            }}
                                            onPress={() =>
                                                onCancelRequest(item)
                                            }
                                        />
                                    ) : null}
                                </View>
                                {/*work neede */}

                                {/*request  */}
                                <Paragraph style={styles.paragraphStyle}>
                                    <Text style={styles.wordStyles}>
                                        Request Status :
                                        <Text style={{ color: 'green' }}>
                                            {item?.request?.status}
                                        </Text>
                                    </Text>
                                </Paragraph>
                                {/*request */}
                            </Card.Content>
                            {/*card content */}
                        </Card>
                    </Pressable>
                )}
            />
        </View>
    );
};

export default HealthWorkerFlatList;

const styles = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 5,
        padding: 10,
        borderColor: theme.colors.primary,
        borderWidth: 0,
    },
    pressableStyles: {
        marginVertical: 10,
    },
    paragraphStyle: {
        paddingVertical: 5,
    },
    wordStyles: { fontSize: 14, marginLeft: 20 },
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
