import {
  BarChart3,
  Bell,
  CalendarCheck,
  Car,
  CreditCard,
  Download,
  Eye,
  Home,
  MessageSquare,
  MoreHorizontal,
  Plane,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Waves,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Building2,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Réservations totales",
    value: "1,248",
    growth: "+12.5%",
    icon: CalendarCheck,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Revenus totaux",
    value: "2.48M DA",
    growth: "+8.3%",
    icon: Wallet,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Clients actifs",
    value: "842",
    growth: "+15.7%",
    icon: Users,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Partenaires actifs",
    value: "128",
    growth: "+5.2%",
    icon: Building2,
    color: "from-violet-500 to-purple-700",
  },
];

const bookings = [
  {
    id: "#TR1248",
    client: "Ahmed Benali",
    phone: "213555123456",
    service: "Location voiture",
    city: "Alger",
    date: "7 Juin 2026",
    amount: "12,500 DA",
    status: "Confirmée",
    statusColor: "bg-emerald-500/15 text-emerald-400",
  },
  {
    id: "#TR1247",
    client: "Sarah Amari",
    phone: "213661789222",
    service: "Location yacht",
    city: "Oran",
    date: "6 Juin 2026",
    amount: "45,000 DA",
    status: "En attente",
    statusColor: "bg-orange-500/15 text-orange-400",
  },
  {
    id: "#TR1246",
    client: "Yacine Karim",
    phone: "213770456111",
    service: "Voyage organisé",
    city: "Istanbul",
    date: "6 Juin 2026",
    amount: "85,000 DA",
    status: "Confirmée",
    statusColor: "bg-emerald-500/15 text-emerald-400",
  },
  {
    id: "#TR1245",
    client: "Nadia Belkacem",
    phone: "213770111222",
    service: "Jet-ski",
    city: "Béjaïa",
    date: "5 Juin 2026",
    amount: "8,000 DA",
    status: "Annulée",
    statusColor: "bg-red-500/15 text-red-400",
  },
  {
    id: "#TR1244",
    client: "Mohamed L.",
    phone: "213555987654",
    service: "Villa premium",
    city: "Tipaza",
    date: "5 Juin 2026",
    amount: "15,000 DA",
    status: "En attente",
    statusColor: "bg-orange-500/15 text-orange-400",
  },
];

const activities = [
  { icon: CalendarCheck, text: "Nouvelle réservation #TR1248", time: "il y a 5 min", color: "text-emerald-400" },
  { icon: CreditCard, text: "Paiement reçu de Ahmed B.", time: "il y a 15 min", color: "text-orange-400" },
  { icon: Users, text: "Nouveau partenaire inscrit", time: "il y a 30 min", color: "text-blue-400" },
  { icon: XCircle, text: "Réservation annulée #TR1243", time: "il y a 1 h", color: "text-red-400" },
  { icon: MessageSquare, text: "Nouveau commentaire reçu", time: "il y a 2 h", color: "text-slate-300" },
];

