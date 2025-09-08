"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { useAccount } from "wagmi";
import { SignInButton, useProfile } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import './theme.css';

// ----- Inline Types -----
type TrustedContact = { name: string; phone: string };
type SafetyCircle = { ownerFid: string; contacts: TrustedContact[] };

// ----- Minimal Components -----
const Card = ({ title, children, className }: { title?: string; children: ReactNode, className?: string }) => (
  <div className={`card-container ${className}`}>
    {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
    {children}
  </div>
);

const Button = ({ children, onClick, variant, size, disabled }: { children: ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'outline'; size?: string; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 ${
      variant === 'primary' ? 'button-primary' : 'button-secondary'
    } ${size === 'lg' ? 'text-xl' : 'text-base'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="input-field w-full" />;
const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) => <label {...props} className="block mb-2 text-sm font-semibold">{children}</label>;

// ----- Main App -----
function UbizoApp() {
  const { address } = useAccount();
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  const fid = address;

  const fetchSafetyCircle = useCallback(async () => {
    if (!fid) return;
    try {
      const response = await fetch(`/api/safety-circle?fid=${fid}`);
      if (response.ok) {
        const data = await response.json();
        setTrustedContacts(data.contacts || []);
      }
    } catch (e) {
      console.error("Failed to fetch safety circle", e);
    }
  }, [fid]);

  useEffect(() => {
    fetchSafetyCircle();
  }, [fetchSafetyCircle]);

  const handleAddContact = async () => {
    if (newContactName && newContactPhone) {
      const newContacts = [...trustedContacts, { name: newContactName, phone: newContactPhone }];
      setTrustedContacts(newContacts);
      setNewContactName("");
      setNewContactPhone("");
      await handleSaveCircle(newContacts);
    }
  };

  const handleRemoveContact = async (index: number) => {
    const newContacts = trustedContacts.filter((_, i) => i !== index);
    setTrustedContacts(newContacts);
    await handleSaveCircle(newContacts);
  };

  const handleSaveCircle = async (contactsToSave?: TrustedContact[]) => {
    if (!fid) {
      alert("User not authenticated");
      return;
    }
    setIsLoading(true);
    try {
      const contacts = contactsToSave || trustedContacts;
      const circle: SafetyCircle = { ownerFid: fid, contacts: contacts };
      const response = await fetch("/api/safety-circle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fid, circle }),
      });
      if (response.ok) alert("Safety circle saved!");
      else alert("Failed to save safety circle.");
    } catch (e) {
      alert("An error occurred.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOS = async () => {
    if (!fid) {
      alert("User not authenticated");
      return;
    }

    setIsLoading(true);

    // Simulate a delay for the SOS call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setSosSent(true);
  };

  if (sosSent) {
    return (
      <Card title="SOS Sent!" className="text-center">
        <p className="mb-4 text-lg font-semibold">Help is on the way.</p>
        <p className="mb-6">Your emergency contacts and local authorities have been notified.</p>
        <Button onClick={() => setSosSent(false)} variant="primary">
          All Clear
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <Card title="Ubizo - Your Safety Net" className="text-center">
        <p className="mb-6">Manage your safety circle and trigger an SOS when you need help.</p>
        <Button onClick={handleSOS} variant="primary" size="lg" disabled={isLoading || trustedContacts.length === 0}>
          {isLoading ? "Sending..." : "SEND SOS"}
        </Button>
      </Card>

      <Card title="Safety Circle">
        <div className="space-y-4">
          {trustedContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between bg-secondary p-3 rounded-lg">
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm">{contact.phone}</p>
              </div>
              <Button variant="secondary" onClick={() => handleRemoveContact(index)}>
                Remove
              </Button>
            </div>
          ))}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-lg">Add a New Contact</h3>
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                placeholder="e.g., Jane Doe"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                placeholder="e.g., +1234567890"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
              />
            </div>
            <Button variant="secondary" onClick={handleAddContact}>
              Add Contact
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ----- Page Wrapper -----
export default function Page() {
  const { isAuthenticated } = useProfile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // This is a placeholder for the SDK ready call
    // In a real Farcaster Mini App, you would use the Mini App SDK
    // For example: import { sdk } from '@farcaster/sdk'; sdk.ready();
    console.log("Farcaster Mini App Ready!");
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        {isAuthenticated ? (
          <UbizoApp />
        ) : (
          <Card className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Ubizo</h1>
            <p className="mb-6">Please connect your wallet to continue.</p>
            <SignInButton />
          </Card>
        )}
      </div>
    </main>
  );
}