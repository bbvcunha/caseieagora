"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

const TABS = [
  { id: "sumario", label: "Sumário" },
  { id: "balanca", label: "Sem Balança" },
  { id: "receita", label: "Receita Real" },
  { id: "marmitas", label: "Organização dos Preparos" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SUMMARY = [
  {
    label: "Antes de tudo... (p. 3)",
    text: "Uma frigideira, uma panela elétrica e uma história que começou na cozinha",
  },
  {
    label: "Guia Introdutório (p. 10)",
    text: "O básico da nossa cozinha — utensílios, facas, medidas sem balança, comida segura, fogo e temperos",
  },
  {
    label: "Capítulo 01 (p. 24)",
    text: "Bom dia. Quem vai fazer o café? — Ovos mexidos cremosos • Omelete • Tapioca sem mistério • Pão de fermentação longa",
  },
  {
    label: "Capítulo 02 (p. 45)",
    text: "Eu já tinha pegado ele pela barriga — 15 a 20 marmitas • Sobrecoxa assada • Arroz com alho • Feijão • Penne cremoso • Carne bovina com purê • Carne moída coringa",
  },
  {
    label: "Capítulo 03 (p. 76)",
    text: "Hoje vamos receber — Cronograma de anfitrião • Tábua de queijos • Ceviche de caju • Caponata • Massa fresca • Pomodoro, Bechamel e Pesto",
  },
  {
    label: "Capítulo 04 (p. 116)",
    text: "Hoje eu cozinho para você — Risoto de queijo • Caldo de legumes • Pudim clássico sem açucarar",
  },
] as const;

function PhonePage({
  children,
  footer,
}: {
  children: ReactNode;
  footer: string;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <p className="text-center text-[9px] font-semibold tracking-[0.16em] text-charcoal/40 uppercase">
        Casei, e agora o que vamos comer?
      </p>
      <div className="mt-3 flex-1">{children}</div>
      <p className="mt-4 border-t border-charcoal/10 pt-2 text-center text-[10px] tracking-wide text-charcoal/50">
        {footer}
      </p>
    </div>
  );
}

function SumarioPage() {
  return (
    <PhonePage footer="Sumário · 138 páginas">
      <h4 className="font-heading text-lg leading-tight text-charcoal">
        Sumário
      </h4>
      <ol className="mt-3 space-y-2.5">
        {SUMMARY.map((entry) => (
          <li key={entry.label}>
            <p className="text-[11px] font-semibold leading-snug text-terracotta">
              {entry.label}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-pretty text-charcoal/80">
              {entry.text}
            </p>
          </li>
        ))}
      </ol>
    </PhonePage>
  );
}

function BalancaPage() {
  const measures = [
    {
      lead: "1 xícara de chá = 240 ml",
      note: "(~120 a 140 g de farinha ou 180 g de arroz cru)",
    },
    {
      lead: "1 colher de sopa = 15 ml",
      note: "(~12 a 15 g de manteiga)",
    },
    {
      lead: "1 colher de chá = 5 ml",
      note: "(~5 g de sal fino)",
    },
  ];

  return (
    <PhonePage footer="Página 14 de 138">
      <h4 className="font-heading text-lg leading-tight text-balance text-charcoal">
        E se a gente ainda não tiver balança?
      </h4>
      <p className="mt-3 text-[11px] leading-relaxed text-pretty text-charcoal/80">
        Ninguém precisa deixar de cozinhar hoje por não ter uma. Todas as
        receitas trazem medidas em gramas e também o padrão brasileiro de
        medidas caseiras:
      </p>
      <ul className="mt-3 space-y-2">
        {measures.map((measure) => (
          <li
            key={measure.lead}
            className="rounded-lg bg-olive-mist/80 px-2.5 py-2"
          >
            <p className="text-[11px] font-semibold leading-snug text-charcoal">
              {measure.lead}
            </p>
            <p className="text-[10px] leading-snug text-charcoal/70">
              {measure.note}
            </p>
          </li>
        ))}
      </ul>
    </PhonePage>
  );
}

function ReceitaPage() {
  return (
    <PhonePage footer="Página 33 de 138">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-terracotta uppercase">
        Para 2 · 10 minutos · Muito fácil
      </p>
      <h4 className="mt-1.5 font-heading text-lg leading-tight text-charcoal">
        Ovos mexidos cremosos
      </h4>

      <p className="mt-3 text-[10px] font-semibold tracking-[0.14em] text-olive uppercase">
        Você vai precisar
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-pretty text-charcoal/85">
        4 ovos • 1/2 colher de sopa de manteiga (7 g) • Sal, pimenta e páprica •
        1 colher de sopa (15 ml) de leite
      </p>

      <p className="mt-3 text-[10px] font-semibold tracking-[0.14em] text-olive uppercase">
        Passo chave
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-pretty text-charcoal/85">
        Quando os ovos formarem pedaços macios e brilhantes, sem líquido de ovo
        cru escorrendo pela frigideira, retirem do fogo.
      </p>

      <div className="mt-3 rounded-lg bg-olive-mist px-2.5 py-2">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-olive uppercase">
          Segredo de chef
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-pretty text-charcoal/85">
          Os ovos continuam recebendo calor depois de desligar o fogo.
          Retirem-nos enquanto ainda estiverem cremosos.
        </p>
      </div>

      <div className="mt-2 rounded-lg border border-dashed border-terracotta/40 bg-terracotta-soft/10 px-2.5 py-2">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-terracotta uppercase">
          Deu errado?
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-pretty text-charcoal/85">
          Passou do ponto? Comam e tentem novamente amanhã. Bem-vindos à
          cozinha.
        </p>
      </div>
    </PhonePage>
  );
}

function MarmitasPage() {
  const groups = [
    {
      title: "Congela muito bem",
      text: "Arroz branco (com alho ou açafrão), feijão cozido, sobrecoxas assadas, frango desfiado, carne moída refogada, brócolis e cenoura branqueados, molho pomodoro.",
    },
    {
      title: "Não congela bem",
      text: "Batata inglesa cozida ou assada em cubos (prefiram consumi-la nas marmitas da geladeira dos primeiros 3 dias).",
    },
    {
      title: "Dica do micro-ondas",
      text: "Pinguem 1 colher de sopa de água sobre o arroz antes de aquecer para o vapor devolver toda a maciez.",
    },
  ];

  return (
    <PhonePage footer="Página 74 de 138">
      <h4 className="font-heading text-lg leading-tight text-balance text-charcoal">
        O que entra no freezer e o que fica na geladeira?
      </h4>
      <ul className="mt-3 space-y-2.5">
        {groups.map((group) => (
          <li key={group.title}>
            <p className="text-[11px] font-semibold leading-snug text-olive">
              {group.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-pretty text-charcoal/80">
              {group.text}
            </p>
          </li>
        ))}
      </ul>
    </PhonePage>
  );
}

const PAGES: Record<TabId, () => ReactNode> = {
  sumario: SumarioPage,
  balanca: BalancaPage,
  receita: ReceitaPage,
  marmitas: MarmitasPage,
};

/** Prévia das páginas do e-book, dentro de uma moldura de celular. */
export function EbookPreview() {
  const [active, setActive] = useState<TabId>("sumario");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = TABS.findIndex((tab) => tab.id === active);
  const Page = PAGES[active];

  function selectTab(index: number, focus: boolean) {
    const next = TABS[index];
    if (!next) return;
    setActive(next.id);
    if (focus) tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = TABS.length - 1;
    const next: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };

    if (event.key in next) {
      event.preventDefault();
      selectTab(next[event.key], true);
    }
  }

  return (
    <div className="mt-20 lg:mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">
          <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
          <span className="max-w-[14rem] text-balance sm:max-w-none">
            Feito para usar na bancada da cozinha
          </span>
          <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
        </p>
        <h3 className="mt-5 text-3xl leading-[1.12] text-balance text-charcoal sm:text-4xl">
          Espie por dentro das 138 páginas otimizadas para celular
        </h3>
        <p className="mt-5 text-base leading-relaxed text-pretty text-charcoal/75">
          Nada de dar zoom em PDF com letra miúda. Toque nas abas abaixo para
          ver como as páginas foram desenhadas para você ler no celular
          enquanto cozinha:
        </p>
      </div>

      <div className="mx-auto mt-8 min-w-0 max-w-3xl">
        <div
          role="tablist"
          aria-label="Páginas do e-book"
          onKeyDown={handleKeyDown}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {TABS.map((tab, index) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`ebook-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="ebook-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(index, false)}
                className={`min-h-11 rounded-full px-3 py-2 text-center text-xs leading-tight font-semibold sm:text-sm ${focusRing} ${
                  isActive
                    ? "bg-terracotta text-white shadow-cta"
                    : "bg-cotton text-charcoal ring-1 ring-charcoal/10 hover:ring-terracotta/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="ebook-panel"
          aria-labelledby={`ebook-tab-${active}`}
          className="mt-5"
        >
          <div className="relative mx-auto w-full max-w-[19.5rem]">
            <div className="rounded-[2.5rem] bg-charcoal p-[0.55rem] shadow-lift ring-1 ring-charcoal/15">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#FAF6F0]">
                <div
                  aria-hidden
                  className="absolute top-2.5 left-1/2 z-10 h-[1.15rem] w-[5.25rem] -translate-x-1/2 rounded-full bg-charcoal"
                />
                <div className="h-[32rem] overflow-y-auto overscroll-contain px-4 pt-9 pb-4">
                  <Page />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
