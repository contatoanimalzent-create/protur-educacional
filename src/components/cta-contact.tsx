import { InstagramLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { RingsMotif } from "@/components/rings-motif";

export function CtaContact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-protur-cream py-24 md:py-32">
      <RingsMotif
        size={480}
        className="pointer-events-none absolute -bottom-32 -left-32 opacity-[0.25]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="text-xs font-bold tracking-[0.2em] text-protur-coral">
          LEVE PARA A SUA EMPRESA OU EVENTO
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
          Um dia de bem-estar para o seu time começa com uma mensagem.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-protur-green/70">
          Hoje o canal direto da Protur Educacional é o Instagram. Manda uma
          mensagem contando o tamanho do seu time e a data pretendida, que a
          gente monta a proposta de espaços e programação.
        </p>

        <a
          href="https://www.instagram.com/protureducacional/"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-protur-green px-8 py-4 text-base font-bold text-protur-cream transition-transform hover:-translate-y-0.5"
        >
          <InstagramLogo size={22} weight="bold" />
          Falar no Instagram
          <ArrowRight size={18} weight="bold" />
        </a>

        <p className="mt-6 text-sm text-protur-green/50">
          @protureducacional
        </p>
      </div>
    </section>
  );
}
