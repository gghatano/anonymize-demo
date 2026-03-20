// 元データ・加工後データの1レコード
export interface PersonRecord {
  customerId: string;
  name: string;
  birthDate: string;
  age: number;
  gender: string;
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  cardNumber: string;
  purchaseAmount: number;
  visitCount: number;
  diseaseCategory: string;
  contractType: string;
}

// 加工設計カード
export interface ProcessingDesign {
  category: string;
  legalBasis: string[];
  items: { field: string; method: string; intent: string }[];
}

// 分析結果
export interface AnalysisResult {
  title: string;
  subtitle?: string;
  type: 'kpi' | 'bar' | 'table';
  data: any;
}

// 比較サマリー行
export type HighlightType = 'positive' | 'negative' | 'neutral';

export interface ComparisonRow {
  item: string;
  anonymized: string;
  pseudonymized: string;
  synthetic: string;
  anonymizedHighlight?: HighlightType;
  pseudonymizedHighlight?: HighlightType;
  syntheticHighlight?: HighlightType;
  group?: 'overview' | 'detail';
}

// 利用ルール
export interface UsageRule {
  canDo: string[];
  constraints: string[];
  highlights: string[];
}

// パネルタイプ（3方式）
export type PanelType = 'anonymized' | 'pseudonymized' | 'synthetic';

// 表示モード
export type ViewMode =
  | 'anon-pseudo' | 'anon-synthetic' | 'pseudo-synthetic'  // ペア比較
  | 'anonymized' | 'pseudonymized' | 'synthetic';           // 単独表示

// 加工状態
export type ProcessingState = 'before' | 'after';
