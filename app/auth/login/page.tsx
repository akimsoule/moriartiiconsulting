import { loginAction } from "../../../lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  let error = "";

  async function handleSubmit(formData: FormData) {
    'use server';
    const res = await loginAction(formData);
    if (res?.error) {
      error = res.error;
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form action={handleSubmit} className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Connexion</h1>
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
            />
          </div>
          {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
          <div className="form-control mt-2">
            <button type="submit" className="btn btn-primary w-full">Se connecter</button>
          </div>
        </form>
        <div className="text-center py-4">
          <span>Pas de compte ? </span>
          <Link href="/auth/signup" className="link link-primary">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
