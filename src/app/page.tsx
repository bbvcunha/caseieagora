import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowUp,
  Check,
  Clock,
  CookingPot,
  Headphones,
  Lock,
  Plus,
  Recycle,
  ShoppingBasket,
  Soup,
  Users,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { ChapterRoadmap } from "@/components/chapter-roadmap";
import { CtaButton } from "@/components/cta-button";
import { EbookPreview } from "@/components/ebook-preview";
import { PlaylistShowcase } from "@/components/playlist-showcase";
import { Testimonials } from "@/components/testimonials";
import { CHECKOUT_URL } from "@/lib/checkout";
import { PLAYLISTS } from "@/lib/playlists";
import { createQrCode } from "@/lib/qr";

/* -------------------------------------------------------------------------- */
/*  Conteúdo e configuração (edite aqui, sem mexer no layout)                  */
/* -------------------------------------------------------------------------- */

const BOOK_TITLE = "Casei, e agora o que vamos comer?";

const PRICE = {
  currency: "R$",
  whole: "39",
  cents: "90",
  originalWhole: "79",
  originalCents: "80",
  discountPercent: 50,
} as const;

const BUY_LABEL = "Quero meu ebook por 39,90";

const HERO_POINTS = [
  "E-book digital (138 páginas feitas para ler no celular)",
  "Acesso imediato no e-mail + 4 playlists no Spotify",
  "Garantia de 7 dias",
] as const;

