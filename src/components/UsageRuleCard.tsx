import { anonymizedUsageRules, pseudonymizedUsageRules, syntheticUsageRules } from '../data';
import type { PanelType } from '../types';

interface UsageRuleCardProps {
  type: PanelType;
}

const themeMap = {
  anonymized: {
    accentBorder: 'border-blue-200',
    highlightBg: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  pseudonymized: {
    accentBorder: 'border-orange-200',
    highlightBg: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  synthetic: {
    accentBorder: 'border-emerald-200',
    highlightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
} as const;

const rulesMap = {
  anonymized: anonymizedUsageRules,
  pseudonymized: pseudonymizedUsageRules,
  synthetic: syntheticUsageRules,
};

export default function UsageRuleCard({ type }: UsageRuleCardProps) {
  const theme = themeMap[type];
  const rules = rulesMap[type];

  return (
    <div className={`border rounded-lg p-4 ${theme.accentBorder}`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">できること / 制約</h4>

      <div className="space-y-3">
        {/* できること */}
        <div>
          <h5 className="text-xs font-semibold text-green-700 mb-1.5">できること</h5>
          <ul className="space-y-1">
            {rules.canDo.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 制約・留意 */}
        <div>
          <h5 className="text-xs font-semibold text-amber-700 mb-1.5">制約・留意</h5>
          <ul className="space-y-1">
            {rules.constraints.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 強調文言 */}
        <div className="space-y-1.5">
          {rules.highlights.map((item, i) => (
            <div
              key={i}
              className={`text-xs px-3 py-2 rounded border font-medium ${theme.highlightBg}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
