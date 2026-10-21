import { Quote } from "lucide-react";

// TODO: Depoimentos demonstrativos realistas — substituir pelos comentários definitivos dos leitores conforme forem coletados.
const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  detail: string;
}[] = [
  {
    quote:
      "No segundo mês de casados levamos um susto com o gasto de delivery porque a gente sempre chegava cansado sem saber o que fazer. Só a lista de compras e o esquema das marmitas da Leciane já mudaram nossa semana. Domingo fizemos a sobrecoxa assada, o feijão e a carne moída em duas horinhas ouvindo a playlist.",
    name: "Mariana & Lucas S.",
    detail: "Casados há 4 meses • São Paulo, SP",
  },
  {
    quote:
      "Eu era exatamente o Bruno da história: minha especialidade era queimar ovo. O que mais gostei é que a Leciane não fala difícil. Ela explica desde como segurar a faca até a hora certa de desligar o ovo mexido e dourar o alho sem amargar. Já assumi o café da manhã de domingo aqui em casa.",
    name: "Rafael Mendes, 31 anos",
    detail: "Curitiba, PR",
  },
  {
    quote:
      "Toda vez que a gente chamava amigos pra jantar, eu passava a noite inteira no fogão enquanto todo mundo conversava na sala. Segui o cronograma do Capítulo 3: deixei a caponata e o molho de tomate assado prontos antes e só montei a tábua de queijos na hora. Pela primeira vez jantei sentada com meus amigos.",
    name: "Camila & Pedro T.",
    detail: "Morando juntos há 1 ano • Belo Horizonte, MG",
  },
  {
    quote:
      "Sempre travei em receita que pedia balança ou utensílio que eu não tenho. Nesse livro tudo tem medida em xícara e colher do lado, e os quadros de “Deu errado?” salvam muito. Fiz o risoto de queijo e o pudim na sexta seguindo a dica de não mexer a calda e deu super certo.",
    name: "Gabriel Costa, 27 anos",
    detail: "Florianópolis, SC",
  },
  {
    quote:
      "A leitura é tão leve que li inteiro no celular numa tarde. A parte que diz que a gente não precisa decidir quem é “a pessoa que cozinha da casa” mudou nossa rotina. Agora deixamos o PDF aberto no balcão, damos play na playlist e cozinhamos juntos.",
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
