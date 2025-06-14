import { IHours, IDaySlot } from "@/types";

/**
 * Check if a new or existing schedule has any time conflicts.
 */
export const scheduleConflictCheck = (barberSchedule: Omit<IHours, "barberId">): { hasConflict: boolean, errors: string[] } => {
  const { schedule } = barberSchedule;
  const errors: string[] = [];

  for (const day in schedule) {
    const slots = schedule[day];

    // Skip if no slots for that day
    if (!slots || slots.length === 0) continue;

    // Sort slots by start time to make overlap detection easier
    const sorted = [...slots].sort((a, b) => {
      const aValue = a.startTime.hour * 60 + a.startTime.minute;
      const bValue = b.startTime.hour * 60 + b.startTime.minute;
      return aValue - bValue;
    });

    for (let i = 0; i < sorted.length; i++) {
      const slot = sorted[i];
      const start = slot.startTime;
      const end = slot.endTime;

      const startMinutes = start.hour * 60 + start.minute;
      const endMinutes = end.hour * 60 + end.minute;

      // 1. Invalid time range
      if (endMinutes <= startMinutes) {
        errors.push(`❌ ${day}: Slot ends before it starts (slot ${i + 1})`);
        continue;
      }

      // 2. Slot is too short (< 60 minutes)
      if (endMinutes - startMinutes < 60) {
        errors.push(`❌ ${day}: Slot is shorter than 1 hour (slot ${i + 1})`);
      }

      // 3. Overlap with next slot
      if (i < sorted.length - 1) {
        const nextSlot = sorted[i + 1];
        const nextStart = nextSlot.startTime.hour * 60 + nextSlot.startTime.minute;

        if (nextStart < endMinutes) {
          errors.push(`❌ ${day}: Slot ${i + 1} overlaps with slot ${i + 2}`);
        }
      }
    }
  }

  return {
    hasConflict: errors.length > 0,
    errors,
  };
};
