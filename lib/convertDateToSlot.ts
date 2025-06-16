import { type IDaySlot } from "@/types";

export const convertDateToSlot = (startTime: Date, endTime: Date, price: number): IDaySlot => {
    return {
      isBooked: false,
      price, 
      startTime: {
        hour: startTime.getHours(),    
        minute: startTime.getMinutes(),
        value: startTime.getHours(),      
      },
      endTime: {
        hour: endTime.getHours(),
        minute: endTime.getMinutes(),
        value: endTime.getHours(),        
      },
    };
  };

  export const formatToAMPM = (hour: number, minute: number): string => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  