"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import ShowcaseModal from '@/components/showcase/ShowcaseModal';

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  price: number;
  livePreview: string;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ShowcasePage() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  useEffect(() => {
    fetch('/data/showcase.json')
      .then(res => res.json())
      .then(data => setShowcaseItems(data));
  }, []);

  return (
    <div className="px-6 md:px-12 py-16">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-xs uppercase tracking-[0.18em] mb-3"
          style={{ color: 'var(--text-4)', fontFamily: 'var(--font-body)' }}
        >
          Portfolio
        </p>
        <h1
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--text-1)' }}
        >
          Website Showcase
        </h1>
        <p
          className="mt-3 text-sm max-w-md"
          style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}
        >
          A collection of my finest work and templates.
        </p>
        <div className="mt-4 h-px w-10" style={{ backgroundColor: 'var(--accent)', opacity: 0.4 }} />
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {showcaseItems.map(si => (
          <motion.div key={si.id} variants={item}>
            <Card
              title={si.title}
              description={si.description}
              image={si.image}
              tags={si.tags}
              onClick={() => setSelectedItem(si)}
            />
          </motion.div>
        ))}
      </motion.div>

      <ShowcaseModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
