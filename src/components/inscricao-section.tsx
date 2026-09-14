"use client";

import { FormEvent, useState } from "react";
import { CalendarBlank, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { pulseClient, PULSE_EVENT_ID } from "@/lib/pulse";

type Status = "idle" | "loading" | "success" | "error";

export function InscricaoSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    const { error } = await pulseClient.from("protur_educacional_inscricoes").insert({
      event_id: PULSE_EVENT_ID,
      nome_completo: String(data.get("nome_completo") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      telefone: String(data.get("telefone") ?? "").trim(),
      empresa: String(data.get("empresa") ?? "").trim() || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section
      id="inscricao"
      className="relative overflow-hidden bg-protur-green-soft py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-protur-green px-4 py-2 text-xs font-bold tracking-wide text-protur-cream">
              <CalendarBlank size={16} weight="bold" />
              19 E 20 DE SETEMBRO · 08H ÀS 16H
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
              Garanta sua vaga. É gratuito.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-protur-green/75">
              Faça sua inscrição para o dia de bem-estar da Protur Educacional.
              Vagas limitadas nas 9 atividades simultâneas.
            </p>
          </div>

          <div className="md:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-protur-green/10 bg-protur-cream p-6 shadow-[0_30px_60px_-30px_rgba(12,42,77,0.3)] md:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="nome_completo"
                  required
                  placeholder="Nome completo"
                  className="sm:col-span-2 rounded-xl border border-protur-green/15 bg-white px-4 py-3 text-sm text-protur-green placeholder:text-protur-green/40 outline-none focus:border-protur-coral"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail"
                  className="rounded-xl border border-protur-green/15 bg-white px-4 py-3 text-sm text-protur-green placeholder:text-protur-green/40 outline-none focus:border-protur-coral"
                />
                <input
                  type="tel"
                  name="telefone"
                  required
                  placeholder="Telefone"
                  className="rounded-xl border border-protur-green/15 bg-white px-4 py-3 text-sm text-protur-green placeholder:text-protur-green/40 outline-none focus:border-protur-coral"
                />
                <input
                  name="empresa"
                  placeholder="Empresa (opcional)"
                  className="sm:col-span-2 rounded-xl border border-protur-green/15 bg-white px-4 py-3 text-sm text-protur-green placeholder:text-protur-green/40 outline-none focus:border-protur-coral"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="mt-5 w-full rounded-full bg-protur-coral py-6 text-base font-extrabold uppercase tracking-wide text-protur-cream hover:bg-protur-coral/90 disabled:opacity-60"
              >
                {status === "loading" ? "Enviando..." : "Confirmar inscrição"}
              </Button>

              {status === "success" && (
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-protur-lime">
                  <CheckCircle size={18} weight="fill" />
                  Inscrição confirmada! Nos vemos dia 19 ou 20 de setembro.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600">
                  <WarningCircle size={18} weight="fill" />
                  Não deu pra enviar agora. Tenta de novo em instantes.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
