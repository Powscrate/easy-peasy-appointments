
import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import FullCalendarView from "@/components/FullCalendarView";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

// Lazy-loaded components for smoother interactions
const ReservationModal = lazy(() => import("@/components/ReservationModal"));
const ConfirmationModal = lazy(() => import("@/components/ConfirmationModal"));

type AppointmentData = {
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved appointments from localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      try {
        const parsed = JSON.parse(savedAppointments);
        // Convert string dates back to Date objects
        const appointmentsWithDateObjects = parsed.map((apt: any) => ({
          ...apt,
          date: new Date(apt.date)
        }));
        setAppointments(appointmentsWithDateObjects);
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    }
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsReservationModalOpen(true);
  };

  const handleFormSubmit = (formData: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedDate) {
        const newAppointment = {
          date: selectedDate,
          time: format(selectedDate, "HH:mm"),
          ...formData,
        };
        
        // Add to appointments list
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        
        // Save to localStorage
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        
        setAppointmentData(newAppointment);
        setIsReservationModalOpen(false);
        setIsConfirmationModalOpen(true);
        toast.success("Rendez-vous confirmé !");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
    setSelectedDate(undefined);
    setAppointmentData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <div className="flex-1 container max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="glass rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Réservez votre rendez-vous</h2>
              </div>
              <p className="text-muted-foreground">
                Sélectionnez une date et un créneau horaire disponible directement sur le calendrier
              </p>
            </div>

            <Separator className="bg-primary/10" />
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Sélectionnez une date et un horaire
                </h3>
                <FullCalendarView 
                  selectedDate={selectedDate} 
                  onDateSelect={handleDateSelect}
                  appointments={appointments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lazy-loaded modals with suspense fallbacks */}
      <Suspense fallback={null}>
        {selectedDate && (
          <ReservationModal
            isOpen={isReservationModalOpen}
            onClose={() => setIsReservationModalOpen(false)}
            selectedDate={selectedDate}
            onSubmit={handleFormSubmit}
          />
        )}
      </Suspense>
      
      <Suspense fallback={null}>
        {appointmentData && (
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={handleCloseConfirmation}
            appointment={appointmentData}
          />
        )}
      </Suspense>
      
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RéserveSimple. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Index;
