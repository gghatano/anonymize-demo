import type { ViewMode } from '../types';
import { usePresentation } from '../contexts/PresentationContext';

interface ModeSwitcherProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const pairModes: { value: ViewMode; label: string }[] = [
  { value: 'anon-pseudo', label: '匿名加工 vs 仮名加工' },
  { value: 'anon-synthetic', label: '匿名加工 vs 合成データ' },
  { value: 'pseudo-synthetic', label: '仮名加工 vs 合成データ' },
];

const singleModes: { value: ViewMode; label: string }[] = [
  { value: 'anonymized', label: '匿名加工' },
  { value: 'pseudonymized', label: '仮名加工' },
  { value: 'synthetic', label: '合成データ' },
];

export default function ModeSwitcher({ viewMode, onChange }: ModeSwitcherProps) {
  const { isPresentation } = usePresentation();

  const btnPx = isPresentation ? 'px-5' : 'px-4';
  const btnPy = isPresentation ? 'py-2.5' : 'py-2';
  const btnText = isPresentation ? 'text-base' : 'text-sm';

  const renderButton = ({ value, label }: { value: ViewMode; label: string }) => {
    const isActive = viewMode === value;
    return (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`
          ${btnPx} ${btnPy} rounded-lg ${btnText} font-medium transition-colors
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 shrink-0">2方式を比較</span>
        <div className="flex flex-wrap gap-2">
          {pairModes.map(renderButton)}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 shrink-0">1方式を詳しく見る</span>
        <div className="flex flex-wrap gap-2">
          {singleModes.map(renderButton)}
        </div>
      </div>
    </div>
  );
}
