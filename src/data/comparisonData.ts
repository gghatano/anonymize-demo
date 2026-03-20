import type { ComparisonRow, UsageRule } from '../types';

export const comparisonSummary: ComparisonRow[] = [
  // ── 概要（トレードオフの構造） ──
  {
    item: '主な目的',
    anonymized: '社外提供・統計分析',
    pseudonymized: '社内分析・業務改善',
    synthetic: '幅広い活用（分析・開発・共有）',
    anonymizedHighlight: 'positive',
    pseudonymizedHighlight: 'positive',
    syntheticHighlight: 'positive',
    group: 'overview',
  },
  {
    item: '安全性',
    anonymized: '高い（個人の識別・復元が不可）',
    pseudonymized: '一定の対策が必要（対応テーブル等の管理）',
    synthetic: '高い（実在の個人に直接対応しない）',
    anonymizedHighlight: 'positive',
    pseudonymizedHighlight: 'negative',
    syntheticHighlight: 'positive',
    group: 'overview',
  },
  {
    item: '有用性',
    anonymized: '限定的（一般化により詳細な分析が困難）',
    pseudonymized: '高い（多くの属性を保持し詳細な分析が可能）',
    synthetic: '高い（統計的特性を保持、ただし再現精度に依存）',
    anonymizedHighlight: 'negative',
    pseudonymizedHighlight: 'positive',
    syntheticHighlight: 'positive',
    group: 'overview',
  },
  // ── 詳細 ──
  {
    item: '社外提供',
    anonymized: '可能（想定）',
    pseudonymized: '不可（想定）',
    synthetic: '可能性が広い（生成元との関係性の検討が必要）',
    anonymizedHighlight: 'positive',
    pseudonymizedHighlight: 'negative',
    syntheticHighlight: 'positive',
    group: 'detail',
  },
  {
    item: '社内二次利用',
    anonymized: '可能',
    pseudonymized: '可能（利用目的の変更時は公表が必要）',
    synthetic: '可能',
    group: 'detail',
  },
  {
    item: '個人単位分析',
    anonymized: '不可',
    pseudonymized: '可能',
    synthetic: '不可（架空の個人のため実在の個人への適用不可）',
    anonymizedHighlight: 'negative',
    pseudonymizedHighlight: 'positive',
    syntheticHighlight: 'negative',
    group: 'detail',
  },
  {
    item: '復元前提',
    anonymized: 'なし（不可逆な加工）',
    pseudonymized: 'なし（復元を目的とした利用は想定しない）',
    synthetic: 'なし（元データと1対1の対応がない）',
    group: 'detail',
  },
  {
    item: '管理上の制約',
    anonymized: '一定の義務あり（個人情報に比べ限定的）',
    pseudonymized: '強い（安全管理措置必須）',
    synthetic: '生成モデル・元データの管理が必要',
    anonymizedHighlight: 'positive',
    pseudonymizedHighlight: 'negative',
    group: 'detail',
  },
];

export const anonymizedUsageRules: UsageRule = {
  canDo: [
    '公表等の手続きを経て第三者提供が可能',
    '統計的な傾向分析・レポート作成',
    '統計データとしての公開活用（関連法令・社内規程に基づく）',
    '業界横断の比較分析への活用',
  ],
  constraints: [
    '元の個人情報を復元してはならない',
    '他の情報と照合して個人を識別してはならない',
    '匿名加工情報である旨を公表する必要がある',
    '加工方法に関する情報の安全管理が必要',
  ],
  highlights: [
    '個人情報保護法上の「個人情報」には該当しないが、匿名加工情報としての義務規定の適用を受ける',
    '本人からの開示・削除請求の対象外',
    '利用目的による制限を受けない（ただし識別行為の禁止等の義務あり）',
  ],
};

export const syntheticUsageRules: UsageRule = {
  canDo: [
    '社外提供の可能性が広がる（ただし生成元データとの関係性の検討が必要）',
    '統計的特性を保持した詳細な分析が可能',
    'テストデータ・開発環境での利用',
    '機械学習モデルの学習データとしての活用',
  ],
  constraints: [
    '元データの統計的特性を完全に再現できるとは限らない',
    '希少なケース（外れ値・稀少疾患等）の再現が困難',
    '生成モデルの品質に依存するため、検証が必要',
    '元データへのアクセスが生成時に必要',
  ],
  highlights: [
    '実在の個人に直接対応しないが、法的位置づけは生成手法や元データとの関係性により異なり得る',
    '安全性と有用性の両立が可能な新しいアプローチ',
    '生成モデルの妥当性検証が品質の鍵',
  ],
};

export const pseudonymizedUsageRules: UsageRule = {
  canDo: [
    '社内での詳細な顧客分析・セグメンテーション',
    '購買傾向に基づくマーケティング施策の立案',
    '来店パターン分析による店舗運営改善',
    '対応テーブルを用いた元データとの突合（厳格管理下）',
  ],
  constraints: [
    '第三者提供は原則禁止',
    '対応テーブルは厳格な安全管理措置のもとで管理',
    '利用目的の変更時は公表が必要',
    '不正アクセス防止等の安全管理措置が必須',
    '漏えい等が発生した場合は報告義務あり',
  ],
  highlights: [
    '個人情報保護法上の「個人情報」として扱う必要がある',
    '利用目的の変更が柔軟にできる（ただし変更後の目的の公表が必要）',
    '対応テーブルの保持は可能だが、厳格な安全管理措置が求められる',
  ],
};
