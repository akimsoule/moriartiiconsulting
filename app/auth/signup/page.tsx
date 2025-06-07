"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithCaptchaGateway } from "@/lib/captcha/client";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetchWithCaptchaGateway("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Créer un compte</h1>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              className="input input-bordered w-full"
              required
              disabled={loading}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              disabled={loading}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="input input-bordered w-full"
              required
              disabled={loading}
            />
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control mt-2">
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-md mr-2"></span>
              ) : null}
              {loading ? "Création..." : "Créer le compte"}
            </button>
          </div>
        </form>
        <div className="text-center py-4">
          <span>Déjà un compte ? </span>
          <a href="/auth/login" className="link link-primary">Se connecter</a>
        </div>
      </div>
    </div>
  );
}
