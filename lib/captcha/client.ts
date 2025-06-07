"use client";

/**
 * Effectue une requête fetch (POST ou GET) avec gestion du captcha (header x-captcha-token).
 * Le token captcha est généré dynamiquement via la fonction getCaptchaToken.
 * @param url URL de l'API à appeler
 * @param options Options fetch (method, body, etc.)
 * @returns La réponse JSON de l'API
 */

export async function fetchWithCaptchaGateway<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const captchaToken = await getCaptchaToken();
  const headers = {
    ...(options.headers || {}),
    "x-captcha-token": captchaToken,
  };
  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) {
    let errorMsg = "Erreur serveur";
    try {
      const err = await res.json();
      errorMsg = err.error || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}

/**
 * Fonction à implémenter côté client pour obtenir le token captcha (Google reCAPTCHA v3).
 * Nécessite que la librairie reCAPTCHA soit chargée côté client (window.grecaptcha).
 * @returns Le token captcha généré par reCAPTCHA v3
 */
declare global {
  interface Window {
    grecaptcha?: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export async function getCaptchaToken(): Promise<string> {
  if (typeof window === "undefined" || !window.grecaptcha) {
    return ""; // Retourne une chaîne vide ou gère silencieusement côté UI
  }
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    return "";
  }
  return await window.grecaptcha.execute(siteKey, { action: "submit" });
}
