
import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AppointmentDatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function AppointmentDatePicker({ date, setDate }: AppointmentDatePickerProps) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left h-14 font-normal glass group transition-all duration-300",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            {date ? (
              <span className="flex items-center">
                {format(date, "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            ) : (
              <span>Choisissez une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={fr}
            className={cn("p-3 pointer-events-auto bg-card")}
            disabled={(date) => {
              // Disable past dates and Sundays
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              return date < today || date.getDay() === 0;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AppointmentDatePicker;
