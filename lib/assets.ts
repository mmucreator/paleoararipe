// ──────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DE IMAGENS DO JOGO
// ──────────────────────────────────────────────────────────────────────────
// Para trocar uma imagem, basta colocar o arquivo PNG na pasta /public e
// apontar o caminho aqui (ex: "/imagens/meu-fundo.png").
// Se deixar a string vazia (""), o jogo usa o visual vintage padrão.
// ──────────────────────────────────────────────────────────────────────────

 export const ASSETS = {
  background: "/images/fundo.png",
  startTile: "",
  finishTile: "",
  fossilTile: "",
  triviaTile: "",
  restTile: "",
  pawn: "",
  logo: "",
} as const;

export type AssetKey = keyof typeof ASSETS;

/** Retorna o caminho da imagem se estiver configurado, senão `null`. */
export function asset(key: AssetKey): string | null {
  const v = ASSETS[key];
  return v && v.trim() !== "" ? v : null;
}
