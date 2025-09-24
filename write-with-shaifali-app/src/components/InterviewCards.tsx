"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/InterviewCards.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Interview {
  id: number;
  title: string;
  thumbnail: string;
  video: string | null;
  date: string;
}

export default function InterviewCards() {
  const [publications, setInterviews] = useState<Interview[]>([]);
  const [selectedPub, setSelectedPub] = useState<Interview | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/interviews")
      .then((response) => setInterviews(response.data))
      .catch((error) => console.error("Error fetching interviews:", error));
  }, []);

  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPub(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
  <div className="relative">
    {/* Background overlay covering lower half */}
    <div className="absolute top-1/3 left-0 right-0 bottom-0 bg-black"></div>

    {/* Foreground (your cards + modal) */}
    <div className={`${styles.mainCards} relative z-10`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Interview Highlights</h1>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedPub(pub)}
          >
            <img
              src={pub.thumbnail}
              alt={pub.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pub.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedPub && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPub(null)} // Close on background click
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                onClick={() => setSelectedPub(null)}
              >
                ✕
              </button>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{selectedPub.title}</h2>

                {selectedPub.video ? (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      width="100%"
                      height="315"
                      src={selectedPub.video}
                      title={selectedPub.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={selectedPub.thumbnail}
                    alt={selectedPub.title}
                    className="w-full rounded mb-4"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
}