export default function Signature({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 400 120" 
      className={`signature ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .signature-path {
          fill: none;
          stroke: currentColor;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
      
      {/* Stylized "Elcee" signature */}
      <path 
        className="signature-path" 
        d="M 30 60 Q 40 30, 60 50 T 80 60 Q 90 70, 100 50 M 100 30 L 100 80 M 110 50 Q 120 30, 140 50 T 160 60 Q 170 70, 180 50 M 190 30 Q 200 50, 210 30 T 230 50 M 240 60 Q 250 40, 270 60 T 290 50"
      />
      
      {/* Flourish underline */}
      <path 
        className="signature-path" 
        d="M 20 90 Q 100 75, 200 90 T 380 85"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}
