import type { ViewMode } from '../types';

interface ModeSwitcherProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const pairModes: { value: ViewMode; label: string }[] = [
  { value: 'anon-pseudo', label: '匿名 × 仮名' },
  { value: 'anon-synthetic', label: '匿名 × 合成' },
  { value: 'pseudo-synthetic', label: '仮名 × 合成' },
];

const singleModes: { value: ViewMode; label: string }[] = [
  { value: 'anonymized', label: '匿名加工' },
  { value: 'pseudonymized', label: '仮名加工' },
  { value: 'synthetic', label: '合成データ' },
];

export default function ModeSwitcher({ viewMode, onChange }: ModeSwitcherProps) {
  const renderButton = ({ value, label }: { value: ViewMode; label: string }) => {
    const isActive = viewMode === value;
    return (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-colors
          border cursor-pointer
          ${
            isActive
              ? 'bg-gray-800 text-white border-gray-800 shadow-sm'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
          }
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 shrink-0">横並び比較</span>
        <div className="flex flex-wrap gap-2">
          {pairModes.map(renderButton)}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 shrink-0">単独表示</span>
        <div className="flex flex-wrap gap-2">
          {singleModes.map(renderButton)}
        </div>
      </div>
    </div>
  );
}
