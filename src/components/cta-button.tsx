"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { appendTrackingParams, isHotmartCheckout } from "@/lib/checkout";

function subscribeToLocation(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

const ctaSizes = {
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-14 px-8 py-3.5 text-base",
} as const;

export function CtaButton({
  href,
  children,
  size = "lg",
  withArrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  size?: keyof typeof ctaSizes;
  withArrow?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const hotmart = isHotmartCheckout(href);
  const search = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );
  const trackedHref = hotmart ? appendTrackingParams(href, search) : href;

  useEffect(() => {
    const el = ref.current;
    if (!el || !hotmart) return;
    // O snippet da Hotmart usa `onclick="return false"`. No celular o widget
    // troca para `return true` e o href abre a página de pagamento — por isso
    // só gravamos o atributo se ele ainda não existir.
    if (!el.getAttribute("onclick")) {
      el.setAttribute("onclick", "return false;");
    }
  }, [hotmart]);

  return (
    <a
      ref={ref}
      href={trackedHref}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta text-center leading-snug font-semibold text-balance text-white shadow-cta transition duration-200 hover:bg-terracotta-deep active:translate-y-px ${focusRing} ${ctaSizes[size]} ${hotmart ? "hotmart-fb" : ""} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </a>
  );
}
