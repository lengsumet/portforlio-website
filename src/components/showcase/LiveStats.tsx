"use client";

import React, { useState, useEffect } from "react";

// ==========================================
// WMS Stats
// ==========================================

interface WmsStats {
  totalProducts: number;
  totalInventoryItems: number;
  totalInboundOrders: number;
  totalOutboundOrders: number;
  totalWarehouses: number;
  totalZones: number;
  totalBins: number;
  totalUsers: number;
  totalPickLists: number;
  systemStatus: string;
}

const WMS_URL =
  process.env.NEXT_PUBLIC_WMS_URL || "http://localhost:3001";

const wmsStatItems: { key: keyof WmsStats; label: string; icon: string }[] = [
  { key: "totalProducts", label: "Products", icon: "📦" },
  { key: "totalInventoryItems", label: "Inventory Items", icon: "🏷️" },
  { key: "totalInboundOrders", label: "Inbound Orders", icon: "📥" },
  { key: "totalOutboundOrders", label: "Outbound Orders", icon: "📤" },
  { key: "totalWarehouses", label: "Warehouses", icon: "🏭" },
  { key: "totalZones", label: "Zones", icon: "📍" },
  { key: "totalBins", label: "Storage Bins", icon: "🗄️" },
  { key: "totalUsers", label: "Users", icon: "👤" },
  { key: "totalPickLists", label: "Pick Lists", icon: "📋" },
];

// ==========================================
// POS Stats
// ==========================================

interface PosStats {
  totalProducts: number;
  totalCategories: number;
  totalTransactions: number;
  totalCustomers: number;
  todaySales: number;
  todayTransactions: number;
}

const POS_URL =
  process.env.NEXT_PUBLIC_POS_URL || "http://localhost:3002";

const posStatItems: { key: keyof PosStats; label: string; icon: string }[] = [
  { key: "totalProducts", label: "Products", icon: "☕" },
  { key: "totalCategories", label: "Categories", icon: "📂" },
  { key: "totalTransactions", label: "Transactions", icon: "🧾" },
  { key: "totalCustomers", label: "Customers", icon: "👥" },
  { key: "todaySales", label: "Today Sales (฿)", icon: "💰" },
  { key: "todayTransactions", label: "Today Orders", icon: "📊" },
];

// ==========================================
// CRM Stats
// ==========================================

interface CrmStats {
  totalContacts: number;
  totalCompanies: number;
  totalDeals: number;
  activeDeals: number;
  pipelineValue: number;
  wonThisMonth: number;
}

const CRM_URL =
  process.env.NEXT_PUBLIC_CRM_URL || "http://localhost:3003";

const crmStatItems: { key: keyof CrmStats; label: string; icon: string }[] = [
  { key: "totalContacts", label: "Contacts", icon: "👤" },
  { key: "totalCompanies", label: "Companies", icon: "🏢" },
  { key: "totalDeals", label: "Total Deals", icon: "🤝" },
  { key: "activeDeals", label: "Active Deals", icon: "📈" },
  { key: "pipelineValue", label: "Pipeline Value (฿)", icon: "💰" },
  { key: "wonThisMonth", label: "Won This Month", icon: "🏆" },
];

// ==========================================
// TMS Stats
// ==========================================

interface TmsStats {
  totalVehicles: number;
  totalDrivers: number;
  totalRoutes: number;
  activeShipments: number;
  totalDeliveries: number;
  onTimeRate: number;
}

const TMS_URL =
  process.env.NEXT_PUBLIC_TMS_URL || "http://localhost:3004";

const tmsStatItems: { key: keyof TmsStats; label: string; icon: string }[] = [
  { key: "totalVehicles", label: "Vehicles", icon: "🚛" },
  { key: "totalDrivers", label: "Drivers", icon: "👨‍✈️" },
  { key: "totalRoutes", label: "Routes", icon: "🗺️" },
  { key: "activeShipments", label: "Active Shipments", icon: "📦" },
  { key: "totalDeliveries", label: "Deliveries", icon: "✅" },
  { key: "onTimeRate", label: "On-Time Rate (%)", icon: "⏱️" },
];

// ==========================================
// IMS Stats
// ==========================================

interface ImsStats {
  products: number;
  movements: number;
  warehouses: number;
  status: string;
}

const IMS_URL =
  process.env.NEXT_PUBLIC_IMS_URL || "http://localhost:3005";

const imsStatItems: { key: keyof ImsStats; label: string; icon: string }[] = [
  { key: "products", label: "Products", icon: "📦" },
  { key: "movements", label: "Stock Movements", icon: "🔄" },
  { key: "warehouses", label: "Warehouses", icon: "🏭" },
];

// ==========================================
// SCMS Stats
// ==========================================

interface ScmsStats {
  suppliers: number;
  purchaseOrders: number;
  orders: number;
  risks: number;
  status: string;
}

const SCMS_URL =
  process.env.NEXT_PUBLIC_SCMS_URL || "http://localhost:3006";

const scmsStatItems: { key: keyof ScmsStats; label: string; icon: string }[] = [
  { key: "suppliers", label: "Suppliers", icon: "🏢" },
  { key: "purchaseOrders", label: "Purchase Orders", icon: "📋" },
  { key: "orders", label: "Sales Orders", icon: "🛒" },
  { key: "risks", label: "Active Risks", icon: "⚠️" },
];

