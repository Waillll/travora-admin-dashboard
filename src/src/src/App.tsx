import {
  CalendarCheck,
  Users,
  Building2,
  MapPin,
  CreditCard,
  AlertTriangle,
  Phone,
  Search,
  CheckCircle,
  XCircle
} from "lucide-react";

const bookings = [
  {
    id: "TRV-001",
    client: "Ahmed Benali",
    phone: "+213 555 123 456",
    service: "Jet ski à Bejaia",
    partner: "Blue Sea Club",
    date: "12 juin 2026",
    price: "8 000 DA",
    status: "En attente",
    payment: "Acompte payé"
  },
  {
    id: "TRV-002",
    client: "Sarah Amari",
    phone: "+213 661 789 222",
    service: "Villa avec piscine",
    partner: "Villa Oran Stay",
    date: "18 juin 2026",
    price: "25 000 DA",
    status: "Confirmée",
    payment: "Paiement à l’arrivée"
  },
  {
    id: "TRV-003",
    client: "Yacine Karim",
    phone: "+213 770 456 111",
    service: "Location moto",
    partner: "Moto DZ",
    date: "21 juin 2026",
    price: "5 000 DA",
    status: "Annulée",
    payment: "Non payé"
  }
];

const stats = [
  { title: "Réservations", value: "128", icon: CalendarCheck },
  { title: "Clients", value: "842", icon: Users },
  { title: "Partenaires", value: "46", icon: Building2 },
  { title: "Revenus estimés", value: "1.8M DA", icon: CreditCard }
];

function App() {
  return (
    <div className="min-h-screen bg-[#071426] text-white">
      <div className="flex">
        <aside className="hidden md:flex w-72 min-h-screen bg-[#0B1F3B] border-r border-white/10 p-6 flex-col">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-orange-400">Travora</h1>
            <p className="text-sm text-slate-400">Admin Dashboard</p>
          </div>

          <nav className="space-y-3 text-slate-300">
            {[
              "Overview",
              "Bookings",
              "Customers",
              "Partners",
              "Listings",
              "Payments",
              "Cancellations"
            ].map((item, index) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-2xl transition ${
                  index === 0
                    ? "bg-orange-500 text-white"
                    : "hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-5 md:p-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Dashboard Admin</h2>
              <p className="text-slate-400">
                Gérez les réservations, partenaires et paiements Travora.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 w-full md:w-80">
              <Search size={18} className="text-slate-400" />
              <input
                placeholder="Rechercher..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                      <Icon className="text-orange-400" />
                    </div>
                    <span className="text-xs text-emerald-400">+12%</span>
                  </div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
              );
            })}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">Réservations récentes</h3>
                <button className="text-sm text-orange-400">Voir tout</button>
              </div>

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
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-white/5">
                        <td className="py-4">
                          <div className="font-medium">{booking.client}</div>
                          <div className="text-slate-400 text-xs">{booking.phone}</div>
                        </td>
                        <td className="py-4">
                          <div>{booking.service}</div>
                          <div className="text-slate-400 text-xs">{booking.partner}</div>
                        </td>
                        <td className="py-4">{booking.date}</td>
                        <td className="py-4 font-semibold">{booking.price}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs">
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <a
                            href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/20 text-green-300"
                          >
                            <Phone size={15} />
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-5">
                <h3 className="text-xl font-bold mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 bg-emerald-500/20 text-emerald-300 rounded-2xl p-4">
                    <CheckCircle />
                    Confirmer une réservation
                  </button>
                  <button className="w-full flex items-center gap-3 bg-red-500/20 text-red-300 rounded-2xl p-4">
                    <XCircle />
                    Annuler une réservation
                  </button>
                  <button className="w-full flex items-center gap-3 bg-orange-500/20 text-orange-300 rounded-2xl p-4">
                    <MapPin />
                    Valider une annonce
                  </button>
                </div>
              </div>

              <div className="bg-orange-500 rounded-3xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle />
                  <h3 className="text-xl font-bold">À vérifier</h3>
                </div>
                <p className="text-sm text-orange-50">
                  7 demandes partenaires et 4 réservations attendent une confirmation.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
