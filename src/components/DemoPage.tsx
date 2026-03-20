import { useState } from 'react';
import type { ViewMode, ProcessingState, PanelType } from '../types';
import ModeSwitcher from './ModeSwitcher';
import ProcessPanel from './ProcessPanel';
import StepContent from './StepContent';
import UsageRuleCard from './UsageRuleCard';
import ComparisonSummary from './ComparisonSummary';

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
    label: '匿名加工情報',
    badges: ['社外提供想定', '統計・分析向け', '個人復元前提なし'],
  },
  pseudonymized: {
    border: 'border-amber-200', title: 'text-amber-700', badgeBg: 'bg-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    label: '仮名加工情報',
    badges: ['社内利用限定', '継続分析向け', '管理措置前提'],
  },
  synthetic: {
    border: 'border-emerald-200', title: 'text-emerald-700', badgeBg: 'bg-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    label: '合成データ',
    badges: ['プライバシーリスク低', '詳細分析可能', '活用範囲が広い'],
  },
};

const PAIR_MAP: Partial<Record<ViewMode, [PanelType, PanelType]>> = {
  'anon-pseudo': ['anonymized', 'pseudonymized'],
  'anon-synthetic': ['anonymized', 'synthetic'],
  'pseudo-synthetic': ['pseudonymized', 'synthetic'],
};

function PanelHeader({ type }: { type: PanelType }) {
  const t = THEME[type];
  return (
    <div className={`rounded-xl border-2 ${t.border} bg-white shadow-sm px-6 py-4`}>
      <h2 className={`text-lg font-bold ${t.title}`}>{t.label}</h2>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {t.badges.map((b) => (
          <span key={b} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${t.badgeColor}`}>{b}</span>
        ))}
      </div>
    </div>
  );
}

function StepWrapper({
  stepNum, stepTitle, type, processingState, onProcess,
}: {
  stepNum: number; stepTitle: string; type: PanelType;
  processingState: ProcessingState; onProcess: () => void;
}) {
  const t = THEME[type];
  return (
    <div className={`rounded-xl border-2 ${t.border} bg-white shadow-sm p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${t.badgeBg}`}>
          {stepNum}
        </span>
        <h3 className="text-sm font-semibold text-gray-800">{stepTitle}</h3>
      </div>
      {stepNum === 5
        ? <UsageRuleCard type={type} />
        : <StepContent stepNum={stepNum} type={type} processingState={processingState} onProcess={onProcess} />
      }
    </div>
  );
}

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('anon-pseudo');
  const [anonymizedState, setAnonymizedState] = useState<ProcessingState>('before');
  const [pseudonymizedState, setPseudonymizedState] = useState<ProcessingState>('before');
  const [syntheticState, setSyntheticState] = useState<ProcessingState>('before');

  const pair = PAIR_MAP[viewMode];
  const isPair = !!pair;

  function getState(pt: PanelType): ProcessingState {
    return pt === 'anonymized' ? anonymizedState : pt === 'pseudonymized' ? pseudonymizedState : syntheticState;
  }
  function getOnProcess(pt: PanelType): () => void {
    return pt === 'anonymized' ? () => setAnonymizedState('after')
      : pt === 'pseudonymized' ? () => setPseudonymizedState('after')
      : () => setSyntheticState('after');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            匿名加工情報・仮名加工情報・合成データの比較デモ
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            同一の元データに対して、3つの方式で何が異なるかを比較するデモ
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          本画面は比較理解のためのデモです。実際の加工処理・法令適合性判定を行うものではありません。
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <ModeSwitcher viewMode={viewMode} onChange={setViewMode} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {isPair ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PanelHeader type={pair[0]} />
              <PanelHeader type={pair[1]} />
            </div>
            {STEPS.map((step) => (
              <div key={step.num} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <StepWrapper stepNum={step.num} stepTitle={step.title} type={pair[0]}
                  processingState={getState(pair[0])} onProcess={getOnProcess(pair[0])} />
                <StepWrapper stepNum={step.num} stepTitle={step.title} type={pair[1]}
                  processingState={getState(pair[1])} onProcess={getOnProcess(pair[1])} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <ProcessPanel
              type={viewMode as PanelType}
              processingState={getState(viewMode as PanelType)}
              onProcess={getOnProcess(viewMode as PanelType)}
            />
          </div>
        )}
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
        <ComparisonSummary
          left={pair ? pair[0] : viewMode as PanelType}
          right={pair ? pair[1] : viewMode as PanelType}
        />
      </section>
    </div>
  );
}
