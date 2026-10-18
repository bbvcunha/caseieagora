"use client";

import { useEffect } from "react";

const MIN_DURATION_MS = 450;
const MAX_DURATION_MS = 900;

/** Começa e termina devagar, acelera no meio (mesma sensação do iOS). */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Rolagem suave para os links de âncora (`<a href="#secao">`), feita em
 * JavaScript.
 *
 * Por que não só `scroll-behavior: smooth` no CSS? Celulares com "Reduzir
 * Movimento" (iOS) ou "Remover animações" (Android) ligado desativam a rolagem
 * suave do CSS, e o toque num botão passa a "pular" direto para a seção. Aqui a
 * animação é nossa, então o efeito é o mesmo em qualquer aparelho. O CSS em
 * `globals.css` continua valendo como alternativa se o JavaScript não carregar.
 *
 * Não renderiza nada: só instala os ouvintes de evento.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
      root.style.removeProperty("scroll-behavior");
    }

    /** Posição de rolagem em que o destino fica logo abaixo da barra flutuante. */
    function destinationY(target: HTMLElement) {
      const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      const max = root.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(y, max));
    }

    function scrollTo(target: HTMLElement) {
      stop();

      const start = window.scrollY;
      const distance = destinationY(target) - start;
      if (Math.abs(distance) < 2) return;

      const duration = Math.min(
        MAX_DURATION_MS,
        Math.max(MIN_DURATION_MS, Math.abs(distance) * 0.45),
      );
      const startedAt = performance.now();

      // Com `scroll-behavior: smooth` no CSS, cada passo da animação seria
      // suavizado de novo pelo navegador (efeito "elástico"). Desliga durante o
      // movimento e devolve ao final.
      root.style.scrollBehavior = "auto";

      function step(now: number) {
        const progress = Math.min(1, (now - startedAt) / duration);
        // O destino é recalculado a cada quadro: se uma imagem acima carregar
        // no meio do caminho e empurrar a página, a rolagem ainda chega certo.
        const to = start + (destinationY(target) - start) * easeInOutCubic(progress);
        window.scrollTo(0, to);

        if (progress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          frame = 0;
          root.style.removeProperty("scroll-behavior");
        }
      }

      frame = requestAnimationFrame(step);
    }

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || (link.target && link.target !== "_self")) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // mantém o id como veio
      }

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      scrollTo(target);

      // Mantém o endereço (#secao) e o botão "Voltar", como na rolagem nativa.
      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }

      // Leva o foco para o destino (leitores de tela e teclado), sem rolar.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }

    // Se a pessoa tocar, girar a roda ou apertar uma tecla, ela assume o controle.
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    return () => {
      stop();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  return null;
}
