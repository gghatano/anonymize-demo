# Task 004: ProcessPanel（4ステップ表示）実装

## 概要
各加工方式の4ステップを縦に並べるProcessPanelと各ステップコンポーネント

## 作業内容
- ProcessPanel: 4ステップを縦に並べるコンテナ
- ステップ1: SourceDataTable（元データテーブル + 加工対象項目タグ + 補足文言）
- ステップ2: ProcessingDesignCardList（加工方針カード一覧、項目/加工内容/意図の3列）
- ステップ3: ProcessedDataTable（加工前後テーブル + 差分色付け/バッジ + 加工実施ボタン）
- ステップ4: AnalysisResultPanel（KPIカード + 簡易グラフ + 集計表）+ UsageRuleCard

## 完了条件
- 匿名加工・仮名加工両方の4ステップが正しく表示される
- 加工実施ボタンで加工前→加工後に切替わる
