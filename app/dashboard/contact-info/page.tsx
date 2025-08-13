"use client";

import { useState, useEffect } from "react";
import type { ContactInfo } from "@/lib/contact";

export default function ContactInfoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await fetch("/api/contact-info");
      if (res.ok) {
        const data = await res.json();
        setContactInfo(data);
      } else {
        // Si aucune donnée existe, initialiser avec les valeurs par défaut
        setContactInfo({
          id: 0,
          phone: "+33 7 59 01 35 65",
          email: "moriartiiconsulting@proton.me",
          facebookUrl: "https://www.facebook.com/share/19qLijeXh1/?mibextid=wwXIfr",
          linkedinUrl: "",
          twitterUrl: "",
          address: ""
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      setContactInfo({
        id: 0,
        phone: "+33 7 59 01 35 65",
        email: "moriartiiconsulting@proton.me",
        facebookUrl: "https://www.facebook.com/share/19qLijeXh1/?mibextid=wwXIfr",
        linkedinUrl: "",
        twitterUrl: "",
        address: ""
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Informations mises à jour avec succès!' });
      } else if (res.status === 401) {
        setMessage({ type: 'error', text: 'Vous devez être connecté pour effectuer cette action.' });
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.error || 'Erreur lors de la mise à jour' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur réseau' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Informations de Contact</h1>
      
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Téléphone *</span>
          </label>
          <input
            type="tel"
            className="input input-bordered"
            value={contactInfo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email *</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            value={contactInfo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL Facebook</span>
          </label>
          <input
            type="url"
            className="input input-bordered"
            value={contactInfo?.facebookUrl || ''}
            onChange={(e) => handleChange('facebookUrl', e.target.value)}
            placeholder="https://www.facebook.com/..."
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL LinkedIn</span>
          </label>
          <input
            type="url"
            className="input input-bordered"
            value={contactInfo?.linkedinUrl || ''}
            onChange={(e) => handleChange('linkedinUrl', e.target.value)}
            placeholder="https://www.linkedin.com/..."
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL Twitter</span>
          </label>
          <input
            type="url"
            className="input input-bordered"
            value={contactInfo?.twitterUrl || ''}
            onChange={(e) => handleChange('twitterUrl', e.target.value)}
            placeholder="https://twitter.com/..."
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Adresse</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={contactInfo?.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            placeholder="Adresse complète..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? <span className="loading loading-spinner loading-sm"></span> : 'Sauvegarder'}
        </button>
      </form>
    </div>
  );
}
