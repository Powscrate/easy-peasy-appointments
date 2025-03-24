
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppointmentConfirmationProps {
  appointment: {
    date: Date;
    time: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  onNewAppointment: () => void;
}

export function AppointmentConfirmation({
  appointment,
  onNewAppointment,
}: AppointmentConfirmationProps) {
  return (
    <div className="space-y-8 py-4 animate-scale-in">
      <div className="flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Rendez-vous confirmé !</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Votre rendez-vous a été réservé avec succès. Vous recevrez un email de confirmation dans les prochaines minutes.
        </p>
      </div>

      <div className="glass rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-medium mb-4">Détails du rendez-vous</h3>
        
        <div className="grid gap-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {format(appointment.date, "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Heure</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>
              <p className="font-medium">{appointment.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{appointment.email}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{appointment.phone}</p>
            </div>
          </div>
          
          {appointment.notes && (
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{appointment.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        onClick={onNewAppointment}
        className="w-full h-12"
      >
        Réserver un nouveau rendez-vous
      </Button>
    </div>
  );
}

export default AppointmentConfirmation;
