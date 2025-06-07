"use client";

import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const deleteIdRef = useRef<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/contact?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("Erreur lors du chargement des messages");
        const data = await res.json();
        setMessages(data.messages || []);
        setTotal(data.total || 0);
      } catch (e: any) {
        setError(e.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [page, pageSize]);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / pageSize);

  const handleDelete = async (id: string) => {
    deleteIdRef.current = id;
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const idToDelete = deleteIdRef.current;
    if (!idToDelete) return;
    try {
      const res = await fetch(`/api/contact?id=${idToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setMessages((msgs) => msgs.filter((m) => m.id !== idToDelete));
      setSelected(null);
    } catch (e: any) {
      setError(e.message || "Erreur inconnue");
    } finally {
      setShowModal(false);
      deleteIdRef.current = null;
    }
  };

  return (
    <div className="max-w mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Messages de contact</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Input
            placeholder="Rechercher par nom, email ou message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <div className="bg-base-100 rounded shadow divide-y divide-base-200">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-gray-400">Aucun message</div>
            ) : (
              filtered.map((msg) => (
                <button
                  key={msg.id}
                  className={`w-full text-left p-4 hover:bg-base-200 transition rounded ${
                    selected?.id === msg.id ? "bg-base-200" : ""
                  }`}
                  onClick={() => setSelected(msg)}
                >
                  <div className="font-semibold">{msg.name}</div>
                  <div className="text-xs text-gray-500">{msg.email}</div>
                  <div className="truncate text-sm mt-1">{msg.message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {format(new Date(msg.createdAt), "PPPp", { locale: fr })}
                  </div>
                </button>
              ))
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Précédent
            </Button>
            <span className="px-2 py-1 text-sm">
              Page {page} / {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
            >
              Suivant
            </Button>
          </div>
        </div>
        <div className="md:w-2/3">
          {selected ? (
            <div className="bg-base-100 rounded shadow p-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-bold">{selected.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {selected.email}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(selected.createdAt), "PPPp", { locale: fr })}
                </span>
              </div>
              <div className="whitespace-pre-line text-gray-800 mb-4">
                {selected.message}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Retour à la liste
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selected.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span>Sélectionnez un message pour voir le détail</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmation DaisyUI */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Confirmer la suppression
              </h3>
              <p>
                Voulez-vous vraiment supprimer ce message ? Cette action est
                irréversible.
              </p>
              <div className="modal-action flex gap-2 mt-6">
                <button className="btn" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button className="btn btn-error" onClick={confirmDelete}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
