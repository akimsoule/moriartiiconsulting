"use client";

import { signupAction } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await signupAction(formData);
    if (res?.error) {
      setError(res.error);
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form action={handleSubmit} className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Créer un compte</h1>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input type="text" name="name" placeholder="Nom" className="input input-bordered w-full" required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input type="password" name="password" placeholder="Mot de passe" className="input input-bordered w-full" required />
          </div>
          {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
          <div className="form-control mt-2">
            <button type="submit" className="btn btn-primary w-full">Créer le compte</button>
          </div>
        </form>
      </div>
    </div>
  );
}
