# GoogleMeetTimer
## 1. 使い方
### 1-1. ビルド
1. 本リポジトリをgit cloneで取得
2. 下記項目「3. 環境構築」に合わせて.envの値を設定
3. 下記項目「5. ビルド」を実行
4. zipディレクトリにzipファイルが作成されているのを確認
5. zipファイルを解凍しておく

### 1-2. プラグインの登録
1. Google Chromeの右上のアイコンで「拡張機能を管理」をクリック
   
![image](https://github.com/user-attachments/assets/5244beb4-bd77-45f3-9ef7-6d0eb8f3e9c9)

![image](https://github.com/user-attachments/assets/075a5c36-31c8-49a9-ab0e-42159990b843)

3. デベロッパーモードをONにする。
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. 1-1でビルドしたzipファイルのdistディレクトリを選択
6. 登録されれば最高
   
![image](https://github.com/user-attachments/assets/abf940e5-46a3-4c43-ab1d-fd7205968685)


## 2. バージョン
```
$ node -v
v20.10.0
$ pnpm -v
9.12.3

```

## 3. 環境構築
### add hosts file

```
$ vi /etc/hosts
```

```
127.0.0.1 google-meet-timer.dev.to
```

### cert
```
$ mkdir cert
$ cd cert
$ openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -days 365 -subj "/CN=google-meet-timer.dev.to"
```

### install
```
$ cd plugin
$ pnpm i
```

## 4. 起動
```
$ pnpm dev
```

### アクセス
[https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0](https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0)
)


## 5. ビルド
```
$ pnpm build
```




