# claud-code-test ver2

Claude Code開発用テストリポジトリです。

## 概要

このリポジトリはClaude Code（claude.ai/code）を使った開発のテスト環境として設定されています。最小限の構成から始めて、様々なプロジェクトタイプの開発を試すことができます。

## 現在の構成

- **言語**: 日本語でのやり取りを推奨
- **構造**: 最小構成（README.md、CLAUDE.md のみ）
- **ビルドシステム**: なし
- **依存関係**: なし
- **テストフレームワーク**: なし

## 開発を始める

プロジェクトの種類に応じて以下の手順で環境を構築してください：

### Node.js プロジェクト
```bash
npm init -y
npm install [必要なパッケージ]
```

### Python プロジェクト  
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# または
venv\Scripts\activate     # Windows
pip freeze > requirements.txt
```

### その他の言語
プロジェクトに応じて適切な設定ファイルを追加してください。

## 含まれるアプリケーション

### タイピング練習アプリ
`typing-app/` ディレクトリには、日本語タイピング練習用のWebアプリケーションが含まれています。

**特徴:**
- モダンでリッチなUI設計
- リアルタイムの成績表示（WPM、正確性、スコア）
- プログラミング関連の練習文章
- レスポンシブデザイン対応
- アクセシビリティに配慮

**起動方法:**
```bash
cd typing-app
# 任意のローカルサーバーで起動（例: Live Server、Python http.server など）
python -m http.server 8000
# または
npx serve .
```

## Claude Code の使用

このリポジトリはClaude Codeでの開発に最適化されています。`CLAUDE.md`ファイルにClaude Code向けの詳細な指示が含まれています。
