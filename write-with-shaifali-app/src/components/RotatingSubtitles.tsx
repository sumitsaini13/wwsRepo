"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/RotatingSubtitles.module.css";

const subtitles = [
  "Tracing histories of migration, identity, and cultural memory through academic inquiry...",
  "Research that bridges lived experiences with historical narratives...",
  "Exploring South Asia’s past to illuminate its cultural present...",
  "A collection of works dedicated to understanding displacement, language, and resilience...",
  "Voices of memory and identity captured in scholarly writing...",
];

export default function RotatingSubtitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length);
    }, 7000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-center text-white mx-auto font-light bg-black ${styles.subtitles}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
        >
          {subtitles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
