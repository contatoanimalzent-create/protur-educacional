import Image from "next/image";
import { RingsMotif } from "@/components/rings-motif";
import { StatsStrip } from "@/components/stats-strip";

export function AboutSection() {
  return (
    <section id="sobre" className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28">
      <RingsMotif
        size={560}
        className="pointer-events-none absolute -right-40 -top-24 opacity-[0.35] md:-right-24 md:opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <span className="text-xs font-bold tracking-[0.2em] text-protur-coral">
              PESSOAS EM MOVIMENTO PARA UM AMANHÃ MELHOR
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
              Conhecimento, saúde, bem-estar e experiências em um só lugar.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-protur-green/75">
              Uma plataforma de educação experiencial voltada à saúde, ao
              movimento e ao bem-estar, levada até dentro da sua empresa.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-protur-green/75">
              Em 19 e 20 de setembro, reunimos profissionais de yoga,
              pilates, meditação, nutrição e recovery em um único dia de
              cuidado completo, com toda a programação rodando em paralelo,
              das 8h às 16h.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-protur-green/10 shadow-[0_30px_60px_-30px_rgba(12,42,77,0.25)]">
              <Image
                src="/brand/poster-hiker.png"
                alt="Protur Educacional: educação, saúde, bem-estar e experiências que transformam qualidade de vida"
                width={1080}
                height={1080}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-protur-green/10 pt-14">
          <StatsStrip />
        </div>
      </div>
    </section>
  );
}
