
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { toast } from "sonner";

interface Appointment {
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface FullCalendarViewProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | undefined;
  appointments?: Appointment[];
}

const FullCalendarView = ({ 
  onDateSelect, 
  selectedDate,
  appointments = []
}: FullCalendarViewProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert appointments to calendar events
  useEffect(() => {
    // Create events array from appointments
    const appointmentEvents = appointments.map(appointment => ({
      title: "Réservé",
      start: appointment.date,
      end: new Date(new Date(appointment.date).setHours(
        new Date(appointment.date).getHours() + 1
      )),
      backgroundColor: "#10b981", // green color for booked appointments
      borderColor: "#10b981",
      extendedProps: {
        name: appointment.name,
        email: appointment.email,
        phone: appointment.phone,
        notes: appointment.notes
      }
    }));
    
    // Simulate API loading for demo purposes
    setIsLoading(true);
    setTimeout(() => {
      setEvents(appointmentEvents);
      setIsLoading(false);
    }, 600);
  }, [appointments]);

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

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    const extendedProps = event.extendedProps;

    if (extendedProps && extendedProps.name) {
      toast.info(`Réservation: ${extendedProps.name}`, {
        description: `${format(event.start, "EEEE d MMMM à HH:mm", { locale: fr })}`
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="full-calendar-container animate-fade-in bg-white/30 backdrop-blur-sm rounded-lg p-4 flex justify-center items-center h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

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
        eventClick={handleEventClick}
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
