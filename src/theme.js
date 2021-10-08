import { DefaultTheme } from 'react-native-paper';
import {Dimensions} from "react-native";
//get dimensions
const {height, width} = Dimensions.get("screen")
export const theme = {
  ...DefaultTheme,
  roundness: 27,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00BFFF',
    secondary:"#ffffff",
    red:"#AF052E",
    accent: '#f7f7f7',
    background: '#0b81f9',
    surface: '#F1F7ED',
    text: 'white',
    error: 'red',
    disabled: '#d3d3d3',
    placeholder: 'grey',
    backdrop: '#005500',
    black:"#000000"
  },
  font: {
    regular: 20,
    medium: 15,
  },
  spacing: {
    padding: 2,
  },
  dimensions:{
    width,
    height
  }
};
