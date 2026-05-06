"use client";

export default function GearLoader({ size = "md", text }: { size?: "sm" | "md" | "lg"; text?: string }) {
  const dimensions = { sm: 60, md: 100, lg: 160 };
  const d = dimensions[size];
  const smallD = d * 0.6;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Meshed Gear System */}
      <div className="relative" style={{ width: d * 1.6, height: d * 1.2 }}>
        {/* Large gear */}
        <svg
          className="animate-spin-slow absolute"
          style={{ left: 0, top: d * 0.1 }}
          width={d}
          height={d}
          viewBox="0 0 100 100"
          fill="none"
        >
          <g transform="translate(50,50)">
            {/* Outer teeth */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x="-5"
                y="-48"
                width="10"
                height="12"
                rx="2"
                fill="url(#gearGrad1)"
                transform={`rotate(${i * 30})`}
              />
            ))}
            {/* Body */}
            <circle r="36" fill="url(#gearGrad1)" />
            <circle r="28" fill="#fafafa" />
            {/* Spokes */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect
                key={`spoke-${i}`}
                x="-3"
                y="-26"
                width="6"
                height="52"
                rx="3"
                fill="url(#gearGrad1)"
                opacity="0.3"
                transform={`rotate(${i * 30})`}
              />
            ))}
            <circle r="10" fill="url(#gearGrad1)" />
            <circle r="5" fill="#fafafa" />
          </g>
          <defs>
            <linearGradient id="gearGrad1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#facc15" />
              <stop offset="1" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small gear (meshed) */}
        <svg
          className="animate-spin-slow-reverse absolute"
          style={{ left: d * 0.85, top: 0 }}
          width={smallD}
          height={smallD}
          viewBox="0 0 100 100"
          fill="none"
        >
          <g transform="translate(50,50)">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="-6"
                y="-48"
                width="12"
                height="14"
                rx="2"
                fill="#18181b"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle r="34" fill="#18181b" />
            <circle r="24" fill="#fafafa" />
            {Array.from({ length: 4 }).map((_, i) => (
              <rect
                key={`s-${i}`}
                x="-3"
                y="-22"
                width="6"
                height="44"
                rx="3"
                fill="#18181b"
                opacity="0.2"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle r="8" fill="#18181b" />
            <circle r="4" fill="#fafafa" />
          </g>
        </svg>
      </div>

      {/* Loading text */}
      {text && (
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-gray-400">{text}</p>
          {/* Animated dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-brand-green"
                style={{
                  animation: "pulse 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
