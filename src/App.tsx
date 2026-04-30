import { useState } from "react";
import {
  BarChart3, Bell, CalendarCheck, Car, CreditCard, Download, Eye,
  Home, MessageSquare, MoreHorizontal, Plane, Search, Settings,
  Star, Users, Wallet, Phone, Building2, CheckCircle, XCircle
} from "lucide-react";

const bookingsData = [
  { id: "#TR1248", client: "Ahmed Benali", phone: "213555123456", service: "Location voiture", city: "Alger", amount: "12,500 DA", status: "Confirmée" },
  { id: "#TR1247", client: "Sarah Amari", phone: "213661789222", service: "Location yacht", city: "Oran", amount: "45,000 DA", status: "En attente" },
  { id: "#TR1246", client: "Yacine Karim", phone: "213770456111", service: "Voyage organisé", city: "Istanbul", amount: "85,000 DA", status: "Confirmée" },
  { id: "#TR1245", client: "Nadia Belkacem", phone: "213770111222", service: "Jet-ski", city: "Béjaïa", amount: "8,000 DA", status: "Annulée" }
];

const clients = [
  { name: "Ahmed Benali", phone: "213555123456", bookings: 3, city: "Alger" },
  { name: "Sarah Amari", phone: "213661789222", bookings: 2, city: "Oran" },
  { name: "Yacine Karim", phone: "213770456111", bookings: 1, city: "Alger" }
];

const partners = [
  { name: "Blue Sea Club", type: "Nautique", city: "Béjaïa", status: "Vérifié" },
  { name: "Villa Oran Stay", type: "Hébergement", city: "Oran", status: "En attente" },
  { name: "Moto DZ", type: "Véhicules", city: "Alger", status: "Vérifié" }
];

const menu = [
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
];

const stats = [
  ["Réservations", "1,248", CalendarCheck, "#ff6b00"],
  ["Revenus", "2.48M DA", Wallet, "#22c55e"],
  ["Clients actifs", "842", Users, "#3b82f6"],
  ["Partenaires", "128", Building2, "#8b5cf6"]
];

function statusStyle(status: string) {
  if (status === "Confirmée" || status === "Vérifié") return { background: "rgba(34,197,94,.15)", color: "#4ade80" };
  if (status === "Annulée" || status === "Bloqué") return { background: "rgba(239,68,68,.15)", color: "#f87171" };
  return { background: "rgba(249,115,22,.15)", color: "#fb923c" };
}

