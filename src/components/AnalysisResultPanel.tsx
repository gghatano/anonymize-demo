import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { anonymizedAnalysis, pseudonymizedAnalysis, syntheticAnalysis } from '../data';
import type { PanelType } from '../types';
import { usePresentation } from '../contexts/PresentationContext';

interface AnalysisResultPanelProps {
  type: PanelType;
}

const themeMap = {
  anonymized: {
    barColor: '#3b82f6',
    subtitleColor: 'text-blue-500',
  },
  pseudonymized: {
    barColor: '#f59e0b',
    subtitleColor: 'text-amber-500',
  },
  synthetic: {
    barColor: '#10b981',
    subtitleColor: 'text-emerald-500',
  },
} as const;

const analysisMap = {
  anonymized: anonymizedAnalysis,
  pseudonymized: pseudonymizedAnalysis,
  synthetic: syntheticAnalysis,
};

export default function AnalysisResultPanel({ type }: AnalysisResultPanelProps) {
  const { isPresentation } = usePresentation();
  const theme = themeMap[type];
  const analysis = analysisMap[type];

  const visibleAnalysis = isPresentation ? analysis.slice(0, 2) : analysis;
  const chartHeight = isPresentation ? 260 : 200;
  const axisFontSize = isPresentation ? 12 : 10;
  const smallAxisFontSize = isPresentation ? 9 : 7;

  return (
    <div className="space-y-4">
      {!isPresentation && (
        <p className="text-xs text-gray-500 leading-relaxed">
          以下は、数千件規模のデータを想定した場合の分析イメージです。加工方式によって分析の粒度がどう変わるかをご確認ください。
        </p>
      )}
      <div className="grid grid-cols-1 gap-4">
        {visibleAnalysis.map((item, i) => (
          <div key={i} className="border rounded-lg p-3">
            <h5 className="text-xs font-semibold text-gray-700">{item.title}</h5>
            {item.subtitle && (
              <p className={`text-[10px] mb-2 ${theme.subtitleColor}`}>
                {item.subtitle}
              </p>
            )}
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={item.data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={item.data.length > 15 ? { fontSize: smallAxisFontSize } : { fontSize: axisFontSize }}
                  interval={item.data.length > 20 ? 4 : item.data.length > 12 ? 1 : 0}
                  angle={item.data.length > 8 ? -45 : -20}
                  textAnchor="end"
                  height={item.data.length > 8 ? 55 : 50}
                />
                <YAxis tick={{ fontSize: axisFontSize }} width={45} />
                <Tooltip
                  contentStyle={{ fontSize: 12 }}
                  formatter={(value) => [Number(value).toLocaleString(), '人数']}
                />
                <Bar
                  dataKey="value"
                  fill={theme.barColor}
                  radius={[2, 2, 0, 0]}
                  maxBarSize={item.data.length > 15 ? 12 : undefined}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

    </div>
  );
}
