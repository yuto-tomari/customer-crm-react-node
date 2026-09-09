# 顧客管理Webアプリ Ver.2

## ローカル開発

Node.js標準の環境変数ファイル読み込み・変更監視・テスト機能を使用します。
現在の動作確認環境はNode.js 26.5.1 / npm 11.17.0です。

それぞれのディレクトリで初回に `npm ci` を実行します。

- backend: `npm run dev`（変更監視）または `npm start`。既定は http://localhost:3000
- frontend: `npm run dev`。既定は http://localhost:5173

環境変数を指定しなければ上記の設定で動作します。
各 `.env.example` は秘密情報を含まないローカル設定例です。
backendのstart/devは、存在する場合に `.env` をNode.js標準機能で読み込みます。
frontendの環境変数はViteが読み込み、変更後は開発サーバーの再起動・本番ビルドの再実行が必要です。

| 環境変数 | 用途 | 既定値 |
|---|---|---|
| backend: PORT | APIの待受ポート（1〜65535） | 3000 |
| backend: CORS_ORIGIN | ブラウザーからの接続を許可する単一のオリジン | http://localhost:5173 |
| frontend: VITE_API_BASE_URL | APIのベースURL | http://localhost:3000 |

CORS_ORIGINには末尾のスラッシュやパスを含めません。
VITE_で始まる変数はブラウザーへ公開されるため、秘密情報を設定しないでください。
CORSは認証やアクセス制御の代わりにはなりません。

## 検証

- backend: `npm test`、`npm audit`
- frontend: `npm run lint`、`npm run build`
- API起動後: `GET http://localhost:3000/api/health`

healthの正常応答はHTTP 200と
`{"status":"ok","message":"API接続成功"}` です。
テストは空きポートを使用し、終了時にサーバーを閉じます。