const NAV_LINKS = [
  { href: "#para-quem", label: "Para quem é" },
  { href: "#livro", label: "O livro" },
  { href: "#playlists", label: "Playlists" },
  { href: "#autores", label: "Autores" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;

/** O que vem dentro do e-book. */
const INSIDE: readonly { icon: LucideIcon; text: string }[] = [
  {
    icon: Utensils,
    text: "Guia introdutório: corte seguro, controle de fogo (baixo, médio e alto), temperos e segurança alimentar (padrão ANVISA/USDA)",
  },
  {
    icon: CookingPot,
    text: "Lista enxuta de utensílios essenciais + tabela de medidas caseiras (para quem ainda não tem balança)",
  },
  {
    icon: ShoppingBasket,
    text: "Sistema das 15 a 20 marmitas quinzenais + lista de compras inteligente e guia do que congela e não congela bem",
  },
  {
    icon: Wine,
    text: "Cronograma prático para receber amigos (receitas para 4 pessoas) e jantar romântico a dois sem ficar preso no fogão",
  },
  {
    icon: Headphones,
    text: "4 playlists exclusivas no Spotify, acessíveis por QR Code ou clique direto no PDF",
  },
];

/** Benefícios: o que se aprende. Fotos de /public/images (troque à vontade). */
const BENEFITS: readonly {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    icon: Clock,
    title: "Tempo bem usado",
    description:
      "Corte, utensílios essenciais, compras da semana planejadas e o segredo para combinar ervas e especiarias básicas. Menos tempo decidindo, mais tempo à mesa.",
    image: "/images/beneficio-tempo.jpg",
    imageAlt: "Mãos picando cebola roxa na tábua, com ervas, azeite e pimentões ao fundo",
  },
  {
    icon: Soup,
    title: "Refeições para a semana",
    description:
      "A lógica para transformar ingredientes básicos em até 15 refeições variadas para a semana, economizando tempo e energia.",
    image: "/images/beneficio-marmitas.jpg",
    imageAlt: "Marmitas de vidro com arroz, frango, brócolis e massa prontas para a semana",
  },
  {
    icon: Recycle,
    title: "O fim do desperdício",
    description:
      "Reaproveitamento criativo para dar vida nova às sobras do jantar anterior. Aprender a cozinhar também é aprender a olhar para o que já temos.",
    image: "/images/beneficio-reaproveitamento.jpg",
    imageAlt: "Tapioca recheada com frango desfiado e queijo, ao lado de um café com leite",
  },
  {
    icon: Users,
    title: "Seja um bom anfitrião",
    description:
      "Métodos de pré-preparo para receber amigos sem passar a noite no fogão. Você serve bem e ainda participa da conversa.",
    image: "/images/beneficio-receber.jpg",
    imageAlt:
      "Tábua de frios com queijos, embutidos, frutas e castanhas para receber amigos",
  },
];

/** Por que o método funciona (fatos da história de Leciane e Bruno). */
const METHOD_POINTS = [
  "Nasceu numa cozinha de verdade: a de Leciane e Bruno, que começou com uma frigideira.",
  "Cozinhar é prática: observar, perguntar, errar e, aos poucos, criar repertório.",
  "Sem cinquenta panelas: uma panela de cada vez, no ritmo de cada casa.",
] as const;

const FAQ: readonly { question: string; answer: string }[] = [
  {
    question: "Preciso saber cozinhar para usar o livro?",
    answer:
      "Não. Ele foi pensado para quem está começando do zero: sem cinquenta panelas, sem ingredientes impossíveis e sem precisar entender francês para preparar o jantar. Parte do básico, como cortar, escolher poucos utensílios e planejar as compras da semana.",
  },
  {
    question: "O livro tem só receitas?",
    answer:
      "Não. As receitas estão lá, mas o foco é a vida real a dois: planejamento, otimização de tempo, compras conscientes, marmitas, reaproveitamento e a construção de momentos juntos à mesa.",
  },
  {
    question: "Como recebo o e-book?",
    answer:
      "É um e-book em PDF com acesso imediato: assim que a compra é confirmada, ele chega ao seu e-mail.",
  },
  {
    question: "Consigo ler no celular?",
    answer:
      "Sim. As 138 páginas foram diagramadas para o celular: dá para ler na bancada, sem dar zoom em letra miúda. O PDF também abre no tablet e no computador.",
  },
  {
    question: "Como funcionam as playlists?",
    answer:
      "Ao longo do livro há QR Codes. É só apontar a câmera do celular para abrir a playlist no Spotify e dar o play. Aqui na página você também pode tocar no QR Code ou no botão “Abrir no Spotify”.",
  },
  {
    question: "O livro serve só para casais?",
    answer:
      "Foi escrito pensando na vida a dois, mas serve também para quem foi morar sozinho ou simplesmente quer aprender a cozinhar sem complicação.",
  },
  {
    question: "E se eu não gostar?",
    answer:
      "Você tem 7 dias de garantia. Se o guia não fizer sentido para a cozinha de vocês, é só pedir o reembolso.",
  },
];

const OFFER_STACK = [
  "E-book completo “Casei, e agora, o que vamos comer?” (138 páginas diagramadas para celular, tablet, computador ou impressão)",
  "Guia Introdutório “O básico da nossa cozinha” (utensílios essenciais, medidas sem balança, controle de fogo e segurança alimentar)",
  "Sistema das 15 a 20 marmitas quinzenais + lista de compras inteligente e guia de congelamento",
  "Cronograma prático para receber amigos (receitas para 4 pessoas) e jantar especial a dois",
  "Quadros práticos “Segredo de chef”, “Não faça isso” e “Deu errado?” em todas as receitas",
  "4 playlists exclusivas no Spotify integradas ao livro",
] as const;

/* -------------------------------------------------------------------------- */
/*  Primitivas de UI                                                           */
/* -------------------------------------------------------------------------- */

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

const h2Style =
  "text-3xl leading-[1.12] text-balance text-charcoal sm:text-4xl lg:text-[2.75rem]";

/**
 * Rótulo pequeno em caixa-alta, com fio fino (acabamento editorial).
 * `responsive`: centralizado (fios dos dois lados) no celular e alinhado à
 * esquerda (um fio) a partir de `lg`, acompanhando colunas de texto centradas.
 */
function Eyebrow({
  children,
  tone = "terracotta",
  align = "left",
}: {
  children: ReactNode;
  tone?: "terracotta" | "olive" | "light";
  align?: "left" | "center" | "responsive";
}) {
  const tones = {
    terracotta: "text-terracotta",
    olive: "text-olive",
    light: "text-cotton",
  } as const;
  const alignment = {
    left: "",
    center: "justify-center text-center",
    responsive: "justify-center text-center lg:justify-start lg:text-left",
  } as const;
  const line = "h-px w-8 shrink-0 bg-current opacity-60";

  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-balance uppercase ${alignment[align]} ${tones[tone]}`}
    >
      <span aria-hidden className={line} />
      {children}
      {align !== "left" && (
        <span
          aria-hidden
          className={`${line} ${align === "responsive" ? "lg:hidden" : ""}`}
        />
      )}
    </p>
  );
}

function Section({
  id,
  labelledBy,
  className = "",
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-14 sm:py-28 ${className}`}
    >
      <div className={container}>{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Seções                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        aria-label="Principal"
        className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-3 rounded-xl border border-charcoal/10 bg-cotton/90 py-2 pr-2 pl-3 shadow-soft backdrop-blur-md"
      >
        <a
          href="#topo"
          className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8"
          />
          <span className="font-heading text-lg leading-none font-medium tracking-tight text-charcoal">
            Casei, e agora?
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm text-charcoal/75 transition-colors hover:text-terracotta ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton
            href={CHECKOUT_URL}
            size="md"
            withArrow={false}
            className="ml-1"
          >
            {BUY_LABEL}
          </CtaButton>
        </div>
      </nav>
    </header>
  );
}

