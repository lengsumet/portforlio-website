"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaUser, FaStar, FaShoppingBag,
  FaCog, FaBars, FaTimes,
} from "react-icons/fa";

const navItems = [
  { name: "Home",     href: "/",         icon: FaHome },
  { name: "About",    href: "/about",     icon: FaUser },
  { name: "Showcase", href: "/showcase",  icon: FaStar },
  { name: "Shop",     href: "/shop",      icon: FaShoppingBag },
];

const adminItems = [
  { name: "Admin", href: "/admin", icon: FaCog },
];

function NavIcon({
  href,
  icon: Icon,
  name,
  isActive,
  onClick,
  isNavigating,
}: {
  href: string;
  icon: React.ElementType;
  name: string;
  isActive: boolean;
  onClick?: () => void;
  isNavigating?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={name}
      className="group relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
      style={{
        backgroundColor: isActive ? "var(--accent-bg)" : "transparent",
        border: isActive ? "1px solid oklch(78% 0.14 75 / 0.25)" : "1px solid transparent",
        opacity: isNavigating ? 0.5 : 1,
      }}
    >
      <Icon
        size={13}
        style={{
          color: isActive ? "var(--accent)" : "var(--text-4)",
          transition: "color 0.15s",
        }}
        className="group-hover:!text-[var(--text-2)]"
      />

      {isNavigating && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ border: "1px solid var(--accent)" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Tooltip */}
      <span
        className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap z-50"
        style={{
          backgroundColor: "var(--bg-float)",
          border: "1px solid var(--border)",
          color: "var(--text-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {name}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const handleNavigation = (href: string, closeMobile = false) => {
    if (pathname === href) return;
    setNavigatingTo(href);
    if (closeMobile) setMobileOpen(false);
    startTransition(() => {
      router.push(href);
      setNavigatingTo(null);
    });
  };

  React.useEffect(() => {
    [...navItems, ...adminItems].forEach(item => router.prefetch(item.href));
  }, [router]);

  return (
    <>
      {/* ── Floating Sidebar ── */}
      <aside
        className="hidden md:flex flex-col items-center fixed left-3 top-1/2 -translate-y-1/2 z-30 rounded-xl py-3 w-11"
        style={{
          backgroundColor: "oklch(13% 0.012 250 / 0.85)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Logo mark */}
        <Link
          href="/"
          className="w-6 h-6 rounded-md flex items-center justify-center mb-4 flex-shrink-0 transition-opacity duration-150 hover:opacity-75"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <span
            className="text-[9px] font-semibold"
            style={{ color: "oklch(12% 0.012 250)", fontFamily: "var(--font-body)" }}
          >
            SB
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col items-center gap-0.5 flex-1 w-full px-1.5">
          {navItems.map((item) => (
            <div key={item.href} onClick={() => handleNavigation(item.href)} className="cursor-pointer">
              <NavIcon
                {...item}
                isActive={pathname === item.href}
                isNavigating={navigatingTo === item.href}
              />
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-4 h-px my-2" style={{ backgroundColor: "var(--border)" }} />

        {/* Admin */}
        <div className="flex flex-col items-center w-full px-1.5">
          {adminItems.map((item) => (
            <div key={item.href} onClick={() => handleNavigation(item.href)} className="cursor-pointer">
              <NavIcon
                {...item}
                isActive={!!pathname?.startsWith("/admin")}
                isNavigating={navigatingTo === item.href}
              />
            </div>
          ))}
        </div>
      </aside>

      {/* ── Mobile Hamburger ── */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150"
        style={{
          backgroundColor: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--text-3)",
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
      </button>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 flex flex-col px-8 py-12"
            style={{ backgroundColor: "oklch(10% 0.012 250 / 0.97)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-10">
              <p
                className="text-[10px] uppercase tracking-[0.18em] mb-1"
                style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
              >
                Navigation
              </p>
              <h2
                className="text-xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--text-1)" }}
              >
                Sumet Buarod
              </h2>
            </div>

            <nav className="flex flex-col gap-6">
              {[...navItems, ...adminItems].map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href === "/admin" && pathname?.startsWith("/admin"));
                const isLoading = navigatingTo === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, true)}
                    disabled={isLoading}
                    className="flex items-center gap-4 text-base text-left transition-all duration-150"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      opacity: isLoading ? 0.5 : 1,
                    }}
                  >
                    <Icon size={14} />
                    <span>{item.name}</span>
                    {isLoading && (
                      <motion.span
                        className="ml-auto w-1 h-1 rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
