import { useState } from 'react';
import type { ViewMode, ProcessingState, PanelType } from '../types';
import { usePresentation } from '../contexts/PresentationContext';
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
  const { isPresentation } = usePresentation();
  const t = THEME[type];
  return (
    <div className={`rounded-xl border-2 ${t.border} bg-white shadow-sm px-6 py-4`}>
      <h2 className={`${isPresentation ? 'text-2xl' : 'text-lg'} font-bold ${t.title}`}>{t.label}</h2>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {t.badges.map((b) => (
          <span key={b} className={`${isPresentation ? 'text-sm' : 'text-xs'} px-2.5 py-0.5 rounded-full font-medium ${t.badgeColor}`}>{b}</span>
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
  const { isPresentation } = usePresentation();
  const t = THEME[type];
  return (
    <div className={`rounded-xl border-2 ${t.border} bg-white shadow-sm ${isPresentation ? 'p-8' : 'p-6'}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center ${isPresentation ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'} rounded-full font-bold text-white ${t.badgeBg}`}>
          {stepNum}
        </span>
        <h3 className={`${isPresentation ? 'text-lg' : 'text-base'} font-semibold text-gray-800`}>{stepTitle}</h3>
      </div>
      {stepNum === 5
        ? <UsageRuleCard type={type} />
        : <StepContent stepNum={stepNum} type={type} processingState={processingState} onProcess={onProcess} />
      }
    </div>
  );
}

export default function DemoPage() {
  const { isPresentation, setIsPresentation } = usePresentation();
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

  const visibleSteps = STEPS;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              匿名加工情報・仮名加工情報・合成データの比較デモ
            </h1>
            <p className="mt-1 text-base text-gray-600">
              同一の元データに対して、3つの方式で何が異なるかを比較するデモ
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://github.com/gghatano/anonymize-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="GitHub リポジトリ"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">プレゼン</span>
              <button
                onClick={() => setIsPresentation(!isPresentation)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isPresentation ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPresentation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className={`rounded-lg bg-yellow-50 border border-yellow-200 px-4 ${isPresentation ? 'py-2 text-xs' : 'py-3 text-sm'} text-yellow-800`}>
          本画面は比較理解のためのデモです。実際の加工処理・法令適合性判定を行うものではありません。
        </div>
      </div>

      {!isPresentation && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-600">
            <span className="font-semibold">使い方：</span>
            比較モードを選択し、ステップ1〜5を順に確認することで、各方式の違いが理解できます。
            ステップ3では「加工結果を表示」ボタンを押すと、加工後のデータが表示されます。
          </div>
        </div>
      )}

      {/* ── Sticky: モード切替 + パネルヘッダー ── */}
      <div className="sticky top-0 z-20 bg-gray-50 pb-4 pt-4 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModeSwitcher viewMode={viewMode} onChange={setViewMode} />
        </div>
        {isPair && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PanelHeader type={pair[0]} />
              <PanelHeader type={pair[1]} />
            </div>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {isPair ? (
          <div className="space-y-8">
            {visibleSteps.map((step) => (
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

      {!isPresentation && (
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-gray-400">
            本デモは教育・比較理解を目的としたものです。実際の法令適合性判定を行うものではありません。
          </div>
        </footer>
      )}
    </div>
  );
}
