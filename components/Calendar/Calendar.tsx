import React, { useState, useCallback, useMemo, useRef, Fragment } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, ColorSchemeName, } from 'react-native';
import { StyledView, StyledText } from '../../components/shared/SharedStyles';
import { Calendar, CalendarUtils } from 'react-native-calendars';

interface ICalendarProps {
    colorScheme: ColorSchemeName;
    onSelectedDate: (day: string) => void;
    selectedDate: string;
}

const date = new Date();
const initialDate = date.toISOString().split("T")[0];
const testIDs = {
    calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar'
  },
}
const AppointmentCalendar = ({ 
    colorScheme, 
    onSelectedDate, 
    selectedDate 
}: ICalendarProps) => {

    const getDate = (count: number) => {
        const date = new Date(initialDate);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
      };
    
    const onDayPress = useCallback((day: { dateString: string}) => {
        onSelectedDate(day.dateString);
      }, []);

      const marked = useMemo(() => {
        return {
            [getDate(0)]: {
                dotColor: 'white',
                marked: true,
            },
            [selectedDate]: {
                selected: true,
                disableTouchEvent: false,
                selectedColor: '#007AFF',
                selectedTextColor: 'white',
                enableSwipeMonths: true,
            }
        }
      }, [selectedDate])

    return (
              <Fragment>
                <Calendar
                  testID={testIDs.calendars.FIRST}
                  enableSwipeMonths
                  current={initialDate}
                  style={{ marginBottom: 10, backgroundColor: 'transparent'}}
                  theme={{ 
                    ...(colorScheme === 'dark' ? { 
                        calendarBackground: 'black',
                        dayTextColor: '#fff',
                        monthTextColor: '#fff',
                        backgroundColor: 'black',
                        textInactiveColor: "#222",
                        textDisabledColor: "#444",
                    }: {
                      calendarBackground: 'transparent'
                    })
                }}
                  onDayPress={onDayPress}
                  markedDates={{
                    ...marked,
                  }}
                  minDate={getDate(0)}
                />
              </Fragment>
    )
}

export default AppointmentCalendar;

const styles = StyleSheet.create({
    calendar: {
      marginBottom: 10
    },
    switchContainer: {
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center'
    },
    switchText: {
      margin: 10,
      fontSize: 16
    },
    text: {
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'lightgrey',
      fontSize: 16
    },
    disabledText: {
      color: 'grey'
    },
    defaultText: {
      color: 'purple'
    },
    customCalendar: {
      height: 250,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
    },
    customDay: {
      textAlign: 'center'
    },
    customHeader: {
      backgroundColor: '#FCC',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: -4,
      padding: 8
    },
    customTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    customTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00BBF2'
    }
  });