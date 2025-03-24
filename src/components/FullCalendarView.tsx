
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { toast } from "sonner";

interface FullCalendarViewProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | undefined;
}

const FullCalendarView = ({ onDateSelect, selectedDate }: FullCalendarViewProps) => {
  const [events, setEvents] = useState<any[]>([]);
  
  // Simulate fetching existing appointments
  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const demoEvents = [
      {
        title: "Rendez-vous",
        start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0),
        end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11, 0),
      },
      {
        title: "Rendez-vous",
        start: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(14, 30),
        end: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(15, 30),
      },
      {
        title: "Rendez-vous",
        start: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(9, 0),
        end: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(10, 0),
      },
    ];
    
    setEvents(demoEvents);
  }, []);

  // Add selected date as an event with a different color
  const displayEvents = selectedDate
    ? [
        ...events,
        {
          title: "Sélectionné",
          start: selectedDate,
          end: new Date(new Date(selectedDate).setHours(selectedDate.getHours() + 1)),
          backgroundColor: "#4387f7",
          borderColor: "#4387f7",
        },
      ]
    : events;

  const handleDateSelect = (selectInfo: any) => {
    const selectedDate = selectInfo.start;
    const currentDate = new Date();
    
    // Check if the selected date is in the past
    if (selectedDate < currentDate) {
      toast.error("Impossible de sélectionner une date dans le passé");
      return;
    }
    
    // Check if the selected date is a Sunday (0 = Sunday in JavaScript)
    if (selectedDate.getDay() === 0) {
      toast.error("Nous sommes fermés le dimanche");
      return;
    }

    // Check if the selected time is outside business hours (9 AM - 5 PM)
    const hour = selectedDate.getHours();
    if (hour < 9 || hour > 17) {
      toast.error("Veuillez sélectionner un horaire entre 9h et 17h");
      return;
    }

    // Check if there's an overlap with existing appointments
    const isOverlapping = events.some(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return selectedDate >= eventStart && selectedDate < eventEnd;
    });

    if (isOverlapping) {
      toast.error("Ce créneau est déjà réservé");
      return;
    }

    toast.success(`Horaire sélectionné: ${format(selectedDate, "EEEE d MMMM à HH:mm", { locale: fr })}`);
    onDateSelect(selectedDate);
  };

  return (
    <div className="full-calendar-container animate-fade-in">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale="fr"
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
        allDaySlot={false}
        slotMinTime="09:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:30:00"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        nowIndicator={true}
        select={handleDateSelect}
        events={displayEvents}
        eventColor="#3b82f6"
        height="auto"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
          startTime: '09:00',
          endTime: '18:00',
        }}
        selectConstraint="businessHours"
      />
    </div>
  );
};

export default FullCalendarView;
