import { Plus } from "lucide-react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

const CHAPTERS: readonly {
  kicker: string;
  title: string;
  intro: string;
  items: readonly string[];
}[] = [
  {
    kicker: "Capítulo 01",
    title: "Bom dia. Quem vai fazer o café?",
    intro: "Os 3 ritmos de manhãs possíveis, e os preparos para começar o dia.",
    items: [
      "Ovos mexidos cremosos",
      "Omelete na medida certa",
      "Tapioca sem mistério (o truque da peneira)",
      "Pão rústico de fermentação longa na panela",
    ],
  },
  {
    kicker: "Capítulo 02",
    title: "Eu já tinha pegado ele pela barriga",
    intro:
      "Rotina e 15 a 20 marmitas. Como comprar possibilidades, e não receitas isoladas.",
    items: [
      "Sobrecoxa desossada com batatas e cenouras assadas",
      "Arroz com alho e a versão amarelinha",
      "Feijão para a semana (e como virar feijoada)",
      "Penne cremoso com frango",
      "Branqueamento coringa de legumes",
      "Carne bovina com purê de batatas",
      "Carne moída coringa",
      "Guia completo de congelamento",
    ],
  },
  {
    kicker: "Capítulo 03",
    title: "Hoje vamos receber",
    intro:
      "E sentar à mesa. Cronograma passo a passo de anfitrião, com receitas calculadas para 4 pessoas.",
    items: [
      "Tábua de queijos, frutas e pães",
      "Ceviche de caju",
      "Caponata de berinjela",
      "Massa fresca caseira aberta no rolo",
      "Molho pomodoro assado",
      "Molho bechamel com cebola piquée",
      "Molho pesto de manjericão",
    ],
  },
  {
    kicker: "Capítulo 04",
    title: "Hoje eu cozinho para você",
    intro:
      "Noite a dois. Como dividir o preparo a quatro mãos sem passar a noite no fogão.",
    items: [
      "Caldo de legumes caseiro",
      "Risoto de queijo cremoso sem complicação",
      "Pudim clássico lisinho, com os segredos para a calda nunca açucarar",
    ],
  },
];

/** Jornada dos 5 módulos, abaixo dos cards ilustrados. */
export function ChapterRoadmap() {
  return (
    <div className="mx-auto mt-20 max-w-3xl">
      <h3 className="text-center text-3xl leading-[1.12] text-balance text-charcoal sm:text-4xl">
        Aqui vai um spoiler
      </h3>

      <div className="mt-10 space-y-3">
        {CHAPTERS.map((chapter, index) => (
          <details
            key={chapter.kicker}
            name="roteiro"
            open={index === 0}
            className="group rounded-xl border border-charcoal/10 bg-cotton shadow-soft open:[&_svg]:rotate-45"
          >
            <summary
              className={`flex cursor-pointer list-none items-start justify-between gap-4 p-5 marker:hidden sm:p-6 [&::-webkit-details-marker]:hidden ${focusRing} rounded-xl`}
            >
              <span className="min-w-0">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-terracotta uppercase">
                  {chapter.kicker}
                </span>
                <span className="mt-1 block font-heading text-xl leading-snug text-charcoal sm:text-2xl">
                  {chapter.title}
                </span>
              </span>
              <Plus
                className="mt-1 size-5 shrink-0 text-terracotta transition-[rotate] duration-200"
                aria-hidden
              />
            </summary>
            <div className="px-5 pb-6 sm:px-6">
              <p className="text-sm leading-relaxed text-pretty text-charcoal/75">
                {chapter.intro}
              </p>
              <ul className="mt-4 space-y-2">
                {chapter.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-olive"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