const menu = [
  { name: "Tableau de bord", icon: Home, active: true },
  { name: "Réservations", icon: CalendarCheck },
  { name: "Clients", icon: Users },
  { name: "Partenaires", icon: Building2 },
  { name: "Services", icon: Car },
  { name: "Paiements", icon: CreditCard },
  { name: "Commentaires", icon: MessageSquare },
  { name: "Promotions", icon: Star },
  { name: "Rapports", icon: BarChart3 },
  { name: "Paramètres", icon: Settings },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "Confirmée") return <CheckCircle2 size={16} className="text-emerald-400" />;
  if (status === "Annulée") return <XCircle size={16} className="text-red-400" />;
  return <Clock size={16} className="text-orange-400" />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050914] text-white font-sans">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-[#08111f] p-4">
          <div className="flex items-center gap-3 px-3 py-4 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Plane size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-orange-500">Travora</h1>
              <p className="text-xs text-slate-400">Admin Center</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    item.active
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <h3 className="font-bold mb-1">WhatsApp Support</h3>
            <p className="text-sm text-slate-400 mb-4">Contacte notre équipe</p>
            <a
              href="https://wa.me/213555123456"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white"
            >
              <Phone size={17} />
              +213 555 123 456
            </a>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-[#050914]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 lg:px-8 py-4">
              <div className="flex items-center gap-3">
                <button className="lg:hidden rounded-xl bg-white/10 p-3">
                  <Home size={20} />
                </button>
                <div>
                  <h2 className="text-xl font-bold">Dashboard Travora</h2>
                  <p className="text-xs text-slate-400">Plateforme touristique d’Algérie</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 w-80">
                <Search size={18} className="text-slate-400" />
                <input className="bg-transparent outline-none text-sm w-full" placeholder="Rechercher..." />
              </div>

              <div className="flex items-center gap-4">
                <button className="relative rounded-xl bg-white/10 p-3">
                  <Bell size={19} />
                  <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 text-[11px] flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-bold text-sm">Admin Travora</p>
                    <p className="text-xs text-slate-400">Super Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5 lg:p-8 mb-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-7">
                <div>
                  <h2 className="text-3xl font-black">Bienvenue, Admin ! 👋</h2>
                  <p className="text-slate-400 mt-2">Voici un aperçu des activités de Travora aujourd’hui.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm flex items-center gap-2">
                    <CalendarCheck size={17} />
                    1 Juin 2026 - 7 Juin 2026
                  </button>
                  <button className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-3 text-sm font-bold flex items-center justify-center gap-2">
                    <Download size={17} />
                    Exporter le rapport
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.title} className="rounded-2xl border border-white/10 bg-[#0b1322] p-5">
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <Icon size={22} />
                        </div>
                        <p className="text-sm text-slate-300">{stat.title}</p>
                      </div>
                      <h3 className="text-3xl font-black">{stat.value}</h3>
                      <p className="mt-3 text-sm text-slate-400">
                        <span className="text-green-400 font-semibold">{stat.growth}</span> par rapport à la semaine dernière
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-[#0b1322] p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">Évolution des réservations</h3>
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">7 derniers jours</button>
                </div>

                <div className="h-56 flex items-end gap-3 border-b border-white/10 pb-4">
                  {[35, 58, 76, 48, 84, 70, 60, 66, 82, 92].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col justify-end">
                      <div
                        className="rounded-t-xl bg-gradient-to-t from-orange-700/50 to-orange-400"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-slate-500 mt-3">
                  <span>1 Juin</span>
                  <span>2 Juin</span>
                  <span>3 Juin</span>
                  <span>4 Juin</span>
                  <span>5 Juin</span>
                  <span>6 Juin</span>
                  <span>7 Juin</span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0b1322] p-5">
                <h3 className="font-bold text-lg mb-5">Réservations par catégorie</h3>
                <div className="flex items-center justify-center my-5">
                  <div className="h-40 w-40 rounded-full bg-[conic-gradient(#ff6b00_0_45%,#2563eb_45%_70%,#22c55e_70%_90%,#f59e0b_90%_100%)] p-5">
                    <div className="h-full w-full rounded-full bg-[#0b1322] flex flex-col items-center justify-center">
                      <span className="text-2xl font-black">1,248</span>
                      <span className="text-sm text-slate-400">Total</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  {[
                    ["Voitures", "45%", "bg-orange-500"],
                    ["Yachts", "25%", "bg-blue-500"],
                    ["Voyages", "20%", "bg-green-500"],
                    ["Jet-ski", "10%", "bg-yellow-500"],
                  ].map(([name, percent, color]) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${color}`}></span>
                        <span>{name}</span>
                      </div>
                      <span className="text-slate-300">{percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-[#0b1322] p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">Réservations récentes</h3>
                  <button className="text-sm text-orange-400 font-semibold">Voir tout</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="text-left text-slate-400 border-b border-white/10">
                        <th className="py-3">ID</th>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Lieu</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-white/5">
                          <td className="py-4 font-semibold">{booking.id}</td>
                          <td>{booking.client}</td>
                          <td>{booking.service}</td>
                          <td>{booking.date}</td>
                          <td>{booking.city}</td>
                          <td className="font-bold">{booking.amount}</td>
                          <td>
                            <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${booking.statusColor}`}>
                              <StatusIcon status={booking.status} />
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <a href={`https://wa.me/${booking.phone}`} className="rounded-lg bg-green-500/15 p-2 text-green-400">
                                <Phone size={16} />
                              </a>
                              <button className="rounded-lg bg-white/5 p-2 text-slate-300">
                                <Eye size={16} />
                              </button>
                              <button className="rounded-lg bg-white/5 p-2 text-slate-300">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0b1322] p-5">
                <h3 className="font-bold text-lg mb-5">Activités récentes</h3>
                <div className="space-y-5">
                  {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.text} className="flex items-start gap-3">
                        <div className="rounded-xl bg-white/5 p-2">
                          <Icon size={18} className={activity.color} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.text}</p>
                        </div>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
                <ShieldCheck className="text-orange-400" />
                <div>
                  <p className="font-bold">Paiement sécurisé</p>
                  <p className="text-xs text-slate-400">Transactions protégées</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
                <Users className="text-orange-400" />
                <div>
                  <p className="font-bold">Partenaires vérifiés</p>
                  <p className="text-xs text-slate-400">Contrôle qualité</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
                <Waves className="text-orange-400" />
                <div>
                  <p className="font-bold">Services premium</p>
                  <p className="text-xs text-slate-400">Tourisme & loisirs</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
                <TrendingUp className="text-orange-400" />
                <div>
                  <p className="font-bold">Croissance</p>
                  <p className="text-xs text-slate-400">Suivi business</p>
                </div>
              </div>
            </section>

            <footer className="flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500 mt-8 pb-4">
              <span>© 2026 Travora. Tous droits réservés.</span>
              <span>Version 1.0.0</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
