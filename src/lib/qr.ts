import QRCode from "qrcode";

/** QR Code serializável (pode ser passado de Server para Client Component). */
export type QrCodeData = {
  /** Lado da matriz, em módulos (sem a zona de silêncio). */
  size: number;
  /** Módulos escuros como um único `path` SVG, em coordenadas de módulo. */
  path: string;
};

/**
 * Gera um QR Code como `path` SVG. Roda no servidor (build): o cliente recebe
 * só o desenho, sem carregar nenhuma biblioteca de QR.
 *
 * Os módulos escuros contíguos de cada linha viram um único retângulo, o que
 * mantém o SVG pequeno.
 */
export function createQrCode(text: string): QrCodeData {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = modules.size;

  let path = "";
  for (let y = 0; y < size; y++) {
    let x = 0;
    while (x < size) {
      if (!modules.get(y, x)) {
        x++;
        continue;
      }
      const start = x;
      while (x < size && modules.get(y, x)) x++;
      const length = x - start;
      path += `M${start} ${y}h${length}v1h-${length}z`;
    }
  }

  return { size, path };
}
