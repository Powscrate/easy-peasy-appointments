
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onTimeSelected: (time: string) => void;
}

export function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onTimeSelected,
}: TimeSlotPickerProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    setLoading(true);
    
    // Simulating API call to get available time slots
    setTimeout(() => {
      // Generate random available slots between 9 AM and 5 PM
      const baseSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
      ];
      
      // Randomly remove some slots to simulate availability
      const slots = baseSlots.filter(() => Math.random() > 0.3);
      
      setAvailableSlots(slots);
      setLoading(false);
    }, 1000);
  }, [selectedDate]);

  if (!selectedDate) {
    return null;
  }

  return (
    <div className="w-full space-y-4 mt-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">
          {selectedDate && format(selectedDate, "EEEE d MMMM", { locale: fr })}
        </h3>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className="h-12 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ) : availableSlots.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {availableSlots.map((time, index) => (
            <button
              key={time}
              className={cn(
                "appointment-item flex items-center justify-center h-12 rounded-lg text-sm font-medium transition-all duration-300",
                selectedTime === time
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-primary/10"
              )}
              onClick={() => onTimeSelected(time)}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center glass rounded-lg">
          <p className="text-muted-foreground">Aucun créneau disponible pour cette date</p>
        </div>
      )}
    </div>
  );
}

export default TimeSlotPicker;
