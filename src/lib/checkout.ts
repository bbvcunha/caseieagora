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
