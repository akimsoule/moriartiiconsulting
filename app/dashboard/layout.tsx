"use client";

import CustomLink from "@/components/other/CustomLink";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react"; // Ajout de useState

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/blog", label: "Articles du blog" },
  { href: "/dashboard/contact", label: "Messages de contact" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutError, setLogoutError] = useState<string | null>(null); // Ajout de l'état

  const handleLogout = useCallback(async () => {
    setLogoutError(null);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Si tu utilises les cookies
      });
      if (res.ok) {
        router.push("/auth/login");
      } else {
        setLogoutError("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur lors du logout:", error); // Ajout du log
      setLogoutError("Erreur réseau lors de la déconnexion.");
    }
  }, [router]);

  return (
    <section className="bg-gradient-to-b from-moriartii-light to-white xl:py-5">
      <div className="container mx-auto drawer lg:drawer-open">
        <input id="drawer-dash" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full flex items-center justify-between px-4 py-2 bg-transparent shadow-sm lg:hidden">
            <label
              htmlFor="drawer-dash"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <CustomLink
              href="/dashboard"
              className="text-xl font-bold text-moriartii-primary"
            >
              <span className="font-bold text-lg">Dashboard</span>
            </CustomLink>
          </div>
          {/* Affichage de l'alerte DaisyUI en cas d'erreur */}
          {logoutError && (
            <div className="alert alert-error mt-2 mb-4">
              <span>{logoutError}</span>
            </div>
          )}
          <div className="container mx-auto px-0 lg:px-4">{children}</div>
        </div>
        <div className="drawer-side h-[100vh] lg:h-[80vh]">
          <label
            htmlFor="drawer-dash"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content w-80 p-4 flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <CustomLink
                  href={link.href}
                  className={`block px-2 py-2 rounded hover:bg-accent transition-colors text-base font-medium ${
                    pathname.startsWith(link.href) ? "font-semibold" : ""
                  }`}
                >
                  {link.label}
                </CustomLink>
              </li>
            ))}
            <li className="mt-auto">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex justify-center btn btn-error py-2 rounded items-center gap-2 hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Se déconnecter</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
