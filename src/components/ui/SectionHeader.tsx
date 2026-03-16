"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p
        className="text-xs uppercase tracking-[0.18em] mb-3"
        style={{ color: 'var(--text-4)', fontFamily: 'var(--font-body)' }}
      >
        {subtitle}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          color: 'var(--text-1)',
        }}
      >
        {title}
      </h2>
      <div
        className="mt-4 h-px w-12"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.4 }}
      />
    </motion.div>
  );
};

export default SectionHeader;
