/**
 * Trionn-style infinite horizontal scrolling ticker strip.
 * Shows skills/tech keywords with "·" separators.
 * Duplicates content so the loop is seamless.
 */
const ITEMS = [
  'React.js', '·', 'Node.js', '·', 'LangChain', '·',
  'Python', '·', 'FastAPI', '·', 'MongoDB', '·',
  'DistilBERT', '·', 'Prompt Injection', '·', 'LLM Security', '·',
  'Chrome Extensions', '·', 'Express.js', '·', 'Tailwind CSS', '·',
  'AssemblyAI', '·', 'FAISS', '·', 'LangGraph', '·',
  'Murf AI', '·', 'Voice Chess', '·', 'Bootstrap', '·',
];

const MarqueeTicker = ({ proMode }) => {
  // Duplicate for seamless infinite loop
  const all = [...ITEMS, ...ITEMS];

  return (
    <div
      className={`relative w-full py-5 overflow-hidden border-y transition-colors duration-700 ${
        proMode
          ? 'border-emerald-500/10 bg-[#050a07]'
          : 'border-white/[0.05] bg-[#030303]'
      }`}
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {all.map((item, i) => (
            <span
              key={i}
              className={`flex-shrink-0 px-4 text-xs font-mono uppercase tracking-[0.18em] transition-colors duration-500 ${
                item === '·'
                  ? proMode ? 'text-emerald-500/30' : 'text-white/20'
                  : proMode ? 'text-emerald-400/60' : 'text-white/40'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative corner plusses, Trionn-style */}
      <div className={`absolute left-6 top-1/2 -translate-y-1/2 ${proMode ? 'text-emerald-500/25' : 'text-white/15'}`}>
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1"/>
          <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 ${proMode ? 'text-emerald-500/25' : 'text-white/15'}`}>
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1"/>
          <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
};

export default MarqueeTicker;
