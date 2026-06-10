import React from "react";
import { Silhouettes } from "@/components/Silhouettes";

interface ScatterItem {
  id: keyof typeof Silhouettes;
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity: number;
}

// Decorative insect silhouettes scattered like field-journal sketches
const SCATTER: ScatterItem[] = [
  { id: "odonata_adulto", top: "6%", left: "8%", size: 120, rotate: -18, opacity: 0.1 },
  { id: "scorpiones", top: "12%", left: "78%", size: 130, rotate: 14, opacity: 0.09 },
  { id: "decapoda", top: "38%", left: "4%", size: 100, rotate: 8, opacity: 0.08 },
  { id: "ephemeroptera_adulto", top: "30%", left: "88%", size: 110, rotate: -10, opacity: 0.1 },
  { id: "orthoptera", top: "62%", left: "10%", size: 120, rotate: 20, opacity: 0.08 },
  { id: "blattodea", top: "70%", left: "82%", size: 110, rotate: -14, opacity: 0.09 },
  { id: "isoptera", top: "88%", left: "20%", size: 90, rotate: 10, opacity: 0.08 },
  { id: "hemiptera", top: "50%", left: "48%", size: 140, rotate: -6, opacity: 0.05 },
  { id: "ephemeroptera_larva", top: "84%", left: "62%", size: 90, rotate: 16, opacity: 0.08 },
  { id: "odonata_larva", top: "20%", left: "44%", size: 90, rotate: -12, opacity: 0.06 },
];

export function InsectBackdrop({ tone = "#6b5328" }: { tone?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {SCATTER.map((item, i) => {
        const Sil = Silhouettes[item.id];
        if (!Sil) return null;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: item.top,
              left: item.left,
              transform: `rotate(${item.rotate}deg)`,
              opacity: item.opacity,
            }}
          >
            <Sil size={item.size} color={tone} />
          </div>
        );
      })}
    </div>
  );
}
