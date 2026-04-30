import {
  BarChart3, Bell, CalendarCheck, Car, CreditCard, Download, Eye,
  Home, MessageSquare, MoreHorizontal, Plane, Search, Settings,
  Star, Users, Wallet, CheckCircle2, XCircle, Clock, Phone, Building2
} from "lucide-react";

const bookings = [
  { id: "#TR1248", client: "Ahmed Benali", phone: "213555123456", service: "Location voiture", city: "Alger", date: "7 Juin 2026", amount: "12,500 DA", status: "Confirmée" },
  { id: "#TR1247", client: "Sarah Amari", phone: "213661789222", service: "Location yacht", city: "Oran", date: "6 Juin 2026", amount: "45,000 DA", status: "En attente" },
  { id: "#TR1246", client: "Yacine Karim", phone: "213770456111", service: "Voyage organisé", city: "Istanbul", date: "6 Juin 2026", amount: "85,000 DA", status: "Confirmée" },
  { id: "#TR1245", client: "Nadia Belkacem", phone: "213770111222", service: "Jet-ski", city: "Béjaïa", date: "5 Juin 2026", amount: "8,000 DA", status: "Annulée" }
];

const stats = [
  { title: "Réservations", value: "1,248", icon: CalendarCheck, color: "#ff6b00" },
  { title: "Revenus", value: "2.48M DA", icon: Wallet, color: "#22c55e" },
  { title: "Clients actifs", value: "842", icon: Users, color: "#3b82f6" },
  { title: "Partenaires", value: "128", icon: Building2, color: "#8b5cf6" }
];

function badgeColor(status: string) {
  if (status === "Confirmée") return { background: "rgba(34,197,94,.15)", color: "#4ade80" };
  if (status === "Annulée") return { background: "rgba(239,68,68,.15)", color: "#f87171" };
  return { background: "rgba(249,115,22,.15)", color: "#fb923c" };
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#050914", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        
        <aside style={{ width: 270, background: "#08111f", borderRight: "1px solid rgba(255,255,255,.1)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: "#ff6b00", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plane size={24} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 30, color: "#ff6b00" }}>Travora</h1>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>Admin Center</p>
            </div>
          </div>

          {[
            ["Tableau de bord", Home],
            ["Réservations", CalendarCheck],
            ["Clients", Users],
            ["Partenaires", Building2],
            ["Services", Car],
            ["Paiements", CreditCard],
            ["Commentaires", MessageSquare],
            ["Promotions", Star],
            ["Rapports", BarChart3],
            ["Paramètres", Settings]
          ].map(([name, Icon]: any, i) => (
            <div key={name} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
              borderRadius: 14, marginBottom: 8,
              background: i === 0 ? "linear-gradient(90deg,#c2410c,#ff6b00)" : "transparent",
              color: i === 0 ? "white" : "#cbd5e1"
            }}>
              <Icon size={18} />
              <span style={{ fontSize: 14 }}>{name}</span>
            </div>
          ))}

          <div style={{ marginTop: 25, padding: 18, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18 }}>
            <h3 style={{ margin: "0 0 5px" }}>WhatsApp Support</h3>
            <p style={{ color: "#94a3b8", fontSize: 13 }}>Contacte notre équipe</p>
            <a href="https://wa.me/213555123456" style={{ color: "white", background: "#22c55e", padding: "12px", borderRadius: 12, display: "flex", gap: 8, justifyContent: "center", textDecoration: "none", fontWeight: "bold" }}>
              <Phone size={16} /> +213 555 123 456
            </a>
          </div>
        </aside>

        <main style={{ flex: 1 }}>
          <header style={{ padding: "16px 30px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(5,9,20,.85)" }}>
            <div>
              <h2 style={{ margin: 0 }}>Dashboard Travora</h2>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Plateforme touristique d’Algérie</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, width: 280 }}>
                <Search size={18} color="#94a3b8" />
                <input placeholder="Rechercher..." style={{ background: "transparent", border: 0, outline: 0, color: "white", width: "100%" }} />
              </div>
              <Bell />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#fb923c,#c2410c)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>A</div>
                <div>
                  <b>Admin Travora</b>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          <div style={{ padding: 30 }}>
            <section style={{ background: "linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03))", border: "1px solid rgba(255,255,255,.1)", borderRadius: 26, padding: 28, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 32 }}>Bienvenue, Admin ! 👋</h2>
                  <p style={{ color: "#94a3b8" }}>Voici un aperçu des activités de Travora aujourd’hui.</p>
                </div>
                <button style={{ background: "#ff6b00", color: "white", border: 0, borderRadius: 12, padding: "13px 18px", fontWeight: "bold", display: "flex", gap: 8, alignItems: "center" }}>
                  <Download size={17} /> Exporter le rapport
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} style={{ background: "#0b1322", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: 20 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <Icon />
                      </div>
                      <p style={{ color: "#94a3b8", margin: 0 }}>{s.title}</p>
                      <h3 style={{ fontSize: 30, margin: "8px 0" }}>{s.value}</h3>
                      <p style={{ color: "#22c55e", fontSize: 13 }}>+12.5% cette semaine</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22, marginBottom: 24 }}>
              <div style={{ background: "#0b1322", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 22 }}>
                <h3>Évolution des réservations</h3>
                <div style={{ height: 230, display: "flex", alignItems: "end", gap: 12, borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 12 }}>
                  {[35, 58, 76, 48, 84, 70, 60, 66, 82, 92].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: "linear-gradient(180deg,#fb923c,#9a3412)", borderRadius: "12px 12px 0 0" }} />
                  ))}
                </div>
              </div>

              <div style={{ background: "#0b1322", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 22 }}>
                <h3>Réservations par catégorie</h3>
                <div style={{ width: 160, height: 160, borderRadius: "50%", margin: "25px auto", background: "conic-gradient(#ff6b00 0 45%, #2563eb 45% 70%, #22c55e 70% 90%, #f59e0b 90% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 105, height: 105, borderRadius: "50%", background: "#0b1322", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <b style={{ fontSize: 26 }}>1,248</b>
                    <span style={{ color: "#94a3b8" }}>Total</span>
                  </div>
                </div>
                {["Voitures 45%", "Yachts 25%", "Voyages 20%", "Jet-ski 10%"].map(x => <p key={x}>{x}</p>)}
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22 }}>
              <div style={{ background: "#0b1322", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 22 }}>
                <h3>Réservations récentes</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                      <th>ID</th><th>Client</th><th>Service</th><th>Lieu</th><th>Montant</th><th>Statut</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <td style={{ padding: "14px 0" }}>{b.id}</td>
                        <td>{b.client}</td>
                        <td>{b.service}</td>
                        <td>{b.city}</td>
                        <td><b>{b.amount}</b></td>
                        <td><span style={{ ...badgeColor(b.status), padding: "6px 10px", borderRadius: 9 }}>{b.status}</span></td>
                        <td>
                          <a href={`https://wa.me/${b.phone}`} style={{ color: "#22c55e" }}><Phone size={16} /></a>
                          <Eye size={16} style={{ marginLeft: 10 }} />
                          <MoreHorizontal size={16} style={{ marginLeft: 10 }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: "#0b1322", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 22 }}>
                <h3>Activités récentes</h3>
                {[
                  "Nouvelle réservation #TR1248",
                  "Paiement reçu de Ahmed B.",
                  "Nouveau partenaire inscrit",
                  "Réservation annulée #TR1243",
                  "Nouveau commentaire reçu"
                ].map((a, i) => (
                  <p key={i} style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: 13 }}>
                    {a}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
