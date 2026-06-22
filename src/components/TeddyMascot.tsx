import React from 'react';

interface TeddyMascotProps {
  state: 'idle' | 'waving' | 'thinking' | 'typing' | 'helping';
  size?: number;
}

export const TeddyMascot: React.FC<TeddyMascotProps> = ({ state, size = 120 }) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full transition-transform duration-500 ${
          state === 'idle' ? 'animate-teddy-breath' : ''
        }`}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="55" ry="8" fill="rgba(0, 0, 0, 0.08)" />

        {/* Left Ear */}
        <g className={state === 'thinking' ? 'animate-wiggle-left' : ''} style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="22" fill="#8B5A2B" />
          <circle cx="55" cy="55" r="14" fill="#D2B48C" />
          <circle cx="55" cy="55" r="8" fill="#E6C29E" />
        </g>

        {/* Right Ear */}
        <g className={state === 'thinking' ? 'animate-wiggle-right' : ''} style={{ transformOrigin: '145px 55px' }}>
          <circle cx="145" cy="55" r="22" fill="#8B5A2B" />
          <circle cx="145" cy="55" r="14" fill="#D2B48C" />
          <circle cx="145" cy="55" r="8" fill="#E6C29E" />
        </g>

        {/* Left Arm */}
        {state === 'waving' ? (
          <path
            d="M 45,130 C 20,110 10,80 20,70 C 30,60 50,85 55,105 Z"
            fill="#8B5A2B"
            className="animate-teddy-wave"
            style={{ transformOrigin: '55px 120px' }}
          />
        ) : (
          <circle cx="45" cy="130" r="18" fill="#8B5A2B" />
        )}

        {/* Right Arm */}
        {state === 'helping' ? (
          <path
            d="M 155,130 C 180,120 200,105 205,115 C 210,125 180,145 165,145 Z"
            fill="#8B5A2B"
          />
        ) : (
          <circle cx="155" cy="130" r="18" fill="#8B5A2B" />
        )}

        {/* Legs */}
        <circle cx="70" cy="170" r="22" fill="#8B5A2B" />
        <circle cx="70" cy="170" r="14" fill="#D2B48C" />
        <circle cx="130" cy="170" r="22" fill="#8B5A2B" />
        <circle cx="130" cy="170" r="14" fill="#D2B48C" />

        {/* Body */}
        <circle cx="100" cy="135" r="48" fill="#8B5A2B" />
        {/* Medical Cross Belly Plate */}
        <circle cx="100" cy="135" r="32" fill="#FFFFFF" />
        {/* Red Cross Symbol */}
        <path
          d="M 94,135 H 106 M 100,129 V 141"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Head */}
        <circle cx="100" cy="90" r="42" fill="#8B5A2B" />

        {/* Muzzle */}
        <ellipse cx="100" cy="98" rx="18" ry="12" fill="#D2B48C" />

        {/* Nose */}
        <polygon points="94,93 106,93 100,99" fill="#3D2314" />
        <path d="M 100,99 V 104" stroke="#3D2314" strokeWidth="2" />

        {/* Eyes */}
        {state === 'thinking' ? (
          <>
            <circle cx="84" cy="80" r="5" fill="#1E293B" />
            <circle cx="116" cy="80" r="5" fill="#1E293B" />
            {/* Thinking pupils looking up */}
            <circle cx="84" cy="78" r="2" fill="#FFFFFF" />
            <circle cx="116" cy="78" r="2" fill="#FFFFFF" />
          </>
        ) : state === 'typing' ? (
          <>
            {/* Blinking/Closed eyes */}
            <path d="M 79,80 Q 84,84 89,80" stroke="#1E293B" strokeWidth="3" fill="none" />
            <path d="M 111,80 Q 116,84 121,80" stroke="#1E293B" strokeWidth="3" fill="none" />
          </>
        ) : (
          <>
            <circle cx="84" cy="80" r="5" fill="#1E293B" />
            <circle cx="116" cy="80" r="5" fill="#1E293B" />
            <circle cx="86" cy="78" r="2" fill="#FFFFFF" />
            <circle cx="118" cy="78" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Doctor Headband & Mirror */}
        <rect x="76" y="52" width="48" height="4" rx="2" fill="#475569" />
        <circle cx="100" cy="54" r="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="100" cy="54" r="4" fill="#FFFFFF" />

        {/* Cute blush cheeks */}
        <circle cx="70" cy="90" r="5" fill="#F43F5E" fillOpacity="0.4" />
        <circle cx="130" cy="90" r="5" fill="#F43F5E" fillOpacity="0.4" />
      </svg>
    </div>
  );
};
