import { useState } from 'react';
import { anonymizedDesigns, pseudonymizedDesigns, syntheticDesigns } from '../data';
import type { PanelType } from '../types';
import { usePresentation } from '../contexts/PresentationContext';

interface ProcessingDesignCardListProps {
  type: PanelType;
}

const themeMap = {
  anonymized: {
    title: '加工設計（委員会規則1-5号を意識した例）',
    cardBorder: 'border-blue-200',
    cardHeaderBg: 'bg-blue-50 text-blue-800',
    tableHeaderBg: 'bg-blue-50/60',
  },
  pseudonymized: {
    title: '加工設計（委員会規則1-3号を意識した例）',
    cardBorder: 'border-orange-200',
    cardHeaderBg: 'bg-orange-50 text-orange-800',
    tableHeaderBg: 'bg-orange-50/60',
  },
  synthetic: {
    title: '生成設計（統計モデルに基づく合成データ生成）',
    cardBorder: 'border-emerald-200',
    cardHeaderBg: 'bg-emerald-50 text-emerald-800',
    tableHeaderBg: 'bg-emerald-50/60',
  },
} as const;

const designsMap = {
  anonymized: anonymizedDesigns,
  pseudonymized: pseudonymizedDesigns,
  synthetic: syntheticDesigns,
};

export default function ProcessingDesignCardList({ type }: ProcessingDesignCardListProps) {
  const { isPresentation } = usePresentation();
  const theme = themeMap[type];
  const designs = designsMap[type];
  const [expandedLegal, setExpandedLegal] = useState<Record<number, boolean>>({});

  const textSize = isPresentation ? 'text-sm' : 'text-xs';
  const cellPad = isPresentation ? 'px-4 py-2.5' : 'px-3 py-1.5';

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{theme.title}</h4>

      <div className="grid gap-3">
        {designs.map((design, i) => (
          <div key={i} className={`border rounded-lg shadow-sm overflow-hidden ${theme.cardBorder}`}>
            <div className={`px-4 py-2 ${theme.cardHeaderBg}`}>
              <div className="font-semibold text-sm">{design.category}</div>
              {!isPresentation && design.legalBasis.length > 0 && (
                <div className="mt-1">
                  {expandedLegal[i] ? (
                    <div className="space-y-0.5">
                      {design.legalBasis.map((basis, k) => (
                        <div key={k} className="text-[11px] opacity-80">
                          {basis}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-xs underline text-gray-400 cursor-pointer mt-0.5"
                        onClick={() => setExpandedLegal((prev) => ({ ...prev, [i]: false }))}
                      >
                        法的根拠を閉じる
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="text-xs underline text-gray-400 cursor-pointer"
                      onClick={() => setExpandedLegal((prev) => ({ ...prev, [i]: true }))}
                    >
                      法的根拠を表示
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full ${textSize}`}>
                <thead>
                  <tr className={theme.tableHeaderBg}>
                    <th className={`${cellPad} text-left font-medium border-b w-1/5`}>項目</th>
                    <th className={`${cellPad} text-left font-medium border-b w-2/5`}>加工内容</th>
                    <th className={`${cellPad} text-left font-medium border-b w-2/5`}>意図</th>
                  </tr>
                </thead>
                <tbody>
                  {design.items.map((item, j) => (
                    <tr key={j} className="hover:bg-gray-50">
                      <td className={`${cellPad} border-b font-medium`}>{item.field}</td>
                      <td className={`${cellPad} border-b`}>{item.method}</td>
                      <td className={`${cellPad} border-b text-gray-600`}>{item.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {!isPresentation && (
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          ※ 法令の厳密な要件判定を行うものではなく、比較理解のための画面デモです
        </p>
      )}
    </div>
  );
}
