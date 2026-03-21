import { useState } from 'react';
import { sourceData } from '../data';
import type { PanelType } from '../types';
import { usePresentation } from '../contexts/PresentationContext';

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

const PRIMARY_KEYS: ReadonlyArray<(typeof HEADERS)[number]['key']> = [
  'customerId', 'name', 'age', 'gender', 'address', 'purchaseAmount', 'diseaseCategory',
];

const PRESENTATION_KEYS: ReadonlyArray<(typeof HEADERS)[number]['key']> = [
  'customerId', 'name', 'age', 'purchaseAmount',
];

const anonymizedTargetFields = [
  '顧客ID', '氏名', '生年月日', '年齢', '郵便番号', '住所',
  '電話番号', 'メールアドレス', 'カード番号', '購買金額', '来店回数', '疾患区分',
];

const pseudonymizedTargetFields = [
  '顧客ID', '氏名', '電話番号', 'メールアドレス', 'カード番号', '住所',
];

const syntheticTargetFields = [
  '氏名', '電話番号', 'メールアドレス', 'カード番号',
];

const themeMap = {
  anonymized: {
    headerBg: 'bg-blue-50 text-blue-900',
    tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    targetFields: anonymizedTargetFields,
    note: '※ 個人を識別し得る情報や、他の情報と照合して個人が推知され得る情報を対象に加工を実施する想定',
  },
  pseudonymized: {
    headerBg: 'bg-orange-50 text-orange-900',
    tagColor: 'bg-orange-100 text-orange-700 border-orange-200',
    targetFields: pseudonymizedTargetFields,
    note: '※ 本人を直接識別する項目や、漏えい時のリスクが高い項目を中心に加工する想定',
  },
  synthetic: {
    headerBg: 'bg-emerald-50 text-emerald-900',
    tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    targetFields: syntheticTargetFields,
    note: '※ 元データの統計的特性を分析し、実在しない架空のレコードを生成する想定',
  },
} as const;

interface SourceDataTableProps {
  type: PanelType;
}

export default function SourceDataTable({ type }: SourceDataTableProps) {
  const { isPresentation } = usePresentation();
  const theme = themeMap[type];
  const [showAllColumns, setShowAllColumns] = useState(false);

  const visibleHeaders = isPresentation
    ? HEADERS.filter((h) => PRESENTATION_KEYS.includes(h.key))
    : showAllColumns
      ? HEADERS
      : HEADERS.filter((h) => PRIMARY_KEYS.includes(h.key));

  const visibleData = isPresentation ? sourceData.slice(0, 3) : sourceData;

  return (
    <div>
      {!isPresentation && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">加工対象項目</h4>
          <div className="flex flex-wrap gap-1.5">
            {theme.targetFields.map((f) => (
              <span
                key={f}
                className={`text-xs px-2 py-0.5 rounded-full border ${theme.tagColor}`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {!isPresentation && (
        <div className="mb-1 text-right">
          <button
            type="button"
            onClick={() => setShowAllColumns((prev) => !prev)}
            className="text-xs text-gray-500 underline cursor-pointer"
          >
            {showAllColumns ? '主要列のみ表示' : 'すべての列を表示'}
          </button>
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className={`min-w-full ${isPresentation ? 'text-sm' : 'text-xs'}`}>
          <thead>
            <tr className={theme.headerBg}>
              {visibleHeaders.map((h) => (
                <th
                  key={h.key}
                  className={`${isPresentation ? 'px-4 py-2.5' : 'px-3 py-2'} text-left font-semibold whitespace-nowrap border-b border-r last:border-r-0`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 even:bg-gray-50/50">
                {visibleHeaders.map((h) => (
                  <td
                    key={h.key}
                    className={`${isPresentation ? 'px-4 py-2.5' : 'px-3 py-1.5'} whitespace-nowrap border-b border-r last:border-r-0`}
                  >
                    {String(row[h.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isPresentation && (
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          {theme.note}
        </p>
      )}
    </div>
  );
}
