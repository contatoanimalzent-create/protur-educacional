"use client";

import { FormEvent, useState } from "react";
import { CalendarBlank, MapPin, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "repetida" | "cpf" | "error";

function mascaraCpf(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function cpfValido(valor: string) {
  const d = valor.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

  const digito = (ate: number) => {
    let soma = 0;
    for (let i = 0; i < ate; i += 1) soma += Number(d[i]) * (ate + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

export function InscricaoSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [cpf, setCpf] = useState("");
  const [ingresso, setIngresso] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cpfValido(cpf)) {
      setStatus("cpf");
      return;
    }

    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // A inscricao vira ingresso da Pulse (pedido + QR de check-in) e a Pulse manda o e-mail.
    // O CPF e a chave de duplicidade: repetiu o CPF, devolve o ingresso que ja existe.
    const resposta = await fetch("/api/inscricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_completo: String(data.get("nome_completo") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        telefone: String(data.get("telefone") ?? "").trim(),
        endereco: String(data.get("endereco") ?? "").trim(),
        cpf,
      }),
    })
      .then(async (res) => (res.ok ? await res.json() : null))
      .catch(() => null);

    if (!resposta?.ok) {
      setStatus(resposta?.error === "cpf_invalido" ? "cpf" : "error");
      return;
    }

    setIngresso(resposta.ticket_number ?? null);
    setStatus(resposta.already ? "repetida" : "success");
    form.reset();
    setCpf("");
  }

  return (
    <section
      id="inscricao"
      className="relative overflow-hidden bg-protur-coral-soft py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-protur-green px-4 py-2 text-xs font-bold tracking-wide text-protur-cream">
                <CalendarBlank size={16} weight="bold" />
                19 E 20 DE SETEMBRO · 08H ÀS 16H
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-protur-coral px-4 py-2 text-xs font-bold tracking-wide text-protur-cream">
                <MapPin size={16} weight="bold" />
                CAIS DO LAGO · SETOR DE CLUBES SUL
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
              Garanta sua vaga. É gratuito.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-protur-green/75">
              Faça sua inscrição para o dia de bem-estar da Protur Educacional,
              no Cais do Lago. Vagas limitadas nas 9 atividades simultâneas.
            </p>
          </div>

          <div className="md:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-protur-green/10 bg-protur-cream p-6 md:p-8"
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
                  name="cpf"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  value={cpf}
                  onChange={(event) => {
                    setCpf(mascaraCpf(event.target.value));
                    if (status === "cpf") setStatus("idle");
                  }}
                  placeholder="CPF"
                  className="sm:col-span-2 rounded-xl border border-protur-green/15 bg-white px-4 py-3 text-sm text-protur-green placeholder:text-protur-green/40 outline-none focus:border-protur-coral"
                />
                <input
                  name="endereco"
                  required
                  placeholder="Endereço (cidade/bairro)"
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
                  Inscrição confirmada! Confira seu e-mail com o código de acesso.
                </p>
              )}
              {status === "repetida" && (
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-protur-green">
                  <CheckCircle size={18} weight="fill" />
                  Esse CPF já tem inscrição{ingresso ? ` (${ingresso})` : ""}. O ingresso é o
                  mesmo, procure o e-mail que já te enviamos.
                </p>
              )}
              {status === "cpf" && (
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600">
                  <WarningCircle size={18} weight="fill" />
                  Confira o CPF: os números não fecham.
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
