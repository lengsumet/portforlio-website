"use client";

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <p
        className="text-xs"
        style={{ color: "var(--text-4)", fontFamily: "var(--font-body)" }}
      >
        © {new Date().getFullYear()} Sumet Buarod
      </p>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/sumetbuarod"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-150"
          style={{ color: "var(--text-4)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
        >
          <FaGithub size={14} />
        </a>
        <a
          href="https://linkedin.com/in/sumetbuarod"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-150"
          style={{ color: "var(--text-4)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}
        >
          <FaLinkedin size={14} />
        </a>
      </div>
    </footer>
  );
}
