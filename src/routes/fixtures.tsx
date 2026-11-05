import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { MatchRow } from "@/components/site/MatchRow";
import { riversideFixtures } from "@/lib/league";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Riverside FC Fixtures & Results — TeamHub" },
      { name: "description", content: "See Riverside FC's upcoming fixtures and latest results for the 2026/27 season." },
      { property: "og:title", content: "Riverside FC Fixtures & Results — TeamHub" },
      { property: "og:description", content: "See Riverside FC's upcoming fixtures and latest results for the 2026/27 season." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FixturesPage,
});

function FixturesPage() {
  const [view, setView] = useState<"upcoming" | "results">("upcoming");
  const grouped = useMemo(() => {
    const list = riversideFixtures
      .filter((f) => (view === "results" ? f.score : !f.score));
    const map = new Map<number, typeof list>();
    for (const f of list) map.set(f.matchweek, [...(map.get(f.matchweek) ?? []), f]);
    const entries = [...map.entries()];
    return view === "results" ? entries.reverse() : entries;
  }, [view]);

  return (
    <>
      <PageHeader
        eyebrow="Matchday"
        title="Fixtures & results"
        intro="Riverside FC match schedule and results. All times are local (EAT)."
      />

      <p className="mx-auto mt-4 max-w-7xl px-4 text-sm text-muted-foreground sm:px-6" role="note">
        Sample season schedule — verify dates, opponents and scores with the club.
      </p>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-full bg-secondary p-1" role="tablist">
            {(["upcoming", "results"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-5 py-2 font-display text-sm font-bold capitalize transition-colors hover:bg-card",
                  view === v && "bg-primary hover:bg-primary",
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold text-muted-foreground">All times are local (EAT)</p>
        </div>

        <div className="mt-8 space-y-10">
          {grouped.length === 0 && (
            <div className="tile tile-soft text-center">No Riverside FC matches in this view yet.</div>
          )}
          {grouped.map(([mw, list]) => (
            <section key={mw}>
              <h2 className="mb-4 text-xl font-extrabold">Matchweek {mw}</h2>
              <div className="grid gap-3">
                {list.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
