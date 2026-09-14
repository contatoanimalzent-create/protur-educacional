"use client";

import { useState } from "react";

type Row = {
  time: string;
  cols: string[];
};

type Tab = {
  key: string;
  label: string;
  headers: string[];
  rows: Row[];
};

const TABS: Tab[] = [
  {
    key: "ativas",
    label: "Arenas Ativas",
    headers: ["Horário", "Ativa 1", "Ativa 2", "Ativa 3"],
    rows: [
      { time: "08h – 09h", cols: ["Yoga Básico", "Alongamento", "Mobilidade"] },
      {
        time: "09h – 10h",
        cols: ["Pilates: Postura como Ferramenta", "Tai Chi", "Alongamento Consciente"],
      },
      { time: "10h – 11h", cols: ["Funcional", "Mobilidade", "Alongamento"] },
      { time: "11h – 12h", cols: ["Alongamento", "Tai Chi", "Mobilidade"] },
      { time: "12h – 13h", cols: ["Yoga Flow", "Mobilidade", "Alongamento"] },
      {
        time: "13h – 14h",
        cols: ["Alongamento", "Mobilidade", "Equilíbrio e Consciência Corporal"],
      },
      { time: "14h – 15h", cols: ["Funcional", "Alongamento", "Mobilidade"] },
      { time: "15h – 16h", cols: ["Pilates", "Alongamento Consciente", "Mobilidade"] },
    ],
  },
  {
    key: "zen",
    label: "Espaços Zen",
    headers: ["Horário", "Zen 1", "Zen 2"],
    rows: [
      { time: "08h – 09h", cols: ["Meditação Guiada", "Qigong"] },
      { time: "09h – 10h", cols: ["Meditação", "Yoga Nidra"] },
      { time: "10h – 11h", cols: ["Yoga Nidra", "Automassagem"] },
      { time: "11h – 12h", cols: ["Meditação", "Qigong"] },
      { time: "12h – 13h", cols: ["Meditação Guiada", "Respiração e Relaxamento"] },
      { time: "13h – 14h", cols: ["Meditação", "Qigong"] },
      { time: "14h – 15h", cols: ["Yoga Nidra", "Automassagem"] },
      { time: "15h – 16h", cols: ["Meditação + Gratidão", "Relaxamento Guiado"] },
    ],
  },
  {
    key: "recovery",
    label: "Saúde + Recovery",
    headers: ["Horário", "Saúde", "Recovery"],
    rows: [
      { time: "08h – 09h", cols: ["—", "—"] },
      { time: "09h – 10h", cols: ["Avaliação Nutricional", "Massoterapia"] },
      { time: "10h – 11h", cols: ["Avaliação Nutricional", "Massoterapia"] },
      { time: "11h – 12h", cols: ["Testes Rápidos", "Massoterapia"] },
      { time: "12h – 13h", cols: ["Avaliação Nutricional", "Massoterapia"] },
      { time: "13h – 14h", cols: ["Avaliação Nutricional", "Massoterapia"] },
      { time: "14h – 15h", cols: ["Testes Rápidos", "Massoterapia"] },
      { time: "15h – 16h", cols: ["Avaliação Nutricional", "Massoterapia"] },
    ],
  },
  {
    key: "palco",
    label: "Palco Principal",
    headers: ["Horário", "No palco"],
    rows: [
      { time: "08h – 09h", cols: ["Abertura + DJ de recepção"] },
      { time: "09h – 10h", cols: ["DJ em volume reduzido"] },
      { time: "10h – 11h", cols: ["DJ em volume reduzido"] },
      { time: "11h – 12h", cols: ["Aula coletiva de FitDance"] },
      { time: "12h – 13h", cols: ["DJ em volume reduzido"] },
      { time: "13h – 14h", cols: ["Aula coletiva de Zumba Fitness"] },
      { time: "14h – 15h", cols: ["DJ em volume reduzido"] },
      { time: "15h – 16h", cols: ["Show artístico + DJ"] },
    ],
  },
];

export function ScheduleTable() {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section id="programacao" className="bg-protur-green py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] text-protur-lime">
            PROGRAMAÇÃO · 19 E 20 DE SETEMBRO
          </span>
          <h2 className="text-4xl font-extrabold leading-[1.14] text-protur-cream md:text-5xl">
            Confira os horários e escolha suas atividades.
          </h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === t.key
                  ? "bg-protur-lime text-protur-green"
                  : "bg-protur-cream/10 text-protur-cream/70 hover:bg-protur-cream/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-protur-cream/10">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-protur-cream/10">
                {tab.headers.map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-protur-lime"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tab.rows.map((row, i) => (
                <tr
                  key={row.time}
                  className={i % 2 === 0 ? "bg-protur-cream/[0.03]" : ""}
                >
                  <td className="px-5 py-4 text-sm font-bold text-protur-cream/90 whitespace-nowrap">
                    {row.time}
                  </td>
                  {row.cols.map((c, ci) => (
                    <td
                      key={ci}
                      className="px-5 py-4 text-sm text-protur-cream/75"
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-protur-cream/50">
          Programação válida para os dois dias do evento, das 8h às 16h. Consulte
          @protureducacional no Instagram para atualizações.
        </p>
      </div>
    </section>
  );
}
