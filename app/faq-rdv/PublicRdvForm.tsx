"use client";
import { fetchWithCaptchaGateway } from "@/lib/captcha/client";
import { useState } from "react";

interface PublicRdvFormData {
  name: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  message: string;
}

export default function PublicRdvForm() {
  const [form, setForm] = useState<PublicRdvFormData>({
    name: "",
    email: "",
    date: "",
    startTime: "",
    endTime: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Validation côté client : tous les champs sont requis
      if (!form.name || !form.email || !form.date || !form.startTime || !form.endTime || !form.message) {
        setError("Veuillez remplir tous les champs.");
        setLoading(false);
        return;
      }
      // Construction du message à envoyer
      const message = `Demande de rendez-vous :\nNom : ${form.name}\nEmail : ${form.email}\nDate : ${form.date}\nHeure de début : ${form.startTime}\nHeure de fin : ${form.endTime}\nMessage : ${form.message}`;
      // Appel à l'API de contact
      await fetchWithCaptchaGateway("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message,
        }),
      });
      setSuccess("Votre demande a bien été envoyée. Nous vous recontacterons rapidement.");
      setForm({ name: "", email: "", date: "", startTime: "", endTime: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input name="name" className="input input-bordered" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" className="input input-bordered" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date du rendez-vous</span>
          </label>
          <input name="date" type="date" className="input input-bordered" value={form.date} onChange={handleChange} required />
        </div>
        <div className="flex gap-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Heure de début</span>
            </label>
            <input name="startTime" type="time" className="input input-bordered" value={form.startTime} onChange={handleChange} required />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Heure de fin</span>
            </label>
            <input name="endTime" type="time" className="input input-bordered" value={form.endTime} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea name="message" className="textarea textarea-bordered" value={form.message} onChange={handleChange} required />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className={`w-full btn btn-primary${loading ? " loading" : ""}`} disabled={loading}>
          {loading ? "Envoi..." : "Prendre rendez-vous"}
        </button>
      </form>
    </>
  );
}
