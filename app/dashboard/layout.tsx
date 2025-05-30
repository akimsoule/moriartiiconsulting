"use client";

import CustomLink from "@/components/CustomLink";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const links = [
  { href: "/dashboard/seo", label: "Analyse SEO" },
  { href: "/dashboard/blog", label: "Articles du blog" },
  { href: "/dashboard/contact", label: "Messages de contact" },
  { href: "/dashboard/calendar", label: "Rendez-vous" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  }, [router]);

  return (
    <div className="drawer drawer-end container mx-auto px-4 py-3">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex-1">
        {/* Bouton burger mobile */}
        <div className="md:hidden flex items-start p-2">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost bg-white/80 p-2 cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <Menu size={40} />
          </label>
        </div>
        {/* Sidebar desktop visible en permanence */}
        <div className="hidden md:flex flex-col w-64 bg-base-100 dark:bg-secondary border-r border-base-200 p-6 absolute left-0 top-0">
          <h2 className="text-lg font-bold mb-8">Dashboard</h2>
          <nav>
            <ul className="menu menu-vertical space-y-2">
              {links.map((link) => (
                <li key={link.href} className="flex justify-center">
                  <CustomLink
                    href={link.href}
                    className={`block px-2 py-1 rounded hover:bg-accent transition-colors text-center ${
                      pathname.startsWith(link.href)
                        ? "bg-accent font-semibold"
                        : ""
                    }`}
                  >
                    {link.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 w-full btn btn-error py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Se déconnecter</span>
          </button>
        </div>
        {/* Contenu principal */}
        <main className="md:ml-64 min-h-[80vh] p-2 bg-base-200 dark:bg-background">
          {children}
        </main>
      </div>
      {/* Sidebar mobile (drawer) */}
      <div className="drawer-side z-[100] md:hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay bg-black/30"
        ></label>
        <ul className="menu bg-base-100 text-base-content min-h-full w-full p-4">
          <div className="flex justify-end mb-4">
            <label
              htmlFor="my-drawer-4"
              className="text-moriartii-primary cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </label>
          </div>
          <h2 className="text-lg font-bold mb-8">Dashboard</h2>
          {links.map((link) => (
            <li key={link.href} className="flex justify-center">
              <Link
                href={link.href}
                className={`block px-2 py-1 rounded hover:bg-accent transition-colors text-center ${
                  pathname.startsWith(link.href)
                    ? "bg-accent font-semibold"
                    : ""
                }`}
                onClick={() => {
                  const drawer = document.getElementById(
                    "my-drawer-4"
                  ) as HTMLInputElement | null;
                  if (drawer) drawer.checked = false;
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-8">
            <button
              onClick={async () => {
                await handleLogout();
                const drawer = document.getElementById(
                  "my-drawer-4"
                ) as HTMLInputElement | null;
                if (drawer) drawer.checked = false;
              }}
              className="w-full btn btn-error py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Se déconnecter</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
