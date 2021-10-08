import React from "react"
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { EvilIcons } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';

// import Icon from 'react-native-vector-icons/FontAwesome5';

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




export const AntDesignIcon = ({ name, size, color }) => <AntDesign name={name} size={size} color={color} />
export const MaterialCommunityIcon = ({ name, size, color }) => <MaterialCommunityIcons name={name} size={size} color={color} />
export const IonIcon = ({ name, size, color }) => <Ionicons name={name} size={size} color={color} />
export const Material = ({ name, size, color }) => <MaterialIcons name={name} color={color} size={size} />
export const Evil = ({ name, size, color }) => <EvilIcons name={name} size={size} color={color} />
export const EntypoIcons = ({ name, size, color }) => <Entypo name={name} size={size} color={color} />