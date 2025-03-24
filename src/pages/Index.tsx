
import React, { useState } from "react";
import Header from "@/components/Header";
import FullCalendarView from "@/components/FullCalendarView";
import ContactForm from "@/components/ContactForm";
import AppointmentConfirmation from "@/components/AppointmentConfirmation";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
  const [step, setStep] = useState<"select-date-time" | "confirmation">("select-date-time");

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (formData: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    if (selectedDate) {
      setAppointmentData({
        date: selectedDate,
        time: format(selectedDate, "HH:mm"),
        ...formData,
      });
      setStep("confirmation");
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewAppointment = () => {
    setSelectedDate(undefined);
    setAppointmentData(null);
    setStep("select-date-time");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <div className="flex-1 container max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="glass rounded-2xl p-6 sm:p-8 shadow-sm">
          {step === "select-date-time" ? (
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
                  <h3 className="text-lg font-medium">1. Choisissez une date et un horaire</h3>
                  <FullCalendarView 
                    selectedDate={selectedDate} 
                    onDateSelect={handleDateSelect} 
                  />
                </div>
                
                {selectedDate && (
                  <div className="animate-fade-in space-y-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      2. Confirmez vos informations
                    </h3>
                    <div className="glass p-4 rounded-lg mb-4">
                      <p className="font-medium">
                        Date et heure sélectionnées: {format(selectedDate, "EEEE d MMMM à HH:mm", { locale: fr })}
                      </p>
                    </div>
                    <ContactForm
                      selectedDate={selectedDate}
                      selectedTime={format(selectedDate, "HH:mm")}
                      onSubmit={handleFormSubmit}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            appointmentData && (
              <AppointmentConfirmation
                appointment={appointmentData}
                onNewAppointment={handleNewAppointment}
              />
            )
          )}
        </div>
      </div>
      
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RéserveSimple. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Index;
