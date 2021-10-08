import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../../theme';
import { TextInput } from 'react-native-paper';

export const DatePicker = ({dateOfBirth, setDateOfBirth}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [value , setValue] = useState("")

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log(currentDate)
    setDate(currentDate);
    
    setValue(currentDate)

    setDateOfBirth(currentDate.toLocaleDateString())

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>

                <TextInput
                  label="BIRTH DAY"
                  onPress={showDatepicker}
                  value={dateOfBirth}
                  style={{
                    backgroundColor: theme.colors.text,
                    color: 'red',
                    width: '96%',
                    alignSelf: 'center',
                    borderWidth: 0,
                    height:55
                  }}
                  right={

                    <TextInput.Icon
                      name={'calendar'}
                      style={{ marginRight: 15, padding: 5 }}
                      color={theme.colors.placeholder}
                      size={27}
                      onPress={showDatepicker}
                    />
                  }

                  theme={{ colors: { text: 'black', primary: theme.colors.primary }, borderWith: 0 }}
                  mode={'flat'}
                  autoCorrect={false}
                  placeholder="enter date"
                  outlineColor={theme.colors.primary}
                  underlineColor={theme.colors.disabled}
                  selectionColor={theme.colors.primary}

                />


      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="spinner"
          onChange={onChange}
          neutralButtonLabel="clear"
          dateFormat="day month year"
        />
      )}
    </View>
  );
};
