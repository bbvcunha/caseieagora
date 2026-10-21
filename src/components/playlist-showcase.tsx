"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Headphones, ScanLine } from "lucide-react";
import type { Playlist } from "@/lib/playlists";
import type { QrCodeData } from "@/lib/qr";

/** Playlist + QR Code já gerado no servidor (ver `createQrCode`). */
export type PlaylistWithQr = Playlist & { qr: QrCodeData };

/** Zona de silêncio exigida pela especificação do QR Code, em módulos. */
const QUIET_ZONE = 4;

// Abas e painel ficam sobre o fundo oliva: o foco precisa ser claro para contrastar.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cotton";

// Dentro do cartão claro, o foco volta a ser terracota.
const focusRingOnCard =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

function QrSvg({ qr, className }: { qr: QrCodeData; className?: string }) {
  const box = qr.size + QUIET_ZONE * 2;

  return (
    <svg
      viewBox={`${-QUIET_ZONE} ${-QUIET_ZONE} ${box} ${box}`}
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <path d={qr.path} fill="currentColor" />
    </svg>
  );
}

/**
 * Seletor interativo de playlists (padrão ARIA de abas, com navegação por
 * teclado). É o único trecho da página que precisa de JavaScript no cliente.
 * Os QR Codes chegam prontos do servidor: nenhuma biblioteca de QR vai para o
 * navegador.
 */
export function PlaylistShowcase({
  playlists,
}: {
  playlists: readonly PlaylistWithQr[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = playlists[activeIndex];

  function selectTab(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = playlists.length - 1;
    const next: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };

    if (event.key in next) {
      event.preventDefault();
      selectTab(next[event.key]);
    }
  }

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Momentos da vida a dois"
        onKeyDown={handleKeyDown}
        className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2"
      >
        {playlists.map((playlist, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={playlist.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`playlist-tab-${playlist.id}`}
              aria-selected={isActive}
              aria-controls="playlist-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`min-h-11 rounded-lg px-3 py-2 text-center text-sm leading-tight font-medium transition-colors sm:px-4 ${focusRing} ${
                isActive
                  ? "bg-cotton text-charcoal shadow-soft"
                  : "bg-olive-deep/70 text-cotton hover:bg-olive-deep"
              }`}
            >
              {playlist.title}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="playlist-panel"
        aria-labelledby={`playlist-tab-${active.id}`}
        tabIndex={0}
        className={`mt-6 rounded-xl bg-cotton p-6 text-charcoal shadow-lift sm:p-8 ${focusRing}`}
      >
        {/* `key` reinicia a animação a cada troca de playlist */}
        <div
          key={active.id}
          className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left"
        >
          {/* O QR Code também é um link: no celular, tocar abre o Spotify. */}
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir a playlist ${active.title} no Spotify (abre em nova aba)`}
            className={`shrink-0 rounded-lg bg-white p-2 ring-1 ring-charcoal/15 transition-transform duration-200 hover:scale-[1.03] ${focusRingOnCard}`}
          >
            <QrSvg
              qr={active.qr}
              className="size-36 text-charcoal sm:size-40"
            />
          </a>

          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] text-olive uppercase">
              <Headphones className="size-3.5" aria-hidden />
              Playlist exclusiva
            </p>
            <h3 className="mt-2 text-2xl leading-snug text-charcoal">
              {active.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-charcoal/75">
              {active.description}
            </p>

            {/* No celular ninguém escaneia a própria tela: lá, toca-se no QR ou no botão. */}
            <p className="mt-4 hidden items-center gap-1.5 text-sm text-charcoal/75 sm:inline-flex">
              <ScanLine className="size-4 shrink-0" aria-hidden />
              Aponte a câmera do celular para o QR Code
            </p>

            <div className="mt-3">
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`cta-primary inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-terracotta px-4 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-terracotta-deep ${focusRingOnCard}`}
              >
                Abrir no Spotify
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
