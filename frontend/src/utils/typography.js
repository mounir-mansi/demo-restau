/**
 * typoFr(str) — insère des espaces insécables avant ! ? : ; et »
 * Usage : <p dangerouslySetInnerHTML={{ __html: typoFr(texte) }} />
 */
export function typoFr(str) {
  if (!str) return "";
  return str
    .replace(/\s([!?:;»])/g, "\u00a0$1")
    .replace(/«\s/g, "«\u00a0");
}
