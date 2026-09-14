"use client";

import { motion } from "framer-motion";
import {
  Barbell,
  FlowerLotus,
  HeartStraight,
  HandHeart,
  ChalkboardTeacher,
  MusicNotes,
} from "@phosphor-icons/react/dist/ssr";

const SPACES = [
  {
    index: "01",
    name: "Arenas Ativas",
    description:
      "Yoga, pilates, funcional, alongamento e mobilidade em três arenas simultâneas, das 8h às 16h.",
    icon: Barbell,
    span: "md:col-span-7",
  },
  {
    index: "02",
    name: "Espaços Zen",
    description:
      "Meditação guiada, qigong, yoga nidra e automassagem para desacelerar o corpo e a mente.",
    icon: FlowerLotus,
    span: "md:col-span-5",
  },
  {
    index: "03",
    name: "Espaço Saúde",
    description: "Avaliação nutricional e testes rápidos com profissionais dedicados.",
    icon: HeartStraight,
    span: "md:col-span-4",
  },
  {
    index: "04",
    name: "Arena Recovery",
    description: "Massoterapia contínua, das 9h às 16h, para recuperar o corpo entre as atividades.",
    icon: HandHeart,
    span: "md:col-span-4",
  },
  {
    index: "05",
    name: "Arena Educacional",
    description:
      "Palestras e rodas de conversa sobre nutrição, saúde mental, autocuidado e turismo de bem-estar.",
    icon: ChalkboardTeacher,
    span: "md:col-span-4",
  },
  {
    index: "06",
    name: "Palco Principal",
    description: "Abertura, aulas coletivas de FitDance e Zumba, DJ e show artístico o dia inteiro.",
    icon: MusicNotes,
    span: "md:col-span-12",
  },
];

export function SpacesGrid() {
  return (
    <section id="espacos" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:max-w-xl">
        <span className="text-xs font-bold tracking-[0.2em] text-protur-coral">
          9 ATIVIDADES · 08H ÀS 16H
        </span>
        <h2 className="text-4xl font-extrabold leading-[1.14] text-protur-green md:text-5xl">
          Um dia inteiro,
          <br /> nove formas de cuidar de você.
        </h2>
        <p className="text-base text-protur-green/70">
          Cada espaço roda em paralelo, com programação própria. Escolha o que
          fizer sentido para o seu momento e transite entre eles a qualquer hora.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {SPACES.map((space, i) => (
          <motion.div
            key={space.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl border border-protur-green/10 bg-protur-green-soft p-8 ${space.span}`}
          >
            <span className="font-mono text-5xl font-bold text-protur-green/15 transition-colors group-hover:text-protur-coral/40">
              {space.index}
            </span>
            <space.icon
              size={28}
              weight="bold"
              className="mt-6 text-protur-coral"
            />
            <h3 className="mt-4 text-xl font-bold text-protur-green">
              {space.name}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-protur-green/70">
              {space.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
