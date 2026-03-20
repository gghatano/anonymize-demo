import type { AnalysisResult } from '../types';

// ── 共通4テーマ：同じ分析を粒度違いで比較（分析イメージ） ──
// ※ 数千件規模のデータを想定した概念的な分析結果

// 匿名加工側の分析結果（粗い粒度）
export const anonymizedAnalysis: AnalysisResult[] = [
  {
    title: '年齢分布（分析イメージ）',
    subtitle: '10歳刻みの年齢帯で集計 ─ 5カテゴリに集約',
    type: 'bar',
    data: [
      { name: '20代', value: 420 },
      { name: '30代', value: 780 },
      { name: '40代', value: 910 },
      { name: '50代', value: 620 },
      { name: '60代以上', value: 270 },
    ],
  },
  {
    title: '地域別人数（分析イメージ）',
    subtitle: '都道府県単位で集計 ─ 上位のみ表示',
    type: 'bar',
    data: [
      { name: '東京都', value: 850 },
      { name: '大阪府', value: 480 },
      { name: '愛知県', value: 390 },
      { name: '福岡県', value: 310 },
      { name: '北海道', value: 260 },
      { name: 'その他', value: 710 },
    ],
  },
  {
    title: '購買金額分布（分析イメージ）',
    subtitle: '大きな金額帯で集計（トップコード化あり）',
    type: 'bar',
    data: [
      { name: '1万未満', value: 680 },
      { name: '1万〜5万', value: 1050 },
      { name: '5万〜20万', value: 720 },
      { name: '20万以上', value: 550 },
    ],
  },
  {
    title: '疾患区分別件数（分析イメージ）',
    subtitle: '大分類に統合して集計 ─ 5カテゴリ',
    type: 'bar',
    data: [
      { name: '循環器系', value: 620 },
      { name: 'アレルギー系', value: 830 },
      { name: '代謝系', value: 540 },
      { name: '神経系', value: 480 },
      { name: '筋骨格系', value: 530 },
    ],
  },
];

// 合成データ側の分析結果（細かい粒度 ─ なめらかな分布）
export const syntheticAnalysis: AnalysisResult[] = [
  {
    title: '年齢分布（分析イメージ）',
    subtitle: '1歳刻みで集計 ─ 元データの分布を再現しつつ、なめらかな分布',
    type: 'bar',
    data: [
      // 仮名加工の2つの山と似た形だが、よりなめらか
      // 20歳〜58歳まで、ゆるやかな正規分布的な形
      { name: '20', value: 30 }, { name: '21', value: 35 }, { name: '22', value: 42 },
      { name: '23', value: 48 }, { name: '24', value: 58 },
      { name: '25', value: 70 }, { name: '26', value: 82 }, { name: '27', value: 98 },
      { name: '28', value: 118 }, { name: '29', value: 135 }, { name: '30', value: 150 },
      { name: '31', value: 152 }, { name: '32', value: 145 },
      { name: '33', value: 125 }, { name: '34', value: 105 }, { name: '35', value: 90 },
      { name: '36', value: 78 }, { name: '37', value: 72 },
      { name: '38', value: 75 }, { name: '39', value: 85 }, { name: '40', value: 100 },
      { name: '41', value: 120 }, { name: '42', value: 142 }, { name: '43', value: 158 },
      { name: '44', value: 165 }, { name: '45', value: 162 }, { name: '46', value: 148 },
      { name: '47', value: 130 }, { name: '48', value: 108 }, { name: '49', value: 88 },
      { name: '50', value: 72 }, { name: '51', value: 58 }, { name: '52', value: 50 },
      { name: '53', value: 42 }, { name: '54', value: 35 }, { name: '55', value: 30 },
      { name: '56', value: 25 }, { name: '57', value: 20 }, { name: '58', value: 16 },
    ],
  },
  {
    title: '地域別人数（分析イメージ）',
    subtitle: '市区町村単位で集計 ─ 元データの地域偏りを再現',
    type: 'bar',
    data: [
      { name: '港区', value: 265 },
      { name: '世田谷区', value: 190 },
      { name: '渋谷区', value: 168 },
      { name: '千代田区', value: 118 },
      { name: '新宿区', value: 95 },
      { name: '大阪市北区', value: 198 },
      { name: '大阪市中央区', value: 158 },
      { name: '堺市堺区', value: 98 },
      { name: '名古屋市中区', value: 182 },
      { name: '名古屋市東区', value: 115 },
      { name: '豊田市', value: 78 },
      { name: '福岡市中央区', value: 158 },
      { name: '福岡市博多区', value: 140 },
      { name: '札幌市中央区', value: 148 },
      { name: '札幌市北区', value: 98 },
    ],
  },
  {
    title: '購買金額分布（分析イメージ）',
    subtitle: '1万円刻みで集計 ─ 二極化の傾向を再現',
    type: 'bar',
    data: [
      { name: '~1万', value: 435 },
      { name: '1万', value: 368 },
      { name: '2万', value: 272 },
      { name: '3万', value: 185 },
      { name: '4万', value: 115 },
      { name: '5万', value: 85 },
      { name: '6万', value: 68 },
      { name: '7万', value: 58 },
      { name: '8万', value: 52 },
      { name: '9万', value: 58 },
      { name: '10万', value: 72 },
      { name: '11万', value: 90 },
      { name: '12万', value: 115 },
      { name: '13万', value: 142 },
      { name: '14万', value: 155 },
      { name: '15万', value: 148 },
      { name: '16万', value: 125 },
      { name: '17万', value: 95 },
      { name: '18万', value: 68 },
      { name: '19万', value: 48 },
      { name: '20万~', value: 125 },
    ],
  },
  {
    title: '疾患区分別件数（分析イメージ）',
    subtitle: '詳細な病名で集計 ─ 元データの疾患構成を再現',
    type: 'bar',
    data: [
      { name: '花粉症', value: 408 },
      { name: '喘息', value: 225 },
      { name: 'アトピー', value: 175 },
      { name: '高血圧', value: 372 },
      { name: '不整脈', value: 148 },
      { name: '狭心症', value: 82 },
      { name: '糖尿病', value: 302 },
      { name: '脂質異常', value: 225 },
      { name: '偏頭痛', value: 252 },
      { name: '自律神経', value: 215 },
      { name: '腰痛症', value: 272 },
      { name: '骨粗しょう症', value: 155 },
      { name: '肩関節周囲炎', value: 85 },
    ],
  },
];

