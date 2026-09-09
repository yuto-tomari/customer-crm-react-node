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

## API接続を使う理由
Reactはユーザーのブラウザで動くため、
Googleの認証情報やGemini APIキーなどの秘密情報を
React側へ直接置かないようにする。

Ver.2ではNode.jsを裏側の処理担当として使い、
ReactからAPIを通して必要な処理を依頼する。

流れは以下のようになる。

React
↓
API
↓
Node.js
↓
Googleスプレッドシート / Google Drive / Gemini API

Node.js側で、
保存・削除などの重要な処理や入力チェックを行うことで、
ブラウザ側にすべての処理や秘密情報を持たせない構成にする。
ただし、画面に表示する必要がある顧客情報は
APIを通してReactへ送られるため、
個人情報そのものが完全にブラウザから隠れるわけではない。

ユーザー側に全部の鍵を持たせず、
Node.jsを裏側の管理室にして、
APIを受付窓口として使う。

そのためReactとNode.jsをAPIで接続する必要がある。

## OAuth 2.0
Googleアカウントのパスワードをアプリへ渡さず、
必要なGoogleサービスへのアクセス権だけを許可する仕組み。

Ver.2ではNode.js側でOAuth 2.0を使用し、
GoogleスプレッドシートやGoogle Driveへアクセスする。

React側には認証情報を置かない。