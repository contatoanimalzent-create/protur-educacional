import Image from "next/image";
import { RingsMotif } from "@/components/rings-motif";
import { StatsStrip } from "@/components/stats-strip";

export function AboutSection() {
  return (
    <section id="sobre" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <RingsMotif
        size={560}
        className="pointer-events-none absolute -right-40 -top-24 opacity-[0.35] md:-right-24 md:opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <span className="text-xs font-bold tracking-[0.2em] text-protur-coral">
              O QUE É A PROTUR EDUCACIONAL
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
              Turismo de bem-estar levado até dentro da sua empresa.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-protur-green/75">
              Organizamos dias de cuidado completo: movimento, respiração,
              avaliação nutricional, massoterapia e conteúdo educacional em um
              único espaço, com toda a programação rodando em paralelo, das 8h
              às 16h.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-protur-green/75">
              Cada edição reúne profissionais de yoga, pilates, meditação,
              nutrição e recovery para transformar um dia comum em uma
              experiência real de autocuidado, sem tirar ninguém da rotina.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-protur-green/10 shadow-[0_30px_60px_-30px_rgba(22,53,42,0.35)]">
              <Image
                src="/brand/programacao-01.png"
                alt="Programação real da Protur Educacional: 19 de setembro, um dia para cuidar de você"
                width={1080}
                height={1350}
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
