import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from '../../theme';
import {
    IonIcon,
    Material,
    MaterialCommunityIcon,
} from '../../components/Icons/Icons';
import { Badge } from 'react-native-paper';
import Landing from './Landing';
import { useSelector } from 'react-redux';
import ServiceHistory from '../ServiceScreen/ServiceHistory';



//create tabs
const Tab = createMaterialBottomTabNavigator();
const Home = ({ navigation }) => {
    //get user
    const {
        user: { isNormalUser, isHealthWorker },
    } = useSelector(({ authSlice }) => authSlice);
    const { healthWorker } = useSelector(
        ({ healthWorkerSlice }) => healthWorkerSlice
    );

    const userData = useSelector(({ authSlice }) => authSlice);
    const userId = userData?.user?.userInfo?.id;





    //
    //
    return (
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{
                backgroundColor: theme.colors.text,
                height: 48,
                borderWidth: 0,
                elevation: 0,
            }}
            activeColor={`${theme.colors.primary}`}
            inactiveColor={`${theme.colors.placeholder}`}
        >
            {!isHealthWorker && (
                <Tab.Screen
                    name="Home"
                    component={Landing}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcon
                                name="home"
                                color={color}
                                size={25}
                            />
                        ),
                    }}
                />
            )}

            {isHealthWorker && (
                <Tab.Screen
                    name="Notifications"
                    component={Landing}
                    options={{
                        tabBarLabel: 'Notifications',
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                {/*show badge */}
                                <Badge
                                    size={14}
                                    visible={
                                        healthWorker?.latestRequestInfo !== null
                                    }
                                    style={{
                                        position: 'absolute',
                                        top: 1,
                                        right: 1,
                                        color: `${theme.colors.text}`,
                                        backgroundColor: `${theme.colors.primary}`,
                                        fontWeight: '300',
                                        fontSize: 10,
                                        zIndex: 20,
                                    }}
                                >
                                    {healthWorker?.latestRequestInfo !== null
                                        ? healthWorker?.latestRequestInfo.length
                                        : 0}
                                </Badge>
                                {/*show badge */}

                                <IonIcon
                                    name="notifications-outline"
                                    size={26}
                                    color={color}
                                />
                            </View>
                        ),
                    }}
                />
            )}



            {/*user */}
            {
                <Tab.Screen
                    name="History"
                    component={ServiceHistory}
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcon
                                name="menu-outline"
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
            }

            {/*user */}
        </Tab.Navigator>
    );
};

export default Home;


