"use client";

import { useState } from "react";

type Row = {
  time: string;
  cols: string[];
};

type LectureRow = {
  time: string;
  title: string;
};

type Tab =
  | { key: string; label: string; type: "table"; headers: string[]; rows: Row[] }
  | { key: string; label: string; type: "list"; rows: LectureRow[] };

type DaySchedule = {
  key: string;
  label: string;
  tabs: Tab[];
};

const DAYS: DaySchedule[] = [
  {
    key: "19",
    label: "19 de setembro",
    tabs: [
      {
        key: "ativas",
        label: "Arenas Ativas",
        type: "table",
        headers: ["Horário", "Ativa 1", "Ativa 2", "Ativa 3"],
        rows: [
          { time: "08h – 09h", cols: ["Yoga Básico", "Alongamento", "Mobilidade"] },
          { time: "09h – 10h", cols: ["Pilates: Postura como Ferramenta", "Tai Chi", "Alongamento Consciente"] },
          { time: "10h – 11h", cols: ["Funcional", "Mobilidade", "Alongamento"] },
          { time: "11h – 12h", cols: ["Alongamento", "Tai Chi", "Mobilidade"] },
          { time: "12h – 13h", cols: ["Yoga Flow", "Mobilidade", "Alongamento"] },
          { time: "13h – 14h", cols: ["Alongamento", "Mobilidade", "Equilíbrio e Consciência Corporal"] },
          { time: "14h – 15h", cols: ["Funcional", "Alongamento", "Mobilidade"] },
          { time: "15h – 16h", cols: ["Pilates", "Alongamento Consciente", "Mobilidade"] },
        ],
      },
      {
        key: "zen",
        label: "Espaços Zen",
        type: "table",
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
        type: "table",
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
        key: "educacional",
        label: "Arena Educacional",
        type: "list",
        rows: [
          { time: "09h – 10h", title: "Palestra: Nutrição e Bem-Estar" },
          { time: "10h – 11h", title: "Roda de Conversa: Meu Início na Meditação" },
          { time: "12h – 13h", title: "Painel: Turismo de Bem-Estar: experiências, destinos e oportunidades" },
          { time: "14h – 15h", title: "Palestra: Saúde Mental, Autocuidado e Qualidade de Vida" },
        ],
      },
      {
        key: "palco",
        label: "Palco Principal",
        type: "table",
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
    ],
  },
  {
    key: "20",
    label: "20 de setembro",
    tabs: [
      {
        key: "ativas",
        label: "Arenas Ativas",
        type: "table",
        headers: ["Horário", "Ativa 1", "Ativa 2", "Ativa 3"],
        rows: [
          { time: "08h – 09h", cols: ["Yoga Amanhecer", "Mobilidade", "Alongamento"] },
          { time: "09h – 10h", cols: ["Pilates: Postura como Ferramenta", "Tai Chi", "Alongamento Consciente"] },
          { time: "10h – 11h", cols: ["Funcional", "Mobilidade", "Alongamento"] },
          { time: "11h – 12h", cols: ["Alongamento", "Tai Chi", "Mobilidade"] },
          { time: "12h – 13h", cols: ["Yoga Restaurativa", "Mobilidade", "Alongamento"] },
          { time: "13h – 14h", cols: ["Alongamento", "Mobilidade", "Equilíbrio e Consciência Corporal"] },
          { time: "14h – 15h", cols: ["Pilates", "Alongamento", "Mobilidade"] },
          { time: "15h – 16h", cols: ["Funcional", "Alongamento Consciente", "Mobilidade"] },
        ],
      },
      {
        key: "zen",
        label: "Espaços Zen",
        type: "table",
        headers: ["Horário", "Zen 1", "Zen 2"],
        rows: [
          { time: "08h – 09h", cols: ["Meditação Matinal", "Qigong"] },
          { time: "09h – 10h", cols: ["Meditação", "Yoga Nidra"] },
          { time: "10h – 11h", cols: ["Meditação", "Automassagem"] },
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
        type: "table",
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
        key: "educacional",
        label: "Arena Educacional",
        type: "list",
        rows: [
          { time: "09h – 10h", title: "Palestra: Mulher e Bem-Estar nas Diferentes Fases da Vida" },
          { time: "10h – 11h", title: "Roda de Conversa: Nutrição na Prática" },
          { time: "12h – 13h", title: "Painel: Turismo de Bem-Estar: experiências, destinos e oportunidades" },
          { time: "14h – 15h", title: "Palestra: Sono, Estresse e Qualidade de Vida" },
        ],
      },
      {
        key: "palco",
        label: "Palco Principal",
        type: "table",
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
    ],
  },
];

export function ScheduleTable() {
  const [day, setDay] = useState(DAYS[0].key);
  const [tabKey, setTabKey] = useState(DAYS[0].tabs[0].key);

  const activeDay = DAYS.find((d) => d.key === day) ?? DAYS[0];
  const activeTab = activeDay.tabs.find((t) => t.key === tabKey) ?? activeDay.tabs[0];

  return (
    <section id="programacao" className="bg-protur-green py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] text-protur-lime">
            PROGRAMAÇÃO · CAIS DO LAGO
          </span>
          <h2 className="text-4xl font-extrabold leading-[1.14] text-protur-cream md:text-5xl">
            Confira os horários e escolha suas atividades.
          </h2>
        </div>

        <div className="mb-6 inline-flex rounded-full bg-protur-cream/10 p-1">
          {DAYS.map((d) => (
            <button
              key={d.key}
              onClick={() => {
                setDay(d.key);
                setTabKey(d.tabs[0].key);
              }}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-colors ${
                day === d.key
                  ? "bg-protur-coral text-protur-cream"
                  : "text-protur-cream/70 hover:text-protur-cream"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {activeDay.tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTabKey(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tabKey === t.key
                  ? "bg-protur-lime text-protur-green"
                  : "bg-protur-cream/10 text-protur-cream/70 hover:bg-protur-cream/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab.type === "table" ? (
          <div className="overflow-x-auto rounded-2xl border border-protur-cream/10">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-protur-cream/10">
                  {activeTab.headers.map((h) => (
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
                {activeTab.rows.map((row, i) => (
                  <tr key={row.time} className={i % 2 === 0 ? "bg-protur-cream/[0.03]" : ""}>
                    <td className="px-5 py-4 text-sm font-bold text-protur-cream/90 whitespace-nowrap">
                      {row.time}
                    </td>
                    {row.cols.map((c, ci) => (
                      <td key={ci} className="px-5 py-4 text-sm text-protur-cream/75">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {activeTab.rows.map((row) => (
              <div
                key={row.time}
                className="rounded-2xl border border-protur-cream/10 bg-protur-cream/5 px-5 py-4"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-protur-lime">
                  {row.time}
                </span>
                <p className="mt-1 text-sm font-semibold text-protur-cream">{row.title}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-protur-cream/50">
          Programação sujeita a pequenos ajustes. Consulte @protureducacional no
          Instagram para atualizações.
        </p>
      </div>
    </section>
  );
}
