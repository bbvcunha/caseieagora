import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Só vale em `next dev`. Sem isto, abrir o site no celular pelo IP do
  // computador (ex.: http://192.168.0.10:3000) bloqueia o JavaScript da página
  // e nada que dependa dele (abas de playlist) funciona. Em produção não afeta.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  images: {
    // 75 é o padrão; 90 é usado na capa do livro (texto fino precisa de nitidez).
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
