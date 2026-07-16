"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes & Prayers" },
  { href: "/goals", label: "My Goals" },
  { href: "/quiz", label: "Bible Quiz" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border-soft bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="font-serif text-xl font-semibold text-primary">
          ✦ Daily Light
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                pathname === href
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-muted hover:bg-card-soft hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
