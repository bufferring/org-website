import React, { useState, useEffect, useMemo } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo_nl.png';
import { useSectionContext } from '../context/SectionContext';

const LABEL_MAP = {
  hero: 'Home',
  projects: 'Projects',
  contact: 'Contact',
};

const scrollToSection = (id) => {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Navbar({ sectionIds = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const { activeSection } = useSectionContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const close = () => setMobileOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [mobileOpen]);

  const items = useMemo(() => sectionIds.map((id) => ({
    id,
    label: LABEL_MAP[id] || id.charAt(0).toUpperCase() + id.slice(1),
  })), [sectionIds]);

  const navBackground = scrolled ? 'bg-black/70 shadow-lg shadow-black/20 backdrop-blur-xl border border-white/5' : 'bg-black/30 border border-white/10';
  const highlightId = hoveredId || activeSection;

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <motion.nav
        className={`relative flex items-center w-full max-w-5xl rounded-2xl px-4 py-3 md:px-6 transition-all duration-300 ${navBackground}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={() => scrollToSection(items[0]?.id || 'hero')}
        >
          <motion.img
            src={logo}
            alt="BufferRing Logo"
            className="object-contain w-9 h-9"
            whileHover={{ rotate: 6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
          <span className="hidden text-lg font-semibold tracking-wide text-white sm:inline-block">
            BufferRing
          </span>
        </button>

        <div className="hidden md:flex items-center justify-center gap-2 mx-auto md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2">
          {items.map((item) => {
            const isHighlighted = highlightId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60 rounded-full"
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 250, damping: 24 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex md:hidden ml-auto">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60 rounded-full"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-3 left-0 right-0 md:hidden"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl">
                {items.map((item) => {
                  const selected = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        scrollToSection(item.id);
                        setMobileOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium transition-colors ${selected ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.label}</span>
                      {selected && (
                        <motion.span
                          layoutId="mobile-dot"
                          className="w-2.5 h-2.5 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
