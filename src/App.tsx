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
             
