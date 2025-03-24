
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock, Check } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    date: Date;
    time: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
  } | null;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  appointment,
}: ConfirmationModalProps) => {
  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 glass">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Rendez-vous confirmé
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <p className="font-medium">
              {format(appointment.date, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <p className="font-medium">{appointment.time}</p>
          </div>
          
          <div className="glass p-4 rounded-lg space-y-2 mt-4">
            <p><span className="font-medium">Nom:</span> {appointment.name}</p>
            <p><span className="font-medium">Email:</span> {appointment.email}</p>
            <p><span className="font-medium">Téléphone:</span> {appointment.phone}</p>
            {appointment.notes && (
              <p><span className="font-medium">Notes:</span> {appointment.notes}</p>
            )}
          </div>
        </div>
        
        <Button onClick={onClose} className="mt-6 w-full">
          Retour au calendrier
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
