const STATS = [
  { value: "9", label: "espaços simultâneos" },
  { value: "2", label: "dias de programação" },
  { value: "08h–16h", label: "de atividades por dia" },
  { value: "20+", label: "atividades diferentes" },
];

export function StatsStrip() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 md:grid-cols-4 md:px-10">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="font-mono text-4xl font-bold text-protur-green md:text-5xl">
            {stat.value}
          </span>
          <span className="mt-1 text-sm text-protur-green/60">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
