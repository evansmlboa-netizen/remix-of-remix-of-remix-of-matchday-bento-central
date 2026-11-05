import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { TeamBadge } from "@/components/site/TeamBadge";
import { Button } from "@/components/ui/button";
import { riverside, squad } from "@/lib/league";

export const Route = createFileRoute("/squad")({
  head: () => ({
    meta: [
      { title: "Riverside FC Squad — TeamHub" },
      { name: "description", content: "Meet the Riverside FC first-team squad for the 2026/27 season." },
      { property: "og:title", content: "Riverside FC Squad — TeamHub" },
      { property: "og:description", content: "Meet the Riverside FC first-team squad for the 2026/27 season." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SquadPage,
});

const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward"] as const;

function SquadPage() {
  const [position, setPosition] = useState<(typeof positions)[number]>("All");
  const players = squad.filter((player) => position === "All" || player.position === position);

  return (
    <>
      <PageHeader
        eyebrow="First team · 2026/27"
        title="The squad"
        intro="Meet the players who wear the Riverside shirt."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="tile tile-sky mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <TeamBadge teamId="riv" size="lg" />
            <div>
              <p className="eyebrow">Riverside FC</p>
              <h2 className="mt-1 text-2xl font-extrabold">First team</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 font-display font-bold">
            <Users className="size-5" />
            <span>{squad.length} players</span>
            <span className="mx-1 h-5 border-l border-foreground/20" />
            <Shield className="size-5" />
            <span>{riverside?.captain ?? "Club captain"}</span>
          </div>
        </section>

        <p className="mt-4 text-sm text-muted-foreground" role="note">
          Sample squad list — confirm player names and numbers with the club before publishing.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter players by position">
          {positions.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={position === item ? "default" : "outline"}
              onClick={() => setPosition(item)}
              aria-pressed={position === item}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <article key={player.number} className="tile tile-soft flex min-h-32 items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-card font-display text-2xl font-black">
                {String(player.number).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="eyebrow text-sky-deep">{player.position}</p>
                <h2 className="mt-1 text-xl font-extrabold">{player.name}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}