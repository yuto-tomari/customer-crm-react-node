# 顧客管理Webアプリ Ver.2 学習メモ

## React
Reactは、画面をコンポーネントという部品に分けて組み立てるJavaScriptライブラリ。
HTMLやCSSの代わりではなく、
JSXで画面構造を書き、CSSで見た目を整える。

## Vite
Reactの開発環境を素早く作成・起動するためのツール。
今回、
`npm create vite@latest frontend -- --template react`
でReactプロジェクトを作成した。

## npm install
`package.json`をもとに、
必要なパッケージを`node_modules`へインストールする。

## npm run dev
開発サーバーを起動する。
今回の環境では、
`http://localhost:5173/`
からブラウザで確認できる。

## App.jsx
Reactアプリの中心となるコンポーネント。
`return`の中に書いたJSXが画面に表示される。
