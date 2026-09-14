import {
  Broadcast,
  CalendarBlank,
  Clock,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const STATS = [
  { value: "9", label: "atividades simultâneas", icon: SquaresFour },
  { value: "2", label: "dias de programação", icon: CalendarBlank },
  { value: "08h–16h", label: "de atividades por dia", icon: Clock },
  { value: "20+", label: "atividades diferentes", icon: Broadcast },
];

export function StatsStrip() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-protur-cream/10 overflow-hidden rounded-3xl bg-protur-green sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-3 px-8 py-10 sm:border-t-0"
        >
          <stat.icon size={22} weight="bold" className="text-protur-lime" />
          <span className="font-mono text-4xl font-bold text-protur-cream md:text-5xl">
            {stat.value}
          </span>
          <span className="text-sm text-protur-cream/60">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
