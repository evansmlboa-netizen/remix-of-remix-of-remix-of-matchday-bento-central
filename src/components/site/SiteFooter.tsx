import { Link } from "@tanstack/react-router";
import { CLUB, riverside } from "@/lib/league";
import { navItems } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary font-display text-sm font-black text-foreground">
              {CLUB.short}
            </span>
            <span className="font-display text-lg font-extrabold">{CLUB.name}</span>
          </div>
          <p className="mt-4 max-w-sm opacity-75">
            {CLUB.tagline} Season {CLUB.season}.
          </p>
          <p className="mt-3 max-w-sm text-sm opacity-60">
            Sample profile content — confirm club details, fixtures, squad and stories before sharing.
          </p>
        </div>
        <div>
          <p className="eyebrow opacity-60">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="opacity-80 transition-opacity hover:opacity-100 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow opacity-60">The club</p>
          <ul className="mt-4 space-y-2 opacity-80">
            <li>{riverside?.ground ?? "Riverside Community Stadium"}</li>
            <li>Founded {riverside?.founded ?? 1984}</li>
            <li>{CLUB.tagline}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm opacity-60 sm:px-6">
          © 2026 {CLUB.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
