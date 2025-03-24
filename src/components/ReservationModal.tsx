
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
}

const ReservationModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
}: ReservationModalProps) => {
  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 glass">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Confirmer votre rendez-vous
          </DialogTitle>
        </DialogHeader>
        
        <div className="glass p-4 rounded-lg mb-4 mt-4">
          <p className="font-medium">
            Date et heure sélectionnées: {format(selectedDate, "EEEE d MMMM à HH:mm", { locale: fr })}
          </p>
        </div>
        
        <ContactForm
          selectedDate={selectedDate}
          selectedTime={format(selectedDate, "HH:mm")}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
