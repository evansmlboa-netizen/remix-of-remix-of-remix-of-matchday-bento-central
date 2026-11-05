import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Camera, HeartHandshake, MapPin, Newspaper, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamBadge } from "@/components/site/TeamBadge";
import {
  CLUB,
  articles,
  formatDate,
  formatTime,
  points,
  fixtures,
  riverside,
  standings,
  teamById,
  upcoming,
} from "@/lib/league";
import { images } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riverside FC — TeamHub" },
      { name: "description", content: "Meet Riverside FC: explore the upcoming fixtures, first-team squad, latest club news, gallery and history." },
      { property: "og:title", content: "Riverside FC — TeamHub" },
      { property: "og:description", content: "Meet Riverside FC: explore the upcoming fixtures, first-team squad, latest club news, gallery and history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const next = upcoming.find((match) => match.home === "riv" || match.away === "riv");
  const last = [...fixtures].reverse().find((match) => match.score && (match.home === "riv" || match.away === "riv"));
  const topNews = articles[0];
  const standing = standings.find((item) => item.teamId === "riv");
  const position = standings.findIndex((item) => item.teamId === "riv") + 1;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 md:pt-12">
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Hero */}
        <section className="tile fade-up relative col-span-1 min-h-[420px] p-0 md:col-span-6 lg:col-span-8 lg:row-span-2">
          <img
            src={images.hero}
            alt="Riverside FC players in light blue in action on the pitch"
            width={1600}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-card/95 p-6 backdrop-blur md:inset-x-6 md:bottom-6 md:max-w-lg md:p-8">
            <p className="eyebrow text-sky-deep">Riverside · Season {CLUB.season}</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Riverside FC</h1>
            <p className="mt-3 text-muted-foreground">
              {CLUB.tagline} A club built on quick passing, local pride and a loud home crowd.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/fixtures">
                  See fixtures <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/about">Meet the club</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Next match */}
        {next ? <Link to="/fixtures" className="tile tile-sky tile-interactive fade-up col-span-1 flex flex-col justify-between md:col-span-3 lg:col-span-4">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Next match · MW{next.matchweek}</p>
            <CalendarDays className="size-5" />
          </div>
          <div className="my-5 flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 text-center">
              <TeamBadge teamId={next.home} size="lg" />
              <span className="font-display text-sm font-bold">{teamById(next.home).name}</span>
            </div>
            <span className="font-display text-2xl font-black">vs</span>
            <div className="flex flex-col items-center gap-2 text-center">
              <TeamBadge teamId={next.away} size="lg" />
              <span className="font-display text-sm font-bold">{teamById(next.away).name}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-display font-extrabold">
              {formatDate(next.date, { weekday: "long" })} · {formatTime(next.date)}
            </span>
            <span className="flex items-center gap-1 opacity-75">
              <MapPin className="size-4" /> {next.venue}
            </span>
          </div>
        </Link> : <section className="tile tile-sky col-span-1 md:col-span-3 lg:col-span-4"><p className="eyebrow">Next match</p><p className="mt-6 font-display text-xl font-extrabold">Fixtures coming soon</p></section>}

        {/* Last result */}
        {last?.score ? <Link to="/fixtures" className="tile tile-ink tile-interactive fade-up col-span-1 flex flex-col justify-between md:col-span-3 lg:col-span-4">
          <p className="eyebrow opacity-70">Latest result</p>
          <div className="my-4 space-y-2 font-display">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{teamById(last.home).name}</span>
              <span className="text-3xl font-black">{last.score[0]}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{teamById(last.away).name}</span>
              <span className="text-3xl font-black">{last.score[1]}</span>
            </div>
          </div>
          <p className="text-sm opacity-70">Full time · {formatDate(last.date, { weekday: "short" })}</p>
        </Link> : <section className="tile tile-ink col-span-1 md:col-span-3 lg:col-span-4"><p className="eyebrow opacity-70">Latest result</p><p className="mt-6 font-display text-xl font-extrabold">Results coming soon</p></section>}

        <section className="tile tile-soft fade-up col-span-1 flex flex-col justify-between md:col-span-6 lg:col-span-5 lg:row-span-2">
          <div className="flex items-center justify-between"><p className="eyebrow">Club snapshot</p><Trophy className="size-5" /></div>
          <div className="my-5 flex items-center gap-4"><TeamBadge teamId="riv" size="lg" /><div><h2 className="text-2xl font-extrabold">Riverside FC</h2><p className="text-sm text-muted-foreground">Founded {riverside?.founded ?? 1984}</p></div></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-card p-4"><p className="eyebrow text-muted-foreground">League position</p><p className="mt-1 font-display text-2xl font-black">{position || "—"}<span className="ml-1 text-sm font-semibold">{standing ? `of ${standings.length}` : ""}</span></p></div>
            <div className="rounded-xl bg-card p-4"><p className="eyebrow text-muted-foreground">Points</p><p className="mt-1 font-display text-2xl font-black">{standing ? points(standing) : "—"}</p></div>
          </div>
          <Link to="/squad" className="mt-5 flex items-center gap-2 font-display font-bold">Meet the squad <ArrowRight className="size-4" /></Link>
        </section>

        {/* Top story */}
        {topNews && <Link
          to="/news/$slug"
          params={{ slug: topNews.slug }}
          className="tile tile-interactive fade-up group col-span-1 flex flex-col gap-4 p-0 md:col-span-6 lg:col-span-7"
        >
          <div className="grid h-full gap-0 sm:grid-cols-2">
            <img
              src={images.celebration}
              alt="Riverside players celebrating a goal"
              loading="lazy"
              width={1200}
              height={912}
              className="h-56 w-full object-cover sm:h-full"
            />
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="eyebrow text-sky-deep">{topNews.category}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{topNews.title}</h3>
                <p className="mt-2 text-muted-foreground">{topNews.excerpt}</p>
              </div>
              <span className="mt-4 flex items-center gap-1 font-display text-sm font-bold">
                Read story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>}

        {/* Quick links */}
        <QuickTile to="/news" icon={<Newspaper />} title="Club news" text={`${articles.length} recent stories`} tone="tile-soft" span="lg:col-span-4" />
        <QuickTile to="/squad" icon={<Users />} title="First team" text="Meet the Riverside squad" tone="tile-sky" span="lg:col-span-3" />
        <QuickTile to="/gallery" icon={<Camera />} title="Gallery" text="Matchday moments" tone="tile-soft" span="lg:col-span-4" />

        {/* Community */}
        <Link
          to="/about"
          className="tile tile-interactive fade-up relative col-span-1 min-h-[220px] p-0 md:col-span-6 lg:col-span-8"
        >
          <div className="grid h-full md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
              <HeartHandshake className="size-7" />
              <h2 className="text-3xl font-extrabold">One club. One community.</h2>
              <p className="max-w-lg text-muted-foreground">
                Learn about Riverside FC, our home ground and the people who bring the club to life.
              </p>
              <span className="mt-2 flex items-center gap-1 font-display font-bold">
                About the club <ArrowRight className="size-4" />
              </span>
            </div>
            <img
              src={images.youth}
              alt="Coach with children at a youth football session"
              loading="lazy"
              width={1200}
              height={912}
              className="h-60 w-full object-cover md:h-full"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

function QuickTile({
  to,
  icon,
  title,
  text,
  tone,
  span,
}: {
  to: "/news" | "/squad" | "/gallery";
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: string;
  span: string;
}) {
  return (
    <Link
      to={to}
      className={`tile ${tone} tile-interactive fade-up group col-span-1 flex flex-col justify-between md:col-span-2 ${span} [&_svg]:size-6`}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-card">{icon}</span>
      <div>
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="flex items-center justify-between opacity-75">
          {text}
          <ArrowRight className="size-4! transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}
