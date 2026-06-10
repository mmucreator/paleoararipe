import React from "react";

interface SilhouetteProps {
  id?: string;
  className?: string;
  size?: number;
  color?: string;
}

// Each silhouette is a simplified but recognizable shape of the organism

export const Silhouettes: Record<string, React.FC<SilhouetteProps>> = {
  odonata_adulto: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className} fill={color}>
      {/* Body */}
      <ellipse cx="50" cy="40" rx="3" ry="22" />
      <ellipse cx="50" cy="22" rx="5" ry="6" />
      {/* Upper wings */}
      <ellipse cx="30" cy="28" rx="22" ry="7" transform="rotate(-8 30 28)" />
      <ellipse cx="70" cy="28" rx="22" ry="7" transform="rotate(8 70 28)" />
      {/* Lower wings */}
      <ellipse cx="28" cy="40" rx="20" ry="6" transform="rotate(-5 28 40)" />
      <ellipse cx="72" cy="40" rx="20" ry="6" transform="rotate(5 72 40)" />
      {/* Tail segments */}
      <rect x="48" y="54" width="4" height="3" rx="1" />
      <rect x="48" y="58" width="4" height="3" rx="1" />
      <rect x="48" y="62" width="4" height="3" rx="1" />
      {/* Eyes */}
      <circle cx="47" cy="19" r="2" />
      <circle cx="53" cy="19" r="2" />
    </svg>
  ),

  odonata_larva: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill={color}>
      {/* Head */}
      <ellipse cx="50" cy="20" rx="10" ry="8" />
      {/* Eyes */}
      <circle cx="44" cy="18" r="3" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="56" cy="18" r="3" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Thorax */}
      <ellipse cx="50" cy="38" rx="9" ry="10" />
      {/* Legs */}
      <line x1="41" y1="34" x2="28" y2="28" stroke={color} strokeWidth="2" />
      <line x1="41" y1="40" x2="26" y2="38" stroke={color} strokeWidth="2" />
      <line x1="59" y1="34" x2="72" y2="28" stroke={color} strokeWidth="2" />
      <line x1="59" y1="40" x2="74" y2="38" stroke={color} strokeWidth="2" />
      {/* Abdomen */}
      <ellipse cx="50" cy="60" rx="7" ry="14" />
      {/* Gills */}
      <line x1="43" y1="55" x2="34" y2="52" stroke={color} strokeWidth="2" />
      <line x1="43" y1="60" x2="33" y2="58" stroke={color} strokeWidth="2" />
      <line x1="43" y1="65" x2="34" y2="64" stroke={color} strokeWidth="2" />
      <line x1="57" y1="55" x2="66" y2="52" stroke={color} strokeWidth="2" />
      <line x1="57" y1="60" x2="67" y2="58" stroke={color} strokeWidth="2" />
      <line x1="57" y1="65" x2="66" y2="64" stroke={color} strokeWidth="2" />
      {/* Caudal gills */}
      <ellipse cx="50" cy="78" rx="4" ry="6" />
      <ellipse cx="42" cy="77" rx="3" ry="5" transform="rotate(-15 42 77)" />
      <ellipse cx="58" cy="77" rx="3" ry="5" transform="rotate(15 58 77)" />
    </svg>
  ),

  decapoda: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 90" width={size} height={size * 0.9} className={className} fill={color}>
      {/* Carapace */}
      <ellipse cx="50" cy="42" rx="22" ry="16" />
      {/* Head/rostrum */}
      <ellipse cx="50" cy="26" rx="12" ry="8" />
      <line x1="50" y1="18" x2="50" y2="12" stroke={color} strokeWidth="2" />
      {/* Eyes on stalks */}
      <line x1="44" y1="23" x2="38" y2="18" stroke={color} strokeWidth="1.5" />
      <circle cx="36" cy="17" r="2.5" />
      <line x1="56" y1="23" x2="62" y2="18" stroke={color} strokeWidth="1.5" />
      <circle cx="64" cy="17" r="2.5" />
      {/* Antennae */}
      <line x1="42" y1="20" x2="18" y2="8" stroke={color} strokeWidth="1" />
      <line x1="58" y1="20" x2="82" y2="8" stroke={color} strokeWidth="1" />
      {/* Walking legs */}
      {[0,1,2,3,4].map(i => (
        <React.Fragment key={i}>
          <line x1="30" y1={35+i*5} x2="14" y2={30+i*6} stroke={color} strokeWidth="1.5" />
          <line x1="70" y1={35+i*5} x2="86" y2={30+i*6} stroke={color} strokeWidth="1.5" />
        </React.Fragment>
      ))}
      {/* Abdomen */}
      <ellipse cx="50" cy="62" rx="10" ry="12" />
      {/* Tail fan */}
      <ellipse cx="50" cy="76" rx="12" ry="5" />
      <line x1="50" y1="74" x2="42" y2="80" stroke={color} strokeWidth="1.5" />
      <line x1="50" y1="74" x2="58" y2="80" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  scorpiones: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 120 80" width={size * 1.2} height={size * 0.8} className={className} fill={color}>
      {/* Cephalothorax */}
      <ellipse cx="45" cy="42" rx="16" ry="12" />
      {/* Chelicerae */}
      <ellipse cx="30" cy="40" rx="5" ry="3" />
      {/* Pedipalps (claws) */}
      <line x1="30" y1="36" x2="16" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="12" cy="23" rx="6" ry="3" transform="rotate(-30 12 23)" />
      <line x1="30" y1="48" x2="16" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="12" cy="57" rx="6" ry="3" transform="rotate(20 12 57)" />
      {/* Legs */}
      <line x1="40" y1="32" x2="28" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="48" y1="30" x2="40" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="52" x2="28" y2="60" stroke={color} strokeWidth="1.5" />
      <line x1="48" y1="54" x2="40" y2="64" stroke={color} strokeWidth="1.5" />
      <line x1="56" y1="32" x2="64" y2="20" stroke={color} strokeWidth="1.5" />
      <line x1="56" y1="52" x2="64" y2="62" stroke={color} strokeWidth="1.5" />
      {/* Abdomen segments */}
      {[0,1,2,3].map(i => (
        <ellipse key={i} cx={64+i*7} cy="42" rx="4" ry="7" />
      ))}
      {/* Tail curl */}
      <path d="M88,42 Q100,30 105,20 Q108,12 102,8 Q96,5 92,12" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Stinger */}
      <circle cx="92" cy="12" r="3" />
      <line x1="92" y1="9" x2="94" y2="4" stroke={color} strokeWidth="2" />
    </svg>
  ),

  orthoptera: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 110 80" width={size * 1.1} height={size * 0.8} className={className} fill={color}>
      {/* Head */}
      <ellipse cx="20" cy="38" rx="8" ry="7" />
      <circle cx="17" cy="35" r="2" />
      {/* Antennae */}
      <line x1="18" y1="32" x2="5" y2="15" stroke={color} strokeWidth="1" />
      <line x1="22" y1="32" x2="12" y2="12" stroke={color} strokeWidth="1" />
      {/* Thorax */}
      <ellipse cx="36" cy="38" rx="12" ry="9" />
      {/* Pronotum (saddle) */}
      <ellipse cx="36" cy="32" rx="10" ry="5" />
      {/* Forewing */}
      <path d="M30,34 Q50,20 80,22 Q90,22 92,28 Q90,32 80,34 Q55,36 30,38 Z" />
      {/* Hindwing (folded) */}
      <path d="M32,38 Q55,42 85,38 Q90,36 88,44 Q80,52 55,50 Q35,48 32,42 Z" fillOpacity="0.6" />
      {/* Abdomen */}
      <ellipse cx="70" cy="44" rx="20" ry="10" />
      {/* Jumping legs */}
      <line x1="38" y1="44" x2="30" y2="52" stroke={color} strokeWidth="2" />
      <line x1="30" y1="52" x2="45" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="32" x2="28" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="38" y1="34" x2="22" y2="30" stroke={color} strokeWidth="1.5" />
      <line x1="50" y1="44" x2="44" y2="52" stroke={color} strokeWidth="2" />
      <line x1="44" y1="52" x2="58" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  ephemeroptera_larva: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 80 110" width={size * 0.8} height={size} className={className} fill={color}>
      {/* Head */}
      <ellipse cx="40" cy="18" rx="10" ry="9" />
      <circle cx="34" cy="15" r="2.5" />
      <circle cx="46" cy="15" r="2.5" />
      {/* Thorax */}
      <ellipse cx="40" cy="36" rx="11" ry="10" />
      {/* Legs */}
      <line x1="29" y1="32" x2="16" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="29" y1="38" x2="14" y2="36" stroke={color} strokeWidth="1.5" />
      <line x1="29" y1="44" x2="15" y2="46" stroke={color} strokeWidth="1.5" />
      <line x1="51" y1="32" x2="64" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="51" y1="38" x2="66" y2="36" stroke={color} strokeWidth="1.5" />
      <line x1="51" y1="44" x2="65" y2="46" stroke={color} strokeWidth="1.5" />
      {/* Abdomen with gills */}
      {[0,1,2,3,4,5].map(i => (
        <React.Fragment key={i}>
          <ellipse cx="40" cy={52+i*7} rx="8-i*0.5" ry="4" />
          <line x1="32" y1={54+i*7} x2="22" y2={52+i*7} stroke={color} strokeWidth="1.5" />
          <ellipse cx="20" cy={52+i*7} rx="4" ry="2" />
          <line x1="48" y1={54+i*7} x2="58" y2={52+i*7} stroke={color} strokeWidth="1.5" />
          <ellipse cx="60" cy={52+i*7} rx="4" ry="2" />
        </React.Fragment>
      ))}
      {/* 3 tails */}
      <line x1="36" y1="96" x2="30" y2="110" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="96" x2="40" y2="112" stroke={color} strokeWidth="1.5" />
      <line x1="44" y1="96" x2="50" y2="110" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  ephemeroptera_adulto: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill={color}>
      {/* Body */}
      <ellipse cx="50" cy="44" rx="3" ry="20" />
      {/* Head */}
      <ellipse cx="50" cy="24" rx="5" ry="5" />
      <circle cx="47" cy="22" r="1.5" />
      <circle cx="53" cy="22" r="1.5" />
      {/* Forewings (large triangular) */}
      <path d="M50,28 L18,18 L14,36 L50,46 Z" fillOpacity="0.85" />
      <path d="M50,28 L82,18 L86,36 L50,46 Z" fillOpacity="0.85" />
      {/* Hindwings (smaller) */}
      <path d="M50,38 L30,34 L28,46 L50,48 Z" fillOpacity="0.6" />
      <path d="M50,38 L70,34 L72,46 L50,48 Z" fillOpacity="0.6" />
      {/* Abdomen segments */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={i} cx="50" cy={56+i*5} rx="3.5-i*0.3" ry="3" />
      ))}
      {/* 3 long tails */}
      <line x1="46" y1="84" x2="38" y2="100" stroke={color} strokeWidth="1" />
      <line x1="50" y1="84" x2="50" y2="102" stroke={color} strokeWidth="1" />
      <line x1="54" y1="84" x2="62" y2="100" stroke={color} strokeWidth="1" />
      {/* Antennae */}
      <line x1="47" y1="20" x2="38" y2="12" stroke={color} strokeWidth="1" />
      <line x1="53" y1="20" x2="62" y2="12" stroke={color} strokeWidth="1" />
    </svg>
  ),

  blattodea: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className} fill={color}>
      {/* Pronotum (shield) */}
      <ellipse cx="50" cy="28" rx="18" ry="12" />
      {/* Head (small, under pronotum) */}
      <ellipse cx="50" cy="18" rx="8" ry="5" />
      {/* Antennae */}
      <path d="M44,14 Q30,5 20,2" fill="none" stroke={color} strokeWidth="1" />
      <path d="M56,14 Q70,5 80,2" fill="none" stroke={color} strokeWidth="1" />
      {/* Wings/Tegmina */}
      <path d="M34,32 Q35,55 50,62 Q65,55 66,32 Q60,36 50,36 Q40,36 34,32 Z" fillOpacity="0.7" />
      {/* Abdomen */}
      <ellipse cx="50" cy="52" rx="14" ry="14" />
      {/* Legs */}
      <line x1="35" y1="28" x2="22" y2="20" stroke={color} strokeWidth="1.5" />
      <line x1="34" y1="35" x2="18" y2="32" stroke={color} strokeWidth="1.5" />
      <line x1="36" y1="42" x2="20" y2="44" stroke={color} strokeWidth="1.5" />
      <line x1="65" y1="28" x2="78" y2="20" stroke={color} strokeWidth="1.5" />
      <line x1="66" y1="35" x2="82" y2="32" stroke={color} strokeWidth="1.5" />
      <line x1="64" y1="42" x2="80" y2="44" stroke={color} strokeWidth="1.5" />
      {/* Cerci */}
      <line x1="44" y1="64" x2="40" y2="72" stroke={color} strokeWidth="1.5" />
      <line x1="56" y1="64" x2="60" y2="72" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  hemiptera: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className} fill={color}>
      {/* Head with beak */}
      <ellipse cx="50" cy="18" rx="9" ry="7" />
      <path d="M46,23 Q50,34 54,23" fill={color} />
      {/* Eyes */}
      <circle cx="44" cy="16" r="2" />
      <circle cx="56" cy="16" r="2" />
      {/* Pronotum */}
      <path d="M34,24 Q50,20 66,24 L68,34 Q50,38 32,34 Z" />
      {/* Scutellum (triangle) */}
      <path d="M40,36 L50,52 L60,36 Z" />
      {/* Hemelytra (half-wings) — characteristic of Hemiptera */}
      <path d="M32,34 L18,30 L16,52 L34,58 Q32,48 32,38 Z" fillOpacity="0.8" />
      <path d="M68,34 L82,30 L84,52 L66,58 Q68,48 68,38 Z" fillOpacity="0.8" />
      {/* Membranous wing tips */}
      <path d="M34,58 L16,52 L20,68 L50,70 Z" fillOpacity="0.5" />
      <path d="M66,58 L84,52 L80,68 L50,70 Z" fillOpacity="0.5" />
      {/* Legs */}
      <line x1="34" y1="28" x2="20" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="34" y1="36" x2="18" y2="36" stroke={color} strokeWidth="1.5" />
      <line x1="34" y1="44" x2="20" y2="50" stroke={color} strokeWidth="1.5" />
      <line x1="66" y1="28" x2="80" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="66" y1="36" x2="82" y2="36" stroke={color} strokeWidth="1.5" />
      <line x1="66" y1="44" x2="80" y2="50" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  isoptera: ({ className, size = 80, color = "currentColor" }) => (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className} fill={color}>
      {/* Head round */}
      <circle cx="50" cy="18" r="10" />
      {/* Mandibles */}
      <path d="M42,22 Q36,28 38,32 Q42,30 44,24" fillOpacity="0.8" />
      <path d="M58,22 Q64,28 62,32 Q58,30 56,24" fillOpacity="0.8" />
      {/* Eyes */}
      <circle cx="44" cy="14" r="2" />
      <circle cx="56" cy="14" r="2" />
      {/* Antennae (beaded) */}
      <path d="M44,10 Q35,4 26,2" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
      <path d="M56,10 Q65,4 74,2" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
      {/* Thorax (3 segments) */}
      <ellipse cx="50" cy="34" rx="10" ry="7" />
      {/* Wings (alate form — equal wings = iso-ptera) */}
      <path d="M42,30 L12,24 L10,36 L42,38 Z" fillOpacity="0.6" />
      <path d="M42,38 L10,36 L14,48 L42,46 Z" fillOpacity="0.5" />
      <path d="M58,30 L88,24 L90,36 L58,38 Z" fillOpacity="0.6" />
      <path d="M58,38 L90,36 L86,48 L58,46 Z" fillOpacity="0.5" />
      {/* Abdomen (round, typical of termites) */}
      <ellipse cx="50" cy="60" rx="12" ry="14" />
      {/* Legs */}
      <line x1="40" y1="32" x2="28" y2="26" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="38" x2="26" y2="38" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="44" x2="28" y2="50" stroke={color} strokeWidth="1.5" />
      <line x1="60" y1="32" x2="72" y2="26" stroke={color} strokeWidth="1.5" />
      <line x1="60" y1="38" x2="74" y2="38" stroke={color} strokeWidth="1.5" />
      <line x1="60" y1="44" x2="72" y2="50" stroke={color} strokeWidth="1.5" />
    </svg>
  ),
};
