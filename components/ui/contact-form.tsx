"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", data);
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:outline-none ${
            errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
          placeholder="Votre nom"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:outline-none ${
            errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
          placeholder="Votre email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:outline-none ${
            errors.message ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
          placeholder="Votre message"
          {...register("message")}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="text-xs text-gray-500">
        Ce site est protégé par reCAPTCHA et Google{" "}
        <a href="https://policies.google.com/privacy" className="underline">
          politique de confidentialité
        </a>{" "}
        et{" "}
        <a href="https://policies.google.com/terms" className="underline">
          Conditions d'utilisation
        </a>{" "}
        appliquer.
      </div>

      {errorMessage && (
        <div className="p-3 rounded bg-red-50 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      {isSuccess && (
        <div className="p-3 rounded bg-green-50 text-green-700 text-sm">
          Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full py-2 px-4 rounded-md text-white font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </span>
        ) : (
          "Envoyer"
        )}
      </button>
    </form>
  );
}