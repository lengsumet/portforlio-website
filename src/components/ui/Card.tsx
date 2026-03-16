"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, tags, onClick }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl cursor-pointer"
      style={{
        backgroundColor: "var(--bg-raised)",
        border: "1px solid var(--border)",
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-mid)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="relative h-44 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--bg-raised) 0%, transparent 50%)" }}
        />
      </div>
      <div className="p-5">
        <h3
          className="text-base mb-1.5"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--text-1)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-3)", fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
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
    </motion.div>
  );
};

export default Card;
