import React, { useState, useCallback, useMemo, useRef, Fragment } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, ColorSchemeName, } from 'react-native';
import { StyledView, StyledText } from '../../components/shared/SharedStyles';
import { Calendar, CalendarUtils } from 'react-native-calendars';

interface ICalendarProps {
    colorScheme: ColorSchemeName;
    onSelectedDate: (day: string) => void;
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
const AppointmentCalendar = ({ colorScheme, onSelectedDate }: ICalendarProps) => {
    const [selected, setSelected] = useState<string>(initialDate);
    const [currentMonth, setCurrentMonth] = useState<string>(initialDate);

    const getDate = (count: number) => {
        const date = new Date(initialDate);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
      };
    
    const onDayPress = useCallback((day: { dateString: string}) => {
        setSelected(day.dateString);
        onSelectedDate(day.dateString);
      }, []);

      const marked = useMemo(() => {
        return {
            [getDate(-1)]: {
                dotColor: 'red',
                marked: true,
            },
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#007AFF',
                selectedTextColor: 'white',
            }
        }
      }, [selected])

    return (
              <Fragment>
                <Calendar
                  testID={testIDs.calendars.FIRST}
                  enableSwipeMonths
                  current={initialDate}
                  style={{ marginBottom: 10, backgroundColor: 'transparent'}}
                  theme={{ 
                    ...(colorScheme === 'dark' && { 
                        calendarBackground: 'black',
                        dayTextColor: '#fff',
                        monthTextColor: '#fff',
                        backgroundColor: 'black'
                    })
                }}
                  onDayPress={onDayPress}
                  markedDates={marked}
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