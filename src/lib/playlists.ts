export type Playlist = {
  id: string;
  title: string;
  description: string;
  /** Link da playlist no Spotify. O QR Code é gerado a partir dele no build. */
  url: string;
};

/**
 * Playlists do livro. Para trocar uma playlist, basta editar a `url`: o QR Code
 * da página é regenerado automaticamente no próximo build.
 *
 * As URLs estão sem o parâmetro `?si=...` (identificador de compartilhamento do
 * Spotify): a playlist abre igual e o QR Code fica mais simples de ler.
 */
export const PLAYLISTS: readonly Playlist[] = [
  {
    id: "cafe",
    title: "Café sem pressa",
    description:
      "Para aquelas manhãs em que ninguém precisa sair correndo. Preparem o café, deem o play e vão para a cozinha.",
    url: "https://open.spotify.com/playlist/5skvIjMhqkSX4N2ecPRMPA",
  },
  {
    id: "jantar",
    title: "Jantar feito junto",
    description:
      "Para cozinhar lado a lado, com uma taça na mão e nenhuma urgência de ficar pronto.",
    url: "https://open.spotify.com/playlist/2CZKC5XIoTQgDwlFnoqIHv",
  },
  {
    id: "amigos",
    title: "Os amigos chegaram",
    description:
      "Para receber sem ficar de costas. A trilha certa já está tocando quando a campainha toca.",
    url: "https://open.spotify.com/playlist/5iV2YFDforO6wTTekwodjY",
  },
  {
    id: "noite",
    title: "Hoje eu cozinho pra você",
    description:
      "Para aquela noite em que um decide cozinhar para o outro. O resto é com o carinho.",
    url: "https://open.spotify.com/playlist/5C50bE7T7Z6h4zZ2PRdL1D",
  },
];
