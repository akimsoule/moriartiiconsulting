export default function DashboardHome() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur le Dashboard</h1>
      <p className="mb-6">Gérez facilement votre site depuis cet espace d’administration.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded bg-gray-50 hover:shadow transition">
          <h2 className="font-semibold text-lg mb-2">Articles du blog</h2>
          <p className="text-sm mb-3">Créer, modifier ou supprimer des articles pour alimenter votre blog.</p>
          <a href="/dashboard/blog" className="text-blue-600 hover:underline font-medium">Gérer les articles</a>
        </div>
        <div className="p-4 border rounded bg-gray-50 hover:shadow transition">
          <h2 className="font-semibold text-lg mb-2">Contacts</h2>
          <p className="text-sm mb-3">Consultez les messages reçus via le formulaire de contact.</p>
          <a href="/dashboard/contact" className="text-blue-600 hover:underline font-medium">Voir les contacts</a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-xs">Dernière connexion : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  );
}