// ==========================================
// PMS Stats
// ==========================================

interface PmsStats {
  workOrders: number;
  activeWorkOrders: number;
  productionLines: number;
  machines: number;
  ncrs: number;
  status: string;
}

const PMS_URL =
  process.env.NEXT_PUBLIC_PMS_URL || "http://localhost:3007";

const pmsStatItems: { key: keyof PmsStats; label: string; icon: string }[] = [
  { key: "workOrders", label: "Work Orders", icon: "📝" },
  { key: "activeWorkOrders", label: "Active WOs", icon: "🔧" },
  { key: "productionLines", label: "Prod. Lines", icon: "🏭" },
  { key: "machines", label: "Machines", icon: "⚙️" },
  { key: "ncrs", label: "Open NCRs", icon: "🔴" },
];

// ==========================================
// Dashboard Stats
// ==========================================

interface DashStats {
  metricSnapshots: number;
  totalAlerts: number;
  activeAlerts: number;
  reports: number;
  status: string;
}

const DASH_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3008";

const dashStatItems: { key: keyof DashStats; label: string; icon: string }[] = [
  { key: "metricSnapshots", label: "Metrics (30d)", icon: "📊" },
  { key: "totalAlerts", label: "Total Alerts", icon: "🔔" },
  { key: "activeAlerts", label: "Active Alerts", icon: "🚨" },
  { key: "reports", label: "Reports", icon: "📄" },
];

// ==========================================
// System Config Map
// ==========================================

const SYSTEM_CONFIG = {
  wms: { url: WMS_URL, label: "WMS", port: "3001", items: wmsStatItems },
  pos: { url: POS_URL, label: "POS", port: "3002", items: posStatItems },
  crm: { url: CRM_URL, label: "CRM", port: "3003", items: crmStatItems },
  tms: { url: TMS_URL, label: "TMS", port: "3004", items: tmsStatItems },
  ims: { url: IMS_URL, label: "IMS", port: "3005", items: imsStatItems },
  scms: { url: SCMS_URL, label: "SCMS", port: "3006", items: scmsStatItems },
  pms: { url: PMS_URL, label: "PMS", port: "3007", items: pmsStatItems },
  dashboard: { url: DASH_URL, label: "Dashboard", port: "3008", items: dashStatItems },
};

// ==========================================
// Generic Stats Panel
// ==========================================

interface LiveStatsProps {
  system?: "wms" | "pos" | "crm" | "tms" | "ims" | "scms" | "pms" | "dashboard";
}

export default function LiveStats({ system = "wms" }: LiveStatsProps) {
  const config = SYSTEM_CONFIG[system];
  const { url: apiUrl, label: systemLabel, port, items: statItems } = config;

  const [stats, setStats] = useState<WmsStats | PosStats | CrmStats | TmsStats | ImsStats | ScmsStats | PmsStats | DashStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/public/stats`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStats(data);
      setOffline(false);
    } catch {
      setOffline(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridCols = "grid-cols-3";

  if (loading) {
    return (
      <div className="rounded-xl p-5 my-5" style={{ backgroundColor: "var(--bg-float)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
          <span className="text-xs" style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}>
            Connecting to {systemLabel}...
          </span>
        </div>
        <div className={`grid ${gridCols} gap-2`}>
          {Array.from({ length: statItems.length }).map((_, i) => (
            <div key={i} className="rounded-lg p-3 animate-pulse" style={{ backgroundColor: "var(--bg-raised)" }}>
              <div className="h-2 rounded w-14 mb-2" style={{ backgroundColor: "var(--border-mid)" }} />
              <div className="h-4 rounded w-8" style={{ backgroundColor: "var(--border-mid)" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (offline) {
    return (
      <div className="rounded-xl p-5 my-5" style={{ backgroundColor: "var(--bg-float)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--red)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}>
            {systemLabel} Offline
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}>
          Start the {systemLabel} server on port {port} to see live statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-5 my-5" style={{ backgroundColor: "var(--bg-float)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--green)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}>
            Live {systemLabel} Statistics
          </span>
        </div>
        <span className="text-[10px]" style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}>
          {system === "wms" && (stats as WmsStats)?.systemStatus === "operational"
            ? "Operational"
            : system !== "wms" ? "Online" : ""}
        </span>
      </div>
      <div className={`grid ${gridCols} gap-2`}>
        {(statItems as { key: string; label: string; icon: string }[]).map(({ key, label, icon }) => {
          const value = (stats as unknown as Record<string, unknown>)?.[key];
          const displayValue =
            typeof value === "number"
              ? key === "todaySales" || key === "pipelineValue"
                ? `฿${value.toLocaleString()}`
                : key === "onTimeRate"
                  ? `${value}%`
                  : value.toLocaleString()
              : "0";
          return (
            <div
              key={key}
              className="rounded-lg p-3 transition-colors duration-150"
              style={{ backgroundColor: "var(--bg-raised)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs">{icon}</span>
                <span className="text-[10px]" style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}>{label}</span>
              </div>
              <p className="text-sm font-medium tabular" style={{ color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
                {displayValue}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
