import { CalendarCheck, Users, Building2, CreditCard, Phone, Search, CheckCircle, XCircle } from "lucide-react";

const bookings = [
  { client: "Ahmed Benali", phone: "213555123456", service: "Jet ski à Béjaïa", partner: "Blue Sea Club", date: "12 Juin 2026", price: "8 000 DA", status: "En attente" },
  { client: "Sarah Amari", phone: "213661789222", service: "Villa avec piscine", partner: "Villa Oran Stay", date: "18 Juin 2026", price: "25 000 DA", status: "Confirmée" },
  { client: "Yacine Karim", phone: "213770456111", service: "Location moto", partner: "Moto DZ", date: "21 Juin 2026", price: "5 000 DA", status: "Annulée" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#071426] text-white font-sans">
      <div className="flex">
        <aside className="hidden md:flex w-72 min-h-screen bg-[#0B1F3B] border-r border-white/10 p-6 flex-col">
          <h1 className="text-3xl font-bold text-orange-400">Travora</h1>
          <p className="text-slate-400 mb-10">Admin Dashboard</p>

          {["Overview", "Réservations", "Clients", "Partenaires", "Annonces", "Paiements", "Annulations"].map((item, i) => (
            <button key={item} className={`text-left px-4 py-3 rounded-2xl mb-2 ${i === 0 ? "bg-orange-500" : "hover:bg-white/10 text-slate-300"}`}>
              {item}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-5 md:p-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Dashboard Admin</h2>
              <p className="text-slate-400">Gérez les réservations, partenaires et paiements Travora.</p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 w-full md:w-80">
              <Search size={18} className="text-slate-400" />
              <input placeholder="Rechercher..." className="bg-transparent outline-none w-full text-sm" />
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Réservations", value: "128", icon: CalendarCheck },
              { title: "Clients", value: "842", icon: Users },
              { title: "Partenaires", value: "46", icon: Building2 },
              { title: "Revenus estimés", value: "1.8M DA", icon: CreditCard }
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-xl" key={stat.title}>
                  <Icon className="text-orange-400 mb-4" />
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
              );
            })}
          </section>

          <section className="bg-white/10 border border-white/10 rounded-3xl p-5">
            <h3 className="text-xl font-bold mb-5">Réservations récentes</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3">Client</th>
                    <th className="text-left py-3">Service</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Prix</th>
                    <th className="text-left py-3">Statut</th>
                    <th className="text-left py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr className="border-b border-white/5" key={b.phone}>
                      <td className="py-4">
                        <div className="font-medium">{b.client}</div>
                        <div className="text-slate-400 text-xs">+{b.phone}</div>
                      </td>
                      <td className="py-4">
                        <div>{b.service}</div>
                        <div className="text-slate-400 text-xs">{b.partner}</div>
                      </td>
                      <td>{b.date}</td>
                      <td className="font-semibold">{b.price}</td>
                      <td>
                        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs">
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <a href={`https://wa.me/${b.phone}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/20 text-green-300">
                          <Phone size={15} /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <button className="bg-emerald-500/20 text-emerald-300 rounded-2xl p-4 flex gap-3 items-center">
              <CheckCircle /> Confirmer réservation
            </button>
            <button className="bg-red-500/20 text-red-300 rounded-2xl p-4 flex gap-3 items-center">
              <XCircle /> Annuler réservation
            </button>
            <button className="bg-orange-500 rounded-2xl p-4 font-bold">
              Ajouter partenaire
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
