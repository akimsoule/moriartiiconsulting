"use client";
import { useEffect } from "react";

export default function RecaptchaScript({ siteKey }: { siteKey: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("recaptcha-v3-script")) return;
    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [siteKey]);
  return null;
}
