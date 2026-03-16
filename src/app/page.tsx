"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SiReact, SiTypescript, SiSharp, SiPython,
  SiGo, SiPostgresql, SiDocker,
} from "react-icons/si";
import { FaAws, FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import CatWidget from "@/components/animations/CatWidget";

/* ── static data ──────────────────────────────────── */
const tech = [
  { name: "React / Next.js", icon: SiReact,      color: "#61DAFB" },
  { name: "TypeScript",      icon: SiTypescript, color: "#3178C6" },
  { name: "C# / .NET",       icon: SiSharp,      color: "#239120" },
  { name: "Python",          icon: SiPython,     color: "#3776AB" },
  { name: "Golang",          icon: SiGo,         color: "#00ADD8" },
  { name: "PostgreSQL",      icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker",          icon: SiDocker,     color: "#2496ED" },
  { name: "AWS",             icon: FaAws,        color: "#FF9900" },
];

const featured = [
  {
    slug: "insurance-platform-api",
    href: "/shop/insurance-platform-api",
    category: "Enterprise / API",
    title: "Insurance & Fintech Platform",
    description: "High-concurrency workflow engine for financial transaction lifecycle. Real-time third-party API integrations, policy management, and granular access control.",
    tags: [".NET Core 8", "C#", "React", "PostgreSQL", "Docker"],
    external: false,
    year: "2024",
  },
  {
    slug: "ecommerce-suite",
    href: process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3001",
    category: "Full-Stack / Live Demo",
    title: "E-Commerce Store",
    description: "Full e-commerce platform with product catalog, cart, PromptPay QR checkout, coupon system, and admin dashboard with weekly/monthly/yearly sales reports.",
    tags: ["Next.js 15", "Prisma", "NextAuth", "Zustand", "Recharts"],
    external: true,
    year: "2025",
  },
];

/* ── animation helpers ───────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── page ─────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ color: "var(--text-1)" }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20 overflow-hidden">

        {/* Subtle noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Warm accent glow — bottom left, asymmetric */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[400px] opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse at bottom left, oklch(78% 0.14 75), transparent 70%)",
          }}
        />

        {/* Content — left-aligned, editorial */}
        <div className="relative z-10 max-w-4xl">

          {/* Status line */}
          <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
            <span
              className="text-xs tracking-[0.15em] uppercase"
              style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Name — large display, Fraunces */}
          <motion.h1
            {...fadeUp(0.06)}
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            className="mb-3 leading-[0.95]"
          >
            Sumet
            <br />
            <span style={{ color: "var(--text-2)", fontStyle: "italic" }}>Buarod</span>
          </motion.h1>

          {/* Role — tight, muted */}
          <motion.p
            {...fadeUp(0.12)}
            className="text-base md:text-lg mb-6 max-w-md"
            style={{ color: "var(--text-3)", fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Software Engineer — Distributed Systems &amp; Cloud-Native
          </motion.p>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-sm leading-relaxed mb-10 max-w-lg"
            style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
          >
            Building scalable distributed systems and cloud-native architectures.
            Expert in C#, .NET Core, Python, Golang, and React/Next.js.
          </motion.p>

          {/* Actions row */}
          <motion.div {...fadeUp(0.24)} className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: "var(--accent)",
                color: "oklch(12% 0.012 250)",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Explore Work
              <FaArrowRight size={11} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                border: "1px solid var(--border-mid)",
                color: "var(--text-2)",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-mid)"; e.currentTarget.style.color = "var(--text-2)"; }}
            >
              Shop Templates
            </Link>
          </motion.div>

          {/* Social + stats — inline, minimal */}
          <motion.div {...fadeUp(0.3)} className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text-4)" }}
              className="transition-colors duration-150 hover:text-[var(--text-2)]"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text-4)" }}
              className="transition-colors duration-150 hover:text-[var(--text-2)]"
            >
              <FaLinkedin size={16} />
            </a>
            <span style={{ width: 1, height: 16, backgroundColor: "var(--border)", display: "inline-block" }} />
            <span className="text-xs tabular" style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}>
              3+ yrs · 10+ projects · 15 technologies
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══ TECH STACK ══════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.18em] mb-8"
          style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
        >
          Tech Stack
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
        >
          {tech.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                variants={item}
                whileHover={{ y: -1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-default transition-colors duration-150"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-3)",
                  backgroundColor: "var(--bg-raised)",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)"; (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
              >
                <Icon size={12} style={{ color: t.color, flexShrink: 0 }} />
                {t.name}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ══ FEATURED WORK ════════════════════════════════════ */}
      <section className="px-6 md:px-12 pb-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="pt-16 flex items-baseline justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--text-1)" }}
            className="text-2xl"
          >
            Selected Work
          </motion.h2>
          <Link
            href="/showcase"
            className="flex items-center gap-1.5 text-xs transition-colors duration-150"
            style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
          >
            All work
            <FaArrowRight size={9} />
          </Link>
        </div>

        {/* Work list — editorial list style, not identical cards */}
        <div className="space-y-0">
          {featured.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="group block py-8 transition-all duration-200"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Left: meta + title + desc */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
                      >
                        {item.category}
                      </span>
                      {item.external && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide"
                          style={{ backgroundColor: "var(--green-bg)", color: "var(--green)" }}
                        >
                          Live
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-lg mb-2 transition-colors duration-150"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        color: "var(--text-1)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4 max-w-xl"
                      style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}
                    >
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: "var(--bg-float)",
                            color: "var(--text-4)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: year + arrow */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
                    <span
                      className="text-xs tabular"
                      style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
                    >
                      {item.year}
                    </span>
                    <span
                      className="transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: "var(--text-4)" }}
                    >
                      <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CAT WIDGET ══════════════════════════════════ */}
      <CatWidget />
    </div>
  );
}
