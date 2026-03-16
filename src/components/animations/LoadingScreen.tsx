"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/LoadingContext';
import { LOADING_CONFIG } from '@/config/loadingConfig';

const DISPLAY_NAME = "Sumet Buarod";
const DISPLAY_TITLE = "Software Engineer";

const LoadingScreen: React.FC = () => {
  const { isLoading } = useLoading();
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSub(true), LOADING_CONFIG.SPINNER_DELAY);
      return () => clearTimeout(timer);
    } else {
      setShowSub(false);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: LOADING_CONFIG.CONTAINER_FADE_DURATION / 1000,
            ease: 'easeOut',
          }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[300px] opacity-[0.05]"
            style={{
              background: 'radial-gradient(ellipse at bottom left, oklch(78% 0.14 75), transparent 70%)',
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-5">
            {/* Name — letter-by-letter reveal */}
            <motion.h1
              className="leading-none"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {DISPLAY_NAME.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{
                    color: 'var(--text-1)',
                    ...(char === ' ' ? { marginRight: '0.3em' } : {}),
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + index * (LOADING_CONFIG.LETTER_STAGGER_DELAY / 1000),
                    type: 'spring',
                    stiffness: LOADING_CONFIG.SPRING_STIFFNESS,
                    damping: LOADING_CONFIG.SPRING_DAMPING,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Underline — amber accent */}
            <motion.div
              className="rounded-full"
              style={{ height: 1, backgroundColor: 'var(--accent)', opacity: 0.5 }}
              initial={{ width: 0 }}
              animate={{ width: '160px' }}
              transition={{
                duration: LOADING_CONFIG.UNDERLINE_DURATION / 1000,
                delay: LOADING_CONFIG.UNDERLINE_DELAY / 1000,
                ease: 'easeOut',
              }}
            />

            {/* Subtitle */}
            <AnimatePresence>
              {showSub && (
                <motion.p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{ color: 'var(--text-4)', fontFamily: 'var(--font-body)' }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {DISPLAY_TITLE}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