/** Trecho do livro, em formato de nota de papel: "A Frigideira Solitária". */
function FrigideiraCard() {
  return (
    <aside
      aria-label="Trecho do livro: A Frigideira Solitária"
      className="absolute right-3 bottom-0 left-3 rounded-xl border border-charcoal/10 border-l-[3px] border-l-terracotta-soft bg-cotton p-5 shadow-soft sm:right-auto sm:left-1/2 sm:w-96 sm:-translate-x-1/2 lg:-bottom-8 lg:left-[-2.5rem] lg:translate-x-0"
    >
      <p className="text-[11px] font-semibold tracking-[0.2em] text-olive uppercase">
        Do livro
      </p>
      <p className="mt-1 font-heading text-lg leading-tight font-medium text-charcoal">
        A Frigideira Solitária
      </p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
        Eu, chef de cozinha, havia acabado de me apaixonar por um homem que
        voluntariamente comia arroz sem sal e era perfeitamente capaz de
        considerar amendoim uma refeição.
      </p>
    </aside>
  );
}

function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-14 lg:pt-44 lg:pb-28"
    >
      {/* Luz suave de fim de tarde: terracota de um lado, oliva do outro. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[34rem] rounded-full bg-terracotta-soft/15 blur-3xl" />
        <div className="absolute top-[20%] -right-52 size-[30rem] rounded-full bg-olive/15 blur-3xl" />
      </div>

      <div
        className={`${container} grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}
      >
        <div className="text-center lg:text-left">
          <Eyebrow align="responsive">
            Receitas que fazem parte da vida real a dois
          </Eyebrow>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.08] text-balance text-charcoal sm:text-5xl lg:text-6xl"
          >
            Sua vida a dois não precisa{" "}
            <em className="text-terracotta">depender do delivery.</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-charcoal/80 sm:text-lg lg:mx-0">
            Um guia pensado para a vida real: para vocês montarem a cozinha sem
            gastar à toa, resolverem a semana com 15 a 20 marmitas práticas e
            cozinharem juntos — mesmo começando do zero.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 lg:items-start">
            <CtaButton href={CHECKOUT_URL} className="w-full sm:w-auto">
              {BUY_LABEL}
            </CtaButton>

            <ul className="mx-auto grid w-full max-w-md gap-2.5 text-left text-sm text-charcoal/80 lg:mx-0">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-olive"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-14 lg:max-w-sm lg:justify-self-center lg:pb-0">
          {/* Capa em retrato (2:3): nunca recortar, senão o título é cortado. */}
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[18rem] overflow-hidden rounded-md shadow-lift ring-1 ring-charcoal/10 sm:max-w-xs lg:max-w-none">
            <Image
              src="/images/capa-livro.jpg"
              alt={`Capa do e-book ${BOOK_TITLE}, da Chef Leciane Carine: um casal temperando ovos fritos juntos na frigideira`}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 288px"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <FrigideiraCard />
        </div>
      </div>
    </section>
  );
}

/** Identificação (a dor): para quem é o livro, e o "antes e depois". */
function ParaQuem() {
  return (
    <Section
      id="para-quem"
      labelledBy="para-quem-title"
      className="bg-cotton-deep grain-dark"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow align="center">Para quem é este livro</Eyebrow>
        <h2 id="para-quem-title" className={`mt-5 ${h2Style}`}>
          Se toda noite começa com{" "}
          <em className="text-terracotta">“e agora, o que vamos comer?”</em>,
          este livro é para você.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-charcoal/75">
          Sem julgamentos e sem termos em francês. Aqui cozinhar é prática, e
          todo mundo começa de algum lugar.
        </p>
      </div>
    </Section>
  );
}

