import React, { useState, useCallback, useMemo, useRef, Fragment } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, ColorSchemeName, } from 'react-native';
import { StyledView, StyledText } from '../../components/shared/SharedStyles';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { IScheduleByDay } from '@/types';
import { weekDays } from '@/lib/helpers';

interface ICalendarProps {
    colorScheme: ColorSchemeName;
    onSelectedDate: (day: string) => void;
    selectedDate: string;
    schedule: IScheduleByDay;
}

const date = new Date();
const initialDate = date.toISOString().split("T")[0];
const testIDs = {
    calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar'
  },
};

function getUpcomingDatesForWeekdays(schedule: Record<string, any[]>): string[] {
  const today = new Date();
  const result: string[] = [];
  
  // Loop through the next 30 days (or however far you want)
  for (let i = 0; i < 30; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i);
    
    const weekday = futureDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const isoDate = futureDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    if (schedule?.[weekday] && schedule[weekday].length > 0) {
      result.push(isoDate);
    }
  }

  return result;
}

const AppointmentCalendar = ({ 
    colorScheme, 
    onSelectedDate, 
    selectedDate,
    schedule,
}: ICalendarProps) => {

  const disabledWeekDays = () => {
    return Object.keys(schedule)
    .filter((days,i) => schedule[days].length === 0)
    .map((day,i) => weekDays[day.toLowerCase()]);
  };
  const disabledDays = disabledWeekDays();

    const getDate = (count: number) => {
        const date = new Date(initialDate);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
      };
      
      const availableDates = useMemo(() => {
        return getUpcomingDatesForWeekdays(schedule);
      }, [schedule]);

    const onDayPress = useCallback((day: { dateString: string}) => {
      if(availableDates.includes(day.dateString)) {
        onSelectedDate(day.dateString);
      }
      }, []);


      const marked = useMemo(() => {
        const marks: Record<string, any> = {};
        
        availableDates.forEach((date) => {
          marks[date] = {
            marked: true,
            dotColor: '#007AFF',
          };
        });
      
        if (selectedDate) {
          marks[selectedDate] = {
            ...(marks[selectedDate] || {}),
            selected: true,
            selectedColor: '#007AFF',
            selectedTextColor: 'white',
            enableSwipeMonths: true,
          };
        }
      
        return marks;
      }, [availableDates, selectedDate]);

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
                  disabledByWeekDays={disabledDays}
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