export default function App() {
  const [activePage, setActivePage] = useState("Tableau de bord");
  const [bookings, setBookings] = useState(bookingsData);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [query, setQuery] = useState("");

  const filteredBookings = bookings.filter((b) =>
    `${b.client} ${b.service} ${b.city} ${b.status}`.toLowerCase().includes(query.toLowerCase())
  );

  const updateBookingStatus = (id: string, status: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const pageTitle = activePage === "Tableau de bord" ? "Dashboard Travora" : activePage;

  return (
    <div style={{ minHeight: "100vh", background: "#050914", color: "white", fontFamily: "Arial, sans-serif", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        button, a { cursor: pointer; }
        .layout { display: flex; min-height: 100vh; width: 100%; }
        .sidebar { width: 270px; background:#08111f; border-right:1px solid rgba(255,255,255,.1); padding:18px; flex-shrink:0; }
        .main { flex:1; width:100%; min-width:0; }
        .topbar { padding:16px 24px; border-bottom:1px solid rgba(255,255,255,.1); display:flex; justify-content:space-between; align-items:center; background:rgba(5,9,20,.9); gap:15px; }
        .content { padding:24px; }
        .hero { background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03)); border:1px solid rgba(255,255,255,.1); border-radius:26px; padding:26px; margin-bottom:24px; }
        .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; }
        .grid2 { display:grid; grid-template-columns:2fr 1fr; gap:22px; margin-bottom:24px; }
        .card { background:#0b1322; border:1px solid rgba(255,255,255,.1); border-radius:24px; padding:22px; }
        table { width:100%; border-collapse:collapse; font-size:14px; }
        th { color:#94a3b8; text-align:left; padding:10px 0; }
        td { padding:14px 0; border-top:1px solid rgba(255,255,255,.08); }
        .actionBtn { border:0; border-radius:10px; padding:8px 10px; color:white; margin-right:6px; }
        @media (max-width: 900px) {
          .layout { display:block; }
          .sidebar { width:100%; display:block; border-right:0; border-bottom:1px solid rgba(255,255,255,.1); }
          .menu { display:flex; overflow-x:auto; gap:8px; padding-bottom:8px; }
          .menuItem { white-space:nowrap; min-width:max-content; }
          .topbar { flex-direction:column; align-items:flex-start; }
          .searchBox { width:100% !important; }
          .content { padding:14px; }
          .hero { padding:18px; }
          .grid2 { grid-template-columns:1fr; }
          .tableWrap { overflow-x:auto; }
          table { min-width:760px; }
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:25 }}>
            <div style={{ width:42, height:42, borderRadius:14, background:"#ff6b00", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Plane size={24} />
            </div>
            <div>
              <h1 style={{ margin:0, fontSize:30, color:"#ff6b00" }}>Travora</h1>
              <p style={{ margin:0, color:"#94a3b8", fontSize:12 }}>Admin Center</p>
            </div>
          </div>

          <div className="menu">
            {menu.map(([name, Icon]: any) => (
              <button
                className="menuItem"
                key={name}
                onClick={() => setActivePage(name)}
                style={{
                  display:"flex", alignItems:"center", gap:10, padding:"12px 14px", width:"100%",
                  borderRadius:14, marginBottom:8, border:0, textAlign:"left",
                  background: activePage === name ? "linear-gradient(90deg,#c2410c,#ff6b00)" : "transparent",
                  color: activePage === name ? "white" : "#cbd5e1"
                }}
              >
                <Icon size={18} />
                <span style={{ fontSize:14 }}>{name}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop:20, padding:16, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:18 }}>
            <h3 style={{ margin:"0 0 5px" }}>WhatsApp Support</h3>
            <p style={{ color:"#94a3b8", fontSize:13 }}>Contacte notre équipe</p>
            <a href="https://wa.me/213555123456" target="_blank" style={{ color:"white", background:"#22c55e", padding:"12px", borderRadius:12, display:"flex", gap:8, justifyContent:"center", textDecoration:"none", fontWeight:"bold" }}>
              <Phone size={16} /> +213 555 123 456
            </a>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div>
              <h2 style={{ margin:0 }}>{pageTitle}</h2>
              <p style={{ margin:0, color:"#94a3b8", fontSize:13 }}>Plateforme touristique d’Algérie</p>
            </div>

            <div className="searchBox" style={{ border:"1px solid rgba(255,255,255,.1)", borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, width:300 }}>
              <Search size={18} color="#94a3b8" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." style={{ background:"transparent", border:0, outline:0, color:"white", width:"100%" }} />
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={() => alert("3 notifications récentes")} style={{ background:"transparent", border:0, color:"white" }}>
                <Bell />
              </button>
              <div onClick={() => setActivePage("Paramètres")} style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#fb923c,#c2410c)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>A</div>
            </div>
          </header>

          <div className="content">
            {activePage === "Tableau de bord" && (
              <>
                <section className="hero">
                  <div style={{ display:"flex", justifyContent:"space-between", gap:15, flexWrap:"wrap", marginBottom:24 }}>
                    <div>
                      <h2 style={{ margin:0, fontSize:30 }}>Bienvenue, Admin ! 👋</h2>
                      <p style={{ color:"#94a3b8" }}>Voici un aperçu des activités de Travora aujourd’hui.</p>
                    </div>
                    <button onClick={() => alert("Rapport exporté avec succès")} style={{ background:"#ff6b00", color:"white", border:0, borderRadius:12, padding:"13px 18px", fontWeight:"bold", display:"flex", gap:8, alignItems:"center" }}>
                      <Download size={17} /> Exporter le rapport
                    </button>
                  </div>

                  <div className="stats">
                    {stats.map(([title, value, Icon, color]: any) => (
                      <div key={title} className="card" onClick={() => title === "Réservations" && setActivePage("Réservations")}>
                        <div style={{ width:48, height:48, borderRadius:14, background:color, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                          <Icon />
                        </div>
                        <p style={{ color:"#94a3b8", margin:0 }}>{title}</p>
                        <h3 style={{ fontSize:30, margin:"8px 0" }}>{value}</h3>
                        <p style={{ color:"#22c55e", fontSize:13 }}>+12.5% cette semaine</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid2">
                  <div className="card">
                    <h3>Évolution des réservations</h3>
                    <div style={{ height:230, display:"flex", alignItems:"end", gap:12, borderBottom:"1px solid rgba(255,255,255,.1)", paddingBottom:12 }}>
                      {[35, 58, 76, 48, 84, 70, 60, 66, 82, 92].map((h, i) => (
                        <div key={i} style={{ flex:1, height:`${h}%`, background:"linear-gradient(180deg,#fb923c,#9a3412)", borderRadius:"12px 12px 0 0" }} />
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3>Réservations par catégorie</h3>
                    <div style={{ width:160, height:160, borderRadius:"50%", margin:"25px auto", background:"conic-gradient(#ff6b00 0 45%, #2563eb 45% 70%, #22c55e 70% 90%, #f59e0b 90% 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:105, height:105, borderRadius:"50%", background:"#0b1322", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                        <b style={{ fontSize:26 }}>1,248</b>
                        <span style={{ color:"#94a3b8" }}>Total</span>
                      </div>
                    </div>
                    <p>Voitures 45%</p><p>Yachts 25%</p><p>Voyages 20%</p><p>Jet-ski 10%</p>
                  </div>
                </section>

                <BookingsTable bookings={filteredBookings} setSelectedBooking={setSelectedBooking} updateBookingStatus={updateBookingStatus} />
              </>
            )}

            {activePage === "Réservations" && (
              <BookingsTable bookings={filteredBookings} setSelectedBooking={setSelectedBooking} updateBookingStatus={updateBookingStatus} full />
            )}

            {activePage === "Clients" && (
              <SimpleList title="Clients" items={clients.map(c => `${c.name} — ${c.city} — ${c.bookings} réservations — +${c.phone}`)} />
            )}

            {activePage === "Partenaires" && (
              <SimpleList title="Partenaires" items={partners.map(p => `${p.name} — ${p.type} — ${p.city} — ${p.status}`)} />
            )}

            {activePage === "Services" && (
              <SimpleList title="Services" items={["Hébergements", "Activités", "Location voiture", "Location moto", "Yacht & Nautique", "Voyages organisés"]} />
            )}

            {activePage === "Paiements" && (
              <SimpleList title="Paiements" items={["Acompte reçu #TR1248 — 2,000 DA", "Paiement à l’arrivée #TR1247", "Commission Travora #TR1246 — 8,500 DA"]} />
            )}

            {activePage === "Commentaires" && (
              <SimpleList title="Commentaires" items={["Client satisfait de la villa à Tipaza", "Partenaire demande validation annonce", "Question sur remboursement acompte"]} />
            )}

            {activePage === "Promotions" && (
              <SimpleList title="Promotions" items={["Code promo ETE2026 actif", "Boost annonce yacht Oran", "Offre weekend Alger"]} />
            )}

            {activePage === "Rapports" && (
              <SimpleList title="Rapports" items={["Revenus cette semaine : 2.48M DA", "Taux confirmation : 72%", "Réservations annulées : 4%"]} />
            )}

            {activePage === "Paramètres" && (
              <SimpleList title="Paramètres" items={["Compte admin : actif", "Notifications : activées", "Mode paiement : acompte + paiement à l’arrivée"]} />
            )}
          </div>
        </main>
      </div>

      {selectedBooking && (
        <div onClick={() => setSelectedBooking(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.65)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{ width:"100%", maxWidth:520 }}>
            <h2>Détails réservation</h2>
            <p><b>ID :</b> {selectedBooking.id}</p>
            <p><b>Client :</b> {selectedBooking.client}</p>
            <p><b>Service :</b> {selectedBooking.service}</p>
            <p><b>Ville :</b> {selectedBooking.city}</p>
            <p><b>Montant :</b> {selectedBooking.amount}</p>
            <p><b>Statut :</b> {selectedBooking.status}</p>
            <a href={`https://wa.me/${selectedBooking.phone}`} target="_blank" style={{ color:"white", background:"#22c55e", padding:"12px", borderRadius:12, display:"inline-flex", gap:8, textDecoration:"none", fontWeight:"bold" }}>
              <Phone size={16} /> Contacter WhatsApp
            </a>
            <button onClick={() => setSelectedBooking(null)} style={{ marginLeft:10, background:"#ff6b00", color:"white", border:0, padding:"12px", borderRadius:12 }}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingsTable({ bookings, setSelectedBooking, updateBookingStatus, full = false }: any) {
  return (
    <section className="grid2" style={{ gridTemplateColumns: full ? "1fr" : undefined }}>
      <div className="card tableWrap">
        <h3>{full ? "Toutes les réservations" : "Réservations récentes"}</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Client</th><th>Service</th><th>Lieu</th><th>Montant</th><th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: any) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.client}</td>
                <td>{b.service}</td>
                <td>{b.city}</td>
                <td><b>{b.amount}</b></td>
                <td><span style={{ ...statusStyle(b.status), padding:"6px 10px", borderRadius:9 }}>{b.status}</span></td>
                <td>
                  <a href={`https://wa.me/${b.phone}`} target="_blank" style={{ color:"#22c55e", marginRight:8 }}><Phone size={16} /></a>
                  <button className="actionBtn" onClick={() => setSelectedBooking(b)} style={{ background:"rgba(255,255,255,.08)" }}><Eye size={16} /></button>
                  <button className="actionBtn" onClick={() => updateBookingStatus(b.id, "Confirmée")} style={{ background:"rgba(34,197,94,.2)" }}><CheckCircle size={16} /></button>
                  <button className="actionBtn" onClick={() => updateBookingStatus(b.id, "Annulée")} style={{ background:"rgba(239,68,68,.2)" }}><XCircle size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!full && (
        <div className="card">
          <h3>Activités récentes</h3>
          {["Nouvelle réservation #TR1248", "Paiement reçu de Ahmed B.", "Nouveau partenaire inscrit", "Réservation annulée #TR1243", "Nouveau commentaire reçu"].map((a, i) => (
            <p key={i} style={{ color:"#cbd5e1", borderBottom:"1px solid rgba(255,255,255,.06)", paddingBottom:13 }}>{a}</p>
          ))}
        </div>
      )}
    </section>
  );
}

function SimpleList({ title, items }: any) {
  return (
    <section className="card">
      <h2 style={{ marginTop:0 }}>{title}</h2>
      {items.map((item: string, index: number) => (
        <div key={index} style={{ padding:"16px 0", borderTop:"1px solid rgba(255,255,255,.08)", color:"#cbd5e1" }}>
          {item}
        </div>
      ))}
    </section>
  );
}

