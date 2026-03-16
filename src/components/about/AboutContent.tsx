"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FaCamera, FaMountain, FaGamepad, FaUtensils,
  FaEnvelope, FaPhone, FaMapMarkerAlt,
} from "react-icons/fa";
import SkillIcons from "@/components/ui/SkillIcons";
import { AboutData, Experience, Education, Hobby, Skill } from "@/types/types";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay },
});

/* ── section heading ─────────────────────────────── */
function SectionHeading({ title }: { title: string }) {
  return (
    <motion.div {...fadeUp()} className="mb-10">
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          color: "var(--text-1)",
        }}
      >
        {title}
      </h2>
      <div
        className="mt-3 h-px w-10"
        style={{ backgroundColor: "var(--accent)", opacity: 0.4 }}
      />
    </motion.div>
  );
}

/* ── experience / education card ─────────────────── */
function ExpCard({ title, subtitle, period, description, delay }: {
  title: string; subtitle: string; period: string; description: string; delay: number;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="relative rounded-xl p-6 transition-all duration-200 group cursor-default"
      style={{
        backgroundColor: "var(--bg-raised)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Period badge */}
      <span
        className="absolute top-5 right-5 text-[11px] px-2 py-0.5 rounded"
        style={{
          color: "var(--text-4)",
          backgroundColor: "var(--bg-float)",
          fontFamily: "var(--font-body)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {period}
      </span>

      <h3
        className="text-base pr-28 mb-1"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          color: "var(--text-1)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm mb-3"
        style={{ color: "var(--accent-dim)", fontFamily: "var(--font-body)" }}
      >
        {subtitle}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}

const hobbyIcons: Record<string, React.ReactNode> = {
  camera:   <FaCamera size={22} />,
  mountain: <FaMountain size={22} />,
  gamepad:  <FaGamepad size={22} />,
  utensils: <FaUtensils size={22} />,
};

/* ── main component ──────────────────────────────── */
export default function AboutContent({ data }: { data: AboutData }) {
  const { introduction, education, experience, skills, hobbies } = data;

  const spinCtrl   = useAnimation();
  const isSpinning = useRef(false);
  const [sparkles, setSparkles] = useState<{ id: number; angle: number; char: string }[]>([]);

  const handleSpin = useCallback(async () => {
    if (isSpinning.current) return;
    isSpinning.current = true;
    const chars = ["✦", "★", "✨", "◆", "✦", "★", "✨", "◆"];
    setSparkles(chars.map((char, i) => ({ id: Date.now() + i, angle: (i / chars.length) * 360, char })));
    await spinCtrl.start({ rotate: -20, transition: { duration: 0.13, ease: "easeIn" } });
    await spinCtrl.start({ rotate: 365, transition: { duration: 0.62, ease: [0.2, 1.55, 0.36, 1] } });
    spinCtrl.set({ rotate: 0 });
    setTimeout(() => { setSparkles([]); isSpinning.current = false; }, 850);
  }, [spinCtrl]);

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <>
      {/* ── Profile ──────────────────────────────────── */}
      <section className="mb-24">
        <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center">
          {/* Profile image */}
          <div className="relative w-32 h-32 mb-6">
            <AnimatePresence>
              {sparkles.map((s) => (
                <motion.span
                  key={s.id}
                  className="absolute top-1/2 left-1/2 pointer-events-none select-none text-sm z-10"
                  style={{ translateX: "-50%", translateY: "-50%", color: "var(--accent)" }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos((s.angle * Math.PI) / 180) * 72,
                    y: Math.sin((s.angle * Math.PI) / 180) * 72,
                    opacity: 0,
                    scale: 1.3,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {s.char}
                </motion.span>
              ))}
            </AnimatePresence>

            {/* Subtle ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none z-[1]"
              style={{ boxShadow: "0 0 0 2px var(--border-mid)" }}
            />

            <motion.div
              animate={spinCtrl}
              onMouseEnter={handleSpin}
              className="absolute inset-0 rounded-full cursor-pointer overflow-hidden"
              style={{ transformOrigin: "center" }}
              whileHover={{ scale: 1.04 }}
              transition={{ scale: { duration: 0.2 } }}
            >
              <Image
                src={introduction.profileImage}
                alt={introduction.name}
                fill
                className="rounded-full object-cover"
              />
            </motion.div>
          </div>

          <h1
            className="mb-1"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--text-1)" }}
          >
            {introduction.name}
          </h1>
          <p
            className="text-base mb-5"
            style={{ color: "var(--accent-dim)", fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            {introduction.title}
          </p>
        </motion.div>

        <motion.p
          {...fadeUp(0.1)}
          className="max-w-2xl mx-auto text-sm leading-relaxed mb-8 text-center"
          style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}
        >
          {introduction.bio}
        </motion.p>

        <motion.div
          {...fadeUp(0.18)}
          className="flex flex-wrap items-center justify-center gap-5 text-sm"
          style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
        >
          <a
            href="mailto:sumet.buarod@gmail.com"
            className="flex items-center gap-2 transition-colors duration-150"
            style={{ color: "var(--text-4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
          >
            <FaEnvelope size={12} /> sumet.buarod@gmail.com
          </a>
          <a
            href="tel:0958039303"
            className="flex items-center gap-2 transition-colors duration-150"
            style={{ color: "var(--text-4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
          >
            <FaPhone size={12} /> 095-803-9303
          </a>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt size={12} /> Khon Kaen, Thailand
          </span>
        </motion.div>
      </section>

      {/* ── Experience ───────────────────────────────── */}
      <section className="mb-24">
        <SectionHeading title="Work Experience" />
        <div className="space-y-4 max-w-3xl">
          {experience.map((exp: Experience, i: number) => (
            <ExpCard
              key={i}
              title={exp.role}
              subtitle={exp.company}
              period={exp.period}
              description={exp.description}
              delay={i * 0.07}
            />
          ))}
        </div>
      </section>

      {/* ── Education ────────────────────────────────── */}
      <section className="mb-24">
        <SectionHeading title="Education" />
        <div className="space-y-4 max-w-3xl">
          {education.map((edu: Education, i: number) => (
            <ExpCard
              key={i}
              title={edu.degree}
              subtitle={edu.institution}
              period={edu.period}
              description={edu.description}
              delay={i * 0.07}
            />
          ))}
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────── */}
      <section className="mb-24">
        <SectionHeading title="Skills & Knowledge" />
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills], gi) => (
            <motion.div key={category} {...fadeUp(gi * 0.06)}>
              <p
                className="text-xs uppercase tracking-[0.18em] mb-6"
                style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
              >
                {category}
              </p>
              <SkillIcons skills={categorySkills} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Hobbies ──────────────────────────────────── */}
      <section>
        <SectionHeading title="Hobbies & Interests" />
        <motion.div
          className="flex flex-wrap gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {hobbies.map((hobby: Hobby) => (
            <motion.div
              key={hobby.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
              }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3 cursor-default group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                  color: "var(--text-4)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-4)";
                }}
              >
                {hobbyIcons[hobby.icon] ?? null}
              </div>
              <p
                className="text-xs transition-colors duration-150"
                style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
              >
                {hobby.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
