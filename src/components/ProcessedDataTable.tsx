import { sourceData, anonymizedData, pseudonymizedData, syntheticData } from '../data';
import type { PersonRecord, PanelType } from '../types';

const HEADERS = [
  { key: 'customerId', label: '顧客ID' },
  { key: 'name', label: '氏名' },
  { key: 'birthDate', label: '生年月日' },
  { key: 'age', label: '年齢' },
  { key: 'gender', label: '性別' },
  { key: 'postalCode', label: '郵便番号' },
  { key: 'address', label: '住所' },
  { key: 'phone', label: '電話番号' },
  { key: 'email', label: 'メールアドレス' },
  { key: 'cardNumber', label: 'カード番号' },
  { key: 'purchaseAmount', label: '購買金額' },
  { key: 'visitCount', label: '来店回数' },
  { key: 'diseaseCategory', label: '疾患区分' },
  { key: 'contractType', label: '契約種別' },
] as const;

type FieldKey = (typeof HEADERS)[number]['key'];

function getBadge(
  originalValue: string,
  processedValue: string,
  _key: FieldKey,
  isSynthetic: boolean,
): { label: string; color: string } | null {
  if (!isSynthetic && originalValue === processedValue) {
    return null;
  }
  if (isSynthetic) {
    if (/^SYN_/.test(processedValue)) {
      return { label: '合成ID', color: 'bg-emerald-100 text-emerald-700' };
    }
    return null;
  }
  if (processedValue === '-') {
    return { label: '削除', color: 'bg-red-100 text-red-700' };
  }
  if (/^PSEUDO_/.test(processedValue)) {
    return { label: 'ID置換', color: 'bg-purple-100 text-purple-700' };
  }
  if (/[〜～以上未満]|代$/.test(processedValue) || /\*/.test(processedValue)) {
    return { label: '一般化', color: 'bg-sky-100 text-sky-700' };
  }
  if (/系$/.test(processedValue) && !/系$/.test(originalValue)) {
    return { label: 'カテゴリ化', color: 'bg-teal-100 text-teal-700' };
  }
  return { label: '加工', color: 'bg-amber-100 text-amber-700' };
}

const themeMap = {
  anonymized: {
    btnColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    headerBg: 'bg-blue-50 text-blue-900',
    changedCellBg: 'bg-blue-50/70',
  },
  pseudonymized: {
    btnColor: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
    headerBg: 'bg-orange-50 text-orange-900',
    changedCellBg: 'bg-orange-50/70',
  },
  synthetic: {
    btnColor: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    headerBg: 'bg-emerald-50 text-emerald-900',
    changedCellBg: 'bg-emerald-50/70',
  },
} as const;

const dataMap: Record<string, Record<string, string>[]> = {
  anonymized: anonymizedData as unknown as Record<string, string>[],
  pseudonymized: pseudonymizedData as unknown as Record<string, string>[],
  synthetic: syntheticData,
};

interface ProcessedDataTableProps {
  type: PanelType;
  processingState: 'before' | 'after';
  onProcess: () => void;
}

export default function ProcessedDataTable({
  type,
  processingState,
  onProcess,
}: ProcessedDataTableProps) {
  const isSynthetic = type === 'synthetic';
  const theme = themeMap[type];
  const processedData = dataMap[type];

  const buttonLabel = isSynthetic ? 'データ生成' : '加工実施';
  const descriptionText = isSynthetic
    ? '統計モデルに基づいて架空のデータを生成します'
    : '加工設計に基づいてデータを加工します';

  if (processingState === 'before') {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm text-gray-500">{descriptionText}</p>
        <button
          onClick={onProcess}
          className={`px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.btnColor}`}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 合成データの場合、加工前データは表示しない */}
      {!isSynthetic && (
        <div>
          <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
            加工前データ
          </h5>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  {HEADERS.map((h) => (
                    <th
                      key={h.key}
                      className="px-3 py-2 text-left font-semibold whitespace-nowrap border-b border-r last:border-r-0"
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sourceData.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50/50">
                    {HEADERS.map((h) => (
                      <td
                        key={h.key}
                        className="px-3 py-1.5 whitespace-nowrap border-b border-r last:border-r-0"
                      >
                        {String(row[h.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h5 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
          {isSynthetic ? '生成結果データ' : '加工後データ'}
        </h5>
        {isSynthetic && (
          <p className="text-xs text-emerald-600 mb-2">
            ※ 以下は元データから生成された架空のレコードです
          </p>
        )}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-xs">
            <thead>
              <tr className={theme.headerBg}>
                {HEADERS.map((h) => (
                  <th
                    key={h.key}
                    className="px-3 py-2 text-left font-semibold whitespace-nowrap border-b border-r last:border-r-0"
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.map((row, i) => {
                const original = isSynthetic ? null : (sourceData[i] as PersonRecord);
                return (
                  <tr key={i} className="even:bg-gray-50/30">
                    {HEADERS.map((h) => {
                      const origVal = original ? String(original[h.key]) : '';
                      const procVal = String(row[h.key]);
                      const badge = getBadge(origVal, procVal, h.key, isSynthetic);
                      const isChanged = badge !== null;

                      return (
                        <td
                          key={h.key}
                          className={`px-3 py-1.5 whitespace-nowrap border-b border-r last:border-r-0 ${
                            isChanged ? theme.changedCellBg : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{procVal}</span>
                            {badge && (
                              <span
                                className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium ${badge.color}`}
                              >
                                {badge.label}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {type === 'anonymized' && (
        <p className="text-xs text-gray-400 leading-relaxed">
          ※ サンプル件数が少ないため属性の組み合わせで一意に見える場合がありますが、実運用では十分なレコード数で加工を行い、k匿名性等の基準を満たすことが前提となります。
        </p>
      )}
    </div>
  );
}
