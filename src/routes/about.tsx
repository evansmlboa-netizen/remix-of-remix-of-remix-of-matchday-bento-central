import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { TeamBadge } from "@/components/site/TeamBadge";
import { images } from "@/lib/images";
import { riverside, standings, points } from "@/lib/league";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Riverside FC — TeamHub" },
      { name: "description", content: "Discover the story, home ground and people behind Riverside FC." },
      { property: "og:title", content: "About Riverside FC — TeamHub" },
      { property: "og:description", content: "Discover the story, home ground and people behind Riverside FC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const club = riverside;
  const standing = standings.find((item) => item.teamId === "riv");
  const place = standings.findIndex((item) => item.teamId === "riv") + 1;

  return (
    <>
      <PageHeader eyebrow="Our club" title="About Riverside FC" intro="A local club with a quick-passing style, a proud history and a home crowd that makes itself heard." />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mt-4 text-sm text-muted-foreground" role="note">
          Club history, leadership and season figures shown here are sample details.
        </p>
        <div className="mt-6 grid auto-rows-[minmax(190px,auto)] gap-4 md:grid-cols-6">
          <section className="tile tile-ink flex flex-col justify-between md:col-span-3 md:row-span-2">
            <div className="flex items-center gap-4">
              <TeamBadge teamId="riv" size="lg" />
              <div>
                <p className="eyebrow opacity-70">Founded {club?.founded ?? 1984}</p>
                <h2 className="mt-1 text-2xl font-extrabold">Riverside FC</h2>
              </div>
            </div>
            <p className="my-8 text-xl leading-relaxed">{club?.about ?? "A community football club bringing local players and supporters together."}</p>
            <p className="eyebrow opacity-70">{club?.ground ?? "Riverside Community Stadium"}</p>
          </section>

          <figure className="tile p-0 md:col-span-3 md:row-span-2">
            <img src={images.fans} alt="Riverside supporters cheering from the stands" width={1200} height={912} className="h-full min-h-64 w-full object-cover" />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-card/95 px-4 py-3 text-sm font-semibold">Proudly backed by the Riverside community</figcaption>
          </figure>

          <div className="tile tile-soft flex items-start gap-4 md:col-span-2">
            <CalendarDays className="mt-1 size-5 shrink-0" />
            <div><p className="eyebrow">Established</p><p className="mt-2 font-display text-2xl font-black">{club?.founded ?? 1984}</p></div>
          </div>
          <div className="tile tile-sky flex items-start gap-4 md:col-span-2">
            <MapPin className="mt-1 size-5 shrink-0" />
            <div><p className="eyebrow">Home ground</p><p className="mt-2 font-display text-lg font-extrabold">{club?.ground ?? "Riverside Community Stadium"}</p></div>
          </div>
          <div className="tile flex items-start gap-4 md:col-span-2">
            <Users className="mt-1 size-5 shrink-0" />
            <div><p className="eyebrow">Club leadership</p><p className="mt-2 font-display font-extrabold">Coach {club?.coach ?? "Team coach"}</p><p className="font-display text-sm">Captain {club?.captain ?? "Team captain"}</p></div>
          </div>

          <section className="tile tile-soft md:col-span-4">
            <p className="eyebrow text-sky-deep">The Riverside story</p>
            <h2 className="mt-2 text-2xl font-extrabold">Built around the community</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Since {club?.founded ?? 1984}, Riverside FC has brought local players and supporters together. The club is known for quick passing, a committed squad and a warm welcome at its home ground.</p>
          </section>
          <section className="tile tile-sky md:col-span-2">
            <Trophy className="size-6" />
            <p className="eyebrow mt-4">Current season</p>
            <h2 className="mt-2 font-display text-2xl font-black">{standing ? `${points(standing)} points` : "2026/27"}</h2>
            <p className="mt-1 text-sm opacity-75">{standing ? `League position ${place}` : "Riverside FC"}</p>
          </section>
        </div>
      </div>
    </>
  );
}