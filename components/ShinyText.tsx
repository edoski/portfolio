import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        color: 'var(--color-terminal-green)',
        backgroundImage: disabled
          ? 'linear-gradient(90deg, var(--color-terminal-green) 0%, var(--color-terminal-green) 100%)'
          : 'linear-gradient(90deg, var(--color-terminal-green) 0%, var(--color-terminal-green) 45%, rgba(255, 255, 255, 0.95) 50%, var(--color-terminal-green) 55%, var(--color-terminal-green) 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '200% center',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
