import { Quote } from "lucide-react";

// TODO: Depoimentos demonstrativos realistas — substituir pelos comentários definitivos dos leitores conforme forem coletados.
const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  detail: string;
}[] = [
  {
    quote:
      "A gente fechou a fatura do cartão no segundo mês de casados e levou um susto: quase R$ 1.400 só de delivery porque chegávamos cansados às 20h sem ideia do que fazer. Só a lista de compras e o esquema das marmitas quinzenais da Leciane pagaram esse livro umas vinte vezes na primeira semana. Domingo passado fizemos a sobrecoxa assada, o feijão base e a carne moída coringa em duas horinhas ouvindo a playlist. Melhor investimento da casa nova!",
    name: "Mariana & Lucas S.",
    detail: "Casados há 4 meses • São Paulo, SP",
  },
  {
    quote:
      "Eu era exatamente o Bruno da história: minha especialidade era ovo queimado na borda e cru no meio kkk. O que mais gostei é que a Leciane não fala difícil. Ela explica desde como segurar a faca com a mão em garra até a hora exata de tirar o ovo mexido do fogo e o truque de dourar o alho antes da cebola. Hoje já assumi o café da manhã de domingo aqui em casa e ninguém morreu envenenado ainda!",
    name: "Rafael Mendes, 31 anos",
    detail: "Começou do absoluto zero • Curitiba, PR",
  },
  {
    quote:
      "Toda vez que a gente chamava um casal de amigos pra jantar, eu passava a noite inteira suando na frente do fogão enquanto todo mundo ria na sala tomando vinho. Segui o “Cronograma de quem recebe” do Capítulo 3: fiz a caponata e o molho pomodoro assado no sábado de manhã e montei a tábua de queijos 15 minutos antes de tocarem a campainha. Pela primeira vez eu jantei sentada conversando com meus amigos. Sem preço.",
    name: "Camila & Pedro T.",
    detail: "Morando juntos há 1 ano • Belo Horizonte, MG",
  },
  {
    quote:
      "Sempre travei em livro de culinária porque pedia “160g disso”, “termômetro daquilo” ou 10 utensílios que eu não tenho. Nesse e-book tudo tem medida em xícara e colher do lado, e os avisos de “Deu errado?” salvam demais! Fiz o pudim clássico seguindo a dica de não colocar a colher na calda depois que ferve e fiz o risoto de queijo pra minha namorada na sexta. Ficou digno de restaurante.",
    name: "Gabriel Costa, 27 anos",
    detail: "Primeira cozinha montada • Florianópolis, SC",
  },
  {
    quote:
      "Eu comprei achando que era só um livro de receitas rápidas, mas a leitura é tão gostosa que li inteiro no celular em uma tarde. A parte que diz que a gente não precisa decidir quem é “a pessoa que cozinha da casa” mudou nossa dinâmica aqui. Agora deixamos o PDF aberto no celular apoiado no balcão, damos play no Spotify do QR Code e cozinhamos juntos conversando. Virou o nosso melhor momento do dia.",
    name: "Juliana Nogueira, 34 anos",
    detail: "Casada há 2 anos • Rio de Janeiro, RJ",
  },
];

/** Prova social: no celular, os cards deslizam; no desktop, viram grade. */
export function Testimonials() {
  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">
          <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
          <span className="max-w-[14rem] text-balance sm:max-w-none">
            Quem já leva essa rotina para a mesa
          </span>
          <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
        </p>
        <h2
          id="testimonials-title"
          className="mt-5 text-3xl leading-[1.12] text-balance text-charcoal sm:text-4xl lg:text-[2.75rem]"
        >
          O que acontece quando a cozinha deixa de ser um peso
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-charcoal/75">
          Casais recém-casados, namorados dividindo o primeiro teto e quem
          jurava que não levava jeito para o fogão:
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-charcoal/50 sm:hidden">
        Deslize para o lado para ler os outros relatos
      </p>

      <ul className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <li
            key={item.name}
            className="flex w-[min(82vw,22rem)] shrink-0 snap-center flex-col rounded-xl border border-charcoal/10 bg-cotton p-6 shadow-soft sm:w-auto"
          >
            <Quote
              className="size-6 text-terracotta-soft"
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-charcoal">
              “{item.quote}”
            </p>
            <div className="mt-5 border-t border-charcoal/10 pt-5">
              <p className="text-sm font-semibold text-charcoal">{item.name}</p>
              <p className="text-sm leading-snug text-charcoal/65">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
