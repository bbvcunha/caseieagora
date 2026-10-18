import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowUp,
  Check,
  ChefHat,
  Clock,
  CookingPot,
  FileText,
  Headphones,
  Heart,
  Mail,
  Plus,
  Quote,
  Recycle,
  ShieldCheck,
  ShoppingBasket,
  Soup,
  Users,
  Utensils,
  Wine,
  X,
  type LucideIcon,
} from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { PlaylistShowcase } from "@/components/playlist-showcase";
import { CHECKOUT_URL } from "@/lib/checkout";
import { PLAYLISTS } from "@/lib/playlists";
import { createQrCode } from "@/lib/qr";

/* -------------------------------------------------------------------------- */
/*  Conteúdo e configuração (edite aqui, sem mexer no layout)                  */
/* -------------------------------------------------------------------------- */

const BOOK_TITLE = "Casei, e agora o que vamos comer?";

const PRICE = { currency: "R$", whole: "39", cents: "90" } as const;

/** Foto quadrada (704×704) em /public. Use `null` para voltar ao placeholder. */
const COUPLE_PHOTO_SRC: string | null = "/images/leciane-e-bruno.jpg";

const NAV_LINKS = [
  { href: "#para-quem", label: "Para quem é" },
  { href: "#livro", label: "O livro" },
  { href: "#playlists", label: "Playlists" },
  { href: "#autores", label: "Autores" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;

/** Identificação: quem se reconhece neste livro (personas do briefing). */
const PERSONAS: readonly {
  icon: LucideIcon;
  title: string;
  pain: string;
  wish: string;
}[] = [
  {
    icon: Heart,
    title: "Os recém-juntos",
    pain: "Vocês acabaram de casar ou de juntar as escovas de dentes. A rotina alimentar virou caos, o delivery pesa no orçamento e o cardápio nunca muda.",
    wish: "Uma rotina aconchegante, mais economia e boas memórias ao redor da mesa.",
  },
  {
    icon: ChefHat,
    title: "O iniciante intimidado",
    pain: "Sempre houve alguém cozinhando por você. Agora o medo de errar, de se queimar ou de estragar o ingrediente fala mais alto, e cozinhar parece pedir técnica e utensílios caros.",
    wish: "Aprender o básico, do corte ao arroz soltinho e ao ovo no ponto, sem julgamentos.",
  },
  {
    icon: Wine,
    title: "O anfitrião frustrado",
    pain: "Você abre a casa para os amigos e passa a noite isolado na cozinha, preso ao fogão e exausto, enquanto todo mundo se diverte na sala.",
    wish: "Servir bem, com organização, e curtir o próprio jantar.",
  },
];

const BEFORE = [
  "Delivery quase todo dia, e a conta chega junto",
  "A geladeira cheia e a mesma pergunta de sempre",
  "O anfitrião de costas para os amigos",
  "Sobras que acabam virando desperdício",
] as const;

const AFTER = [
  "Marmitas prontas para a semana inteira",
  "Sobras que viram o café do dia seguinte",
  "Mesa posta com simplicidade, todo mundo junto",
  "Uma cozinha com a cara dos dois",
] as const;

/** O que vem dentro do e-book (diferenciais do briefing). */
const INSIDE: readonly { icon: LucideIcon; text: string }[] = [
  { icon: Utensils, text: "Técnicas básicas de corte e manuseio de facas" },
  {
    icon: CookingPot,
    text: "Lista enxuta de utensílios indispensáveis, sem gastos desnecessários",
  },
  { icon: ShoppingBasket, text: "Planejamento eficiente de compras semanais" },
  {
    icon: Headphones,
    text: "Playlists exclusivas no Spotify, acessíveis por QR Code",
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
    imageAlt: "Mãos picando ervas frescas com uma faca sobre a tábua",
  },
  {
    icon: Soup,
    title: "Marmitas inteligentes",
    description:
      "A lógica para transformar ingredientes básicos em até 15 refeições variadas para a semana, economizando tempo e energia.",
    image: "/images/beneficio-marmitas.jpg",
    imageAlt: "Marmitas de vidro empilhadas, cheias de refeições prontas",
  },
  {
    icon: Recycle,
    title: "O fim do desperdício",
    description:
      "Reaproveitamento criativo para dar vida nova às sobras do jantar anterior. Aprender a cozinhar também é aprender a olhar para o que já temos.",
    image: "/images/beneficio-reaproveitamento.jpg",
    imageAlt: "Café da manhã com ovos mexidos, pão tostado, frutas e café",
  },
  {
    icon: Users,
    title: "Jantares sem ficar de costas",
    description:
      "Métodos de pré-preparo para receber amigos sem passar a noite no fogão. Você serve bem e ainda participa da conversa.",
    image: "/images/beneficio-receber.jpg",
    imageAlt: "Tábua de frios com queijos, uvas e figos servida entre amigos",
  },
];

/** Por que o método funciona (fatos da história de Leciane e Bruno). */
const METHOD_POINTS = [
  "Nasceu numa cozinha de verdade: a de Leciane e Bruno, que começou com uma frigideira.",
  "Cozinhar é prática: observar, perguntar, errar e, aos poucos, criar repertório.",
  "Sem cinquenta panelas: uma panela de cada vez, no ritmo de cada casa.",
] as const;

/**
 * Depoimentos de leitores. Enquanto estiver vazio, a seção não aparece.
 * Preencha apenas com relatos reais, com autorização de quem os escreveu.
 */
const TESTIMONIALS: readonly { quote: string; name: string; detail?: string }[] =
  [];

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
    answer: "Sim. O PDF abre no celular, no tablet ou no computador.",
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

const OFFER_INCLUDES = [
  "E-book completo em PDF",
  "QR Codes com playlists exclusivas no Spotify",
  "Acesso imediato ao seu e-mail",
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
      className={`relative py-20 sm:py-28 ${className}`}
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
        className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-xl border border-charcoal/10 bg-cotton/90 py-2 pr-2 pl-3 shadow-soft backdrop-blur-md"
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
            Quero o guia
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
        Um casal começou a vida a dois com uma frigideira e a convicção de que
        amendoim era jantar. Hoje, a cozinha é dos dois.
      </p>
    </aside>
  );
}

function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
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

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-charcoal/75 lg:mx-0">
            Um guia descomplicado para montar a primeira cozinha, aprender a
            cozinhar e começar uma deliciosa vida a dois.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 lg:items-start">
            <CtaButton href={CHECKOUT_URL} className="w-full sm:w-auto">
              Quero descomplicar minha cozinha
            </CtaButton>

            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-charcoal/75 lg:justify-start">
              <li className="inline-flex items-center gap-1.5">
                <FileText className="size-4 text-olive" aria-hidden />
                E-book em PDF
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Mail className="size-4 text-olive" aria-hidden />
                Acesso imediato ao seu e-mail
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-olive" aria-hidden />
                Garantia de 7 dias
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-14 lg:max-w-sm lg:justify-self-center lg:pb-0">
          {/* Capa em retrato (2:3): nunca recortar, senão o título é cortado. */}
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[18rem] overflow-hidden rounded-md shadow-lift ring-1 ring-charcoal/10 sm:max-w-xs lg:max-w-none">
            <Image
              src="/images/capa-livro.jpg"
              alt={`Capa do e-book ${BOOK_TITLE}, da Chef Leciane Carine: um casal cozinhando lado a lado, ela picando ervas e ele temperando uma frigideira com tomates`}
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

      <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
        {PERSONAS.map(({ icon: Icon, title, pain, wish }) => (
          <li
            key={title}
            className="flex flex-col rounded-xl border border-charcoal/10 bg-cotton p-7 shadow-soft sm:p-8"
          >
            <span
              aria-hidden
              className="grid size-12 place-items-center rounded-full bg-olive-mist text-olive"
            >
              <Icon className="size-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-2xl leading-snug text-charcoal">
              {title}
            </h3>
            <p className="mt-3 leading-relaxed text-charcoal/75">{pain}</p>

            <div className="mt-auto pt-6">
              <div className="border-t border-charcoal/10 pt-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-olive uppercase">
                  O que você quer
                </p>
                <p className="mt-2 leading-relaxed text-charcoal">{wish}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Antes e depois: a virada que o livro propõe. */}
      <div className="mt-16 grid overflow-hidden rounded-xl border border-charcoal/10 shadow-soft md:grid-cols-2">
        <div className="bg-cotton p-7 sm:p-10">
          <p className="font-heading text-2xl text-charcoal/75 italic">Antes</p>
          <ul className="mt-5 space-y-3.5">
            {BEFORE.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 leading-relaxed text-charcoal/75"
              >
                <X
                  className="mt-1 size-4 shrink-0 text-terracotta"
                  strokeWidth={2}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grain-light bg-olive p-7 text-cotton sm:p-10">
          <p className="font-heading text-2xl italic">Depois</p>
          <ul className="mt-5 space-y-3.5">
            {AFTER.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <Check
                  className="mt-1 size-4 shrink-0"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** Mockup do e-book: a capa em perspectiva, com lombada e borda de páginas. */
function BookMockup({ className = "" }: { className?: string }) {
  // O elemento externo só posiciona e dá a largura (via `className`); o interno
  // cuida da proporção e da perspectiva 3D. Misturar os dois conflita no `position`.
  return (
    <div aria-hidden className={className}>
      <div className="relative aspect-[2/3] w-full [transform-origin:left_center] [transform:perspective(900px)_rotateY(-14deg)]">
        <span className="absolute inset-y-[1.5%] right-[-2.5%] w-[3%] rounded-r-sm bg-cotton-deep ring-1 ring-charcoal/15" />
        <div className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm shadow-lift ring-1 ring-charcoal/20">
          <Image
            src="/images/capa-livro.jpg"
            alt=""
            fill
            sizes="160px"
            className="object-cover"
          />
          <span className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-charcoal/35 via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/** A solução: o produto, ambientado, e o que vem dentro. */
function Livro() {
  return (
    <Section id="livro" labelledBy="book-title">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="relative pb-12 lg:pb-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lift ring-1 ring-charcoal/10">
            <Image
              src="/images/livro-aberto.jpg"
              alt="E-book aberto em duas páginas: à esquerda, o capítulo “Receber sem desaparecer da mesa”; à direita, a receita de bruschetta de queijo, ervas e azeite aromático"
              fill
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <BookMockup className="absolute bottom-0 left-5 w-28 sm:left-8 sm:w-36 lg:-left-6 lg:w-40" />
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

          <CtaButton href={CHECKOUT_URL} className="mt-10 w-full sm:w-auto">
            Quero o meu guia
          </CtaButton>
        </div>
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

      <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(
          ({ icon: Icon, title, description, image, imageAlt }) => (
            <li
              key={title}
              className="flex flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-cotton shadow-soft"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                  quality={90}
                  className="object-cover"
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

function CouplePhoto() {
  const shared =
    "size-48 shrink-0 rounded-full ring-8 ring-cotton shadow-lift sm:size-60 lg:size-72";

  if (COUPLE_PHOTO_SRC) {
    return (
      <Image
        src={COUPLE_PHOTO_SRC}
        alt="Leciane, de jaleco branco de chef, e Bruno, autores do livro, abraçados e sorrindo para a câmera"
        width={704}
        height={704}
        sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 192px"
        className={`${shared} object-cover object-center`}
      />
    );
  }

  // Placeholder circular até a foto real do casal.
  return (
    <div
      role="img"
      aria-label="Espaço reservado para a foto dos autores, Leciane e Bruno"
      className={`${shared} grid place-items-center bg-olive-mist`}
    >
      <span
        aria-hidden
        className="font-heading text-5xl font-medium text-olive/70"
      >
        L &amp; B
      </span>
    </div>
  );
}

/** Autoridade: quem escreve, por que o método funciona e (quando houver) depoimentos. */
function Autores() {
  return (
    <Section id="autores" labelledBy="authors-title">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="mx-auto">
          <CouplePhoto />
        </div>

        <div className="text-center lg:text-left">
          <Eyebrow align="responsive">Quem escreve este livro</Eyebrow>
          <h2 id="authors-title" className={`mt-5 ${h2Style}`}>
            Leciane Carine
          </h2>
          <p className="mt-2 font-heading text-xl text-olive italic">
            Chef de cozinha. Casada com quem começou com uma frigideira.
          </p>

          <p className="mt-6 leading-relaxed text-pretty text-charcoal/75">
            Leciane passou boa parte da vida profissional pensando em sabor,
            equilíbrio, técnica e apresentação. Quando se mudou para a casa de
            Bruno, encontrou uma frigideira, uma panela elétrica e arroz sem
            sal. Uma panela de cada vez, aquela cozinha virou a cozinha dos
            dois.
          </p>

          <blockquote className="relative mt-8 border-t border-charcoal/10 pt-8">
            <Quote
              className="mx-auto size-7 text-terracotta-soft lg:mx-0"
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="mt-4 font-heading text-2xl leading-snug font-medium text-balance text-charcoal italic sm:text-3xl">
              Não queremos ensinar receitas. Queremos ajudar vocês a
              descobrirem como funciona a cozinha da vida de vocês.
            </p>
          </blockquote>

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

      {TESTIMONIALS.length > 0 && (
        <div className="mt-20">
          <h3 className="text-center text-2xl text-charcoal sm:text-3xl">
            Quem já passou pela cozinha
          </h3>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, detail }) => (
              <li
                key={name}
                className="rounded-xl border border-charcoal/10 bg-cotton p-7 shadow-soft"
              >
                <p className="font-heading text-lg leading-relaxed text-charcoal italic">
                  “{quote}”
                </p>
                <p className="mt-5 text-sm font-semibold text-charcoal">
                  {name}
                </p>
                {detail && (
                  <p className="text-sm text-charcoal/75">{detail}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
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
      id="comprar"
      aria-labelledby="buy-title"
      className="relative py-20 sm:py-28"
    >
      <div className={container}>
        <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-charcoal/10 bg-cotton shadow-lift lg:grid lg:max-w-5xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <Image
              src="/images/torrada.jpg"
              alt="Torrada crocante coberta com carne temperada, legumes e ervas frescas"
              fill
              sizes="(min-width: 1024px) 440px, (min-width: 512px) 512px, 100vw"
              quality={90}
              className="object-cover"
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

            <p
              className="mt-8 flex items-baseline justify-center gap-1 text-charcoal lg:justify-start"
              aria-label={`Preço: ${PRICE.currency} ${PRICE.whole},${PRICE.cents}`}
            >
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

            <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left lg:mx-0">
              {OFFER_INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-charcoal/85"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive text-cotton"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <CtaButton href={CHECKOUT_URL} className="mt-10 w-full">
              Garantir meu guia e salvar o jantar
            </CtaButton>

            <p className="mt-5 flex items-start justify-center gap-2 text-left text-sm text-charcoal/75 lg:justify-start">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-olive"
                aria-hidden
              />
              <span>
                Garantia de 7 dias. Se o guia não fizer sentido para a cozinha
                de vocês, é só pedir o reembolso.
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
        <Duvidas />
        <CtaFinal />
      </main>

      <Footer />
    </>
  );
}
