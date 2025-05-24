/**
 * @name - determine backgorund
 * @description - to  select from a series of colors for add ons on barber bookings
 * @params - i: number, arrLength: number
 */

const colors = [
    "#6c0294", // deep purple
    "#986600", // earthy amber
    "#1e1e1e", // dark gray
    "#003366", // navy blue
    "#4B0082", // indigo
    "#8B0000", // dark red
    "#006400", // dark green
    "#2F4F4F", // dark slate gray
    "#8B008B", // dark magenta
    "#191970", // midnight blue
    "#B22222", // firebrick
    "#5F9EA0", // cadet blue
    "#800000", // maroon
    "#0B3D91", // sapphire
    "#3B3B98",
];  

export default function colorWheel(i: number): string {
  return colors[i % colors.length];
}
