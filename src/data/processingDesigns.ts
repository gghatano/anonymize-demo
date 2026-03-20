import type { ProcessingDesign } from '../types';

// 匿名加工設計（規則第34条）
export const anonymizedDesigns: ProcessingDesign[] = [
  {
    category: '識別子の加工（氏名・IDなど個人を直接特定できる情報）',
    legalBasis: [
      '規則第34条第1号：特定の個人を識別することができる記述等の削除',
      '規則第34条第2号：個人識別符号の削除',
      '規則第34条第3号：情報を相互に連結する符号の削除',
    ],
    items: [
      { field: '顧客ID', method: '削除', intent: '個人の直接識別を防止（第1号・第3号）' },
      { field: '氏名', method: '削除', intent: '個人の直接識別を防止（第1号）' },
      { field: '電話番号', method: '削除', intent: '連絡先からの特定を防止（第1号）' },
      { field: 'メールアドレス', method: '削除', intent: '連絡先からの特定を防止（第1号）' },
      { field: 'カード番号', method: '削除', intent: '決済情報からの特定を防止（第1号）' },
    ],
  },
  {
    category: '準識別子の加工（単独では個人を特定しにくいが、組み合わせにより特定につながり得る情報）',
    legalBasis: [
      '規則第34条第5号：データベース内の他の記述等との差異等を勘案した適切な措置',
    ],
    items: [
      { field: '生年月日', method: '年齢帯へ変換（10歳刻み）', intent: '年齢の概要把握に留め、個人特定リスクを低減（第5号）' },
      { field: '年齢', method: '年齢帯へ変換（10歳刻み）', intent: '生年月日と同様の一般化処理（第5号）' },
      { field: '郵便番号', method: '上位3桁のみ保持', intent: '広域の地域分析を可能にしつつ住所特定を防止（第5号）' },
      { field: '住所', method: '都道府県のみ保持', intent: '地域傾向の分析に必要な粒度に限定（第5号）' },
    ],
  },
  {
    category: '外れ値の加工',
    legalBasis: [
      '規則第34条第4号：特異な記述等の削除',
    ],
    items: [
      { field: '購買金額', method: 'トップコード化・金額帯変換', intent: '極端な値による個人特定を防止（第4号）' },
      { field: '来店回数', method: '丸め処理（10回単位）', intent: '極端な値による個人特定を防止（第4号）' },
    ],
  },
  {
    category: '機微性の高い値',
    legalBasis: [
      '規則第34条第1号：特定の個人を識別することができる記述等の削除',
      '規則第34条第5号：データベース内の他の記述等との差異等を勘案した適切な措置',
    ],
    items: [
      { field: '疾患区分', method: '大分類への統合', intent: '希少疾患等による個人特定リスクを低減（第1号・第5号）' },
    ],
  },
];

// 合成データ生成設計
export const syntheticDesigns: ProcessingDesign[] = [
  {
    category: '元データの統計分析',
    legalBasis: ['※ 合成データの生成は個人情報保護法上の「加工」とは異なるアプローチ'],
    items: [
      { field: '全項目', method: '統計的特性（分布・相関）を分析', intent: '元データの構造を学習し再現するため' },
    ],
  },
  {
    category: '合成レコードの生成',
    legalBasis: ['※ 生成されたデータは実在の個人に対応しない'],
    items: [
      { field: '数値項目（年齢・金額等）', method: '元の分布に基づく乱数生成', intent: '統計的特性を保持しつつ架空の値を生成' },
      { field: 'カテゴリ項目（性別・契約等）', method: '元の出現頻度に基づくサンプリング', intent: '構成比を維持' },
      { field: '住所・郵便番号', method: '元の地域分布に基づく架空住所の生成', intent: '地理的特性を保持' },
    ],
  },
  {
    category: '不要項目の除外',
    legalBasis: ['※ 実在しないデータだが、不要な項目は生成しない方針'],
    items: [
      { field: '氏名', method: '生成しない', intent: '分析目的に不要' },
      { field: '電話番号・メール・カード番号', method: '生成しない', intent: '連絡先・決済情報は分析に不要' },
    ],
  },
  {
    category: '品質検証',
    legalBasis: ['※ 合成データの有用性は元データとの統計的一致度に依存'],
    items: [
      { field: '分布の一致', method: '元データとの統計的適合度を検証', intent: '実用に耐える品質を確保' },
      { field: '個体の非一致', method: '元データのレコードと一致しないことを確認', intent: 'プライバシー保護の担保' },
    ],
  },
];

// 仮名加工設計（規則第31条）
export const pseudonymizedDesigns: ProcessingDesign[] = [
  {
    category: '識別子の加工（氏名・IDなど個人を直接特定できる情報）',
    legalBasis: [
      '規則第31条第1号：特定の個人を識別することができる記述等の削除又は置換',
    ],
    items: [
      { field: '顧客ID', method: '仮IDへ置換（PSEUDO_XXX）', intent: '対応テーブルで元データと紐付け可能にしつつ直接識別を防止（第1号）' },
      { field: '氏名', method: '削除', intent: '氏名は業務分析に不要なため削除（第1号）' },
    ],
  },
  {
    category: 'カード番号の削除',
    legalBasis: [
      '規則第31条第3号：不正に利用されることにより財産的被害が生じるおそれのある記述等の削除又は置換',
    ],
    items: [
      { field: 'カード番号', method: '削除', intent: '決済関連情報は不正利用時の財産的被害を防止（第3号）' },
    ],
  },
  {
    category: '連絡先の削除',
    legalBasis: [
      '規則第31条第1号：特定の個人を識別することができる記述等の削除又は置換',
    ],
    items: [
      { field: '電話番号', method: '削除', intent: '連絡先情報は分析目的に不要なため削除（第1号）' },
      { field: 'メールアドレス', method: '削除', intent: '連絡先情報は分析目的に不要なため削除（第1号）' },
    ],
  },
  {
    category: '属性の保持',
    legalBasis: [
      '※ 仮名加工では、分析に必要な属性は加工せず保持可能',
    ],
    items: [
      { field: '生年月日・年齢', method: '保持', intent: '顧客セグメント分析に必要' },
      { field: '性別', method: '保持', intent: '属性分析に必要' },
      { field: '郵便番号・住所', method: '住所は番地を削除し保持', intent: 'エリアマーケティング分析に必要' },
      { field: '購買金額', method: '保持（数値そのまま）', intent: '購買傾向分析・顧客LTV算出に必要' },
      { field: '来店回数', method: '保持', intent: '来店頻度分析に必要' },
      { field: '疾患区分', method: '保持', intent: '健康関連商品のレコメンド分析に必要' },
      { field: '契約種別', method: '保持', intent: '契約プラン別の分析に必要' },
    ],
  },
];