// 仮名加工側の分析結果（細かい粒度 ─ 匿名加工で潰れていた山が見える）
export const pseudonymizedAnalysis: AnalysisResult[] = [
  {
    title: '年齢分布（分析イメージ）',
    subtitle: '1歳刻みで集計 ─ 匿名加工では見えなかった2つの山が出現',
    type: 'bar',
    data: [
      // 20代前半：谷
      { name: '20', value: 25 }, { name: '21', value: 30 }, { name: '22', value: 38 },
      { name: '23', value: 42 }, { name: '24', value: 55 },
      // 20代後半〜30代前半：第1の山
      { name: '25', value: 72 }, { name: '26', value: 88 }, { name: '27', value: 105 },
      { name: '28', value: 130 }, { name: '29', value: 148 }, { name: '30', value: 160 },
      { name: '31', value: 155 }, { name: '32', value: 140 },
      // 30代後半：谷
      { name: '33', value: 110 }, { name: '34', value: 85 }, { name: '35', value: 72 },
      { name: '36', value: 65 }, { name: '37', value: 58 },
      // 40代前半：第2の山（メイン）
      { name: '38', value: 70 }, { name: '39', value: 88 }, { name: '40', value: 110 },
      { name: '41', value: 135 }, { name: '42', value: 155 }, { name: '43', value: 170 },
      { name: '44', value: 175 }, { name: '45', value: 168 }, { name: '46', value: 150 },
      // 40代後半〜：減少
      { name: '47', value: 125 }, { name: '48', value: 100 }, { name: '49', value: 82 },
      { name: '50', value: 68 }, { name: '51', value: 55 }, { name: '52', value: 48 },
      { name: '53', value: 40 }, { name: '54', value: 32 }, { name: '55', value: 28 },
      { name: '56', value: 22 }, { name: '57', value: 18 }, { name: '58', value: 15 },
    ],
  },
  {
    title: '地域別人数（分析イメージ）',
    subtitle: '市区町村単位で集計 ─ 都道府県では見えなかった偏りが判明',
    type: 'bar',
    data: [
      // 東京都内が分解される → 港区に集中していることが判明
      { name: '港区', value: 280 },
      { name: '世田谷区', value: 195 },
      { name: '渋谷区', value: 175 },
      { name: '千代田区', value: 110 },
      { name: '新宿区', value: 90 },
      // 大阪も分解
      { name: '大阪市北区', value: 210 },
      { name: '大阪市中央区', value: 165 },
      { name: '堺市堺区', value: 105 },
      // 愛知
      { name: '名古屋市中区', value: 190 },
      { name: '名古屋市東区', value: 120 },
      { name: '豊田市', value: 80 },
      // 福岡
      { name: '福岡市中央区', value: 165 },
      { name: '福岡市博多区', value: 145 },
      // 北海道
      { name: '札幌市中央区', value: 155 },
      { name: '札幌市北区', value: 105 },
    ],
  },
  {
    title: '購買金額分布（分析イメージ）',
    subtitle: '1万円刻みで集計 ─ 匿名加工では見えなかった二極化が出現',
    type: 'bar',
    data: [
      // 低価格帯の山
      { name: '~1万', value: 450 },
      { name: '1万', value: 380 },
      { name: '2万', value: 280 },
      { name: '3万', value: 190 },
      // 谷
      { name: '4万', value: 110 },
      { name: '5万', value: 80 },
      { name: '6万', value: 65 },
      { name: '7万', value: 55 },
      { name: '8万', value: 50 },
      { name: '9万', value: 55 },
      // 高価格帯の第2の山
      { name: '10万', value: 75 },
      { name: '11万', value: 95 },
      { name: '12万', value: 120 },
      { name: '13万', value: 150 },
      { name: '14万', value: 160 },
      { name: '15万', value: 145 },
      { name: '16万', value: 120 },
      { name: '17万', value: 90 },
      { name: '18万', value: 65 },
      { name: '19万', value: 45 },
      { name: '20万~', value: 120 },
    ],
  },
  {
    title: '疾患区分別件数（分析イメージ）',
    subtitle: '詳細な病名で集計 ─ 大分類内の内訳が判明',
    type: 'bar',
    data: [
      // アレルギー系の内訳（匿名加工では「830」の1本だった）
      { name: '花粉症', value: 420 },
      { name: '喘息', value: 230 },
      { name: 'アトピー', value: 180 },
      // 循環器系の内訳
      { name: '高血圧', value: 380 },
      { name: '不整脈', value: 155 },
      { name: '狭心症', value: 85 },
      // 代謝系の内訳
      { name: '糖尿病', value: 310 },
      { name: '脂質異常', value: 230 },
      // 神経系の内訳
      { name: '偏頭痛', value: 260 },
      { name: '自律神経', value: 220 },
      // 筋骨格系の内訳
      { name: '腰痛症', value: 280 },
      { name: '骨粗しょう症', value: 160 },
      { name: '肩関節周囲炎', value: 90 },
    ],
  },
];
