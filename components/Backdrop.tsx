import React from "react";
import { InsectBackdrop } from "@/components/InsectBackdrop";
import { asset } from "@/lib/assets";

export function Backdrop({ insectTone = "#6b5328" }: { insectTone?: string }) {
  const bg = asset("background");

  if (bg) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        <img
          src={bg || "/placeholder.svg"}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* leve véu para manter os textos legíveis sobre qualquer imagem */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(232,220,192,0.28)" }} />
      </div>
    );
  }

  return <InsectBackdrop tone={insectTone} />;
}
