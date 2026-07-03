export type SectionTone = "default" | "muted";

export const SECTION_TONE_CLASS: Record<SectionTone, string> = {
  default: "bg-[#ffffff]",
  muted: "bg-[#ffffff]",
};

export function alternatingSectionTone(index: number): SectionTone {
  return index % 2 === 0 ? "default" : "muted";
}