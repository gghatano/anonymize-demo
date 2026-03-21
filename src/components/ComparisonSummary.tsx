import { Fragment } from 'react';
import { comparisonSummary } from '../data';
import type { HighlightType, PanelType, ComparisonRow } from '../types';
import { usePresentation } from '../contexts/PresentationContext';

const PANEL_META: Record<PanelType, {
  label: string; headerBg: string;
  positiveBg: string; badgeBg: string; badges: string[];
}> = {
  anonymized: {
    label: '匿名加工情報', headerBg: 'bg-blue-600',
    positiveBg: 'bg-blue-50 text-blue-800 font-semibold',
    badgeBg: 'bg-blue-100 text-blue-700',
    badges: ['社外提供想定', '統計・分析向け', '個人復元前提なし'],
  },
  pseudonymized: {
    label: '仮名加工情報', headerBg: 'bg-amber-600',
    positiveBg: 'bg-amber-50 text-amber-800 font-semibold',
    badgeBg: 'bg-amber-100 text-amber-700',
    badges: ['社内利用限定', '継続分析向け', '管理措置前提'],
  },
  synthetic: {
    label: '合成データ', headerBg: 'bg-emerald-600',
    positiveBg: 'bg-emerald-50 text-emerald-800 font-semibold',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    badges: ['プライバシーリスク低', '詳細分析可能', '活用範囲が広い'],
  },
};

const HIGHLIGHT_KEY: Record<PanelType, keyof ComparisonRow> = {
  anonymized: 'anonymizedHighlight',
  pseudonymized: 'pseudonymizedHighlight',
  synthetic: 'syntheticHighlight',
};
const VALUE_KEY: Record<PanelType, keyof ComparisonRow> = {
  anonymized: 'anonymized',
  pseudonymized: 'pseudonymized',
  synthetic: 'synthetic',
};

function highlightClasses(highlight: HighlightType | undefined, panel: PanelType): string {
  if (!highlight) return 'text-gray-600';
  switch (highlight) {
    case 'positive': return PANEL_META[panel].positiveBg;
    case 'negative': return 'bg-gray-100 text-gray-500';
    case 'neutral': return 'text-gray-600';
  }
}

function highlightIcon(highlight: HighlightType | undefined): string {
  if (!highlight) return '';
  return highlight === 'positive' ? '◎ ' : highlight === 'negative' ? '△ ' : '';
}

interface ComparisonSummaryProps {
  left: PanelType;
  right: PanelType;
}

export default function ComparisonSummary({ left, right }: ComparisonSummaryProps) {
  const { isPresentation } = usePresentation();
  const lMeta = PANEL_META[left];
  const rMeta = PANEL_META[right];

  const textSize = isPresentation ? 'text-base' : 'text-sm';
  const cellPx = isPresentation ? 'px-5' : 'px-4';

  // プレゼンモード時は概要行（overview group）のみ表示
  const visibleRows = isPresentation
    ? comparisonSummary.filter((row) => row.group === 'overview')
    : comparisonSummary;

  return (
    <section className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {lMeta.label}と{rMeta.label}の比較
      </h2>
      {!isPresentation && (
        <p className="text-sm text-gray-600 mb-4">
          ここまでの内容を踏まえた、2方式の特徴比較です。
        </p>
      )}

      <div className={`overflow-x-auto ${isPresentation ? 'mt-4' : ''}`}>
        <table className={`w-full border rounded-lg overflow-hidden ${textSize} table-fixed`}>
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[40%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead>
            <tr>
              <th className={`bg-gray-100 text-gray-700 ${cellPx} py-3 text-left font-semibold border-b`}>
                比較項目
              </th>
              <th className={`${lMeta.headerBg} text-white ${cellPx} py-3 text-left font-semibold border-b`}>
                {lMeta.label}
              </th>
              <th className={`${rMeta.headerBg} text-white ${cellPx} py-3 text-left font-semibold border-b`}>
                {rMeta.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, idx) => {
              const prevRow = idx > 0 ? visibleRows[idx - 1] : null;
              const isGroupBoundary = prevRow && prevRow.group !== row.group;
              const isOverview = row.group === 'overview';
              const py = isOverview ? 'py-4' : 'py-3';

              const lHighlight = row[HIGHLIGHT_KEY[left]] as HighlightType | undefined;
              const rHighlight = row[HIGHLIGHT_KEY[right]] as HighlightType | undefined;
              const lValue = row[VALUE_KEY[left]] as string;
              const rValue = row[VALUE_KEY[right]] as string;

              return (
                <Fragment key={row.item}>
                  {isGroupBoundary && (
                    <tr>
                      <td colSpan={3} className="py-1 bg-gray-200/60" />
                    </tr>
                  )}
                  <tr>
                    <td className={`${cellPx} border-b font-medium text-gray-700 ${py} ${textSize}`}>
                      {row.item}
                    </td>
                    <td className={`${cellPx} border-b ${py} ${textSize} ${highlightClasses(lHighlight, left)}`}>
                      {highlightIcon(lHighlight)}{lValue}
                    </td>
                    <td className={`${cellPx} border-b ${py} ${textSize} ${highlightClasses(rHighlight, right)}`}>
                      {highlightIcon(rHighlight)}{rValue}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-4 text-xs text-gray-500">
        <span>◎ 特徴・強み</span>
        <span>△ 制約・留意点</span>
      </div>

    </section>
  );
}
