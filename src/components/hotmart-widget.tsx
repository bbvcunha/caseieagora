import Script from "next/script";

/**
 * Widget oficial da Hotmart: no computador abre o checkout num lightbox;
 * no celular, o clique segue para a página de pagamento.
 *
 * O script procura links com a classe `hotmart-fb` (ver `CtaButton`).
 */
export function HotmartWidget() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://static.hotmart.com/css/hotmart-fb.min.css"
      />
      <Script
        src="https://static.hotmart.com/checkout/widget.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
