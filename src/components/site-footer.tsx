import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function SiteFooter() {
  return (
    <footer className="bg-protur-green py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left md:px-10">
        <div className="inline-flex items-center rounded-full bg-protur-cream/10 px-4 py-2 text-xs font-bold tracking-wide text-protur-cream">
          PROTUR EDUCACIONAL
        </div>

        <p className="text-sm text-protur-cream/50">
          Turismo de bem-estar para empresas e eventos.
        </p>

        <a
          href="https://www.instagram.com/protureducacional/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-sm font-semibold text-protur-cream/80 transition-colors hover:text-protur-lime"
        >
          <InstagramLogo size={18} weight="bold" />
          @protureducacional
        </a>
      </div>
    </footer>
  );
}
