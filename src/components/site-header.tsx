"use client";

import { useEffect, useState } from "react";
import { InstagramLogo, List, X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#sobre", label: "O que é" },
  { href: "#espacos", label: "Espaços" },
  { href: "#programacao", label: "Programação" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-protur-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(22,53,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#topo"
          className="inline-flex items-center rounded-full bg-protur-green px-4 py-2 text-xs font-bold tracking-wide text-protur-cream"
        >
          PROTUR EDUCACIONAL
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-protur-green/80 transition-colors hover:text-protur-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://www.instagram.com/protureducacional/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-protur-green/70 transition-colors hover:text-protur-green"
            aria-label="Instagram da Protur Educacional"
          >
            <InstagramLogo size={22} weight="bold" />
          </a>
          <Button
            asChild
            className="rounded-full bg-protur-coral px-5 text-protur-green hover:bg-protur-coral/90"
          >
            <a href="#contato">Levar para minha empresa</a>
          </Button>
        </div>

        <button
          className="text-protur-green md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-protur-green/10 bg-protur-cream px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-protur-green"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 rounded-full bg-protur-coral text-protur-green hover:bg-protur-coral/90"
            >
              <a href="#contato" onClick={() => setOpen(false)}>
                Levar para minha empresa
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
