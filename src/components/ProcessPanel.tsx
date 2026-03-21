import type { ProcessingState, PanelType } from '../types';
import { usePresentation } from '../contexts/PresentationContext';
import SourceDataTable from './SourceDataTable';
import ProcessingDesignCardList from './ProcessingDesignCardList';
import ProcessedDataTable from './ProcessedDataTable';
import AnalysisResultPanel from './AnalysisResultPanel';
import UsageRuleCard from './UsageRuleCard';

interface ProcessPanelProps {
  type: PanelType;
  processingState: ProcessingState;
  onProcess: () => void;
}

const STEPS = [
  { num: 1, title: '加工対象データの明示' },
  { num: 2, title: '加工設計' },
  { num: 3, title: '加工の実施' },
  { num: 4, title: '活用の実施' },
  { num: 5, title: 'できること / 制約' },
];

const THEME: Record<PanelType, {
  border: string; title: string; badgeBg: string; badgeColor: string;
  label: string; badges: string[];
}> = {
  anonymized: {
    border: 'border-blue-200', title: 'text-blue-700', badgeBg: 'bg-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
    label: '匿名加工情報', badges: ['社外提供想定', '統計・分析向け', '個人復元前提なし'],
  },
  pseudonymized: {
    border: 'border-amber-200', title: 'text-amber-700', badgeBg: 'bg-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    label: '仮名加工情報', badges: ['社内利用限定', '継続分析向け', '管理措置前提'],
  },
  synthetic: {
    border: 'border-emerald-200', title: 'text-emerald-700', badgeBg: 'bg-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    label: '合成データ', badges: ['プライバシーリスク低', '詳細分析可能', '活用範囲が広い'],
  },
};

export default function ProcessPanel({ type, processingState, onProcess }: ProcessPanelProps) {
  const { isPresentation } = usePresentation();
  const t = THEME[type];
  const panelBorder = t.border;
  const titleColor = t.title;
  const stepBadgeBg = t.badgeBg;
  const panelLabel = t.label;
  const badges = t.badges;
  const badgeColor = t.badgeColor;

  // プレゼンモード時はステップ2（加工設計）をスキップ
  const visibleSteps = isPresentation
    ? STEPS.filter((s) => s.num !== 2)
    : STEPS;

  return (
    <div className={`rounded-xl border-2 ${panelBorder} bg-white shadow-sm`}>
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className={`${isPresentation ? 'text-xl' : 'text-lg'} font-bold ${titleColor}`}>{panelLabel}</h2>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {badges.map((b) => (
            <span
              key={b}
              className={`${isPresentation ? 'text-sm' : 'text-xs'} px-2.5 py-0.5 rounded-full font-medium ${badgeColor}`}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="p-6 space-y-8">
        {visibleSteps.map((step) => (
          <section key={step.num}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${stepBadgeBg}`}
              >
                {step.num}
              </span>
              <h3 className="text-sm font-semibold text-gray-800">{step.title}</h3>
            </div>

            {step.num === 1 && <SourceDataTable type={type} />}
            {step.num === 2 && <ProcessingDesignCardList type={type} />}
            {step.num === 3 && (
              <ProcessedDataTable
                type={type}
                processingState={processingState}
                onProcess={onProcess}
              />
            )}
            {step.num === 4 && <AnalysisResultPanel type={type} />}
            {step.num === 5 && <UsageRuleCard type={type} />}
          </section>
        ))}
      </div>
    </div>
  );
}
