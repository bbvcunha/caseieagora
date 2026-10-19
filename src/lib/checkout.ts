/**
 * Checkout Hotmart (modo 2 = lightbox no computador; no celular a própria
 * Hotmart abre a página de pagamento).
 *
 * Sobrescreva com NEXT_PUBLIC_CHECKOUT_URL se o link mudar.
 */
export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  "https://pay.hotmart.com/G108029738M?checkoutMode=2";

export function isHotmartCheckout(href: string) {
  return href.startsWith("https://pay.hotmart.com/");
}

/** Parâmetros de campanha que a landing repassa ao checkout, se existirem na URL. */
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "src",
  "sck",
  "fbclid",
  "gclid",
] as const;

/**
 * Anexa à URL da Hotmart os parâmetros de rastreamento da visita atual.
 * Parâmetros que o checkout já traz (como `checkoutMode`) permanecem.
 * Se a mesma chave já existir no link da Hotmart, ela não é sobrescrita.
 */
export function appendTrackingParams(href: string, search: string): string {
  const incoming = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  let changed = false;
  for (const key of TRACKING_PARAMS) {
    const value = incoming.get(key);
    if (!value || url.searchParams.has(key)) continue;
    url.searchParams.set(key, value);
    changed = true;
  }

  return changed ? url.toString() : href;
}
