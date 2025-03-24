
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, User, Mail, Phone, FileText } from "lucide-react";

interface ContactFormProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
}

export function ContactForm({
  selectedDate,
  selectedTime,
  onSubmit,
}: ContactFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      onSubmit({ name, email, phone, notes });
      setIsSubmitting(false);
    }, 1500);
  };

  if (!selectedDate || !selectedTime) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4 animate-slide-up">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Nom complet <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            className="h-12 glass"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            className="h-12 glass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Téléphone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="06 12 34 56 78"
            className="h-12 glass"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Notes supplémentaires
          </Label>
          <Textarea
            id="notes"
            placeholder="Informations complémentaires pour votre rendez-vous..."
            className="min-h-[120px] glass"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 text-base group"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Traitement en cours..." : (
          <span className="flex items-center">
            Confirmer le rendez-vous
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
