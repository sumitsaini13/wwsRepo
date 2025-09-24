"use client";
import { motion } from 'framer-motion';
import Blogs from './blogs/page'

export default function Main() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Blogs/>
      </motion.div>
    </div>
  );
}