"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from '../styles/Tabs.module.css';

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About the Author" },
  { path: "/projects", label: "Projects" },
  { path: "/research", label: "Research" }
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`${styles.link} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
