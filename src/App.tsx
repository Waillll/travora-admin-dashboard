import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
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
  Plane,
  Search,
  Settings,
  Star,
  Users,
  Wallet,
  Phone,
  Building2,
  CheckCircle,
  XCircle
} from "lucide-react";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  service_name: string;
  category?: string;
  city?: string;
  date_start?: string;
  date_end?: string;
  price?: number;
  deposit_status?: string;
  booking_status?: string;
  partner_name?: string;
  partner_phone?: string;
  created_at?: string;
};

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

function statusStyle(status?: string) {
  if (status === "confirmed") return { background: "rgba(34,197,94,.15)", color: "#4ade80" };
  if (status === "cancelled") return { background: "rgba(239,68,68,.15)", color: "#f87171" };
  if (status === "completed") return { background: "rgba(59,130,246,.15)", color: "#60a5fa" };
  return { background: "rgba(249,115,22,.15)", color: "#fb923c" };
}

function statusLabel(status?: string) {
  if (status === "confirmed") return "Confirmée";
  if (status === "cancelled") return "Annulée";
  if (status === "completed") return "Terminée";
  return "En attente";
}

export default function App() {
  const [activePage, setActivePage] = useState("Tableau de bord");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      alert("Erreur Supabase : " + error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateBookingStatus(id: string, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ booking_status: status })
      .eq("id", id);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      fetchBookings();
    }
  }

  const filteredBookings = bookings.filter((b) =>
    `${b.customer_name} ${b.service_name} ${b.city} ${b.booking_status}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);

  const stats = [
    ["Réservations", bookings.length.toString(), CalendarCheck, "#ff6b00"],
    ["Revenus", `${totalRevenue.toLocaleString()} DA`, Wallet, "#22c55e"],
    ["Clients", new Set(bookings.map((b) => b.phone)).size.toString(), Users, "#3b82f6"],
    ["En attente", bookings.filter((b) => b.booking_status === "pending").length.toString(), Building2, "#8b5cf6"]
  ];

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
        .actionBtn { border:0; border-radius:10px; padding:8px 10px; color:white; margin-right:6px; background:rgba(255,255,255,.08); }
        @media (max-width: 900px) {
          .layout { display:block; }
          .sidebar { width:100%; border-right:0; border-bottom:1px solid rgba(255,255,255,.1); }
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
                  display:"flex",
                  alignItems:"center",
                  gap:10,
                  padding:"12px 14px",
                  width:"100%",
                  borderRadius:14,
                  marginBottom:8,
                  border:0,
                  textAlign:"left",
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
            <a
              href="https://wa.me/213555123456"
              target="_blank"
              style={{ color:"white", background:"#22c55e", padding:"12px", borderRadius:12, display:"flex", gap:8, justifyContent:"center", textDecoration:"none", fontWeight:"bold" }}
            >
              <Phone size={16} /> +213 555 123 456
            </a>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div>
              <h2 style={{ margin:0 }}>
                {activePage === "Tableau de bord" ? "Dashboard Travora" : activePage}
              </h2>
              <p style={{ margin:0, color:"#94a3b8", fontSize:13 }}>
                Plateforme touristique d’Algérie
              </p>
            </div>

            <div className="searchBox" style={{ border:"1px solid rgba(255,255,255,.1)", borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, width:300 }}>
              <Search size={18} color="#94a3b8" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher..."
                style={{ background:"transparent", border:0, outline:0, color:"white", width:"100%" }}
              />
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={() => alert("Notifications récentes")} style={{ background:"transparent", border:0, color:"white" }}>
                <Bell />
              </button>
              <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#fb923c,#c2410c)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>
                A
              </div>
            </div>
          </header>

          <div className="content">
            {activePage === "Tableau de bord" && (
              <>
                <section className="hero">
                  <div style={{ display:"flex", justifyContent:"space-between", gap:15, flexWrap:"wrap", marginBottom:24 }}>
                    <div>
                      <h2 style={{ margin:0, fontSize:30 }}>Bienvenue, Admin ! 👋</h2>
                      <p style={{ color:"#94a3b8" }}>
                        Voici les vraies réservations connectées à Supabase.
                      </p>
                    </div>

                    <button onClick={fetchBookings} style={{ background:"#ff6b00", color:"white", border:0, borderRadius:12, padding:"13px 18px", fontWeight:"bold", display:"flex", gap:8, alignItems:"center" }}>
                      <Download size={17} /> Actualiser
                    </button>
                  </div>

                  <div className="stats">
                    {stats.map(([title, value, Icon, color]: any) => (
                      <div key={title} className="card">
                        <div style={{ width:48, height:48, borderRadius:14, background:color, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                          <Icon />
                        </div>
                        <p style={{ color:"#94a3b8", margin:0 }}>{title}</p>
                        <h3 style={{ fontSize:30, margin:"8px 0" }}>{value}</h3>
                        <p style={{ color:"#22c55e", fontSize:13 }}>Données en direct</p>
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
                        <b style={{ fontSize:26 }}>{bookings.length}</b>
                        <span style={{ color:"#94a3b8" }}>Total</span>
                      </div>
                    </div>
                    <p>Voitures</p>
                    <p>Yachts</p>
                    <p>Voyages</p>
                    <p>Jet-ski</p>
                  </div>
                </section>

                <BookingsTable
                  bookings={filteredBookings}
                  loading={loading}
                  setSelectedBooking={setSelectedBooking}
                  updateBookingStatus={updateBookingStatus}
                />
              </>
            )}

            {activePage === "Réservations" && (
              <BookingsTable
                bookings={filteredBookings}
                loading={loading}
                setSelectedBooking={setSelectedBooking}
                updateBookingStatus={updateBookingStatus}
                full
              />
            )}

            {activePage !== "Tableau de bord" && activePage !== "Réservations" && (
              <section className="card">
                <h2 style={{ marginTop:0 }}>{activePage}</h2>
                <p style={{ color:"#94a3b8" }}>
                  Cette page sera connectée à Supabase après les réservations.
                </p>
              </section>
            )}
          </div>
        </main>
      </div>

      {selectedBooking && (
        <div onClick={() => setSelectedBooking(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.65)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{ width:"100%", maxWidth:520 }}>
            <h2>Détails réservation</h2>
            <p><b>ID :</b> {selectedBooking.id}</p>
            <p><b>Client :</b> {selectedBooking.customer_name}</p>
            <p><b>Téléphone :</b> {selectedBooking.phone}</p>
            <p><b>Service :</b> {selectedBooking.service_name}</p>
            <p><b>Ville :</b> {selectedBooking.city}</p>
            <p><b>Prix :</b> {selectedBooking.price} DA</p>
            <p><b>Statut :</b> {statusLabel(selectedBooking.booking_status)}</p>

            <a href={`https://wa.me/${selectedBooking.phone}`} target="_blank" style={{ color:"white", background:"#22c55e", padding:"12px", borderRadius:12, display:"inline-flex", gap:8, textDecoration:"none", fontWeight:"bold" }}>
              <Phone size={16} /> WhatsApp
            </a>

            <button onClick={() => setSelectedBooking(null)} style={{ marginLeft:10, background:"#ff6b00", color:"white", border:0, padding:"12px", borderRadius:12 }}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingsTable({ bookings, loading, setSelectedBooking, updateBookingStatus, full = false }: any) {
  return (
    <section className="grid2" style={{ gridTemplateColumns: full ? "1fr" : undefined }}>
      <div className="card tableWrap">
        <h3>{full ? "Toutes les réservations" : "Réservations récentes"}</h3>

        {loading ? (
          <p style={{ color:"#94a3b8" }}>Chargement...</p>
        ) : bookings.length === 0 ? (
          <p style={{ color:"#94a3b8" }}>
            Aucune réservation pour le moment. Ajoute une ligne dans Supabase → bookings.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Ville</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b: Booking) => (
                <tr key={b.id}>
                  <td>{b.customer_name}</td>
                  <td>{b.service_name}</td>
                  <td>{b.city}</td>
                  <td><b>{b.price || 0} DA</b></td>
                  <td>
                    <span style={{ ...statusStyle(b.booking_status), padding:"6px 10px", borderRadius:9 }}>
                      {statusLabel(b.booking_status)}
                    </span>
                  </td>
                  <td>
                    <a href={`https://wa.me/${b.phone}`} target="_blank" style={{ color:"#22c55e", marginRight:8 }}>
                      <Phone size={16} />
                    </a>

                    <button className="actionBtn" onClick={() => setSelectedBooking(b)}>
                      <Eye size={16} />
                    </button>

                    <button className="actionBtn" onClick={() => updateBookingStatus(b.id, "confirmed")} style={{ background:"rgba(34,197,94,.2)" }}>
                      <CheckCircle size={16} />
                    </button>

                    <button className="actionBtn" onClick={() => updateBookingStatus(b.id, "cancelled")} style={{ background:"rgba(239,68,68,.2)" }}>
                      <XCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!full && (
        <div className="card">
          <h3>Activités récentes</h3>
          <p style={{ color:"#cbd5e1" }}>Dashboard connecté à Supabase.</p>
          <p style={{ color:"#cbd5e1" }}>Les nouvelles réservations apparaîtront ici.</p>
          <p style={{ color:"#cbd5e1" }}>Clique sur Actualiser pour recharger.</p>
        </div>
      )}
    </section>
  );
}
