"use client";

/**
 * Decorative floating gear SVGs for page backgrounds.
 * Renders subtle, rotating gears at various positions.
 */
export default function FloatingGears() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-[0.03]" aria-hidden="true">
      {/* Top-right large gear */}
      <svg
        className="absolute -top-16 -right-16 animate-spin-slow"
        width="280"
        height="280"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g transform="translate(50,50)">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="-5" y="-48" width="10" height="12" rx="2" fill="#18181b" transform={`rotate(${i * 30})`} />
          ))}
          <circle r="36" fill="#18181b" />
          <circle r="28" fill="white" />
          <circle r="10" fill="#18181b" />
          <circle r="5" fill="white" />
        </g>
      </svg>

      {/* Bottom-left medium gear */}
      <svg
        className="absolute -bottom-12 -left-12 animate-spin-slow-reverse"
        width="200"
        height="200"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g transform="translate(50,50)">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x="-6" y="-48" width="12" height="13" rx="2" fill="#18181b" transform={`rotate(${i * 36})`} />
          ))}
          <circle r="35" fill="#18181b" />
          <circle r="26" fill="white" />
          <circle r="8" fill="#18181b" />
          <circle r="4" fill="white" />
        </g>
      </svg>

      {/* Center-left small gear */}
      <svg
        className="absolute top-1/3 -left-8 animate-spin-slow"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g transform="translate(50,50)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-6" y="-48" width="12" height="14" rx="2" fill="#18181b" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="34" fill="#18181b" />
          <circle r="24" fill="white" />
          <circle r="8" fill="#18181b" />
          <circle r="4" fill="white" />
        </g>
      </svg>

      {/* Bottom-right small gear */}
      <svg
        className="absolute bottom-1/4 -right-6 animate-spin-slow-reverse"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g transform="translate(50,50)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-6" y="-48" width="12" height="14" rx="2" fill="#18181b" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="34" fill="#18181b" />
          <circle r="24" fill="white" />
          <circle r="8" fill="#18181b" />
          <circle r="4" fill="white" />
        </g>
      </svg>
    </div>
  );
}
