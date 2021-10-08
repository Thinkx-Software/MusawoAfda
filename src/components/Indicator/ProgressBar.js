import { ProgressBar } from 'react-native-paper';
import React from "react";

const ProgressBarComponent = ({progress, color}) => (
  <ProgressBar progress={progress} color={color} />
);
export default ProgressBarComponent