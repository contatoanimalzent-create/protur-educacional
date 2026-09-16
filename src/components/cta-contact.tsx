import { InstagramLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { RingsMotif } from "@/components/rings-motif";

export function CtaContact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-protur-green-soft py-24 md:py-32">
      <RingsMotif
        size={480}
        className="pointer-events-none absolute -bottom-32 -left-32 opacity-[0.25]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="text-xs font-bold tracking-[0.2em] text-protur-coral">
          FALE COM A GENTE
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
          Ficou com alguma dúvida sobre o dia 19 ou 20?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-protur-green/70">
          O evento é aberto ao público. Manda uma mensagem no Instagram que a
          gente responde rapidinho.
        </p>

        <a
          href="https://www.instagram.com/protureducacional/"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-protur-coral px-8 py-4 text-base font-bold text-protur-cream transition-colors hover:bg-protur-coral/90"
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