function Livro() {
  return (
    <Section id="livro" labelledBy="book-title">
      <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto aspect-[5/8] w-full max-w-sm overflow-hidden rounded-xl shadow-lift ring-1 ring-charcoal/10 lg:mx-0 lg:max-w-none">
          <Image
            src="/images/capa-livro-mesa.jpg"
            alt={`Exemplar do e-book ${BOOK_TITLE} sobre a mesa, com vinho, azeite e ingredientes ao redor`}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
            quality={90}
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        <div>
          <Eyebrow>O livro</Eyebrow>
          <h2 id="book-title" className={`mt-5 ${h2Style}`}>
            A vida real{" "}
            <em className="whitespace-nowrap text-terracotta">a dois</em> na
            cozinha.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-charcoal/75">
            Um livro de receitas e histórias reais para quem está começando a
            vida a dois, foi morar sozinho ou simplesmente quer aprender a
            cozinhar sem complicação.
          </p>
          <p className="mt-4 leading-relaxed text-pretty text-charcoal/75">
            Mais do que receitas: planejamento, compras conscientes e a
            construção de momentos a dois, com dicas práticas, receitas
            possíveis e muito sabor.
          </p>

          <h3 className="mt-9 text-xs font-semibold tracking-[0.2em] text-olive uppercase font-sans">
            Dentro do e-book
          </h3>
          <ul className="mt-4 space-y-4">
            {INSIDE.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-olive-mist text-olive"
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <span className="pt-2 leading-snug text-charcoal">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EbookPreview />

      <div className="mt-12 flex justify-center">
        <CtaButton href={CHECKOUT_URL} className="w-full sm:w-auto">
          {BUY_LABEL}
        </CtaButton>
      </div>
    </Section>
  );
}

function Beneficios() {
  return (
    <Section
      id="beneficios"
      labelledBy="benefits-title"
      className="bg-cotton-deep grain-dark"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow align="center">O que você vai aprender</Eyebrow>
        <h2 id="benefits-title" className={`mt-5 ${h2Style}`}>
          Menos improviso, <em className="text-terracotta">mais mesa posta.</em>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-charcoal/75">
          Pensado para quem está começando do zero: sem cinquenta panelas, sem
          ingredientes impossíveis e sem precisar entender francês para
          preparar o jantar.
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-charcoal/50 sm:hidden">
        Deslize para o lado para ver os outros cards
      </p>

      <ul className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {BENEFITS.map(
          ({ icon: Icon, title, description, image, imageAlt }) => (
            <li
              key={title}
              className="flex w-[min(82vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-cotton shadow-soft sm:w-auto"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 82vw"
                  quality={90}
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="relative flex flex-1 flex-col p-6 pt-9">
                <span
                  aria-hidden
                  className="absolute -top-6 left-6 grid size-12 place-items-center rounded-full bg-olive text-cotton ring-4 ring-cotton"
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-xl leading-snug text-charcoal">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/75">
                  {description}
                </p>
              </div>
            </li>
          ),
        )}
      </ul>

      <ChapterRoadmap />
    </Section>
  );
}

function Playlists() {
  // QR Codes gerados no servidor (build) a partir da URL de cada playlist.
  const playlists = PLAYLISTS.map((playlist) => ({
    ...playlist,
    qr: createQrCode(playlist.url),
  }));

  return (
    <Section
      id="playlists"
      labelledBy="playlists-title"
      className="isolate overflow-hidden bg-olive text-cotton grain-light"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-[26rem] rounded-full bg-olive-deep/60 blur-3xl" />
      </div>

      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <Eyebrow tone="light" align="responsive">
            Este livro combina melhor com música
          </Eyebrow>
          <h2
            id="playlists-title"
            className="mt-5 text-3xl leading-[1.12] text-balance text-white sm:text-4xl lg:text-[2.75rem]"
          >
            Cada momento da vida a dois tem a sua trilha.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-cotton lg:mx-0">
            Ao longo do livro, QR Codes levam você a playlists exclusivas para
            cada momento: o café sem pressa, o jantar preparado juntos, os
            amigos chegando. É só apontar a câmera, dar o play e ir para a
            cozinha.
          </p>
        </div>

        <PlaylistShowcase playlists={playlists} />
      </div>
    </Section>
  );
}

/** Autoridade: quem escreve, por que o método funciona e (quando houver) depoimentos. */
function Autores() {
  return (
    <Section id="autores" labelledBy="authors-title">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="mx-auto overflow-hidden rounded-[1.75rem] shadow-lift">
          <Image
            src="/images/autores-leciane-bruno.jpg"
            alt="Leciane, de jaleco branco de chef, e Bruno sorrindo juntos"
            width={576}
            height={1024}
            unoptimized
            loading="lazy"
            className="block h-auto w-56 object-cover sm:w-64 lg:w-72"
          />
        </div>

        <div className="text-center lg:text-left">
          <Eyebrow align="responsive">Quem escreve este livro</Eyebrow>
          <h2 id="authors-title" className={`mt-5 ${h2Style}`}>
            Leciane Carine
          </h2>
          <p className="mt-2 font-heading text-xl text-olive italic">
            Chef de cozinha.
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-pretty text-charcoal/80">
            <p>
              Sou chef de cozinha há mais de 14 anos e este livro nasceu da
              minha história com Bruno.
            </p>
            <p>
              Quando nossas vidas se encontraram, a cozinha também precisou
              encontrar um jeito de funcionar para nós dois. Entre descobertas,
              improvisos e a rotina compartilhada, surgiram histórias que vou
              dividir com vocês.
            </p>
            <p>
              Reuni minha experiência profissional e nossa vida cotidiana para
              explicar o básico com clareza e ajudar vocês a ganharem confiança,
              uma receita de cada vez; assim como foi com Bruno.
            </p>
          </div>

          <h3 className="mt-10 text-xs font-semibold tracking-[0.2em] text-olive uppercase font-sans">
            Por que o método funciona
          </h3>
          <ul className="mt-4 space-y-3 text-left">
            {METHOD_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive text-cotton"
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="leading-relaxed text-charcoal/80">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Depoimentos() {
  return (
    <Section
      id="depoimentos"
      labelledBy="testimonials-title"
      className="bg-olive-mist grain-dark"
    >
      <Testimonials />
    </Section>
  );
}

/** Selo circular de garantia, em verde oliva. */
function GuaranteeSeal() {
  return (
    <div className="grain-light flex items-center gap-5 rounded-xl bg-olive p-6 text-cotton shadow-soft">
      <div
        aria-hidden
        className="grid size-24 shrink-0 place-items-center rounded-full border border-cotton/50 p-1.5"
      >
        <div className="grid size-full place-items-center rounded-full border border-cotton/30 text-center leading-none">
          <span className="font-heading text-4xl font-medium">7</span>
          <span className="-mt-3 text-[10px] font-semibold tracking-[0.2em] uppercase">
            dias
          </span>
        </div>
      </div>
      <div>
        <p className="font-heading text-xl font-medium">Garantia de 7 dias</p>
        <p className="mt-1 text-sm leading-relaxed text-cotton">
          Se o guia não fizer sentido para a cozinha de vocês, é só pedir o
          reembolso.
        </p>
      </div>
    </div>
  );
}

/** Garantia e perguntas frequentes (acordeão nativo, sem JavaScript). */
function Duvidas() {
  return (
    <Section
      id="duvidas"
      labelledBy="faq-title"
      className="bg-cotton-deep grain-dark"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Garantia e dúvidas</Eyebrow>
          <h2 id="faq-title" className={`mt-5 ${h2Style}`}>
            Compre sem{" "}
            <em className="text-terracotta">medo de errar.</em>
          </h2>
          <p className="mt-6 mb-8 leading-relaxed text-pretty text-charcoal/75">
            Separamos as perguntas que mais aparecem. Se ainda sobrar alguma, é
            sinal de que a cozinha de vocês é única, e tudo bem.
          </p>
          <GuaranteeSeal />
        </div>

        <div>
          {FAQ.map(({ question, answer }) => (
            <details
              key={question}
              name="faq"
              className="group border-b border-charcoal/10 open:[&_svg]:rotate-45 first:border-t"
            >
              <summary
                className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:hidden [&::-webkit-details-marker]:hidden ${focusRing} rounded-lg`}
              >
                <span className="font-heading text-lg leading-snug font-medium text-charcoal sm:text-xl">
                  {question}
                </span>
                <Plus
                  className="size-5 shrink-0 text-terracotta transition-[rotate] duration-200"
                  aria-hidden
                />
              </summary>
              <p className="pr-9 pb-6 leading-relaxed text-pretty text-charcoal/75">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** CTA final: só o que importa para converter. Sem links de navegação. */
function CtaFinal() {
  return (
    <section
      id="oferta"
      aria-labelledby="buy-title"
      className="relative py-14 sm:py-28"
    >
      <div className={container}>
        <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-charcoal/10 bg-cotton shadow-lift lg:grid lg:max-w-6xl lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[36rem]">
            <Image
              src="/images/comprar-ebook-cozinha.jpg"
              alt={`Capa do e-book ${BOOK_TITLE} no tablet, na bancada da cozinha`}
              fill
              sizes="(min-width: 1024px) 440px, (min-width: 512px) 512px, 100vw"
              quality={90}
              loading="lazy"
              className="object-cover object-center"
            />
          </div>

          <div className="p-7 text-center sm:p-12 lg:text-left">
            <Eyebrow align="responsive">{BOOK_TITLE}</Eyebrow>
            <h2
              id="buy-title"
              className="mt-5 text-3xl leading-[1.12] text-balance text-charcoal sm:text-4xl"
            >
              Comece hoje a cozinhar com mais{" "}
              <em className="text-terracotta">confiança e prazer.</em>
            </h2>

            <div className="mt-8 text-left">
              <p className="text-xs font-semibold tracking-[0.16em] text-olive uppercase">
                Tudo o que vocês recebem imediatamente hoje
              </p>
              <ul className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {OFFER_STACK.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5">
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive text-cotton"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-charcoal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 rounded-xl border border-dashed border-terracotta/45 bg-terracotta-soft/10 px-4 py-4 text-left text-sm leading-relaxed text-pretty text-charcoal">
              Por menos do que custa pedir uma pizza no fim de semana, vocês
              levam um guia prático para usar a vida inteira.
            </p>

            <div
              className="mt-8 flex flex-col items-center gap-2 lg:items-start"
              aria-label={`De ${PRICE.currency} ${PRICE.originalWhole},${PRICE.originalCents}. Lançamento com ${PRICE.discountPercent}% de desconto: ${PRICE.currency} ${PRICE.whole},${PRICE.cents} à vista, ou em até 12x de ${PRICE.currency} 4,13 no cartão`}
            >
              <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-start">
                <span className="text-base text-charcoal/50">
                  De{" "}
                  <span className="line-through decoration-charcoal/40">
                    {PRICE.currency} {PRICE.originalWhole},{PRICE.originalCents}
                  </span>
                </span>
                <span className="text-sm font-medium tracking-wide text-terracotta uppercase">
                  Lançamento • {PRICE.discountPercent}% off
                </span>
              </p>
              <p className="flex items-baseline gap-1 text-charcoal">
                <span aria-hidden className="text-xl font-medium text-charcoal/75">
                  {PRICE.currency}
                </span>
                <span
                  aria-hidden
                  className="font-heading text-7xl leading-none font-medium tracking-tight"
                >
                  {PRICE.whole}
                </span>
                <span
                  aria-hidden
                  className="font-heading text-3xl font-medium tracking-tight"
                >
                  ,{PRICE.cents}
                </span>
              </p>
              <p className="text-sm text-charcoal/75">
                à vista no Pix, Apple Pay ou Cartão
              </p>
              <p className="text-sm font-medium text-charcoal">
                ou em até 12x de {PRICE.currency} 4,13* no cartão de crédito
              </p>
            </div>

            <CtaButton href={CHECKOUT_URL} className="mt-8 w-full">
              Quero o meu guia agora
            </CtaButton>

            <p className="mt-5 flex items-start justify-center gap-2 text-left text-sm leading-relaxed text-charcoal/75 lg:justify-start">
              <Lock className="mt-0.5 size-4 shrink-0 text-olive" aria-hidden />
              <span>
                Pagamento 100% seguro via Hotmart • Pix, Cartão ou Apple Pay •
                Acesso imediato e 7 dias de garantia
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-charcoal/10 py-10">
      <div
        className={`${container} flex flex-col items-center justify-between gap-4 text-center text-sm text-charcoal/75 sm:flex-row sm:text-left`}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={28}
            height={28}
            className="size-7"
          />
          <p className="font-heading text-base text-charcoal">{BOOK_TITLE}</p>
        </div>
        <p>© Leciane Carine. Todos os direitos reservados.</p>
        <a
          href="#topo"
          className={`inline-flex items-center gap-1.5 rounded-lg text-terracotta hover:underline ${focusRing}`}
        >
          Voltar ao topo
          <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Página                                                                     */
/* -------------------------------------------------------------------------- */

export default function Page() {
  return (
    <>
      <a
        href="#conteudo"
        className={`sr-only z-[60] rounded-lg bg-cotton px-4 py-2 text-sm font-medium text-charcoal focus:not-sr-only focus:fixed focus:top-4 focus:left-4 ${focusRing}`}
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo">
        <Hero />
        <ParaQuem />
        <Livro />
        <Beneficios />
        <Playlists />
        <Autores />
        <Depoimentos />
        <Duvidas />
        <CtaFinal />
      </main>

      <Footer />
    </>
  );
}
