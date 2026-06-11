import { cn } from '@/lib/utils';

/**
 * Front-view outline quadcopter (Inspire-style): tall canopy, X arms,
 * four rotors, landing skids, camera gimbal. Stroke-only so it renders
 * as a white wireframe on dark backgrounds via currentColor.
 *
 * Blade groups carry the `drone-prop` class; keyframes in globals.css
 * oscillate their scaleX so the rotors read as spinning.
 */

const PROP_DELAYS = ['0s', '-0.045s', '-0.09s', '-0.135s'];

export function Drone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 185"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-auto', className)}
      aria-hidden="true"
    >
      {/* Canopy */}
      <path d="M160 14 C174 14 183 25 185 45 C187 67 183 86 173 96 L173 103 L147 103 L147 96 C137 86 133 67 135 45 C137 25 146 14 160 14 Z" />
      {/* Canopy panel lines */}
      <g strokeWidth="1.75" opacity="0.55">
        <path d="M160 22 C170 22 176.5 31 178 47 C179.5 63 176.5 79 169 88" />
        <path d="M160 22 C150 22 143.5 31 142 47 C140.5 63 143.5 79 151 88" />
      </g>

      {/* Arms */}
      <g strokeWidth="2.5">
        <path d="M141 48 L66 88 L71 99 L146 59 Z" />
        <path d="M179 48 L254 88 L249 99 L174 59 Z" />
        <path d="M146 40 L110 58 L114 68 L150 50 Z" />
        <path d="M174 40 L210 58 L206 68 L170 50 Z" />
      </g>

      {/* Motor pods */}
      <rect x="48" y="86" width="26" height="42" rx="10" />
      <rect x="246" y="86" width="26" height="42" rx="10" />
      <rect x="98" y="44" width="21" height="26" rx="8" strokeWidth="2.5" />
      <rect x="201" y="44" width="21" height="26" rx="8" strokeWidth="2.5" />

      {/* Motor shafts and hubs */}
      <g strokeWidth="2.25">
        <path d="M61 86 L61 77" />
        <path d="M259 86 L259 77" />
        <path d="M108.5 44 L108.5 37" />
        <path d="M211.5 44 L211.5 37" />
      </g>
      <circle cx="61" cy="75" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="259" cy="75" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="108.5" cy="35" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="211.5" cy="35" r="2.2" fill="currentColor" stroke="none" />

      {/* Propellers — flat blades; outer left, outer right, inner left, inner right */}
      <g className="drone-prop" strokeWidth="2.25" style={{ animationDelay: PROP_DELAYS[0] }}>
        <path d="M12 73 L110 73" />
      </g>
      <g className="drone-prop" strokeWidth="2.25" style={{ animationDelay: PROP_DELAYS[1] }}>
        <path d="M210 73 L308 73" />
      </g>
      <g className="drone-prop" strokeWidth="2" style={{ animationDelay: PROP_DELAYS[2] }}>
        <path d="M70 33 L147 33" />
      </g>
      <g className="drone-prop" strokeWidth="2" style={{ animationDelay: PROP_DELAYS[3] }}>
        <path d="M173 33 L250 33" />
      </g>

      {/* Landing skids */}
      <g strokeWidth="2.5">
        <path d="M61 128 C63 143 70 155 83 165" />
        <path d="M65 166 L98 166" />
        <path d="M259 128 C257 143 250 155 237 165" />
        <path d="M222 166 L255 166" />
      </g>

      {/* Gimbal and camera */}
      <g strokeWidth="2.25">
        <rect x="152" y="105" width="16" height="6" rx="2" />
        <path d="M160 111 L160 117" />
        <rect x="138" y="121" width="11" height="14" rx="2.5" />
        <circle cx="162" cy="130" r="13" />
        <circle cx="162" cy="130" r="7.5" strokeWidth="1.75" />
      </g>
      <circle cx="162" cy="130" r="2.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
